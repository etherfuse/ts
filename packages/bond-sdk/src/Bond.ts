import { AnchorProvider, Program, Provider, Wallet, Idl } from '@coral-xyz/anchor';
import { Connection, PublicKey } from '@solana/web3.js';
import { isEven } from '@etherfuse/utils';
import { BOND_IDL } from '@etherfuse/bond-idl';

export class Bond {
  private readonly _connection: Connection;
  private readonly _provider: Provider;
  private _bondProgram: Program;

  constructor(connection: Connection, wallet: Wallet) {
    this._connection = connection;
    this._provider = new AnchorProvider(connection, wallet, {
      commitment: connection.commitment,
    });
    this._bondProgram = new Program(
      BOND_IDL as Idl,
      new PublicKey('EfuseVF62VgpYmXroXkNww8qKCQudeHAEzczSAC7Xsir'),
      this._provider
    );
  }
}

export default Bond;
