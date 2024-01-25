import { TransactionInstruction, PublicKey, AccountMeta } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from 'bn.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from '../programId';

export interface FundInterestPaymentArgs {
  params: types.FundInterestPaymentParamsFields;
}

export interface FundInterestPaymentAccounts {
  /** Bond admin is signer */
  bondAdmin: PublicKey;
  /** The admin pda has the bond admin as the authority as the bond admin and is enabled */
  admin: PublicKey;
  /**
   * collection has the bond admin as the admin and the payment mint matches
   * the interest payment token account is also checked
   */
  collection: PublicKey;
  /** The interest account so that we can validate the token account authority */
  interestAccount: PublicKey;
  /** The token account for the interest payment */
  interestTokenAccount: PublicKey;
  /** The bond admin token account with the matching mint to send interest payment funds */
  bondAdminTokenAccount: PublicKey;
  /** The mint for the funds being transfered */
  paymentMint: PublicKey;
  tokenProgram: PublicKey;
  associatedTokenProgram: PublicKey;
  systemProgram: PublicKey;
}

export const layout = borsh.struct([types.FundInterestPaymentParams.layout('params')]);

export function fundInterestPayment(
  args: FundInterestPaymentArgs,
  accounts: FundInterestPaymentAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.bondAdmin, isSigner: true, isWritable: true },
    { pubkey: accounts.admin, isSigner: false, isWritable: false },
    { pubkey: accounts.collection, isSigner: false, isWritable: true },
    { pubkey: accounts.interestAccount, isSigner: false, isWritable: true },
    {
      pubkey: accounts.interestTokenAccount,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: accounts.bondAdminTokenAccount,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: accounts.paymentMint, isSigner: false, isWritable: false },
    { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
    {
      pubkey: accounts.associatedTokenProgram,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ];
  const identifier = Buffer.from([170, 15, 221, 111, 229, 207, 199, 65]);
  const buffer = Buffer.alloc(1000);
  const len = layout.encode(
    {
      params: types.FundInterestPaymentParams.toEncodable(args.params),
    },
    buffer
  );
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
  const ix = new TransactionInstruction({ keys, programId, data });
  return ix;
}
