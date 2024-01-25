import { PublicKey } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from 'bn.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';

export interface BurnPassParamsFields {
  root: Array<number>;
  dataHash: Array<number>;
  creatorHash: Array<number>;
  nonce: BN;
  index: number;
}

export interface BurnPassParamsJSON {
  root: Array<number>;
  dataHash: Array<number>;
  creatorHash: Array<number>;
  nonce: string;
  index: number;
}

export class BurnPassParams {
  readonly root: Array<number>;
  readonly dataHash: Array<number>;
  readonly creatorHash: Array<number>;
  readonly nonce: BN;
  readonly index: number;

  constructor(fields: BurnPassParamsFields) {
    this.root = fields.root;
    this.dataHash = fields.dataHash;
    this.creatorHash = fields.creatorHash;
    this.nonce = fields.nonce;
    this.index = fields.index;
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.array(borsh.u8(), 32, 'root'),
        borsh.array(borsh.u8(), 32, 'dataHash'),
        borsh.array(borsh.u8(), 32, 'creatorHash'),
        borsh.u64('nonce'),
        borsh.u32('index'),
      ],
      property
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new BurnPassParams({
      root: obj.root,
      dataHash: obj.dataHash,
      creatorHash: obj.creatorHash,
      nonce: obj.nonce,
      index: obj.index,
    });
  }

  static toEncodable(fields: BurnPassParamsFields) {
    return {
      root: fields.root,
      dataHash: fields.dataHash,
      creatorHash: fields.creatorHash,
      nonce: fields.nonce,
      index: fields.index,
    };
  }

  toJSON(): BurnPassParamsJSON {
    return {
      root: this.root,
      dataHash: this.dataHash,
      creatorHash: this.creatorHash,
      nonce: this.nonce.toString(),
      index: this.index,
    };
  }

  static fromJSON(obj: BurnPassParamsJSON): BurnPassParams {
    return new BurnPassParams({
      root: obj.root,
      dataHash: obj.dataHash,
      creatorHash: obj.creatorHash,
      nonce: new BN(obj.nonce),
      index: obj.index,
    });
  }

  toEncodable() {
    return BurnPassParams.toEncodable(this);
  }
}
