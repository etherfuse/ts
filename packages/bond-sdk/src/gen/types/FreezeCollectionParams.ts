import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface FreezeCollectionParamsFields {}

export interface FreezeCollectionParamsJSON {}

export class FreezeCollectionParams {
  constructor(fields: FreezeCollectionParamsFields) {}

  static layout(property?: string) {
    return borsh.struct([], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new FreezeCollectionParams({})
  }

  static toEncodable(fields: FreezeCollectionParamsFields) {
    return {}
  }

  toJSON(): FreezeCollectionParamsJSON {
    return {}
  }

  static fromJSON(obj: FreezeCollectionParamsJSON): FreezeCollectionParams {
    return new FreezeCollectionParams({})
  }

  toEncodable() {
    return FreezeCollectionParams.toEncodable(this)
  }
}
