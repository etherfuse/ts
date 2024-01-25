import { TransactionInstruction, PublicKey, AccountMeta } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from 'bn.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from '../programId';

export interface DisableKycUserArgs {
  params: types.DisableKycUserParamsFields;
}

export interface DisableKycUserAccounts {
  /** The kyc authority of the bond admin account of any collection */
  kycAuthority: PublicKey;
  bondAdmin: PublicKey;
  admin: PublicKey;
  /** The kyc account that is being disabled */
  kyc: PublicKey;
  /** The system program since we are creating an account */
  systemProgram: PublicKey;
}

export const layout = borsh.struct([types.DisableKycUserParams.layout('params')]);

export function disableKycUser(
  args: DisableKycUserArgs,
  accounts: DisableKycUserAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.kycAuthority, isSigner: true, isWritable: true },
    { pubkey: accounts.bondAdmin, isSigner: false, isWritable: false },
    { pubkey: accounts.admin, isSigner: false, isWritable: false },
    { pubkey: accounts.kyc, isSigner: false, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ];
  const identifier = Buffer.from([71, 158, 182, 196, 133, 195, 212, 56]);
  const buffer = Buffer.alloc(1000);
  const len = layout.encode(
    {
      params: types.DisableKycUserParams.toEncodable(args.params),
    },
    buffer
  );
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
  const ix = new TransactionInstruction({ keys, programId, data });
  return ix;
}
