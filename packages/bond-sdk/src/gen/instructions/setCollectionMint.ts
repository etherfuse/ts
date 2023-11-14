import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface SetCollectionMintArgs {
  params: types.SetCollectionMintParamsFields
}

export interface SetCollectionMintAccounts {
  /** The bond admin that is signing the transaction */
  bondAdmin: PublicKey
  /**
   * The mint that is being initialized
   * Needs to be signed to be initialized
   */
  mint: PublicKey
  /**
   * The admin PDA that is used to make sure the bond admin
   * that signed the transaction is an active admin
   */
  admin: PublicKey
  /** The collection where the mint is being set */
  collection: PublicKey
  metadata: PublicKey
  tokenMetadataProgram: PublicKey
  /** The token program since we are minting */
  tokenProgram: PublicKey
  /** The rent sysvar */
  rent: PublicKey
  /** The system program since we create an account */
  systemProgram: PublicKey
}

export const layout = borsh.struct([
  types.SetCollectionMintParams.layout("params"),
])

export function setCollectionMint(
  args: SetCollectionMintArgs,
  accounts: SetCollectionMintAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.bondAdmin, isSigner: true, isWritable: true },
    { pubkey: accounts.mint, isSigner: true, isWritable: true },
    { pubkey: accounts.admin, isSigner: false, isWritable: false },
    { pubkey: accounts.collection, isSigner: false, isWritable: false },
    { pubkey: accounts.metadata, isSigner: false, isWritable: true },
    {
      pubkey: accounts.tokenMetadataProgram,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.rent, isSigner: false, isWritable: false },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([229, 1, 231, 181, 116, 89, 255, 114])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      params: types.SetCollectionMintParams.toEncodable(args.params),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
