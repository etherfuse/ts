import { TransactionInstruction, PublicKey, AccountMeta } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from 'bn.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from '../programId';

export interface UnfreezeCollectionArgs {
  params: types.UnfreezeCollectionParamsFields;
}

export interface UnfreezeCollectionAccounts {
  bondAdmin: PublicKey;
  admin: PublicKey;
  collection: PublicKey;
}

export const layout = borsh.struct([types.UnfreezeCollectionParams.layout('params')]);

export function unfreezeCollection(
  args: UnfreezeCollectionArgs,
  accounts: UnfreezeCollectionAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.bondAdmin, isSigner: true, isWritable: true },
    { pubkey: accounts.admin, isSigner: false, isWritable: false },
    { pubkey: accounts.collection, isSigner: false, isWritable: true },
  ];
  const identifier = Buffer.from([60, 209, 107, 143, 140, 7, 173, 72]);
  const buffer = Buffer.alloc(1000);
  const len = layout.encode(
    {
      params: types.UnfreezeCollectionParams.toEncodable(args.params),
    },
    buffer
  );
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
  const ix = new TransactionInstruction({ keys, programId, data });
  return ix;
}
