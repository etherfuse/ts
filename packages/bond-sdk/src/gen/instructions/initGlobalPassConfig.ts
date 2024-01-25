import { TransactionInstruction, PublicKey, AccountMeta } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from 'bn.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from '../programId';

export interface InitGlobalPassConfigArgs {
  params: types.InitGlobalPassConfigParamsFields;
}

export interface InitGlobalPassConfigAccounts {
  bondAdmin: PublicKey;
  admin: PublicKey;
  globalPassConfig: PublicKey;
  systemProgram: PublicKey;
}

export const layout = borsh.struct([types.InitGlobalPassConfigParams.layout('params')]);

export function initGlobalPassConfig(
  args: InitGlobalPassConfigArgs,
  accounts: InitGlobalPassConfigAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.bondAdmin, isSigner: true, isWritable: true },
    { pubkey: accounts.admin, isSigner: false, isWritable: false },
    { pubkey: accounts.globalPassConfig, isSigner: false, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ];
  const identifier = Buffer.from([68, 64, 100, 104, 43, 224, 50, 12]);
  const buffer = Buffer.alloc(1000);
  const len = layout.encode(
    {
      params: types.InitGlobalPassConfigParams.toEncodable(args.params),
    },
    buffer
  );
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
  const ix = new TransactionInstruction({ keys, programId, data });
  return ix;
}
