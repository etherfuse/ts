import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface ViewCouponReturnsParamsFields {
  amount: BN
}

export interface ViewCouponReturnsParamsJSON {
  amount: string
}

export class ViewCouponReturnsParams {
  readonly amount: BN

  constructor(fields: ViewCouponReturnsParamsFields) {
    this.amount = fields.amount
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u64("amount")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new ViewCouponReturnsParams({
      amount: obj.amount,
    })
  }

  static toEncodable(fields: ViewCouponReturnsParamsFields) {
    return {
      amount: fields.amount,
    }
  }

  toJSON(): ViewCouponReturnsParamsJSON {
    return {
      amount: this.amount.toString(),
    }
  }

  static fromJSON(obj: ViewCouponReturnsParamsJSON): ViewCouponReturnsParams {
    return new ViewCouponReturnsParams({
      amount: new BN(obj.amount),
    })
  }

  toEncodable() {
    return ViewCouponReturnsParams.toEncodable(this)
  }
}
