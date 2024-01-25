import { PublicKey } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from 'bn.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';

export interface FundParValuePaymentParamsFields {
  amount: BN;
}

export interface FundParValuePaymentParamsJSON {
  amount: string;
}

export class FundParValuePaymentParams {
  readonly amount: BN;

  constructor(fields: FundParValuePaymentParamsFields) {
    this.amount = fields.amount;
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u64('amount')], property);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new FundParValuePaymentParams({
      amount: obj.amount,
    });
  }

  static toEncodable(fields: FundParValuePaymentParamsFields) {
    return {
      amount: fields.amount,
    };
  }

  toJSON(): FundParValuePaymentParamsJSON {
    return {
      amount: this.amount.toString(),
    };
  }

  static fromJSON(obj: FundParValuePaymentParamsJSON): FundParValuePaymentParams {
    return new FundParValuePaymentParams({
      amount: new BN(obj.amount),
    });
  }

  toEncodable() {
    return FundParValuePaymentParams.toEncodable(this);
  }
}
