import { AnchorProvider, Program, Provider, BN, IdlAccounts } from '@coral-xyz/anchor';
import { decode } from '@coral-xyz/anchor/dist/cjs/utils/bytes/base64';
import { Wallet } from '@coral-xyz/anchor/dist/cjs/provider';
import {
  Connection,
  PublicKey,
  AccountMeta,
  Transaction,
  SystemProgram,
  TransactionInstruction,
  RpcResponseAndContext,
  SimulatedTransactionResponse,
} from '@solana/web3.js';
import { BOND_IDL, IDL, Bond as BondType } from '@etherfuse/bond-idl';
import { IdlCoder } from './utils/idlCoder';
import { Collection, AssetInfo, AssetProof, TokenMetadata, BondToken } from './models';
import {
  SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
  SPL_NOOP_PROGRAM_ID,
  ConcurrentMerkleTreeAccount,
} from '@solana/spl-account-compression';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
  createAssociatedTokenAccountInstruction,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { PROGRAM_ID as BUBBLEGUM_PROGRAM_ID } from '@metaplex-foundation/mpl-bubblegum';
import Decimal from 'decimal.js';
import { PROGRAM_ID as TOKEN_METADATA_PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata';
import { Nft, Metaplex, walletAdapterIdentity } from '@metaplex-foundation/js';
import { BOND_DECIMALS_UI, MAINNET_ACCESS_PASS_COLLECTION_ID, MAINNET_BOND_PROGRAM_ID } from './constants';

export class Bond {
  private readonly _connection: Connection;
  private readonly _bondProgramId: PublicKey;
  private readonly _accessPassCollection: PublicKey;
  private readonly _provider: Provider;
  private _bondProgram: Program<BondType>;
  private _metaplex: Metaplex;

  /**
   * Creates an instance of the Bond SDK Class
   * @param connection The connection to the solana network
   * @param wallet The wallet from solana wallet base
   * @param bondProgramId The bond program id. defaults to mainnet if not provided
   * @param accessPassCollection The access pass collection id. defaults to mainnet if not provided
   */
  constructor(connection: Connection, wallet: Wallet, bondProgramId?: PublicKey, accessPassCollection?: PublicKey) {
    this._connection = new Connection(connection.rpcEndpoint, connection.commitment);

    this._provider = new AnchorProvider(connection, wallet, {
      commitment: connection.commitment,
    });
    this._bondProgramId = bondProgramId || new PublicKey(MAINNET_BOND_PROGRAM_ID);
    this._accessPassCollection = accessPassCollection || new PublicKey(MAINNET_ACCESS_PASS_COLLECTION_ID);
    this._metaplex = new Metaplex(this._connection).use(walletAdapterIdentity(wallet));
    this._bondProgram = new Program(IDL, this._bondProgramId, this._provider);
  }
  /**
   * Returns all collections on the bond program
   * @returns A promise resolved with an array of collections
   */
  async getCollections(): Promise<Collection[]> {
    const collections = (await this._bondProgram.account.collection.all())
      .filter(({ account }) => !account.isFrozen)
      .map(({ account }) => this.mapToCollection(account));
    return collections;
  }

  /**
   * Returns a single collection
   * @param mint The mint of the collection
   * @returns A promise resolved with the collection
   */
  async getCollection(mint: PublicKey): Promise<Collection> {
    let address = this.getCollectionAddress(mint);
    const collection = await this._bondProgram.account.collection.fetch(address);
    return this.mapToCollection(collection);
  }

  /**
   * Get the returns on a bond
   * @param amount The amount of bonds
   * @param collection The collection of the bond
   * @returns A promise resolved with the returns
   */
  async getReturnsOnCollection(
    amount: Decimal,
    collection: Pick<Collection, 'startDate' | 'interestRate' | 'maturityDate'>
  ): Promise<Decimal> {
    let couponAPY = amount.mul(collection.interestRate);
    let daysToMaturity = Math.ceil(
      (collection.maturityDate.valueOf() - collection.startDate.valueOf()) / (1000 * 60 * 60 * 24)
    );
    let couponReturns = couponAPY.div(365.25).mul(daysToMaturity);
    return amount.add(couponReturns);
  }

  /**
   * Mint a bond token
   * @param amount UI amount of bonds that the user wants to mint
   * @param collectionMint The mint of the collection
   * @returns A promise resolved transaction that the user can submit
   */
  async mintBond(amount: Decimal, collectionMint: PublicKey): Promise<Transaction> {
    let collection = await this.getCollection(collectionMint);
    let wallet = this._provider.publicKey!;
    let userPaymentTokenAccount = getAssociatedTokenAddressSync(collection.paymentMint, wallet);
    let userBondTokenAccount = getAssociatedTokenAddressSync(collection.mint, wallet);
    let userHasBondTokenAccount = await this.checkIfAccountExists(userBondTokenAccount);
    let tokenAmount = this.UiToTokenAmount(amount, BOND_DECIMALS_UI);
    let preInstructions: TransactionInstruction[] = [];
    if (!userHasBondTokenAccount) {
      let ataIx = createAssociatedTokenAccountInstruction(wallet, userBondTokenAccount, wallet, collection.mint);
      preInstructions.push(ataIx);
    }
    let methodBuilder = this._bondProgram.methods
      .mintBond({ amount: tokenAmount })
      .accounts({
        owner: wallet,
        collection: this.getCollectionAddress(collection.mint),
        mint: collection.mint,
        bondTokenAccount: userBondTokenAccount,
        paymentAccount: this.getPaymentAccountAddress(collection.mint),
        paymentTokenAccount: this.getPaymentAccountTokenAccountAddress(collection.mint, collection.paymentMint),
        paymentPriceFeed: collection.oracleParams.oracleAccount,
        ownerTokenAccount: userPaymentTokenAccount,
        paymentMint: collection.paymentMint,
        kyc: this.getKycAddress(wallet),
        pass: this.getAccessPassAddress(wallet),
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .preInstructions(preInstructions);
    return await methodBuilder.transaction();
  }

  /**
   * Exchange your bond tokens for an NFT that represents the bonds stored in the program
   * This will allow the user to maintain state and collect interest on their bonds
   * @param collectionMint The mint of the collection
   * @param nftMint The mint of NFT. The callee will need to pass in a newly generated Keypair and include this as the signer in the transaction
   * @param amount UI amount of bonds that the user wants to exchange
   * @returns A promise resolved transaction that the user can submit
   */
  async exchangeTokensForNFT(collectionMint: PublicKey, nftMint: PublicKey, amount?: Decimal): Promise<Transaction> {
    let collection = await this.getCollection(collectionMint);
    let wallet = this._provider.publicKey!;
    if (!amount) {
      let userBondTokenAccount = getAssociatedTokenAddressSync(collection.mint, wallet);
      let balance = await this.fetchPdaTokenAccountBalance(userBondTokenAccount, collection.mint);
      amount = balance;
    }
    let userBondTokenAccount = getAssociatedTokenAddressSync(collection.mint, wallet);
    let nftAddress = this.getNftAddress(nftMint);
    let nftBondTokenAccount = getAssociatedTokenAddressSync(collection.mint, nftAddress, true);
    let ownerNftTokenAccount = getAssociatedTokenAddressSync(nftMint, wallet);
    let setNftInstruction = await this._bondProgram.methods
      .setNft({})
      .accounts({
        owner: wallet,
        collection: this.getCollectionAddress(collection.mint),
        nft: nftAddress,
        ownerNftTokenAccount: ownerNftTokenAccount,
        nftMint: nftMint,
        collectionNftMint: collection.nftMint,
        kyc: this.getKycAddress(wallet),
        metadata: this.getMetadataAddress(nftMint),
        masterEdition: this.getMasterEditionAddress(nftMint),
        collectionMetadata: this.getMetadataAddress(collection.nftMint),
        collectionMasterEdition: this.getMasterEditionAddress(collection.nftMint),
        tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .instruction();
    let postInstructions: TransactionInstruction[] = [];
    postInstructions.push(setNftInstruction);
    let tokenAmount = this.UiToTokenAmount(amount, BOND_DECIMALS_UI);
    let methodBuilder = this._bondProgram.methods
      .exchangeTokensForNft({ amount: tokenAmount })
      .accounts({
        owner: wallet,
        collection: this.getCollectionAddress(collection.mint),
        nft: nftAddress,
        bondMint: collection.mint,
        pdaBondTokenAccount: nftBondTokenAccount,
        ownerNftTokenAccount: ownerNftTokenAccount,
        ownerBondTokenAccount: userBondTokenAccount,
        kyc: this.getKycAddress(wallet),
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .postInstructions(postInstructions);
    return await methodBuilder.transaction();
  }

  /**
   * Collect the coupon for the NFT that represents the bonds stored in the program
   * @param nftMint The mint of the NFT that represents the bonds
   * @param collectionMint The mint of the collection
   * @returns A promise resolved transaction that the user can submit
   */
  async collectCouponForNft(nftMint: PublicKey, collectionMint: PublicKey): Promise<Transaction> {
    let collection = await this.getCollection(collectionMint);
    let wallet = this._provider.publicKey!;
    let userNftTokenAccount = getAssociatedTokenAddressSync(nftMint, wallet);
    let userPaymentTokenAccount = getAssociatedTokenAddressSync(collection.paymentMint, wallet);
    let nftAddress = this.getNftAddress(nftMint);
    let nftBondTokenAccount = getAssociatedTokenAddressSync(collection.mint, nftAddress, true);
    let userHasPaymentTokenAccount = await this.checkIfAccountExists(userPaymentTokenAccount);
    let preInstructions: TransactionInstruction[] = [];
    if (!userHasPaymentTokenAccount) {
      let ataIx = createAssociatedTokenAccountInstruction(
        wallet,
        userPaymentTokenAccount,
        wallet,
        collection.paymentMint
      );
      preInstructions.push(ataIx);
    }
    let methodBuilder = this._bondProgram.methods
      .collectCoupon({})
      .accounts({
        owner: wallet,
        collection: this.getCollectionAddress(collection.mint),
        ownerNftTokenAccount: userNftTokenAccount,
        ownerPaymentTokenAccount: userPaymentTokenAccount,
        pdaBondTokenAccount: nftBondTokenAccount,
        nft: nftAddress,
        nftMint: nftMint,
        interest: this.getInterestAccountAddress(collection.mint),
        interestPaymentTokenAccount: this.getInterestAccountTokenAccountAddress(
          collection.mint,
          collection.paymentMint
        ),
        bondMint: collection.mint,
        paymentMint: collection.paymentMint,
        kyc: this.getKycAddress(wallet),
        pass: this.getAccessPassAddress(wallet),
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .preInstructions(preInstructions);
    return await methodBuilder.transaction();
  }

  /**
   * Collect the par value for the bonds stored in the program
   * This will include both the coupon and the par value and will burn the bonds provided
   * @param collectionMint The mint of the collection
   * @param amount UI amount of bonds that the user wants to collect
   * @returns A promise resolved transaction that the user can submit
   */
  async collectParValue(collectionMint: PublicKey, amount?: Decimal): Promise<Transaction> {
    let collection = await this.getCollection(collectionMint);
    let wallet = this._provider.publicKey!;
    if (!amount) {
      let userBondTokenAccount = getAssociatedTokenAddressSync(collection.mint, wallet);
      let balance = await this.fetchPdaTokenAccountBalance(userBondTokenAccount, collection.mint);
      amount = balance;
    }
    let userPaymentTokenAccount = getAssociatedTokenAddressSync(collection.paymentMint, wallet);
    let userBondtokenAccount = getAssociatedTokenAddressSync(collection.mint, wallet);
    let tokenAmount = this.UiToTokenAmount(amount, BOND_DECIMALS_UI);
    let userHasPaymentTokenAccount = await this.checkIfAccountExists(userPaymentTokenAccount);
    let preInstructions: TransactionInstruction[] = [];
    if (!userHasPaymentTokenAccount) {
      let ataIx = createAssociatedTokenAccountInstruction(
        wallet,
        userPaymentTokenAccount,
        wallet,
        collection.paymentMint
      );
      preInstructions.push(ataIx);
    }
    let methodBuilder = this._bondProgram.methods
      .collectParValue({ amount: tokenAmount })
      .accounts({
        owner: wallet,
        ownerPaymentTokenAccount: userPaymentTokenAccount,
        collection: this.getCollectionAddress(collection.mint),
        bondMint: collection.mint,
        ownerBondTokenAccount: userBondtokenAccount,
        parValue: this.getParValueAccountAddress(collection.mint),
        parValueTokenAccount: this.getParValueAccountTokenAccountAddress(collection.mint, collection.paymentMint),
        interest: this.getInterestAccountAddress(collection.mint),
        interestPaymentTokenAccount: this.getInterestAccountTokenAccountAddress(
          collection.mint,
          collection.paymentMint
        ),
        paymentMint: collection.paymentMint,
        kyc: this.getKycAddress(wallet),
        pass: this.getAccessPassAddress(wallet),
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .preInstructions(preInstructions);
    return await methodBuilder.transaction();
  }

  /**
   * Collect the par value for the NFT that represents the bonds stored in the program
   * This will include both the coupon and the par value and will burn the bonds provided
   * @param nftMint The mint of the NFT that represents the bonds
   * @param collectionMint The mint of the collection
   * @returns A promise resolved transaction that the user can submit
   */
  async collectParValueForNft(nftMint: PublicKey, collectionMint: PublicKey): Promise<Transaction> {
    let collection = await this.getCollection(collectionMint);
    let wallet = this._provider.publicKey!;
    let userNftTokenAccount = getAssociatedTokenAddressSync(nftMint, wallet);
    let nftAddress = this.getNftAddress(nftMint);
    let nftPdaBondTokenAccount = getAssociatedTokenAddressSync(collection.mint, nftAddress, true);
    let userPaymentTokenAccount = getAssociatedTokenAddressSync(collection.paymentMint, wallet);
    let userHasPaymentTokenAccount = await this.checkIfAccountExists(userPaymentTokenAccount);
    let preInstructions: TransactionInstruction[] = [];
    if (!userHasPaymentTokenAccount) {
      let ataIx = createAssociatedTokenAccountInstruction(
        wallet,
        userPaymentTokenAccount,
        wallet,
        collection.paymentMint
      );
      preInstructions.push(ataIx);
    }
    let methodBuilder = this._bondProgram.methods
      .collectParValueForNft({})
      .accounts({
        owner: wallet,
        collection: this.getCollectionAddress(collection.mint),
        ownerNftTokenAccount: userNftTokenAccount,
        ownerPaymentTokenAccount: userPaymentTokenAccount,
        pdaBondTokenAccount: nftPdaBondTokenAccount,
        nft: nftAddress,
        nftMint: collection.nftMint,
        parValue: this.getParValueAccountAddress(collection.mint),
        parValueTokenAccount: this.getParValueAccountTokenAccountAddress(collection.mint, collection.paymentMint),
        interest: this.getInterestAccountAddress(collection.mint),
        interestPaymentTokenAccount: this.getInterestAccountTokenAccountAddress(
          collection.mint,
          collection.paymentMint
        ),
        bondMint: collection.mint,
        paymentMint: collection.paymentMint,
        kyc: this.getKycAddress(wallet),
        pass: this.getAccessPassAddress(wallet),
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .preInstructions(preInstructions);
    return await methodBuilder.transaction();
  }

  /**
   * Burn the access pass on chain to signal the user has received a pass
   * This is a one time operation
   * @returns A promise resolved with the transaction
   */
  async burnAccessPass(): Promise<Transaction> {
    let wallet = this._provider.publicKey!;
    let assetInfo = await this.getCompressedAssetInfo(wallet);
    if (!assetInfo) {
      throw new Error('No asset info found for the access pass');
    }
    let assetProof = await this.getCompressedAssetProof(assetInfo.id);
    if (!assetProof) {
      throw new Error('No asset proof found for the access pass');
    }
    const { compression, ownership, creators } = assetInfo;
    const collectionOwner = new PublicKey(
      creators.reduce((prev, current) => {
        return prev.share > current.share ? prev : current;
      }).address
    );
    const { proof, root } = assetProof;
    const treePublicKey = new PublicKey(compression.tree);
    const ownerPublicKey = new PublicKey(ownership.owner);
    const delegatePublicKey = ownership.delegate ? new PublicKey(ownership.delegate) : ownerPublicKey;

    const treeAccount = await ConcurrentMerkleTreeAccount.fromAccountAddress(this._connection, treePublicKey);
    const treeAuthority = treeAccount.getAuthority();
    const canopyDepth = treeAccount.getCanopyDepth() || 0;

    let rootKey = Array.from(new PublicKey(root.trim()).toBytes());
    let dataHash = Array.from(new PublicKey(compression.data_hash.trim()).toBytes());
    let creatorHash = Array.from(new PublicKey(compression.creator_hash.trim()).toBytes());
    let nonce = new BN(compression.leaf_id);
    let index = compression.leaf_id;
    const proofPath: AccountMeta[] = proof
      .map((node: string) => ({
        pubkey: new PublicKey(node),
        isSigner: false,
        isWritable: false,
      }))
      .slice(0, proof.length - canopyDepth);

    let methodBuilder = this._bondProgram.methods
      .burnPass({
        root: rootKey,
        dataHash,
        creatorHash,
        nonce,
        index,
      })
      .accounts({
        passOwner: ownerPublicKey,
        pass: this.getAccessPassAddress(wallet),
        globalPassConfig: this.getGlobalPassConfigAddress(),
        collectionOwner: collectionOwner,
        leafDelegate: delegatePublicKey,
        merkleTree: treePublicKey,
        treeAuthority: treeAuthority,
        logWrapper: SPL_NOOP_PROGRAM_ID,
        compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
        bubblegumProgram: BUBBLEGUM_PROGRAM_ID,
      })
      .remainingAccounts(proofPath);
    return await methodBuilder.transaction();
  }

  /**
   * Get all the bond tokens that the user has
   * A bond token can either be an spl token or an nft that the bond program has issued
   * @returns A promise resolved with an array of bond tokens and their details
   */
  async getUserBonds(): Promise<BondToken[]> {
    let collections: Collection[] = await this.getCollections();
    let wallet = this._provider.publicKey!;
    let nftCollections = new Set(collections.map((c) => c.nftMint.toBase58()));
    let balanceMap = this.getUserBondBalances();
    let collectionsMap = new Map(collections.map((c) => [c.nftMint.toBase58(), c]));
    let nftsInWallet = (await this._metaplex.nfts().findAllByOwner({ owner: wallet })) as Nft[];
    let bondNfts = nftsInWallet.filter((nft) => {
      if (!nft.collection || !nft.collection!.address) {
        return false;
      }
      nftCollections.has(nft.collection!.address.toBase58());
    });
    let bondTokenModels: BondToken[] = [];
    await Promise.all(
      bondNfts.map(async (nft) => {
        let collection = collectionsMap.get(nft.collection!.address.toBase58());
        if (collection) {
          let simulatedPriceError = false;
          let coupon = new Decimal(0);
          let parValue = new Decimal(0);
          let balance = new Decimal(0);
          let imageUrl = '';
          let nftMint = new PublicKey(nft.mint);
          let nftAddress = this.getNftAddress(nftMint);
          try {
            imageUrl = await this.fetchImageFromURI(collection.nftUri);
            balance = await this.fetchPdaTokenAccountBalance(nftAddress, collection.mint);
            coupon = await this.viewCouponForNftReturns(nftMint, collection);
            parValue = await this.viewParValueForNftReturns(nftMint, collection);
          } catch (e) {
            simulatedPriceError = true;
          }
          
          let bondNft: BondToken = {
            mint: nftMint,
            collectionMint: collection.mint,
            isNft: true,
            description: collection.description,
            interestRate: new Decimal(collection.interestRate),
            supply: balance,
            coupon,
            parValue,
            uri: collection.nftUri,
            imageUrl,
            simulatedPriceError,
          };
          bondTokenModels.push(bondNft);
        }
      })
    );

    await Promise.all(
      collections.map(async (c) => {
        let balance = (await balanceMap).get(c.mint.toBase58()) || new Decimal(0);
        if (balance.greaterThan(0)) {
          let simulatedPriceError = false;
          let coupon = new Decimal(0);
          let parValue = new Decimal(0);
          let imageUrl = '';
          try {
            imageUrl = await this.fetchImageFromURI(c.tokenUri);
            coupon = await this.viewCouponReturns(balance, c);
            parValue = await this.viewParValueReturns(balance, c);
          } catch (e) {
            simulatedPriceError = true;
          }
          let bondToken: BondToken = {
            mint: c.mint,
            collectionMint: c.mint,
            isNft: false,
            description: c.description,
            interestRate: new Decimal(c.interestRate),
            supply: new Decimal(balance),
            coupon,
            parValue,
            uri: c.tokenUri,
            imageUrl,
            simulatedPriceError,
          };
          bondTokenModels.push(bondToken);
        }
      })
    );

    return bondTokenModels;
  }

  /**
   * Check if an kyc account exists on chain for the wallet
   * @returns A promise resolved with a boolean
   */
  async kycIsDone(): Promise<boolean> {
    let wallet = this._provider.publicKey!;
    let kycAddress = this.getKycAddress(wallet);
    return await this.checkIfAccountExists(kycAddress);
  }

  /**
   * Check if an access pass account exists on chain for the wallet
   * @returns A promise resolved with a boolean
   */
  async accessPassIsDone(): Promise<boolean> {
    let wallet = this._provider.publicKey!;
    let accessPassAddress = this.getAccessPassAddress(wallet);
    return await this.checkIfAccountExists(accessPassAddress);
  }

  /**
   * Check if an access pass is in the wallet
   * @returns A promise resolved with a boolean
   */
  async accessPassIsInWallet(): Promise<boolean> {
    let wallet = this._provider.publicKey!;
    let assetInfo = await this.getCompressedAssetInfo(wallet);
    if (!assetInfo) {
      return false;
    }
    let assetProof = await this.getCompressedAssetProof(assetInfo.id);
    if (!assetProof) {
      return false;
    }
    return true;
  }

  private async getUserBondBalances(): Promise<Map<string, Decimal>> {
    return this._connection.getParsedTokenAccountsByOwner(this._provider.publicKey!, {
      programId: TOKEN_PROGRAM_ID,  
    }).then(accounts => new Map(accounts.value.map((element) => {
        const mint: string = element.account.data.parsed.info.mint;
        const amount: {uiAmount: number, decimals: number} = element.account.data.parsed.info.tokenAmount;
        return [mint, new Decimal(amount.uiAmount)] as const;
      }
      ))
    )
  }

  private async viewParValueReturns(amount: Decimal, collection: Collection): Promise<Decimal> {
    let tokenAmount = this.UiToTokenAmount(amount, BOND_DECIMALS_UI);
    const methodBuilder = this._bondProgram.methods.viewParValueReturns({ amount: tokenAmount }).accounts({
      collection: this.getCollectionAddress(collection.mint),
      parValue: this.getParValueAccountAddress(collection.mint),
      parValueTokenAccount: this.getParValueAccountTokenAccountAddress(collection.mint, collection.paymentMint),
      bondMint: collection.mint,
      paymentMint: collection.paymentMint,
    });
    const transaction = await methodBuilder.transaction();
    const result = await this.simulateTransaction(transaction);
    const index = BOND_IDL.instructions.findIndex((f) => f.name === 'viewParValueReturns');
    let value: ViewReturnsOutput = await this.decodeLogs(result, index);
    return this.decimalToUiAmount(value.amount.toNumber(), collection.paymentDecimals);
  }

  private async viewParValueForNftReturns(nftMint: PublicKey, collection: Collection): Promise<Decimal> {
    let nftAddress = this.getNftAddress(nftMint);
    let nftPdaBondTokenAccount = getAssociatedTokenAddressSync(collection.mint, nftAddress, true);
    const methodBuilder = this._bondProgram.methods.viewParValueForNftReturns({}).accounts({
      collection: collection.mint,
      pdaBondTokenAccount: nftPdaBondTokenAccount,
      nft: nftAddress,
      parValue: this.getParValueAccountAddress(collection.mint),
      parValueTokenAccount: this.getParValueAccountTokenAccountAddress(collection.mint, collection.paymentMint),
      bondMint: collection.mint,
      paymentMint: collection.paymentMint,
      nftMint: nftMint,
    });
    const transaction = await methodBuilder.transaction();
    const result = await this.simulateTransaction(transaction);
    const index = BOND_IDL.instructions.findIndex((f) => f.name === 'viewParValueForNftReturns');
    let value: ViewReturnsOutput = await this.decodeLogs(result, index);
    return this.decimalToUiAmount(value.amount.toNumber(), collection.paymentDecimals);
  }

  private async viewCouponReturns(amount: Decimal, collection: Collection): Promise<Decimal> {
    let tokenAmount = this.UiToTokenAmount(amount, BOND_DECIMALS_UI);
    const methodBuilder = this._bondProgram.methods.viewCouponReturns({ amount: tokenAmount }).accounts({
      collection: this.getCollectionAddress(collection.mint),
      interest: this.getInterestAccountAddress(collection.mint),
      interestPaymentTokenAccount: this.getInterestAccountTokenAccountAddress(collection.mint, collection.paymentMint),
      bondMint: collection.mint,
      paymentMint: collection.paymentMint,
    });
    const transaction = await methodBuilder.transaction();
    const result = await this.simulateTransaction(transaction);
    const index = BOND_IDL.instructions.findIndex((f) => f.name === 'viewCouponReturns');
    let value: ViewReturnsOutput = await this.decodeLogs(result, index);
    return this.decimalToUiAmount(value.amount.toNumber(), collection.paymentDecimals);
  }

  private async viewCouponForNftReturns(nftMint: PublicKey, collection: Collection): Promise<Decimal> {
    let nftAddress = this.getNftAddress(nftMint);
    let nftPdaBondTokenAccount = getAssociatedTokenAddressSync(collection.mint, nftAddress, true);
    const methodBuilder = this._bondProgram.methods.viewCouponReturnsForNft({}).accounts({
      collection: collection.mint,
      pdaBondTokenAccount: nftPdaBondTokenAccount,
      nft: nftAddress,
      interest: this.getInterestAccountAddress(collection.mint),
      interestPaymentTokenAccount: this.getInterestAccountTokenAccountAddress(collection.mint, collection.paymentMint),
      bondMint: collection.mint,
      paymentMint: collection.paymentMint,
      nftMint: nftMint,
    });
    const transaction = await methodBuilder.transaction();
    const result = await this.simulateTransaction(transaction);
    const index = BOND_IDL.instructions.findIndex((f) => f.name === 'viewCouponReturns');
    let value: ViewReturnsOutput = await this.decodeLogs(result, index);
    return this.decimalToUiAmount(value.amount.toNumber(), collection.paymentDecimals);
  }

  private async getCompressedAssetInfo(wallet: PublicKey): Promise<AssetInfo | null> {
    return await this.searchAssets(wallet, this._accessPassCollection);
  }

  private async getCompressedAssetProof(assetInfoId: string): Promise<AssetProof | null> {
    return await this.getAssetProof(assetInfoId);
  }

  private UiToTokenAmount(amount: Decimal, decimals: number): BN {
    return new BN(amount.mul(10 ** decimals).toNumber());
  }

  private decimalToUiAmount(token_amount: Decimal, decimals: number): Decimal {
    return new Decimal(token_amount).div(10 ** decimals);
  }

  private getKycAddress(wallet: PublicKey): PublicKey {
    return PublicKey.findProgramAddressSync([Buffer.from('kyc'), wallet.toBuffer()], this._bondProgramId)[0];
  }

  private getAccessPassAddress(wallet: PublicKey): PublicKey {
    return PublicKey.findProgramAddressSync([Buffer.from('pass'), wallet.toBuffer()], this._bondProgramId)[0];
  }

  private getCollectionAddress(mint: PublicKey): PublicKey {
    return PublicKey.findProgramAddressSync([Buffer.from('collection'), mint.toBuffer()], this._bondProgramId)[0];
  }

  private getGlobalPassConfigAddress(): PublicKey {
    return PublicKey.findProgramAddressSync([Buffer.from('global_pass_config')], this._bondProgramId)[0];
  }

  private getNftAddress(mint: PublicKey): PublicKey {
    return PublicKey.findProgramAddressSync([Buffer.from('nft'), mint.toBuffer()], this._bondProgramId)[0];
  }

  private getPaymentAccountAddress(mint: PublicKey): PublicKey {
    return PublicKey.findProgramAddressSync([Buffer.from('payment'), mint.toBuffer()], this._bondProgramId)[0];
  }

  private getPaymentAccountTokenAccountAddress(mint: PublicKey, paymentMint: PublicKey): PublicKey {
    return getAssociatedTokenAddressSync(paymentMint, this.getPaymentAccountAddress(mint), true);
  }

  private getInterestAccountAddress(mint: PublicKey): PublicKey {
    return PublicKey.findProgramAddressSync([Buffer.from('interest'), mint.toBuffer()], this._bondProgramId)[0];
  }

  private getInterestAccountTokenAccountAddress(mint: PublicKey, paymentMint: PublicKey): PublicKey {
    return getAssociatedTokenAddressSync(paymentMint, this.getInterestAccountAddress(mint), true);
  }

  private getParValueAccountAddress(mint: PublicKey): PublicKey {
    return PublicKey.findProgramAddressSync([Buffer.from('par_value'), mint.toBuffer()], this._bondProgramId)[0];
  }

  private getParValueAccountTokenAccountAddress(mint: PublicKey, paymentMint: PublicKey): PublicKey {
    return getAssociatedTokenAddressSync(paymentMint, this.getParValueAccountAddress(mint), true);
  }

  private async fetchPdaTokenAccountBalance(pdaAddress: PublicKey, mint: PublicKey): Promise<Decimal> {
    let tokenATA = getAssociatedTokenAddressSync(mint, pdaAddress, true);
    let balance = 0;

    if (await this.checkIfAccountExists(tokenATA)) {
      balance = (await this._connection.getTokenAccountBalance(tokenATA)).value.uiAmount!;
    }

    return new Decimal(balance);
  }

  private async fetchTokenBalance(owner: PublicKey, mint: PublicKey): Promise<Decimal> {
    let tokenATA = getAssociatedTokenAddressSync(mint, owner);
    let balance = 0;

    if (await this.checkIfAccountExists(tokenATA)) {
      balance = (await this._connection.getTokenAccountBalance(tokenATA)).value.uiAmount!;
    }
    return new Decimal(balance);
  }

  private getMetadataAddress(mint: PublicKey): PublicKey {
    return PublicKey.findProgramAddressSync(
      [Buffer.from('metadata'), TOKEN_METADATA_PROGRAM_ID.toBuffer(), mint.toBuffer()],
      TOKEN_METADATA_PROGRAM_ID
    )[0];
  }

  private getMasterEditionAddress(mint: PublicKey): PublicKey {
    return PublicKey.findProgramAddressSync(
      [Buffer.from('metadata'), TOKEN_METADATA_PROGRAM_ID.toBuffer(), mint.toBuffer(), Buffer.from('edition')],
      TOKEN_METADATA_PROGRAM_ID
    )[0];
  }

  private async getAssetProof(assetId: string): Promise<AssetProof | null> {
    const response = await fetch(this._connection.rpcEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: this.generateId(),
        method: 'getAssetProof',
        params: {
          id: assetId,
        },
      }),
    });

    const { result } = await response.json();
    return result;
  }

  private async searchAssets(wallet: PublicKey, mint: PublicKey): Promise<AssetInfo | null> {
    const response = await fetch(this._connection.rpcEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: this.generateId(),
        method: 'searchAssets',
        params: {
          ownerAddress: wallet.toBase58(),
          compressed: true,
          grouping: ['collection', this.getCollectionAddress(mint).toBase58()],
          page: 1,
          limit: 1000,
        },
      }),
    });
    const { result } = await response.json();
    if (result.items && result.items.length > 0) {
      const accessPass = result.items[0];
      if (accessPass.id) {
        return accessPass;
      }
    }
    return null;
  }

  private async fetchImageFromURI(uri: string): Promise<string> {
    const imageResponse = await fetch(uri);
    const metadata: TokenMetadata = await imageResponse.json();
    if (!metadata.image) {
      throw new Error('No image found in token metadata');
    }
    return metadata.image;
  }

  private async checkIfAccountExists(account: PublicKey): Promise<boolean> {
    let bal = await this._connection.getBalance(account);
    if (bal > 0) {
      return true;
    } else {
      return false;
    }
  }

  private generateId() {
    return Math.floor(Math.random() * 1000000000).toString();
  }

  private async simulateTransaction(
    transaction: Transaction
  ): Promise<RpcResponseAndContext<SimulatedTransactionResponse>> {
    transaction.feePayer = this._provider.publicKey;
    return this._connection.simulateTransaction(transaction);
  }

  private decodeLogs<T>(data: RpcResponseAndContext<SimulatedTransactionResponse>, instructionNumber: number): T {
    const returnPrefix = `Program return: ${this._bondProgramId} `;
    // console.log("Data:", data);
    if (data.value.logs && data.value.err === null) {
      let returnLog = data.value.logs.find((l: any) => l.startsWith(returnPrefix));
      if (!returnLog) {
        throw new Error('View expected return log');
      }
      let returnData = decode(returnLog.slice(returnPrefix.length));
      let returnType = BOND_IDL.instructions[instructionNumber].returns;

      if (!returnType) {
        throw new Error('View expected return type');
      }
      const coder = IdlCoder.fieldLayout(
        { type: returnType },
        Array.from([...(IDL.accounts ?? []), ...(IDL.types ?? [])])
      );
      return coder.decode(returnData);
    } else {
      throw new Error(`No Logs Found `);
    }
  }

  private mapToCollection(pre: CollectionIndividual): Collection {
    const collection = {
      ...pre,
      paymentUsdCost: new Decimal(pre.paymentUsdCost.toString()),
      interestRate: new Decimal(pre.interestRate.toString()),
      startDate: toDate(pre.startDate),
      maturityDate: toDate(pre.maturityDate),
      fundingDate: toDate(pre.fundingDate),
      supply: pre.supply.toNumber(),
      totalBondsMinted: pre.totalBondsMinted.toNumber() / 10 ** BOND_DECIMALS_UI,
    };
    return collection;
  }
}

function toDate(date: BN) {
  return new Date(date.toNumber() * 1000);
}

type CollectionIndividual = IdlAccounts<BondType>['collection'];
interface ViewReturnsOutput {
  amount: BN;
}

export default Bond;
