import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface SetCollectionMintParamsFields {}

export interface SetCollectionMintParamsJSON {}

export class SetCollectionMintParams {
  constructor(fields: SetCollectionMintParamsFields) {}

  static layout(property?: string) {
    return borsh.struct([], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new SetCollectionMintParams({})
  }

  static toEncodable(fields: SetCollectionMintParamsFields) {
    return {}
  }

  toJSON(): SetCollectionMintParamsJSON {
    return {}
  }

  static fromJSON(obj: SetCollectionMintParamsJSON): SetCollectionMintParams {
    return new SetCollectionMintParams({})
  }

  toEncodable() {
    return SetCollectionMintParams.toEncodable(this)
  }
}
