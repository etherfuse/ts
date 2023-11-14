import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface FundingAccountsFields {
  /** The funding token account that is used to receive payment for the bond */
  paymentTokenAccount: PublicKey
  /**
   * The interest payment token account that is used
   * to distribute interest that has accrued
   */
  interestPaymentTokenAccount: PublicKey
  /**
   * The par value payment token account that is used
   * to distribute the par value payment up maturity
   */
  parValuePaymentTokenAccount: PublicKey
}

export interface FundingAccountsJSON {
  /** The funding token account that is used to receive payment for the bond */
  paymentTokenAccount: string
  /**
   * The interest payment token account that is used
   * to distribute interest that has accrued
   */
  interestPaymentTokenAccount: string
  /**
   * The par value payment token account that is used
   * to distribute the par value payment up maturity
   */
  parValuePaymentTokenAccount: string
}

export class FundingAccounts {
  /** The funding token account that is used to receive payment for the bond */
  readonly paymentTokenAccount: PublicKey
  /**
   * The interest payment token account that is used
   * to distribute interest that has accrued
   */
  readonly interestPaymentTokenAccount: PublicKey
  /**
   * The par value payment token account that is used
   * to distribute the par value payment up maturity
   */
  readonly parValuePaymentTokenAccount: PublicKey

  constructor(fields: FundingAccountsFields) {
    this.paymentTokenAccount = fields.paymentTokenAccount
    this.interestPaymentTokenAccount = fields.interestPaymentTokenAccount
    this.parValuePaymentTokenAccount = fields.parValuePaymentTokenAccount
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("paymentTokenAccount"),
        borsh.publicKey("interestPaymentTokenAccount"),
        borsh.publicKey("parValuePaymentTokenAccount"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new FundingAccounts({
      paymentTokenAccount: obj.paymentTokenAccount,
      interestPaymentTokenAccount: obj.interestPaymentTokenAccount,
      parValuePaymentTokenAccount: obj.parValuePaymentTokenAccount,
    })
  }

  static toEncodable(fields: FundingAccountsFields) {
    return {
      paymentTokenAccount: fields.paymentTokenAccount,
      interestPaymentTokenAccount: fields.interestPaymentTokenAccount,
      parValuePaymentTokenAccount: fields.parValuePaymentTokenAccount,
    }
  }

  toJSON(): FundingAccountsJSON {
    return {
      paymentTokenAccount: this.paymentTokenAccount.toString(),
      interestPaymentTokenAccount: this.interestPaymentTokenAccount.toString(),
      parValuePaymentTokenAccount: this.parValuePaymentTokenAccount.toString(),
    }
  }

  static fromJSON(obj: FundingAccountsJSON): FundingAccounts {
    return new FundingAccounts({
      paymentTokenAccount: new PublicKey(obj.paymentTokenAccount),
      interestPaymentTokenAccount: new PublicKey(
        obj.interestPaymentTokenAccount
      ),
      parValuePaymentTokenAccount: new PublicKey(
        obj.parValuePaymentTokenAccount
      ),
    })
  }

  toEncodable() {
    return FundingAccounts.toEncodable(this)
  }
}
