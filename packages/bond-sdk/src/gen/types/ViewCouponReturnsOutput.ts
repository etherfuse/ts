import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface ViewCouponReturnsOutputFields {
  amount: BN
}

export interface ViewCouponReturnsOutputJSON {
  amount: string
}

export class ViewCouponReturnsOutput {
  readonly amount: BN

  constructor(fields: ViewCouponReturnsOutputFields) {
    this.amount = fields.amount
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u64("amount")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new ViewCouponReturnsOutput({
      amount: obj.amount,
    })
  }

  static toEncodable(fields: ViewCouponReturnsOutputFields) {
    return {
      amount: fields.amount,
    }
  }

  toJSON(): ViewCouponReturnsOutputJSON {
    return {
      amount: this.amount.toString(),
    }
  }

  static fromJSON(obj: ViewCouponReturnsOutputJSON): ViewCouponReturnsOutput {
    return new ViewCouponReturnsOutput({
      amount: new BN(obj.amount),
    })
  }

  toEncodable() {
    return ViewCouponReturnsOutput.toEncodable(this)
  }
}
