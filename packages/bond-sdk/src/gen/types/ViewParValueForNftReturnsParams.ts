import { PublicKey } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from 'bn.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';

export interface ViewParValueForNftReturnsParamsFields {}

export interface ViewParValueForNftReturnsParamsJSON {}

export class ViewParValueForNftReturnsParams {
  constructor(fields: ViewParValueForNftReturnsParamsFields) {}

  static layout(property?: string) {
    return borsh.struct([], property);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new ViewParValueForNftReturnsParams({});
  }

  static toEncodable(fields: ViewParValueForNftReturnsParamsFields) {
    return {};
  }

  toJSON(): ViewParValueForNftReturnsParamsJSON {
    return {};
  }

  static fromJSON(obj: ViewParValueForNftReturnsParamsJSON): ViewParValueForNftReturnsParams {
    return new ViewParValueForNftReturnsParams({});
  }

  toEncodable() {
    return ViewParValueForNftReturnsParams.toEncodable(this);
  }
}
