import { PublicKey } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from 'bn.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';

export interface AddAdminParamsFields {
  admin: PublicKey;
  kycAuthority: PublicKey;
}

export interface AddAdminParamsJSON {
  admin: string;
  kycAuthority: string;
}

/** Pass in the admin pubkey as a param so that we can add it */
export class AddAdminParams {
  readonly admin: PublicKey;
  readonly kycAuthority: PublicKey;

  constructor(fields: AddAdminParamsFields) {
    this.admin = fields.admin;
    this.kycAuthority = fields.kycAuthority;
  }

  static layout(property?: string) {
    return borsh.struct([borsh.publicKey('admin'), borsh.publicKey('kycAuthority')], property);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new AddAdminParams({
      admin: obj.admin,
      kycAuthority: obj.kycAuthority,
    });
  }

  static toEncodable(fields: AddAdminParamsFields) {
    return {
      admin: fields.admin,
      kycAuthority: fields.kycAuthority,
    };
  }

  toJSON(): AddAdminParamsJSON {
    return {
      admin: this.admin.toString(),
      kycAuthority: this.kycAuthority.toString(),
    };
  }

  static fromJSON(obj: AddAdminParamsJSON): AddAdminParams {
    return new AddAdminParams({
      admin: new PublicKey(obj.admin),
      kycAuthority: new PublicKey(obj.kycAuthority),
    });
  }

  toEncodable() {
    return AddAdminParams.toEncodable(this);
  }
}
