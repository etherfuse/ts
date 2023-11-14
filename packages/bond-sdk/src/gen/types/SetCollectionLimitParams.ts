import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface SetCollectionLimitParamsFields {
  limit: BN
}

export interface SetCollectionLimitParamsJSON {
  limit: string
}

export class SetCollectionLimitParams {
  readonly limit: BN

  constructor(fields: SetCollectionLimitParamsFields) {
    this.limit = fields.limit
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u64("limit")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new SetCollectionLimitParams({
      limit: obj.limit,
    })
  }

  static toEncodable(fields: SetCollectionLimitParamsFields) {
    return {
      limit: fields.limit,
    }
  }

  toJSON(): SetCollectionLimitParamsJSON {
    return {
      limit: this.limit.toString(),
    }
  }

  static fromJSON(obj: SetCollectionLimitParamsJSON): SetCollectionLimitParams {
    return new SetCollectionLimitParams({
      limit: new BN(obj.limit),
    })
  }

  toEncodable() {
    return SetCollectionLimitParams.toEncodable(this)
  }
}
