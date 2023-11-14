import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface ViewParValueReturnsParamsFields {
  amount: BN
}

export interface ViewParValueReturnsParamsJSON {
  amount: string
}

export class ViewParValueReturnsParams {
  readonly amount: BN

  constructor(fields: ViewParValueReturnsParamsFields) {
    this.amount = fields.amount
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u64("amount")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new ViewParValueReturnsParams({
      amount: obj.amount,
    })
  }

  static toEncodable(fields: ViewParValueReturnsParamsFields) {
    return {
      amount: fields.amount,
    }
  }

  toJSON(): ViewParValueReturnsParamsJSON {
    return {
      amount: this.amount.toString(),
    }
  }

  static fromJSON(
    obj: ViewParValueReturnsParamsJSON
  ): ViewParValueReturnsParams {
    return new ViewParValueReturnsParams({
      amount: new BN(obj.amount),
    })
  }

  toEncodable() {
    return ViewParValueReturnsParams.toEncodable(this)
  }
}
