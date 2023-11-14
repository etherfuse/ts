import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface ViewCouponReturnsForNftParamsFields {}

export interface ViewCouponReturnsForNftParamsJSON {}

export class ViewCouponReturnsForNftParams {
  constructor(fields: ViewCouponReturnsForNftParamsFields) {}

  static layout(property?: string) {
    return borsh.struct([], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new ViewCouponReturnsForNftParams({})
  }

  static toEncodable(fields: ViewCouponReturnsForNftParamsFields) {
    return {}
  }

  toJSON(): ViewCouponReturnsForNftParamsJSON {
    return {}
  }

  static fromJSON(
    obj: ViewCouponReturnsForNftParamsJSON
  ): ViewCouponReturnsForNftParams {
    return new ViewCouponReturnsForNftParams({})
  }

  toEncodable() {
    return ViewCouponReturnsForNftParams.toEncodable(this)
  }
}
