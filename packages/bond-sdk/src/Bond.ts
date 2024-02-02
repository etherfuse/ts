import { AnchorProvider, Program, Provider, Wallet, Idl, BN } from '@coral-xyz/anchor';
import { decode } from '@coral-xyz/anchor/dist/cjs/utils/bytes/base64';
import {
  Connection,
  PublicKey,
  AccountMeta,
  Transaction,
  SystemProgram,
  Keypair,
  TransactionInstruction,
  ComputeBudgetProgram,
  RpcResponseAndContext,
  SimulatedTransactionResponse,
} from '@solana/web3.js';
import { BOND_IDL, IDL } from '@etherfuse/bond-idl';
import { IdlCoder } from './utils/idlCoder';
import { Collection, AssetInfo, AssetProof, TokenMetadata, BondNft, BondToken } from './models';
import { getReadOnlyWallet } from './utils';
import {
  SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
  SPL_NOOP_PROGRAM_ID,
  ConcurrentMerkleTreeAccount,
} from '@solana/spl-account-compression';
import { ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { PROGRAM_ID as BUBBLEGUM_PROGRAM_ID } from '@metaplex-foundation/mpl-bubblegum';
import Decimal from 'decimal.js';
import { PROGRAM_ID as TOKEN_METADATA_PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata';
import { Nft, Metaplex, walletAdapterIdentity } from '@metaplex-foundation/js';

export class Bond {
  private readonly _connection: Connection;
  private readonly _bondProgramId: PublicKey;
  private readonly _accessPassCollection: PublicKey;
  private readonly _priorityFeeIx?: TransactionInstruction;
  private _provider: Provider;
  private _bondProgram: Program;
  private _metaplex: Metaplex;

  constructor(
    connection: Connection,
    wallet?: Wallet,
    priorityFee?: number,
    bondProgramId?: PublicKey,
    accessPassCollection?: PublicKey
  ) {
    this._connection = connection;
    if (!wallet) {
      wallet = getReadOnlyWallet();
    }
    this._provider = new AnchorProvider(connection, wallet, {
      commitment: connection.commitment,
    });
    this._bondProgramId = bondProgramId || new PublicKey('EfuseVF62VgpYmXroXkNww8qKCQudeHAEzczSAC7Xsir');
    this._accessPassCollection = accessPassCollection || new PublicKey('FYCPa15hAFeDJ4CUNoMjGyQAkKPmzQ93uUaTyqae8tMN');
    if (priorityFee) {
      this._priorityFeeIx = ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: priorityFee,
      });
    }
    this._metaplex = new Metaplex(this._connection).use(walletAdapterIdentity(wallet));
    this._bondProgram = new Program(BOND_IDL as Idl, this._bondProgramId, this._provider);
  }

  async setWallet(wallet: Wallet) {
    this._provider = new AnchorProvider(this._connection, wallet, {
      commitment: this._connection.commitment,
    });
    this._metaplex = new Metaplex(this._connection).use(walletAdapterIdentity(wallet));
    this._bondProgram = new Program(BOND_IDL as Idl, this._bondProgramId, this._provider);
  }

  async getCollections(): Promise<Collection[]> {
    const collections = (await this._bondProgram.account.collection.all()).map(
      (collection) => collection.account
    ) as Collection[];
    return collections;
  }

  async getCollection(mint: PublicKey): Promise<Collection> {
    let address = this.getCollectionAddress(mint);
    const collection = (await this._bondProgram.account.collection.fetch(address)).account as Collection;
    return collection;
  }

  async getReturnsOnCollection(amount: Decimal, collection: Collection): Promise<Decimal> {
    let couponAPY = amount.mul(collection.interestRate);
    let daysToMaturity = Math.ceil((collection.maturityDate - collection.startDate) / (1000 * 60 * 60 * 24));
    let couponReturns = couponAPY.div(365.25).mul(daysToMaturity);
    return amount.add(couponReturns);
  }

  async mintBond(amount: Decimal, wallet: PublicKey, collection: Collection): Promise<Transaction> {
    let userPaymentTokenAccount = await getAssociatedTokenAddress(collection.paymentMint, wallet);
    let userBondTokenAccount = await getAssociatedTokenAddress(collection.mint, wallet);
    let tokenAmount = this.UiToTokenAmount(amount, collection.paymentDecimals);
    let methodBuilder = this._bondProgram.methods.mintBond(tokenAmount).accounts({
      owner: wallet,
      collection: this.getCollectionAddress(collection.mint),
      mint: collection.mint,
      bondTokenAccount: userBondTokenAccount,
      paymentAccount: this.getPaymentAccountAddress(collection.paymentMint),
      paymentTokenAccount: await this.getPaymentAccountTokenAccountAddress(collection.mint, collection.paymentMint),
      paymentPriceFeed: collection.oracleParams.oracleAccount,
      ownerTokenAccount: userPaymentTokenAccount,
      paymentMint: collection.paymentMint,
      kyc: this.getKycAddress(wallet),
      pass: this.getAccessPassAddress(wallet),
      tokenProgram: TOKEN_PROGRAM_ID,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    });
    if (this._priorityFeeIx) {
      methodBuilder = methodBuilder.preInstructions([this._priorityFeeIx]);
    }
    return await methodBuilder.transaction();
  }

  async exchangeTokensForNFT(amount: Decimal, wallet: PublicKey, collection: Collection): Promise<Transaction> {
    let userBondTokenAccount = await getAssociatedTokenAddress(collection.mint, wallet);
    let nftMint = Keypair.generate();
    let nftAddress = this.getNftAddress(nftMint.publicKey);
    let nftBondTokenAccount = await getAssociatedTokenAddress(collection.mint, nftAddress, true);
    let ownerNftTokenAccount = await getAssociatedTokenAddress(nftMint.publicKey, wallet);
    let setNftInstruction = await this._bondProgram.methods
      .exchangeTokensForNFT()
      .accounts({
        owner: wallet,
        collection: this.getCollectionAddress(collection.mint),
        nft: nftAddress,
        ownerNftTokenAccount: ownerNftTokenAccount,
        nftMint: nftMint.publicKey,
        collectionNftMint: collection.nftMint,
        kyc: this.getKycAddress(wallet),
        metadata: this.getMetadataAddress(nftMint.publicKey),
        masterEdition: this.getMasterEditionAddress(nftMint.publicKey),
        collectionMetadata: this.getMetadataAddress(collection.nftMint),
        collectionMasterEdition: this.getMasterEditionAddress(collection.nftMint),
        tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
        tokenProgram: TOKEN_PROGRAM_ID,
        SystemProgram: SystemProgram.programId,
      })
      .instruction();
    let postInstructions: TransactionInstruction[] = [];
    postInstructions.push(setNftInstruction);
    let tokenAmount = this.UiToTokenAmount(amount, collection.paymentDecimals);
    let methodBuilder = this._bondProgram.methods
      .exchangeTokensForNFT(tokenAmount)
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
    if (this._priorityFeeIx) {
      methodBuilder = methodBuilder.preInstructions([this._priorityFeeIx]);
    }
    return await methodBuilder.transaction();
  }

  async collectInterest(wallet: PublicKey, collection: Collection): Promise<Transaction> {
    let userNftTokenAccount = await getAssociatedTokenAddress(collection.nftMint, wallet);
    let userPaymentTokenAccount = await getAssociatedTokenAddress(collection.paymentMint, wallet);
    let nftAddress = this.getNftAddress(collection.nftMint);
    let nftBondTokenAccount = await getAssociatedTokenAddress(collection.mint, nftAddress, true);
    let methodBuilder = this._bondProgram.methods.collectInterest().accounts({
      owner: wallet,
      collection: this.getCollectionAddress(collection.mint),
      ownerNftTokenAccount: userNftTokenAccount,
      ownerPaymentTokenAccount: userPaymentTokenAccount,
      pdaBondTokenAccount: nftBondTokenAccount,
      nft: nftAddress,
      nftMint: collection.nftMint,
      interest: this.getInterestAccountAddress(collection.mint),
      interestPaymentTokenAccount: await this.getInterestAccountTokenAccountAddress(
        collection.mint,
        collection.paymentMint
      ),
      bondMint: collection.mint,
      paymentMint: collection.paymentMint,
      kyc: this.getKycAddress(wallet),
      pass: this.getAccessPassAddress(wallet),
      tokenProgram: TOKEN_PROGRAM_ID,
    });
    if (this._priorityFeeIx) {
      methodBuilder = methodBuilder.preInstructions([this._priorityFeeIx]);
    }
    return await methodBuilder.transaction();
  }

  async collectParValue(amount: Decimal, wallet: PublicKey, collection: Collection): Promise<Transaction> {
    let userPaymentTokenAccount = await getAssociatedTokenAddress(collection.paymentMint, wallet);
    let userBondtokenAccount = await getAssociatedTokenAddress(collection.mint, wallet);
    let tokenAmount = this.UiToTokenAmount(amount, collection.paymentDecimals);
    let methodBuilder = this._bondProgram.methods
      .collectParValue(tokenAmount)
      .accounts({})
      .accounts({
        owner: wallet,
        ownerPaymentTokenAccount: userPaymentTokenAccount,
        collection: this.getCollectionAddress(collection.mint),
        bondMint: collection.mint,
        ownerBondTokenAccount: userBondtokenAccount,
        parValue: this.getParValueAccountAddress(collection.mint),
        parValueTokenAccount: await this.getParValueAccountTokenAccountAddress(collection.mint, collection.paymentMint),
        interest: this.getInterestAccountAddress(collection.mint),
        interestPaymentTokenAccount: await this.getInterestAccountTokenAccountAddress(
          collection.mint,
          collection.paymentMint
        ),
        paymentMint: collection.paymentMint,
        kyc: this.getKycAddress(wallet),
        pass: this.getAccessPassAddress(wallet),
        tokenProgram: TOKEN_PROGRAM_ID,
      });
    if (this._priorityFeeIx) {
      methodBuilder = methodBuilder.preInstructions([this._priorityFeeIx]);
    }
    return await methodBuilder.transaction();
  }

  async collectParValueForNft(wallet: PublicKey, collection: Collection): Promise<Transaction> {
    let userNftTokenAccount = await getAssociatedTokenAddress(collection.nftMint, wallet);
    let nftAddress = this.getNftAddress(collection.nftMint);
    let nftPdaBondTokenAccount = await getAssociatedTokenAddress(collection.mint, nftAddress, true);
    let userPaymentTokenAccount = await getAssociatedTokenAddress(collection.paymentMint, wallet);
    let methodBuilder = this._bondProgram.methods.collectParValueForNft().accounts({
      owner: wallet,
      collection: this.getCollectionAddress(collection.mint),
      ownerNftTokenAccount: userNftTokenAccount,
      ownerPaymentTokenAccount: userPaymentTokenAccount,
      pdaBondTokenAccount: nftPdaBondTokenAccount,
      nft: nftAddress,
      nftMint: collection.nftMint,
      parValue: this.getParValueAccountAddress(collection.mint),
      parValueTokenAccount: await this.getParValueAccountTokenAccountAddress(collection.mint, collection.paymentMint),
      interest: this.getInterestAccountAddress(collection.mint),
      interestPaymentTokenAccount: await this.getInterestAccountTokenAccountAddress(
        collection.mint,
        collection.paymentMint
      ),
      bondMint: collection.mint,
      paymentMint: collection.paymentMint,
      kyc: this.getKycAddress(wallet),
      pass: this.getAccessPassAddress(wallet),
      tokenProgram: TOKEN_PROGRAM_ID,
    });
    if (this._priorityFeeIx) {
      methodBuilder = methodBuilder.preInstructions([this._priorityFeeIx]);
    }
    return await methodBuilder.transaction();
  }

  async burnAccessPass(wallet: PublicKey): Promise<Transaction> {
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
    if (this._priorityFeeIx) {
      methodBuilder = methodBuilder.preInstructions([this._priorityFeeIx]);
    }
    return await methodBuilder.transaction();
  }

  async getUserBondNfts(wallet: PublicKey, collection: Collection[]): Promise<BondNft[]> {
    let nftCollections = new Set(collection.map((c) => c.nftMint.toBase58()));
    let collectionsMap = new Map(collection.map((c) => [c.nftMint.toBase58(), c]));
    let nftsInWallet = (await this._metaplex.nfts().findAllByOwner({ owner: wallet })) as Nft[];
    let bondNfts = nftsInWallet.filter((nft) => nftCollections.has(nft.collection!.address.toBase58()));
    let bondNftModels: BondNft[] = [];
    for (let nft of bondNfts) {
      let collection = collectionsMap.get(nft.collection!.address.toBase58());
      if (collection) {
        let nftMint = new PublicKey(nft.mint);
        let nftAddress = this.getNftAddress(nftMint);
        let balance = await this.fetchPdaTokenAccountBalance(nftAddress, collection.mint);
        let couponReturns = await this.viewCouponForNftReturns(nftMint, collection);
        let parValueReturns = await this.viewParValueForNftReturns(nftMint, collection);
        let imageUrl = await this.fetchImageFromURI(collection.nftUri);
        let bondNft: BondNft = {
          mint: nftMint,
          description: collection.description,
          interestRate: new Decimal(collection.interestRate),
          supply: balance,
          coupon: couponReturns,
          parValue: parValueReturns,
          uri: collection.nftUri,
          imageUrl: imageUrl,
          simulatedPriceError: false,
        };
        bondNftModels.push(bondNft);
      }
    }

    return bondNftModels;
  }

  async getUserBondTokens(wallet: PublicKey, collection: Collection[]): Promise<BondToken[]> {
    let bondTokenModels: BondToken[] = [];
    await Promise.all(
      collection.map(async (c) => {
        let balance = await this.fetchTokenBalance(wallet, c.mint);
        if (balance.greaterThan(0)) {
          let couponReturns = await this.viewCouponReturns(balance, c);
          let parValueReturns = await this.viewParValueReturns(balance, c);
          let imageUrl = await this.fetchImageFromURI(c.tokenUri);
          let bondToken: BondToken = {
            mint: c.mint,
            description: c.description,
            interestRate: new Decimal(c.interestRate),
            supply: new Decimal(balance),
            coupon: couponReturns,
            parValue: parValueReturns,
            uri: c.tokenUri,
            imageUrl: imageUrl,
            simulatedPriceError: false,
          };
          bondTokenModels.push(bondToken);
        }
      })
    );
    return bondTokenModels;
  }

  async kycIsDone(wallet: PublicKey): Promise<boolean> {
    let kycAddress = this.getKycAddress(wallet);
    return await this.checkIfAccountExists(kycAddress);
  }

  async accessPassIsDone(wallet: PublicKey): Promise<boolean> {
    let accessPassAddress = this.getAccessPassAddress(wallet);
    return await this.checkIfAccountExists(accessPassAddress);
  }

  private async viewParValueReturns(amount: Decimal, collection: Collection): Promise<Decimal> {
    let tokenAmount = this.UiToTokenAmount(amount, collection.paymentDecimals);
    const methodBuilder = this._bondProgram.methods.viewParValueReturns({ amount: tokenAmount }).accounts({
      collection: this.getCollectionAddress(collection.mint),
      parValue: this.getParValueAccountAddress(collection.mint),
      parValueTokenAccount: await this.getParValueAccountTokenAccountAddress(collection.mint, collection.paymentMint),
      bondMint: collection.mint,
      paymentMint: collection.paymentMint,
    });
    const transaction = await methodBuilder.transaction();
    const result = await this.simulateTransaction(transaction);
    const index = BOND_IDL.instructions.findIndex((f) => f.name === 'viewParValueReturns');
    let value: ViewParValueReturnsOutput = await this.decodeLogs(result, index);
    return this.decimalToUiAmount(value.amount.toNumber(), collection.paymentDecimals);
  }

  private async viewParValueForNftReturns(nftMint: PublicKey, collection: Collection): Promise<Decimal> {
    let nftAddress = this.getNftAddress(nftMint);
    let nftPdaBondTokenAccount = await getAssociatedTokenAddress(collection.mint, nftAddress, true);
    const methodBuilder = this._bondProgram.methods.viewParValueReturnsForNft().accounts({
      collection: collection.mint,
      pdaBondTokenAccount: nftPdaBondTokenAccount,
      nft: nftAddress,
      parValue: this.getParValueAccountAddress(collection.mint),
      parValueTokenAccount: await this.getParValueAccountTokenAccountAddress(collection.mint, collection.paymentMint),
      bondMint: collection.mint,
      paymentMint: collection.paymentMint,
      nftMint: nftMint,
    });
    const transaction = await methodBuilder.transaction();
    const result = await this.simulateTransaction(transaction);
    const index = BOND_IDL.instructions.findIndex((f) => f.name === 'viewParValueForNftReturns');
    let value: ViewParValueReturnsOutput = await this.decodeLogs(result, index);
    return this.decimalToUiAmount(value.amount.toNumber(), collection.paymentDecimals);
  }

  private async viewCouponReturns(amount: Decimal, collection: Collection): Promise<Decimal> {
    let tokenAmount = this.UiToTokenAmount(amount, collection.paymentDecimals);
    const methodBuilder = this._bondProgram.methods.viewCouponReturns({ amount: tokenAmount }).accounts({
      collection: this.getCollectionAddress(collection.mint),
      interest: this.getInterestAccountAddress(collection.mint),
      interestPaymentTokenAccount: await this.getInterestAccountTokenAccountAddress(
        collection.mint,
        collection.paymentMint
      ),
      bondMint: collection.mint,
      paymentMint: collection.paymentMint,
    });
    const transaction = await methodBuilder.transaction();
    const result = await this.simulateTransaction(transaction);
    const index = BOND_IDL.instructions.findIndex((f) => f.name === 'viewCouponReturns');
    let value: ViewCouponReturnsOutput = await this.decodeLogs(result, index);
    return this.decimalToUiAmount(value.amount.toNumber(), collection.paymentDecimals);
  }

  private async viewCouponForNftReturns(nftMint: PublicKey, collection: Collection): Promise<Decimal> {
    let nftAddress = this.getNftAddress(nftMint);
    let nftPdaBondTokenAccount = await getAssociatedTokenAddress(collection.mint, nftAddress, true);
    const methodBuilder = this._bondProgram.methods.viewCouponReturnsForNft().accounts({
      collection: collection.mint,
      pdaBondTokenAccount: nftPdaBondTokenAccount,
      nft: nftAddress,
      interest: this.getInterestAccountAddress(collection.mint),
      interestPaymentTokenAccount: await this.getInterestAccountTokenAccountAddress(
        collection.mint,
        collection.paymentMint
      ),
      bondMint: collection.mint,
      paymentMint: collection.paymentMint,
      nftMint: nftMint,
    });
    const transaction = await methodBuilder.transaction();
    const result = await this.simulateTransaction(transaction);
    const index = BOND_IDL.instructions.findIndex((f) => f.name === 'viewCouponReturns');
    let value: ViewCouponReturnsOutput = await this.decodeLogs(result, index);
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

  private async getPaymentAccountTokenAccountAddress(mint: PublicKey, paymentMint: PublicKey): Promise<PublicKey> {
    return await getAssociatedTokenAddress(paymentMint, this.getPaymentAccountAddress(mint), true);
  }

  private getInterestAccountAddress(mint: PublicKey): PublicKey {
    return PublicKey.findProgramAddressSync([Buffer.from('interest'), mint.toBuffer()], this._bondProgramId)[0];
  }

  private async getInterestAccountTokenAccountAddress(mint: PublicKey, paymentMint: PublicKey): Promise<PublicKey> {
    return await getAssociatedTokenAddress(paymentMint, this.getInterestAccountAddress(mint), true);
  }

  private getParValueAccountAddress(mint: PublicKey): PublicKey {
    return PublicKey.findProgramAddressSync([Buffer.from('par_value'), mint.toBuffer()], this._bondProgramId)[0];
  }

  private async getParValueAccountTokenAccountAddress(mint: PublicKey, paymentMint: PublicKey): Promise<PublicKey> {
    return await getAssociatedTokenAddress(paymentMint, this.getParValueAccountAddress(mint), true);
  }

  private async fetchPdaTokenAccountBalance(pdaAddress: PublicKey, mint: PublicKey): Promise<Decimal> {
    let tokenATA = await getAssociatedTokenAddress(mint, pdaAddress, true);
    let balance = 0;

    if (await this.checkIfAccountExists(tokenATA)) {
      balance = (await this._connection.getTokenAccountBalance(tokenATA)).value.uiAmount!;
    }

    return new Decimal(balance);
  }

  private async fetchTokenBalance(owner: PublicKey, mint: PublicKey): Promise<Decimal> {
    let tokenATA = await getAssociatedTokenAddress(mint, owner);
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
      // @ts-ignore
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
}

export interface ViewCouponReturnsOutput {
  amount: BN;
}

export interface ViewParValueForNFTReturnsOutput {
  amount: BN;
}

export interface ViewParValueReturnsOutput {
  amount: BN;
}

export default Bond;
