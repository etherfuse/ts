import { PublicKey } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from 'bn.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';

export interface SetFundingAccountsParamsFields {}

export interface SetFundingAccountsParamsJSON {}

export class SetFundingAccountsParams {
  constructor(fields: SetFundingAccountsParamsFields) {}

  static layout(property?: string) {
    return borsh.struct([], property);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new SetFundingAccountsParams({});
  }

  static toEncodable(fields: SetFundingAccountsParamsFields) {
    return {};
  }

  toJSON(): SetFundingAccountsParamsJSON {
    return {};
  }

  static fromJSON(obj: SetFundingAccountsParamsJSON): SetFundingAccountsParams {
    return new SetFundingAccountsParams({});
  }

  toEncodable() {
    return SetFundingAccountsParams.toEncodable(this);
  }
}
