import { AnchorProvider, Program, Provider, Wallet } from '@coral-xyz/anchor';
import { Connection } from '@solana/web3.js';
import { BOND_IDL } from '@bond-idl/bond';

export class Bond {
  private readonly _connection: Connection;
  private readonly _provider: Provider;
  private _bondProgram: Program;

  constructor(connection: Connection, wallet: Wallet) {
    this._connection = connection;
    this._provider = new AnchorProvider(connection, wallet, {
      commitment: connection.commitment,
    });
    this._bondProgram = new Program(BOND_IDL as Idl, BOND_PROGRAM_ID, this._provider);
  }
}
//The Bond class allows the user to create a Bond object
//that can interact with the Bond program directly

//constructor
//methods

//For those looking to receive the transaction types only
//see the transaction.ts file

export default Bond;
