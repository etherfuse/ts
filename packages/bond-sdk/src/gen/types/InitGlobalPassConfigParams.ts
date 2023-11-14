import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface InitGlobalPassConfigParamsFields {
  collectionOwner: PublicKey
}

export interface InitGlobalPassConfigParamsJSON {
  collectionOwner: string
}

export class InitGlobalPassConfigParams {
  readonly collectionOwner: PublicKey

  constructor(fields: InitGlobalPassConfigParamsFields) {
    this.collectionOwner = fields.collectionOwner
  }

  static layout(property?: string) {
    return borsh.struct([borsh.publicKey("collectionOwner")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new InitGlobalPassConfigParams({
      collectionOwner: obj.collectionOwner,
    })
  }

  static toEncodable(fields: InitGlobalPassConfigParamsFields) {
    return {
      collectionOwner: fields.collectionOwner,
    }
  }

  toJSON(): InitGlobalPassConfigParamsJSON {
    return {
      collectionOwner: this.collectionOwner.toString(),
    }
  }

  static fromJSON(
    obj: InitGlobalPassConfigParamsJSON
  ): InitGlobalPassConfigParams {
    return new InitGlobalPassConfigParams({
      collectionOwner: new PublicKey(obj.collectionOwner),
    })
  }

  toEncodable() {
    return InitGlobalPassConfigParams.toEncodable(this)
  }
}
