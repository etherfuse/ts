import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface FundInterestPaymentParamsFields {
  amount: BN
}

export interface FundInterestPaymentParamsJSON {
  amount: string
}

export class FundInterestPaymentParams {
  readonly amount: BN

  constructor(fields: FundInterestPaymentParamsFields) {
    this.amount = fields.amount
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u64("amount")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new FundInterestPaymentParams({
      amount: obj.amount,
    })
  }

  static toEncodable(fields: FundInterestPaymentParamsFields) {
    return {
      amount: fields.amount,
    }
  }

  toJSON(): FundInterestPaymentParamsJSON {
    return {
      amount: this.amount.toString(),
    }
  }

  static fromJSON(
    obj: FundInterestPaymentParamsJSON
  ): FundInterestPaymentParams {
    return new FundInterestPaymentParams({
      amount: new BN(obj.amount),
    })
  }

  toEncodable() {
    return FundInterestPaymentParams.toEncodable(this)
  }
}
