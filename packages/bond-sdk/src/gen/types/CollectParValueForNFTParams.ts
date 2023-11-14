import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface CollectParValueForNFTParamsFields {}

export interface CollectParValueForNFTParamsJSON {}

export class CollectParValueForNFTParams {
  constructor(fields: CollectParValueForNFTParamsFields) {}

  static layout(property?: string) {
    return borsh.struct([], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new CollectParValueForNFTParams({})
  }

  static toEncodable(fields: CollectParValueForNFTParamsFields) {
    return {}
  }

  toJSON(): CollectParValueForNFTParamsJSON {
    return {}
  }

  static fromJSON(
    obj: CollectParValueForNFTParamsJSON
  ): CollectParValueForNFTParams {
    return new CollectParValueForNFTParams({})
  }

  toEncodable() {
    return CollectParValueForNFTParams.toEncodable(this)
  }
}
