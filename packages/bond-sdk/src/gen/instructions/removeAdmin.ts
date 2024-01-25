import { TransactionInstruction, PublicKey, AccountMeta } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from 'bn.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from '../programId';

export interface RemoveAdminArgs {
  params: types.RemoveAdminParamsFields;
}

export interface RemoveAdminAccounts {
  /** Only the program authority can remove an admin */
  programAuthority: PublicKey;
  /** The admin pda derived from the authority field */
  admin: PublicKey;
  systemProgram: PublicKey;
}

export const layout = borsh.struct([types.RemoveAdminParams.layout('params')]);

export function removeAdmin(args: RemoveAdminArgs, accounts: RemoveAdminAccounts, programId: PublicKey = PROGRAM_ID) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.programAuthority, isSigner: true, isWritable: true },
    { pubkey: accounts.admin, isSigner: false, isWritable: false },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ];
  const identifier = Buffer.from([74, 202, 71, 106, 252, 31, 72, 183]);
  const buffer = Buffer.alloc(1000);
  const len = layout.encode(
    {
      params: types.RemoveAdminParams.toEncodable(args.params),
    },
    buffer
  );
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
  const ix = new TransactionInstruction({ keys, programId, data });
  return ix;
}
