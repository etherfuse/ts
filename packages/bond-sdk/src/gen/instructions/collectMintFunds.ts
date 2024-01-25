import { TransactionInstruction, PublicKey, AccountMeta } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from 'bn.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from '../programId';

export interface CollectMintFundsArgs {
  params: types.CollectMintFundsParamsFields;
}

export interface CollectMintFundsAccounts {
  /** Bond admin is the signer and validated against the PDA passed in */
  bondAdmin: PublicKey;
  /** The admin pda has the authority as the bond admin and is enabled */
  admin: PublicKey;
  /**
   * The collection has the bond admin as the admin
   * The payment mint matches the payment mint passed in
   * TODO: Check on the collection that the funding date is over?
   */
  collection: PublicKey;
  /** The payment account passed in has the bond admin as the authority to withdraw funds */
  paymentAccount: PublicKey;
  /**
   * The payment token account has the payment pda as the authority
   * and the mint matches the payment mint passed in
   */
  paymentTokenAccount: PublicKey;
  /**
   * The bond admin token account is created if needed and sets the authority as the bond admin
   * If it already exists, then the authority is checked against the bond admin
   */
  bondAdminTokenAccount: PublicKey;
  /** The usdc payment */
  paymentMint: PublicKey;
  tokenProgram: PublicKey;
  associatedTokenProgram: PublicKey;
  systemProgram: PublicKey;
}

export const layout = borsh.struct([types.CollectMintFundsParams.layout('params')]);

export function collectMintFunds(
  args: CollectMintFundsArgs,
  accounts: CollectMintFundsAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.bondAdmin, isSigner: true, isWritable: true },
    { pubkey: accounts.admin, isSigner: false, isWritable: false },
    { pubkey: accounts.collection, isSigner: false, isWritable: true },
    { pubkey: accounts.paymentAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.paymentTokenAccount, isSigner: false, isWritable: true },
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
  const identifier = Buffer.from([45, 198, 0, 170, 73, 140, 96, 212]);
  const buffer = Buffer.alloc(1000);
  const len = layout.encode(
    {
      params: types.CollectMintFundsParams.toEncodable(args.params),
    },
    buffer
  );
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
  const ix = new TransactionInstruction({ keys, programId, data });
  return ix;
}
