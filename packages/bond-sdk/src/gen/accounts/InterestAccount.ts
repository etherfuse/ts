import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface InterestAccountFields {
  authority: PublicKey
  bump: number
  runningTotal: Array<BN>
  counter: BN
}

export interface InterestAccountJSON {
  authority: string
  bump: number
  runningTotal: Array<string>
  counter: string
}

/** The PDA used for the interest payments */
export class InterestAccount {
  readonly authority: PublicKey
  readonly bump: number
  readonly runningTotal: Array<BN>
  readonly counter: BN

  static readonly discriminator = Buffer.from([
    213, 131, 188, 105, 44, 103, 50, 253,
  ])

  static readonly layout = borsh.struct([
    borsh.publicKey("authority"),
    borsh.u8("bump"),
    borsh.vec(borsh.u64(), "runningTotal"),
    borsh.u64("counter"),
  ])

  constructor(fields: InterestAccountFields) {
    this.authority = fields.authority
    this.bump = fields.bump
    this.runningTotal = fields.runningTotal
    this.counter = fields.counter
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<InterestAccount | null> {
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
  ): Promise<Array<InterestAccount | null>> {
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

  static decode(data: Buffer): InterestAccount {
    if (!data.slice(0, 8).equals(InterestAccount.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = InterestAccount.layout.decode(data.slice(8))

    return new InterestAccount({
      authority: dec.authority,
      bump: dec.bump,
      runningTotal: dec.runningTotal,
      counter: dec.counter,
    })
  }

  toJSON(): InterestAccountJSON {
    return {
      authority: this.authority.toString(),
      bump: this.bump,
      runningTotal: this.runningTotal.map((item) => item.toString()),
      counter: this.counter.toString(),
    }
  }

  static fromJSON(obj: InterestAccountJSON): InterestAccount {
    return new InterestAccount({
      authority: new PublicKey(obj.authority),
      bump: obj.bump,
      runningTotal: obj.runningTotal.map((item) => new BN(item)),
      counter: new BN(obj.counter),
    })
  }
}
