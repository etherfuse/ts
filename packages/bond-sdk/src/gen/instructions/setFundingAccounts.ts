import { TransactionInstruction, PublicKey, AccountMeta } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from 'bn.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from '../programId';

export interface SetFundingAccountsArgs {
  params: types.SetFundingAccountsParamsFields;
}

export interface SetFundingAccountsAccounts {
  /** The bond admin of the collection */
  bondAdmin: PublicKey;
  /** The admin pda that we use to validate the bond admin is an existing admin */
  admin: PublicKey;
  /** The collection passed in has the bond admin as the admin */
  collection: PublicKey;
  paymentAccount: PublicKey;
  /** The interest account PDA that also has a token account for USDC */
  interestAccount: PublicKey;
  /** The par value account PDA that also has a token account for USDC */
  parValueAccount: PublicKey;
  /** The payment token account being created and set */
  paymentTokenAccount: PublicKey;
  /** The interest payment token account being created and set */
  interestPaymentTokenAccount: PublicKey;
  /** The par value payment token account being created and set */
  parValuePaymentTokenAccount: PublicKey;
  /** The form of payment used to mint the bond */
  paymentMint: PublicKey;
  /** The token program since we are passing in mints */
  tokenProgram: PublicKey;
  /** The associated token program because we have associated token accounts */
  associatedTokenProgram: PublicKey;
  systemProgram: PublicKey;
}

export const layout = borsh.struct([types.SetFundingAccountsParams.layout('params')]);

export function setFundingAccounts(
  args: SetFundingAccountsArgs,
  accounts: SetFundingAccountsAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.bondAdmin, isSigner: true, isWritable: true },
    { pubkey: accounts.admin, isSigner: false, isWritable: false },
    { pubkey: accounts.collection, isSigner: false, isWritable: true },
    { pubkey: accounts.paymentAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.interestAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.parValueAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.paymentTokenAccount, isSigner: false, isWritable: true },
    {
      pubkey: accounts.interestPaymentTokenAccount,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: accounts.parValuePaymentTokenAccount,
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
  const identifier = Buffer.from([190, 151, 157, 192, 35, 249, 14, 106]);
  const buffer = Buffer.alloc(1000);
  const len = layout.encode(
    {
      params: types.SetFundingAccountsParams.toEncodable(args.params),
    },
    buffer
  );
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
  const ix = new TransactionInstruction({ keys, programId, data });
  return ix;
}
