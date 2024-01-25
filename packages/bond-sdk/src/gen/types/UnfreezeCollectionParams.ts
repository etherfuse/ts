import { PublicKey } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from 'bn.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';

export interface UnfreezeCollectionParamsFields {}

export interface UnfreezeCollectionParamsJSON {}

export class UnfreezeCollectionParams {
  constructor(fields: UnfreezeCollectionParamsFields) {}

  static layout(property?: string) {
    return borsh.struct([], property);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new UnfreezeCollectionParams({});
  }

  static toEncodable(fields: UnfreezeCollectionParamsFields) {
    return {};
  }

  toJSON(): UnfreezeCollectionParamsJSON {
    return {};
  }

  static fromJSON(obj: UnfreezeCollectionParamsJSON): UnfreezeCollectionParams {
    return new UnfreezeCollectionParams({});
  }

  toEncodable() {
    return UnfreezeCollectionParams.toEncodable(this);
  }
}
