import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface CollectMintFundsParamsFields {}

export interface CollectMintFundsParamsJSON {}

export class CollectMintFundsParams {
  constructor(fields: CollectMintFundsParamsFields) {}

  static layout(property?: string) {
    return borsh.struct([], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new CollectMintFundsParams({})
  }

  static toEncodable(fields: CollectMintFundsParamsFields) {
    return {}
  }

  toJSON(): CollectMintFundsParamsJSON {
    return {}
  }

  static fromJSON(obj: CollectMintFundsParamsJSON): CollectMintFundsParams {
    return new CollectMintFundsParams({})
  }

  toEncodable() {
    return CollectMintFundsParams.toEncodable(this)
  }
}
