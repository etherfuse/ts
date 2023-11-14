import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface KycFields {
  wallet: PublicKey
  isDisabled: boolean
  bump: number
}

export interface KycJSON {
  wallet: string
  isDisabled: boolean
  bump: number
}

export class Kyc {
  readonly wallet: PublicKey
  readonly isDisabled: boolean
  readonly bump: number

  static readonly discriminator = Buffer.from([27, 3, 5, 223, 163, 21, 37, 201])

  static readonly layout = borsh.struct([
    borsh.publicKey("wallet"),
    borsh.bool("isDisabled"),
    borsh.u8("bump"),
  ])

  constructor(fields: KycFields) {
    this.wallet = fields.wallet
    this.isDisabled = fields.isDisabled
    this.bump = fields.bump
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<Kyc | null> {
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
  ): Promise<Array<Kyc | null>> {
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

  static decode(data: Buffer): Kyc {
    if (!data.slice(0, 8).equals(Kyc.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = Kyc.layout.decode(data.slice(8))

    return new Kyc({
      wallet: dec.wallet,
      isDisabled: dec.isDisabled,
      bump: dec.bump,
    })
  }

  toJSON(): KycJSON {
    return {
      wallet: this.wallet.toString(),
      isDisabled: this.isDisabled,
      bump: this.bump,
    }
  }

  static fromJSON(obj: KycJSON): Kyc {
    return new Kyc({
      wallet: new PublicKey(obj.wallet),
      isDisabled: obj.isDisabled,
      bump: obj.bump,
    })
  }
}
