import { TransactionInstruction, PublicKey, AccountMeta } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from 'bn.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from '../programId';

export interface ViewParValueForNftReturnsArgs {
  params: types.ViewParValueForNftReturnsParamsFields;
}

export interface ViewParValueForNftReturnsAccounts {
  /** The collection of the bond for checks. */
  collection: PublicKey;
  /** The pda bond token account that holds the bond tokens. */
  pdaBondTokenAccount: PublicKey;
  /** The PDA that holds the bonds that collect par value. */
  nft: PublicKey;
  /** The global par value payment token account */
  parValueTokenAccount: PublicKey;
  /** The global par value PDA account */
  parValue: PublicKey;
  /** The bond mint */
  bondMint: PublicKey;
  /** The payment mint */
  paymentMint: PublicKey;
  /** The nft mint */
  nftMint: PublicKey;
}

export const layout = borsh.struct([types.ViewParValueForNftReturnsParams.layout('params')]);

export function viewParValueForNftReturns(
  args: ViewParValueForNftReturnsArgs,
  accounts: ViewParValueForNftReturnsAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.collection, isSigner: false, isWritable: false },
    {
      pubkey: accounts.pdaBondTokenAccount,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: accounts.nft, isSigner: false, isWritable: false },
    {
      pubkey: accounts.parValueTokenAccount,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: accounts.parValue, isSigner: false, isWritable: false },
    { pubkey: accounts.bondMint, isSigner: false, isWritable: false },
    { pubkey: accounts.paymentMint, isSigner: false, isWritable: false },
    { pubkey: accounts.nftMint, isSigner: false, isWritable: false },
  ];
  const identifier = Buffer.from([113, 44, 187, 245, 62, 115, 170, 235]);
  const buffer = Buffer.alloc(1000);
  const len = layout.encode(
    {
      params: types.ViewParValueForNftReturnsParams.toEncodable(args.params),
    },
    buffer
  );
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
  const ix = new TransactionInstruction({ keys, programId, data });
  return ix;
}
