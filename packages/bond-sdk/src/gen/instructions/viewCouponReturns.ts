import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface ViewCouponReturnsArgs {
  params: types.ViewCouponReturnsParamsFields
}

export interface ViewCouponReturnsAccounts {
  /** The collection of the bond */
  collection: PublicKey
  /** The bond mint */
  bondMint: PublicKey
  /** The global interest payment token account */
  interestPaymentTokenAccount: PublicKey
  /** The global interest PDA account */
  interest: PublicKey
  /** The payment mint that was used to purchase the bond */
  paymentMint: PublicKey
}

export const layout = borsh.struct([
  types.ViewCouponReturnsParams.layout("params"),
])

export function viewCouponReturns(
  args: ViewCouponReturnsArgs,
  accounts: ViewCouponReturnsAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.collection, isSigner: false, isWritable: false },
    { pubkey: accounts.bondMint, isSigner: false, isWritable: false },
    {
      pubkey: accounts.interestPaymentTokenAccount,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: accounts.interest, isSigner: false, isWritable: false },
    { pubkey: accounts.paymentMint, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([192, 138, 46, 196, 174, 76, 95, 96])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      params: types.ViewCouponReturnsParams.toEncodable(args.params),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
