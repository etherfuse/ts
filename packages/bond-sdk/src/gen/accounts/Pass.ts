import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface PassFields {
  wallet: PublicKey
  isDisabled: boolean
  bump: number
}

export interface PassJSON {
  wallet: string
  isDisabled: boolean
  bump: number
}

export class Pass {
  readonly wallet: PublicKey
  readonly isDisabled: boolean
  readonly bump: number

  static readonly discriminator = Buffer.from([
    40, 247, 140, 113, 56, 14, 57, 44,
  ])

  static readonly layout = borsh.struct([
    borsh.publicKey("wallet"),
    borsh.bool("isDisabled"),
    borsh.u8("bump"),
  ])

  constructor(fields: PassFields) {
    this.wallet = fields.wallet
    this.isDisabled = fields.isDisabled
    this.bump = fields.bump
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<Pass | null> {
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
  ): Promise<Array<Pass | null>> {
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

  static decode(data: Buffer): Pass {
    if (!data.slice(0, 8).equals(Pass.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = Pass.layout.decode(data.slice(8))

    return new Pass({
      wallet: dec.wallet,
      isDisabled: dec.isDisabled,
      bump: dec.bump,
    })
  }

  toJSON(): PassJSON {
    return {
      wallet: this.wallet.toString(),
      isDisabled: this.isDisabled,
      bump: this.bump,
    }
  }

  static fromJSON(obj: PassJSON): Pass {
    return new Pass({
      wallet: new PublicKey(obj.wallet),
      isDisabled: obj.isDisabled,
      bump: obj.bump,
    })
  }
}
