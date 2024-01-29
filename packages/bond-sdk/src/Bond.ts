import { AnchorProvider, Program, Provider, Wallet, Idl, BN } from '@coral-xyz/anchor';
import { Connection, PublicKey, AccountMeta, Transaction } from '@solana/web3.js';
import { BOND_IDL } from '@etherfuse/bond-idl';
import { Collection, AssetInfo, AssetProof, TokenMetadata } from './models';
import {
  SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
  SPL_NOOP_PROGRAM_ID,
  ConcurrentMerkleTreeAccount,
} from '@solana/spl-account-compression';
import { PROGRAM_ID as BUBBLEGUM_PROGRAM_ID } from '@metaplex-foundation/mpl-bubblegum';

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

  async mintBond(): Promise<void> {}

  async exchangeTokensForNFT(): Promise<void> {}

  async collectInterest(): Promise<void> {}

  async collectParValue(): Promise<void> {}

  async collectParValueForNft(): Promise<void> {}

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
