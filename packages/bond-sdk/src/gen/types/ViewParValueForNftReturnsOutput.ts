import { PublicKey } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from 'bn.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';

export interface ViewParValueForNftReturnsOutputFields {
  amount: BN;
}

export interface ViewParValueForNftReturnsOutputJSON {
  amount: string;
}

export class ViewParValueForNftReturnsOutput {
  readonly amount: BN;

  constructor(fields: ViewParValueForNftReturnsOutputFields) {
    this.amount = fields.amount;
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u64('amount')], property);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new ViewParValueForNftReturnsOutput({
      amount: obj.amount,
    });
  }

  static toEncodable(fields: ViewParValueForNftReturnsOutputFields) {
    return {
      amount: fields.amount,
    };
  }

  toJSON(): ViewParValueForNftReturnsOutputJSON {
    return {
      amount: this.amount.toString(),
    };
  }

  static fromJSON(obj: ViewParValueForNftReturnsOutputJSON): ViewParValueForNftReturnsOutput {
    return new ViewParValueForNftReturnsOutput({
      amount: new BN(obj.amount),
    });
  }

  toEncodable() {
    return ViewParValueForNftReturnsOutput.toEncodable(this);
  }
}
