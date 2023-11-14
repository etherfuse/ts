import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface FreezeCollectionArgs {
  params: types.FreezeCollectionParamsFields
}

export interface FreezeCollectionAccounts {
  bondAdmin: PublicKey
  admin: PublicKey
  collection: PublicKey
}

export const layout = borsh.struct([
  types.FreezeCollectionParams.layout("params"),
])

export function freezeCollection(
  args: FreezeCollectionArgs,
  accounts: FreezeCollectionAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.bondAdmin, isSigner: true, isWritable: true },
    { pubkey: accounts.admin, isSigner: false, isWritable: false },
    { pubkey: accounts.collection, isSigner: false, isWritable: true },
  ]
  const identifier = Buffer.from([14, 221, 61, 164, 29, 69, 238, 42])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      params: types.FreezeCollectionParams.toEncodable(args.params),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
