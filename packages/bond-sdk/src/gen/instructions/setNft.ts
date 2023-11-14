import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface SetNftArgs {
  params: types.SetNFTParamsFields
}

export interface SetNftAccounts {
  /** The owner of the bonds */
  owner: PublicKey
  /** TODO: add in the needs to not be in funding period and other time checks */
  collection: PublicKey
  nft: PublicKey
  nftMint: PublicKey
  ownerNftTokenAccount: PublicKey
  collectionNftMint: PublicKey
  kyc: PublicKey
  metadata: PublicKey
  masterEdition: PublicKey
  collectionMasterEdition: PublicKey
  collectionMetadata: PublicKey
  tokenMetadataProgram: PublicKey
  tokenProgram: PublicKey
  systemProgram: PublicKey
  rent: PublicKey
}

export const layout = borsh.struct([types.SetNFTParams.layout("params")])

export function setNft(
  args: SetNftArgs,
  accounts: SetNftAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.owner, isSigner: true, isWritable: true },
    { pubkey: accounts.collection, isSigner: false, isWritable: false },
    { pubkey: accounts.nft, isSigner: false, isWritable: false },
    { pubkey: accounts.nftMint, isSigner: false, isWritable: true },
    {
      pubkey: accounts.ownerNftTokenAccount,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: accounts.collectionNftMint, isSigner: false, isWritable: true },
    { pubkey: accounts.kyc, isSigner: false, isWritable: false },
    { pubkey: accounts.metadata, isSigner: false, isWritable: true },
    { pubkey: accounts.masterEdition, isSigner: false, isWritable: true },
    {
      pubkey: accounts.collectionMasterEdition,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: accounts.collectionMetadata, isSigner: false, isWritable: true },
    {
      pubkey: accounts.tokenMetadataProgram,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.rent, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([187, 110, 232, 210, 175, 163, 106, 85])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      params: types.SetNFTParams.toEncodable(args.params),
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId, data })
  return ix
}
