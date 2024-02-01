import { AnchorProvider, Program, Provider, Wallet, Idl, BN } from '@coral-xyz/anchor';
import {
  Connection,
  PublicKey,
  AccountMeta,
  Transaction,
  SystemProgram,
  Keypair,
  TransactionInstruction,
} from '@solana/web3.js';
import { BOND_IDL } from '@etherfuse/bond-idl';
import { Collection, AssetInfo, AssetProof, TokenMetadata } from './models';
import {
  SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
  SPL_NOOP_PROGRAM_ID,
  ConcurrentMerkleTreeAccount,
} from '@solana/spl-account-compression';
import { ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { PROGRAM_ID as BUBBLEGUM_PROGRAM_ID } from '@metaplex-foundation/mpl-bubblegum';
import Decimal from 'decimal.js';
import { PROGRAM_ID as TOKEN_METADATA_PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata';

export class Bond {
  private readonly _connection: Connection;
  private readonly _provider: Provider;
  private readonly _bondProgramId: PublicKey;
  private _bondProgram: Program;
  private accessPassCollection: PublicKey;

  constructor(connection: Connection, wallet: Wallet, accessPassCollection: PublicKey) {
    this._connection = connection;
    this._provider = new AnchorProvider(connection, wallet, {
      commitment: connection.commitment,
    });
    this._bondProgramId = new PublicKey('EfuseVF62VgpYmXroXkNww8qKCQudeHAEzczSAC7Xsir');
    this._bondProgram = new Program(BOND_IDL as Idl, this._bondProgramId, this._provider);
    this.accessPassCollection = accessPassCollection;
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

  async mintBond(
    amount: Decimal,
    wallet: PublicKey,
    mint: PublicKey,
    paymentMint: PublicKey,
    paymentPriceFeed: PublicKey,
    paymentDecimals: number
  ): Promise<Transaction> {
    let userPaymentTokenAccount = await getAssociatedTokenAddress(paymentMint, wallet);
    let userBondTokenAccount = await getAssociatedTokenAddress(mint, wallet);
    let tokenAmount = this.UiToTokenAmount(amount, paymentDecimals);
    let methodBuilder = this._bondProgram.methods.mintBond(tokenAmount).accounts({
      owner: wallet,
      collection: this.getCollectionAddress(mint),
      mint: mint,
      bondTokenAccount: userBondTokenAccount,
      paymentAccount: this.getPaymentAccountAddress(paymentMint),
      paymentTokenAccount: await this.getPaymentAccountTokenAccountAddress(mint, paymentMint),
      paymentPriceFeed: paymentPriceFeed,
      ownerTokenAccount: userPaymentTokenAccount,
      paymentMint: paymentMint,
      kyc: this.getKycAddress(wallet),
      pass: this.getAccessPassAddress(wallet),
      tokenProgram: TOKEN_PROGRAM_ID,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    });
    return await methodBuilder.transaction();
  }

  async exchangeTokensForNFT(
    amount: Decimal,
    wallet: PublicKey,
    mint: PublicKey,
    collectionNftMint: PublicKey,
    paymentDecimals: number
  ): Promise<Transaction> {
    let userBondTokenAccount = await getAssociatedTokenAddress(mint, wallet);
    let nftMint = Keypair.generate();
    let nftAddress = this.getNftAddress(nftMint.publicKey);
    let nftBondTokenAccount = await getAssociatedTokenAddress(mint, nftAddress, true);
    let ownerNftTokenAccount = await getAssociatedTokenAddress(nftMint.publicKey, wallet);
    let setNftInstruction = await this._bondProgram.methods
      .exchangeTokensForNFT()
      .accounts({
        owner: wallet,
        collection: this.getCollectionAddress(mint),
        nft: nftAddress,
        ownerNftTokenAccount: ownerNftTokenAccount,
        nftMint: nftMint.publicKey,
        collectionNftMint: collectionNftMint,
        kyc: this.getKycAddress(wallet),
        metadata: this.getMetadataAddress(nftMint.publicKey),
        masterEdition: this.getMasterEditionAddress(nftMint.publicKey),
        collectionMetadata: this.getMetadataAddress(collectionNftMint),
        collectionMasterEdition: this.getMasterEditionAddress(collectionNftMint),
        tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
        tokenProgram: TOKEN_PROGRAM_ID,
        SystemProgram: SystemProgram.programId,
      })
      .instruction();
    let postInstructions: TransactionInstruction[] = [];
    postInstructions.push(setNftInstruction);
    let tokenAmount = this.UiToTokenAmount(amount, paymentDecimals);
    let methodBuilder = this._bondProgram.methods
      .exchangeTokensForNFT(tokenAmount)
      .accounts({
        owner: wallet,
        collection: this.getCollectionAddress(mint),
        nft: nftAddress,
        bondMint: mint,
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

  async collectInterest(
    wallet: PublicKey,
    mint: PublicKey,
    nftMint: PublicKey,
    paymentMint: PublicKey
  ): Promise<Transaction> {
    let userNftTokenAccount = await getAssociatedTokenAddress(nftMint, wallet);
    let userPaymentTokenAccount = await getAssociatedTokenAddress(paymentMint, wallet);
    let nftAddress = this.getNftAddress(nftMint);
    let nftBondTokenAccount = await getAssociatedTokenAddress(mint, nftAddress, true);
    let methodBuilder = this._bondProgram.methods.collectInterest().accounts({
      owner: wallet,
      collection: this.getCollectionAddress(mint),
      ownerNftTokenAccount: userNftTokenAccount,
      ownerPaymentTokenAccount: userPaymentTokenAccount,
      pdaBondTokenAccount: nftBondTokenAccount,
      nft: nftAddress,
      nftMint: nftMint,
      interest: this.getInterestAccountAddress(mint),
      interestPaymentTokenAccount: await this.getInterestAccountTokenAccountAddress(mint, paymentMint),
      bondMint: mint,
      paymentMint: paymentMint,
      kyc: this.getKycAddress(wallet),
      pass: this.getAccessPassAddress(wallet),
      tokenProgram: TOKEN_PROGRAM_ID,
    });
    return await methodBuilder.transaction();
  }

  async collectParValue(
    amount: Decimal,
    wallet: PublicKey,
    mint: PublicKey,
    paymentMint: PublicKey,
    paymentDecimals: number
  ): Promise<Transaction> {
    let userPaymentTokenAccount = await getAssociatedTokenAddress(paymentMint, wallet);
    let userBondtokenAccount = await getAssociatedTokenAddress(mint, wallet);
    let tokenAmount = this.UiToTokenAmount(amount, paymentDecimals);
    let methodBuilder = this._bondProgram.methods
      .collectParValue(tokenAmount)
      .accounts({})
      .accounts({
        owner: wallet,
        ownerPaymentTokenAccount: userPaymentTokenAccount,
        collection: this.getCollectionAddress(mint),
        bondMint: mint,
        ownerBondTokenAccount: userBondtokenAccount,
        parValue: this.getParValueAccountAddress(mint),
        parValueTokenAccount: await this.getParValueAccountTokenAccountAddress(mint, paymentMint),
        interest: this.getInterestAccountAddress(mint),
        interestPaymentTokenAccount: await this.getInterestAccountTokenAccountAddress(mint, paymentMint),
        paymentMint: paymentMint,
        kyc: this.getKycAddress(wallet),
        pass: this.getAccessPassAddress(wallet),
        tokenProgram: TOKEN_PROGRAM_ID,
      });
    return await methodBuilder.transaction();
  }

  async collectParValueForNft(
    wallet: PublicKey,
    mint: PublicKey,
    nftMint: PublicKey,
    paymentMint: PublicKey
  ): Promise<Transaction> {
    let userNftTokenAccount = await getAssociatedTokenAddress(nftMint, wallet);
    let nftAddress = this.getNftAddress(nftMint);
    let nftPdaBondTokenAccount = await getAssociatedTokenAddress(mint, nftAddress, true);
    let userPaymentTokenAccount = await getAssociatedTokenAddress(paymentMint, wallet);
    let methodBuilder = this._bondProgram.methods.collectParValueForNft().accounts({
      owner: wallet,
      collection: this.getCollectionAddress(mint),
      ownerNftTokenAccount: userNftTokenAccount,
      ownerPaymentTokenAccount: userPaymentTokenAccount,
      pdaBondTokenAccount: nftPdaBondTokenAccount,
      nft: nftAddress,
      nftMint: nftMint,
      parValue: this.getParValueAccountAddress(mint),
      parValueTokenAccount: await this.getParValueAccountTokenAccountAddress(mint, paymentMint),
      interest: this.getInterestAccountAddress(mint),
      interestPaymentTokenAccount: await this.getInterestAccountTokenAccountAddress(mint, paymentMint),
      bondMint: mint,
      paymentMint: paymentMint,
      kyc: this.getKycAddress(wallet),
      pass: this.getAccessPassAddress(wallet),
      tokenProgram: TOKEN_PROGRAM_ID,
    });
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
    return await methodBuilder.transaction();
  }

  async getUserNftBonds(): Promise<void> {}

  async getUserTokenBonds(): Promise<void> {}

  async kycIsDone(wallet: PublicKey): Promise<boolean> {
    let kycAddress = this.getKycAddress(wallet);
    return await this.checkIfAccountExists(kycAddress);
  }

  async accessPassIsDone(wallet: PublicKey): Promise<boolean> {
    let accessPassAddress = this.getAccessPassAddress(wallet);
    return await this.checkIfAccountExists(accessPassAddress);
  }

  private async getCompressedAssetInfo(wallet: PublicKey): Promise<AssetInfo | null> {
    return await this.searchAssets(wallet, this.accessPassCollection);
  }

  private async getCompressedAssetProof(assetInfoId: string): Promise<AssetProof | null> {
    return await this.getAssetProof(assetInfoId);
  }

  private UiToTokenAmount(amount: Decimal, decimals: number): BN {
    return new BN(amount.mul(10 ** decimals).toNumber());
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

  private async fetchTokenMetadata(uri: string): Promise<TokenMetadata> {
    const response = await fetch(uri);
    const tokenMetadata: TokenMetadata = await response.json();
    return tokenMetadata;
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
}

export default Bond;
