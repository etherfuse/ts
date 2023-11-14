import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface SetGlobalPassConfigParamsFields {
  collectionOwner: PublicKey
}

export interface SetGlobalPassConfigParamsJSON {
  collectionOwner: string
}

export class SetGlobalPassConfigParams {
  readonly collectionOwner: PublicKey

  constructor(fields: SetGlobalPassConfigParamsFields) {
    this.collectionOwner = fields.collectionOwner
  }

  static layout(property?: string) {
    return borsh.struct([borsh.publicKey("collectionOwner")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new SetGlobalPassConfigParams({
      collectionOwner: obj.collectionOwner,
    })
  }

  static toEncodable(fields: SetGlobalPassConfigParamsFields) {
    return {
      collectionOwner: fields.collectionOwner,
    }
  }

  toJSON(): SetGlobalPassConfigParamsJSON {
    return {
      collectionOwner: this.collectionOwner.toString(),
    }
  }

  static fromJSON(
    obj: SetGlobalPassConfigParamsJSON
  ): SetGlobalPassConfigParams {
    return new SetGlobalPassConfigParams({
      collectionOwner: new PublicKey(obj.collectionOwner),
    })
  }

  toEncodable() {
    return SetGlobalPassConfigParams.toEncodable(this)
  }
}
