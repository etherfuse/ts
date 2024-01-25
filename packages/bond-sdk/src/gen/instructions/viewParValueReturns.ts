import { TransactionInstruction, PublicKey, AccountMeta } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from 'bn.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from '../programId';

export interface ViewParValueReturnsArgs {
  params: types.ViewParValueReturnsParamsFields;
}

export interface ViewParValueReturnsAccounts {
  /** The collection of the bond */
  collection: PublicKey;
  /** The bond mint */
  bondMint: PublicKey;
  /** The global par value payment token account */
  parValueTokenAccount: PublicKey;
  /** The global par value PDA account */
  parValue: PublicKey;
  /** The payment mint that was used to purchase the bond */
  paymentMint: PublicKey;
}

export const layout = borsh.struct([types.ViewParValueReturnsParams.layout('params')]);

export function viewParValueReturns(
  args: ViewParValueReturnsArgs,
  accounts: ViewParValueReturnsAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.collection, isSigner: false, isWritable: false },
    { pubkey: accounts.bondMint, isSigner: false, isWritable: false },
    {
      pubkey: accounts.parValueTokenAccount,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: accounts.parValue, isSigner: false, isWritable: false },
    { pubkey: accounts.paymentMint, isSigner: false, isWritable: false },
  ];
  const identifier = Buffer.from([134, 51, 106, 233, 155, 65, 58, 210]);
  const buffer = Buffer.alloc(1000);
  const len = layout.encode(
    {
      params: types.ViewParValueReturnsParams.toEncodable(args.params),
    },
    buffer
  );
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
  const ix = new TransactionInstruction({ keys, programId, data });
  return ix;
}
