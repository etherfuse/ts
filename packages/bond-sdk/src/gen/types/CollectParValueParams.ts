import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface CollectParValueParamsFields {
  amount: BN
}

export interface CollectParValueParamsJSON {
  amount: string
}

export class CollectParValueParams {
  readonly amount: BN

  constructor(fields: CollectParValueParamsFields) {
    this.amount = fields.amount
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u64("amount")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new CollectParValueParams({
      amount: obj.amount,
    })
  }

  static toEncodable(fields: CollectParValueParamsFields) {
    return {
      amount: fields.amount,
    }
  }

  toJSON(): CollectParValueParamsJSON {
    return {
      amount: this.amount.toString(),
    }
  }

  static fromJSON(obj: CollectParValueParamsJSON): CollectParValueParams {
    return new CollectParValueParams({
      amount: new BN(obj.amount),
    })
  }

  toEncodable() {
    return CollectParValueParams.toEncodable(this)
  }
}
