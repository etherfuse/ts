import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface SetCollectionMaturityDateParamsFields {
  maturityDate: BN
}

export interface SetCollectionMaturityDateParamsJSON {
  maturityDate: string
}

export class SetCollectionMaturityDateParams {
  readonly maturityDate: BN

  constructor(fields: SetCollectionMaturityDateParamsFields) {
    this.maturityDate = fields.maturityDate
  }

  static layout(property?: string) {
    return borsh.struct([borsh.i64("maturityDate")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new SetCollectionMaturityDateParams({
      maturityDate: obj.maturityDate,
    })
  }

  static toEncodable(fields: SetCollectionMaturityDateParamsFields) {
    return {
      maturityDate: fields.maturityDate,
    }
  }

  toJSON(): SetCollectionMaturityDateParamsJSON {
    return {
      maturityDate: this.maturityDate.toString(),
    }
  }

  static fromJSON(
    obj: SetCollectionMaturityDateParamsJSON
  ): SetCollectionMaturityDateParams {
    return new SetCollectionMaturityDateParams({
      maturityDate: new BN(obj.maturityDate),
    })
  }

  toEncodable() {
    return SetCollectionMaturityDateParams.toEncodable(this)
  }
}
