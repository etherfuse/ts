import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface ViewCouponReturnsForNftOutputFields {
  amount: BN
}

export interface ViewCouponReturnsForNftOutputJSON {
  amount: string
}

export class ViewCouponReturnsForNftOutput {
  readonly amount: BN

  constructor(fields: ViewCouponReturnsForNftOutputFields) {
    this.amount = fields.amount
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u64("amount")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new ViewCouponReturnsForNftOutput({
      amount: obj.amount,
    })
  }

  static toEncodable(fields: ViewCouponReturnsForNftOutputFields) {
    return {
      amount: fields.amount,
    }
  }

  toJSON(): ViewCouponReturnsForNftOutputJSON {
    return {
      amount: this.amount.toString(),
    }
  }

  static fromJSON(
    obj: ViewCouponReturnsForNftOutputJSON
  ): ViewCouponReturnsForNftOutput {
    return new ViewCouponReturnsForNftOutput({
      amount: new BN(obj.amount),
    })
  }

  toEncodable() {
    return ViewCouponReturnsForNftOutput.toEncodable(this)
  }
}
