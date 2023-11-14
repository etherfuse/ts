import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface ExchangeTokensForNFTParamsFields {
  amount: BN
}

export interface ExchangeTokensForNFTParamsJSON {
  amount: string
}

export class ExchangeTokensForNFTParams {
  readonly amount: BN

  constructor(fields: ExchangeTokensForNFTParamsFields) {
    this.amount = fields.amount
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u64("amount")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new ExchangeTokensForNFTParams({
      amount: obj.amount,
    })
  }

  static toEncodable(fields: ExchangeTokensForNFTParamsFields) {
    return {
      amount: fields.amount,
    }
  }

  toJSON(): ExchangeTokensForNFTParamsJSON {
    return {
      amount: this.amount.toString(),
    }
  }

  static fromJSON(
    obj: ExchangeTokensForNFTParamsJSON
  ): ExchangeTokensForNFTParams {
    return new ExchangeTokensForNFTParams({
      amount: new BN(obj.amount),
    })
  }

  toEncodable() {
    return ExchangeTokensForNFTParams.toEncodable(this)
  }
}
