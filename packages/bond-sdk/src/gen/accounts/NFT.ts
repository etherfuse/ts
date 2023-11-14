import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface NFTFields {
  mint: PublicKey
  bump: number
  counter: BN
}

export interface NFTJSON {
  mint: string
  bump: number
  counter: string
}

/**
 * NFT PDA with the mint it's tied to, the bump seed for the PDA,
 * and the counter to keep track of when the interest payment
 * was last collected compared to the interest funding account
 */
export class NFT {
  readonly mint: PublicKey
  readonly bump: number
  readonly counter: BN

  static readonly discriminator = Buffer.from([
    88, 10, 146, 176, 101, 11, 40, 217,
  ])

  static readonly layout = borsh.struct([
    borsh.publicKey("mint"),
    borsh.u8("bump"),
    borsh.u64("counter"),
  ])

  constructor(fields: NFTFields) {
    this.mint = fields.mint
    this.bump = fields.bump
    this.counter = fields.counter
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<NFT | null> {
    const info = await c.getAccountInfo(address)

    if (info === null) {
      return null
    }
    if (!info.owner.equals(programId)) {
      throw new Error("account doesn't belong to this program")
    }

    return this.decode(info.data)
  }

  static async fetchMultiple(
    c: Connection,
    addresses: PublicKey[],
    programId: PublicKey = PROGRAM_ID
  ): Promise<Array<NFT | null>> {
    const infos = await c.getMultipleAccountsInfo(addresses)

    return infos.map((info) => {
      if (info === null) {
        return null
      }
      if (!info.owner.equals(programId)) {
        throw new Error("account doesn't belong to this program")
      }

      return this.decode(info.data)
    })
  }

  static decode(data: Buffer): NFT {
    if (!data.slice(0, 8).equals(NFT.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = NFT.layout.decode(data.slice(8))

    return new NFT({
      mint: dec.mint,
      bump: dec.bump,
      counter: dec.counter,
    })
  }

  toJSON(): NFTJSON {
    return {
      mint: this.mint.toString(),
      bump: this.bump,
      counter: this.counter.toString(),
    }
  }

  static fromJSON(obj: NFTJSON): NFT {
    return new NFT({
      mint: new PublicKey(obj.mint),
      bump: obj.bump,
      counter: new BN(obj.counter),
    })
  }
}
