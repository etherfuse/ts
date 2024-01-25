import { TransactionInstruction, PublicKey, AccountMeta } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from 'bn.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from '../programId';

export interface CollectCouponArgs {
  params: types.CollectCouponParamsFields;
}

export interface CollectCouponAccounts {
  /** The owner of the nft that is collecting interest. */
  owner: PublicKey;
  /** The collection of the bond for checks. */
  collection: PublicKey;
  /** The token account with the nft that proves ownership and how many tokens are in the PDA. */
  ownerNftTokenAccount: PublicKey;
  /** The token account of the payment account that is used to receive interest payment */
  ownerPaymentTokenAccount: PublicKey;
  /** The pda bond token account that holds the bond tokens. */
  pdaBondTokenAccount: PublicKey;
  /** The PDA that holds the bonds that collect interest. */
  nft: PublicKey;
  /** The global interest payment token account */
  interestPaymentTokenAccount: PublicKey;
  /** The global interest PDA account */
  interest: PublicKey;
  /** The bond mint */
  bondMint: PublicKey;
  /** The payment mint */
  paymentMint: PublicKey;
  /** The nft mint */
  nftMint: PublicKey;
  kyc: PublicKey;
  pass: PublicKey;
  tokenProgram: PublicKey;
}

export const layout = borsh.struct([types.CollectCouponParams.layout('params')]);

export function collectCoupon(
  args: CollectCouponArgs,
  accounts: CollectCouponAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.owner, isSigner: true, isWritable: false },
    { pubkey: accounts.collection, isSigner: false, isWritable: false },
    {
      pubkey: accounts.ownerNftTokenAccount,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: accounts.ownerPaymentTokenAccount,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: accounts.pdaBondTokenAccount,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: accounts.nft, isSigner: false, isWritable: true },
    {
      pubkey: accounts.interestPaymentTokenAccount,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: accounts.interest, isSigner: false, isWritable: false },
    { pubkey: accounts.bondMint, isSigner: false, isWritable: false },
    { pubkey: accounts.paymentMint, isSigner: false, isWritable: false },
    { pubkey: accounts.nftMint, isSigner: false, isWritable: false },
    { pubkey: accounts.kyc, isSigner: false, isWritable: false },
    { pubkey: accounts.pass, isSigner: false, isWritable: false },
    { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
  ];
  const identifier = Buffer.from([116, 116, 56, 106, 118, 159, 134, 117]);
  const buffer = Buffer.alloc(1000);
  const len = layout.encode(
    {
      params: types.CollectCouponParams.toEncodable(args.params),
    },
    buffer
  );
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
  const ix = new TransactionInstruction({ keys, programId, data });
  return ix;
}
