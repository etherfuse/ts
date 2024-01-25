import { PublicKey } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from 'bn.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';

export interface CollectCouponParamsFields {}

export interface CollectCouponParamsJSON {}

export class CollectCouponParams {
  constructor(fields: CollectCouponParamsFields) {}

  static layout(property?: string) {
    return borsh.struct([], property);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new CollectCouponParams({});
  }

  static toEncodable(fields: CollectCouponParamsFields) {
    return {};
  }

  toJSON(): CollectCouponParamsJSON {
    return {};
  }

  static fromJSON(obj: CollectCouponParamsJSON): CollectCouponParams {
    return new CollectCouponParams({});
  }

  toEncodable() {
    return CollectCouponParams.toEncodable(this);
  }
}
