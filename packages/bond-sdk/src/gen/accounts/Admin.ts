import { PublicKey, Connection } from '@solana/web3.js';
import BN from 'bn.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from '../programId';

export interface AdminFields {
  /** What is the pubkey of the admin for this Admin PDA. */
  authority: PublicKey;
  /** is_enabled flag to allow us to disable the admin. */
  isEnabled: boolean;
  /** The kyc authority pubkey that can add a kyc user. */
  kycAuthority: PublicKey;
  /** The bump seed for the admin account. */
  bump: number;
}

export interface AdminJSON {
  /** What is the pubkey of the admin for this Admin PDA. */
  authority: string;
  /** is_enabled flag to allow us to disable the admin. */
  isEnabled: boolean;
  /** The kyc authority pubkey that can add a kyc user. */
  kycAuthority: string;
  /** The bump seed for the admin account. */
  bump: number;
}

/** The admin account is used to control the program. */
export class Admin {
  /** What is the pubkey of the admin for this Admin PDA. */
  readonly authority: PublicKey;
  /** is_enabled flag to allow us to disable the admin. */
  readonly isEnabled: boolean;
  /** The kyc authority pubkey that can add a kyc user. */
  readonly kycAuthority: PublicKey;
  /** The bump seed for the admin account. */
  readonly bump: number;

  static readonly discriminator = Buffer.from([244, 158, 220, 65, 8, 73, 4, 65]);

  static readonly layout = borsh.struct([
    borsh.publicKey('authority'),
    borsh.bool('isEnabled'),
    borsh.publicKey('kycAuthority'),
    borsh.u8('bump'),
  ]);

  constructor(fields: AdminFields) {
    this.authority = fields.authority;
    this.isEnabled = fields.isEnabled;
    this.kycAuthority = fields.kycAuthority;
    this.bump = fields.bump;
  }

  static async fetch(c: Connection, address: PublicKey, programId: PublicKey = PROGRAM_ID): Promise<Admin | null> {
    const info = await c.getAccountInfo(address);

    if (info === null) {
      return null;
    }
    if (!info.owner.equals(programId)) {
      throw new Error("account doesn't belong to this program");
    }

    return this.decode(info.data);
  }

  static async fetchMultiple(
    c: Connection,
    addresses: PublicKey[],
    programId: PublicKey = PROGRAM_ID
  ): Promise<Array<Admin | null>> {
    const infos = await c.getMultipleAccountsInfo(addresses);

    return infos.map((info) => {
      if (info === null) {
        return null;
      }
      if (!info.owner.equals(programId)) {
        throw new Error("account doesn't belong to this program");
      }

      return this.decode(info.data);
    });
  }

  static decode(data: Buffer): Admin {
    if (!data.slice(0, 8).equals(Admin.discriminator)) {
      throw new Error('invalid account discriminator');
    }

    const dec = Admin.layout.decode(data.slice(8));

    return new Admin({
      authority: dec.authority,
      isEnabled: dec.isEnabled,
      kycAuthority: dec.kycAuthority,
      bump: dec.bump,
    });
  }

  toJSON(): AdminJSON {
    return {
      authority: this.authority.toString(),
      isEnabled: this.isEnabled,
      kycAuthority: this.kycAuthority.toString(),
      bump: this.bump,
    };
  }

  static fromJSON(obj: AdminJSON): Admin {
    return new Admin({
      authority: new PublicKey(obj.authority),
      isEnabled: obj.isEnabled,
      kycAuthority: new PublicKey(obj.kycAuthority),
      bump: obj.bump,
    });
  }
}
