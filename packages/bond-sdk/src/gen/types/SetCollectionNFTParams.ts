import { PublicKey } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from 'bn.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';

export interface SetCollectionNFTParamsFields {}

export interface SetCollectionNFTParamsJSON {}

export class SetCollectionNFTParams {
  constructor(fields: SetCollectionNFTParamsFields) {}

  static layout(property?: string) {
    return borsh.struct([], property);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new SetCollectionNFTParams({});
  }

  static toEncodable(fields: SetCollectionNFTParamsFields) {
    return {};
  }

  toJSON(): SetCollectionNFTParamsJSON {
    return {};
  }

  static fromJSON(obj: SetCollectionNFTParamsJSON): SetCollectionNFTParams {
    return new SetCollectionNFTParams({});
  }

  toEncodable() {
    return SetCollectionNFTParams.toEncodable(this);
  }
}
