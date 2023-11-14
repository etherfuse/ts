import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface ParValueAccountFields {
  authority: PublicKey
  runningTotal: Array<BN>
  bump: number
}

export interface ParValueAccountJSON {
  authority: string
  runningTotal: Array<string>
  bump: number
}

/** The PDA used for the par value payments */
export class ParValueAccount {
  readonly authority: PublicKey
  readonly runningTotal: Array<BN>
  readonly bump: number

  static readonly discriminator = Buffer.from([
    237, 242, 122, 138, 195, 43, 209, 169,
  ])

  static readonly layout = borsh.struct([
    borsh.publicKey("authority"),
    borsh.vec(borsh.u64(), "runningTotal"),
    borsh.u8("bump"),
  ])

  constructor(fields: ParValueAccountFields) {
    this.authority = fields.authority
    this.runningTotal = fields.runningTotal
    this.bump = fields.bump
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<ParValueAccount | null> {
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
  ): Promise<Array<ParValueAccount | null>> {
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

  static decode(data: Buffer): ParValueAccount {
    if (!data.slice(0, 8).equals(ParValueAccount.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = ParValueAccount.layout.decode(data.slice(8))

    return new ParValueAccount({
      authority: dec.authority,
      runningTotal: dec.runningTotal,
      bump: dec.bump,
    })
  }

  toJSON(): ParValueAccountJSON {
    return {
      authority: this.authority.toString(),
      runningTotal: this.runningTotal.map((item) => item.toString()),
      bump: this.bump,
    }
  }

  static fromJSON(obj: ParValueAccountJSON): ParValueAccount {
    return new ParValueAccount({
      authority: new PublicKey(obj.authority),
      runningTotal: obj.runningTotal.map((item) => new BN(item)),
      bump: obj.bump,
    })
  }
}
