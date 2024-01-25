import { PublicKey } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from 'bn.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';

export interface MintBondParamsFields {
  amount: BN;
}

export interface MintBondParamsJSON {
  amount: string;
}

export class MintBondParams {
  readonly amount: BN;

  constructor(fields: MintBondParamsFields) {
    this.amount = fields.amount;
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u64('amount')], property);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new MintBondParams({
      amount: obj.amount,
    });
  }

  static toEncodable(fields: MintBondParamsFields) {
    return {
      amount: fields.amount,
    };
  }

  toJSON(): MintBondParamsJSON {
    return {
      amount: this.amount.toString(),
    };
  }

  static fromJSON(obj: MintBondParamsJSON): MintBondParams {
    return new MintBondParams({
      amount: new BN(obj.amount),
    });
  }

  toEncodable() {
    return MintBondParams.toEncodable(this);
  }
}
