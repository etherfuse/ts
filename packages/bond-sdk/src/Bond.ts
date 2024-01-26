import { AnchorProvider, Program, Provider, Wallet, Idl } from '@coral-xyz/anchor';
import { Connection, PublicKey } from '@solana/web3.js';
import { BOND_IDL } from '@etherfuse/bond-idl';
import { Collection } from './models';

export class Bond {
  private readonly _connection: Connection;
  private readonly _provider: Provider;
  private readonly _bondProgramId: PublicKey;
  private readonly _dasAPI: string;
  private _bondProgram: Program;

  constructor(connection: Connection, wallet: Wallet, dasAPI: string) {
    this._connection = connection;
    this._provider = new AnchorProvider(connection, wallet, {
      commitment: connection.commitment,
    });
    this._bondProgramId = new PublicKey('EfuseVF62VgpYmXroXkNww8qKCQudeHAEzczSAC7Xsir');
    this._bondProgram = new Program(BOND_IDL as Idl, this._bondProgramId, this._provider);
    this._dasAPI = dasAPI;
  }

  async getCollections(): Promise<Collection[]> {
    const collections = (await this._bondProgram.account.collection.all()).map(
      (collection) => collection.account
    ) as Collection[];
    return collections;
  }

  async getUserNftBonds(): Promise<void> {}

  async getUserTokenBonds(): Promise<void> {}

  async getAccessPassInWallet(): Promise<void> {}

  async mintBond(): Promise<void> {}

  async exchangeTokensForNFT(): Promise<void> {}

  async collectInterest(): Promise<void> {}

  async collectParValue(): Promise<void> {}

  async collectParValueForNft(): Promise<void> {}

  async burnAccessPass(): Promise<void> {}

  async kycIsDone(wallet: PublicKey): Promise<boolean> {
    let kycAddress = this.getKycAddress(wallet);
    return await this.checkIfAccountExists(kycAddress);
  }

  async accessPassIsDone(wallet: PublicKey): Promise<boolean> {
    let accessPassAddress = this.getAccessPassAddress(wallet);
    return await this.checkIfAccountExists(accessPassAddress);
  }

  private async checkIfAccountExists(account: PublicKey): Promise<boolean> {
    let bal = await this._connection.getBalance(account);
    if (bal > 0) {
      return true;
    } else {
      return false;
    }
  }

  private getKycAddress(wallet: PublicKey): PublicKey {
    return PublicKey.findProgramAddressSync([Buffer.from('kyc'), wallet.toBuffer()], this._bondProgramId)[0];
  }

  private getAccessPassAddress(wallet: PublicKey): PublicKey {
    return PublicKey.findProgramAddressSync([Buffer.from('pass'), wallet.toBuffer()], this._bondProgramId)[0];
  }

  private async getAssetProof(): Promise<void> {}

  private async searchAssets(): Promise<void> {}

  private async fetchJsonMetadata(): Promise<void> {}

  private async fetchImageFromURI(): Promise<void> {}
}

export default Bond;
