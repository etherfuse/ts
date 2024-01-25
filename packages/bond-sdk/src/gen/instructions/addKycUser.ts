import { TransactionInstruction, PublicKey, AccountMeta } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from 'bn.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from '../programId';

export interface AddKycUserArgs {
  params: types.AddKycUserParamsFields;
}

export interface AddKycUserAccounts {
  /** The kyc authority of the bond admin account of any collection */
  kycAuthority: PublicKey;
  bondAdmin: PublicKey;
  admin: PublicKey;
  /** The kyc account that is being added */
  kyc: PublicKey;
  /** The system program since we are creating an account */
  systemProgram: PublicKey;
}

export const layout = borsh.struct([types.AddKycUserParams.layout('params')]);

export function addKycUser(args: AddKycUserArgs, accounts: AddKycUserAccounts, programId: PublicKey = PROGRAM_ID) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.kycAuthority, isSigner: true, isWritable: true },
    { pubkey: accounts.bondAdmin, isSigner: false, isWritable: false },
    { pubkey: accounts.admin, isSigner: false, isWritable: false },
    { pubkey: accounts.kyc, isSigner: false, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ];
  const identifier = Buffer.from([37, 191, 34, 59, 51, 150, 123, 8]);
  const buffer = Buffer.alloc(1000);
  const len = layout.encode(
    {
      params: types.AddKycUserParams.toEncodable(args.params),
    },
    buffer
  );
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
  const ix = new TransactionInstruction({ keys, programId, data });
  return ix;
}
