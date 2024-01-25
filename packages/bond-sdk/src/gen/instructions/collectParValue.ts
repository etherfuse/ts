import { TransactionInstruction, PublicKey, AccountMeta } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from 'bn.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from '../programId';

export interface CollectParValueArgs {
  params: types.CollectParValueParamsFields;
}

export interface CollectParValueAccounts {
  owner: PublicKey;
  /** The token account of the bond mint */
  ownerBondTokenAccount: PublicKey;
  /** The token account of the payment mint */
  ownerPaymentTokenAccount: PublicKey;
  /** The collection of the bond */
  collection: PublicKey;
  /** The bond mint */
  bondMint: PublicKey;
  /** The global par value payment token account */
  parValueTokenAccount: PublicKey;
  /** The global par value PDA account */
  parValue: PublicKey;
  /** The global interest payment token account */
  interestPaymentTokenAccount: PublicKey;
  /** The global interest PDA account */
  interest: PublicKey;
  /** The payment mint that was used to purchase the bond */
  paymentMint: PublicKey;
  kyc: PublicKey;
  pass: PublicKey;
  tokenProgram: PublicKey;
}

export const layout = borsh.struct([types.CollectParValueParams.layout('params')]);

export function collectParValue(
  args: CollectParValueArgs,
  accounts: CollectParValueAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.owner, isSigner: true, isWritable: true },
    {
      pubkey: accounts.ownerBondTokenAccount,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: accounts.ownerPaymentTokenAccount,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: accounts.collection, isSigner: false, isWritable: true },
    { pubkey: accounts.bondMint, isSigner: false, isWritable: true },
    {
      pubkey: accounts.parValueTokenAccount,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: accounts.parValue, isSigner: false, isWritable: false },
    {
      pubkey: accounts.interestPaymentTokenAccount,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: accounts.interest, isSigner: false, isWritable: false },
    { pubkey: accounts.paymentMint, isSigner: false, isWritable: false },
    { pubkey: accounts.kyc, isSigner: false, isWritable: false },
    { pubkey: accounts.pass, isSigner: false, isWritable: false },
    { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
  ];
  const identifier = Buffer.from([47, 78, 17, 130, 223, 53, 8, 16]);
  const buffer = Buffer.alloc(1000);
  const len = layout.encode(
    {
      params: types.CollectParValueParams.toEncodable(args.params),
    },
    buffer
  );
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
  const ix = new TransactionInstruction({ keys, programId, data });
  return ix;
}
