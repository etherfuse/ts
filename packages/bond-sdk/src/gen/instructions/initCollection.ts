import { TransactionInstruction, PublicKey, AccountMeta } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from 'bn.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from '../programId';

export interface InitCollectionArgs {
  params: types.InitCollectionParamsFields;
}

export interface InitCollectionAccounts {
  /** The bond admin that is adding the collection */
  bondAdmin: PublicKey;
  /** The mint that will be used to mint the bonds */
  mint: PublicKey;
  nftMint: PublicKey;
  /**
   * The admin pda that we use to validate
   * that the admin exists and is enabled
   * and the seed is derived from the signer
   */
  admin: PublicKey;
  /**
   * The collection that is being created with
   * the mint as part of the seed
   */
  collection: PublicKey;
  /** The form of payment used to mint the bond */
  paymentMint: PublicKey;
  /** The token program since we are passing in mints */
  tokenProgram: PublicKey;
  /** The associated token program because we have associated token accounts */
  associatedTokenProgram: PublicKey;
  /** The system program because we are creating accounts */
  systemProgram: PublicKey;
}

export const layout = borsh.struct([types.InitCollectionParams.layout('params')]);

export function initCollection(
  args: InitCollectionArgs,
  accounts: InitCollectionAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.bondAdmin, isSigner: true, isWritable: true },
    { pubkey: accounts.mint, isSigner: true, isWritable: true },
    { pubkey: accounts.nftMint, isSigner: true, isWritable: true },
    { pubkey: accounts.admin, isSigner: false, isWritable: false },
    { pubkey: accounts.collection, isSigner: false, isWritable: true },
    { pubkey: accounts.paymentMint, isSigner: false, isWritable: false },
    { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
    {
      pubkey: accounts.associatedTokenProgram,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ];
  const identifier = Buffer.from([244, 242, 133, 0, 152, 187, 144, 139]);
  const buffer = Buffer.alloc(1000);
  const len = layout.encode(
    {
      params: types.InitCollectionParams.toEncodable(args.params),
    },
    buffer
  );
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
  const ix = new TransactionInstruction({ keys, programId, data });
  return ix;
}
