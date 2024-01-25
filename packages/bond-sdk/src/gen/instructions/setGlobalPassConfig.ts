import { TransactionInstruction, PublicKey, AccountMeta } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from 'bn.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from '../programId';

export interface SetGlobalPassConfigArgs {
  params: types.SetGlobalPassConfigParamsFields;
}

export interface SetGlobalPassConfigAccounts {
  bondAdmin: PublicKey;
  admin: PublicKey;
  globalPassConfig: PublicKey;
}

export const layout = borsh.struct([types.SetGlobalPassConfigParams.layout('params')]);

export function setGlobalPassConfig(
  args: SetGlobalPassConfigArgs,
  accounts: SetGlobalPassConfigAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.bondAdmin, isSigner: true, isWritable: true },
    { pubkey: accounts.admin, isSigner: false, isWritable: false },
    { pubkey: accounts.globalPassConfig, isSigner: false, isWritable: true },
  ];
  const identifier = Buffer.from([251, 226, 224, 185, 90, 52, 58, 40]);
  const buffer = Buffer.alloc(1000);
  const len = layout.encode(
    {
      params: types.SetGlobalPassConfigParams.toEncodable(args.params),
    },
    buffer
  );
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
  const ix = new TransactionInstruction({ keys, programId, data });
  return ix;
}
