import { TransactionInstruction, PublicKey, AccountMeta } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from 'bn.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from '../programId';

export interface AddAdminArgs {
  params: types.AddAdminParamsFields;
}

export interface AddAdminAccounts {
  /** The program authority of the bond program */
  programAuthority: PublicKey;
  /** The admin account that is being added */
  admin: PublicKey;
  /** The system program since we are creating an account */
  systemProgram: PublicKey;
}

export const layout = borsh.struct([types.AddAdminParams.layout('params')]);

export function addAdmin(args: AddAdminArgs, accounts: AddAdminAccounts, programId: PublicKey = PROGRAM_ID) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.programAuthority, isSigner: true, isWritable: true },
    { pubkey: accounts.admin, isSigner: false, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ];
  const identifier = Buffer.from([177, 236, 33, 205, 124, 152, 55, 186]);
  const buffer = Buffer.alloc(1000);
  const len = layout.encode(
    {
      params: types.AddAdminParams.toEncodable(args.params),
    },
    buffer
  );
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
  const ix = new TransactionInstruction({ keys, programId, data });
  return ix;
}
