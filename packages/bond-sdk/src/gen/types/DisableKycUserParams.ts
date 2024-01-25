import { PublicKey } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from 'bn.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';

export interface DisableKycUserParamsFields {
  wallet: PublicKey;
}

export interface DisableKycUserParamsJSON {
  wallet: string;
}

/** Pass in the admin pubkey as a param so that we can add it */
export class DisableKycUserParams {
  readonly wallet: PublicKey;

  constructor(fields: DisableKycUserParamsFields) {
    this.wallet = fields.wallet;
  }

  static layout(property?: string) {
    return borsh.struct([borsh.publicKey('wallet')], property);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new DisableKycUserParams({
      wallet: obj.wallet,
    });
  }

  static toEncodable(fields: DisableKycUserParamsFields) {
    return {
      wallet: fields.wallet,
    };
  }

  toJSON(): DisableKycUserParamsJSON {
    return {
      wallet: this.wallet.toString(),
    };
  }

  static fromJSON(obj: DisableKycUserParamsJSON): DisableKycUserParams {
    return new DisableKycUserParams({
      wallet: new PublicKey(obj.wallet),
    });
  }

  toEncodable() {
    return DisableKycUserParams.toEncodable(this);
  }
}
