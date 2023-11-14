import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface RemoveAdminParamsFields {}

export interface RemoveAdminParamsJSON {}

export class RemoveAdminParams {
  constructor(fields: RemoveAdminParamsFields) {}

  static layout(property?: string) {
    return borsh.struct([], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new RemoveAdminParams({})
  }

  static toEncodable(fields: RemoveAdminParamsFields) {
    return {}
  }

  toJSON(): RemoveAdminParamsJSON {
    return {}
  }

  static fromJSON(obj: RemoveAdminParamsJSON): RemoveAdminParams {
    return new RemoveAdminParams({})
  }

  toEncodable() {
    return RemoveAdminParams.toEncodable(this)
  }
}
