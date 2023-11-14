import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface SetCollectionInterestRateParamsFields {
  interestRate: number
}

export interface SetCollectionInterestRateParamsJSON {
  interestRate: number
}

export class SetCollectionInterestRateParams {
  readonly interestRate: number

  constructor(fields: SetCollectionInterestRateParamsFields) {
    this.interestRate = fields.interestRate
  }

  static layout(property?: string) {
    return borsh.struct([borsh.f64("interestRate")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new SetCollectionInterestRateParams({
      interestRate: obj.interestRate,
    })
  }

  static toEncodable(fields: SetCollectionInterestRateParamsFields) {
    return {
      interestRate: fields.interestRate,
    }
  }

  toJSON(): SetCollectionInterestRateParamsJSON {
    return {
      interestRate: this.interestRate,
    }
  }

  static fromJSON(
    obj: SetCollectionInterestRateParamsJSON
  ): SetCollectionInterestRateParams {
    return new SetCollectionInterestRateParams({
      interestRate: obj.interestRate,
    })
  }

  toEncodable() {
    return SetCollectionInterestRateParams.toEncodable(this)
  }
}
