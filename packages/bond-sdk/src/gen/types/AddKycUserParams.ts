import { PublicKey } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from 'bn.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';

export interface AddKycUserParamsFields {
  wallet: PublicKey;
}

export interface AddKycUserParamsJSON {
  wallet: string;
}

/** Pass in the admin pubkey as a param so that we can add it */
export class AddKycUserParams {
  readonly wallet: PublicKey;

  constructor(fields: AddKycUserParamsFields) {
    this.wallet = fields.wallet;
  }

  static layout(property?: string) {
    return borsh.struct([borsh.publicKey('wallet')], property);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new AddKycUserParams({
      wallet: obj.wallet,
    });
  }

  static toEncodable(fields: AddKycUserParamsFields) {
    return {
      wallet: fields.wallet,
    };
  }

  toJSON(): AddKycUserParamsJSON {
    return {
      wallet: this.wallet.toString(),
    };
  }

  static fromJSON(obj: AddKycUserParamsJSON): AddKycUserParams {
    return new AddKycUserParams({
      wallet: new PublicKey(obj.wallet),
    });
  }

  toEncodable() {
    return AddKycUserParams.toEncodable(this);
  }
}
