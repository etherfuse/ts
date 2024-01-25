import { PublicKey } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from 'bn.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';

export interface ViewParValueReturnsOutputFields {
  amount: BN;
}

export interface ViewParValueReturnsOutputJSON {
  amount: string;
}

export class ViewParValueReturnsOutput {
  readonly amount: BN;

  constructor(fields: ViewParValueReturnsOutputFields) {
    this.amount = fields.amount;
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u64('amount')], property);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new ViewParValueReturnsOutput({
      amount: obj.amount,
    });
  }

  static toEncodable(fields: ViewParValueReturnsOutputFields) {
    return {
      amount: fields.amount,
    };
  }

  toJSON(): ViewParValueReturnsOutputJSON {
    return {
      amount: this.amount.toString(),
    };
  }

  static fromJSON(obj: ViewParValueReturnsOutputJSON): ViewParValueReturnsOutput {
    return new ViewParValueReturnsOutput({
      amount: new BN(obj.amount),
    });
  }

  toEncodable() {
    return ViewParValueReturnsOutput.toEncodable(this);
  }
}
