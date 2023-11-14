import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface GlobalPassConfigFields {
  collectionOwner: PublicKey
  bump: number
}

export interface GlobalPassConfigJSON {
  collectionOwner: string
  bump: number
}

export class GlobalPassConfig {
  readonly collectionOwner: PublicKey
  readonly bump: number

  static readonly discriminator = Buffer.from([
    229, 188, 90, 13, 60, 254, 80, 236,
  ])

  static readonly layout = borsh.struct([
    borsh.publicKey("collectionOwner"),
    borsh.u8("bump"),
  ])

  constructor(fields: GlobalPassConfigFields) {
    this.collectionOwner = fields.collectionOwner
    this.bump = fields.bump
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<GlobalPassConfig | null> {
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
  ): Promise<Array<GlobalPassConfig | null>> {
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

  static decode(data: Buffer): GlobalPassConfig {
    if (!data.slice(0, 8).equals(GlobalPassConfig.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = GlobalPassConfig.layout.decode(data.slice(8))

    return new GlobalPassConfig({
      collectionOwner: dec.collectionOwner,
      bump: dec.bump,
    })
  }

  toJSON(): GlobalPassConfigJSON {
    return {
      collectionOwner: this.collectionOwner.toString(),
      bump: this.bump,
    }
  }

  static fromJSON(obj: GlobalPassConfigJSON): GlobalPassConfig {
    return new GlobalPassConfig({
      collectionOwner: new PublicKey(obj.collectionOwner),
      bump: obj.bump,
    })
  }
}
