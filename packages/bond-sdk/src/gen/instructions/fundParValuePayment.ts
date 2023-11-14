import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface FundParValuePaymentArgs {
  params: types.FundParValuePaymentParamsFields
}

export interface FundParValuePaymentAccounts {
  /** Bond admin is signer */
  bondAdmin: PublicKey
  /** The admin pda has the bond admin as the authority as the bond admin and is enabled */
  admin: PublicKey
  /**
   * collection has the bond admin as the admin and the payment mint matches
   * the par_value payment token account is also checked
   */
  collection: PublicKey
  /** The par_value account so that we can validate the token account authority */
  parValueAccount: PublicKey
  /** The token account for the par_value payment */
  parValueTokenAccount: PublicKey
  /** The bond admin token account with the matching mint to send par_value payment funds */
  bondAdminTokenAccount: PublicKey
  /** The mint for the funds being transfered */
  paymentMint: PublicKey
  tokenProgram: PublicKey
  associatedTokenProgram: PublicKey
  systemProgram: PublicKey
}

export const layout = borsh.struct([
  types.FundParValuePaymentParams.layout("params"),
])

export function fundParValuePayment(
  args: FundParValuePaymentArgs,
  accounts: FundParValuePaymentAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.bondAdmin, isSigner: true, isWritable: true },
    { pubkey: accounts.admin, isSigner: false, isWritable: false },
    { pubkey: accounts.collection, isSigner: false, isWritable: true },
    { pubkey: accounts.parValueAccount, isSigner: false, isWritable: true },
    {
      pubkey: accounts.parValueTokenAccount,
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
  ]
  const identifier = Buffer.from([10, 91, 121, 171, 53, 150, 117, 39])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      params: types.FundParValuePaymentParams.toEncodable(args.params),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
