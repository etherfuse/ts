import { PublicKey, Connection } from '@solana/web3.js';
import BN from 'bn.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from '../programId';

export interface PaymentAccountFields {
  authority: PublicKey;
  bump: number;
}

export interface PaymentAccountJSON {
  authority: string;
  bump: number;
}

/** The PDA used for the payments recieved for minting a bond */
export class PaymentAccount {
  readonly authority: PublicKey;
  readonly bump: number;

  static readonly discriminator = Buffer.from([47, 239, 218, 78, 43, 193, 1, 61]);

  static readonly layout = borsh.struct([borsh.publicKey('authority'), borsh.u8('bump')]);

  constructor(fields: PaymentAccountFields) {
    this.authority = fields.authority;
    this.bump = fields.bump;
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<PaymentAccount | null> {
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
  ): Promise<Array<PaymentAccount | null>> {
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

  static decode(data: Buffer): PaymentAccount {
    if (!data.slice(0, 8).equals(PaymentAccount.discriminator)) {
      throw new Error('invalid account discriminator');
    }

    const dec = PaymentAccount.layout.decode(data.slice(8));

    return new PaymentAccount({
      authority: dec.authority,
      bump: dec.bump,
    });
  }

  toJSON(): PaymentAccountJSON {
    return {
      authority: this.authority.toString(),
      bump: this.bump,
    };
  }

  static fromJSON(obj: PaymentAccountJSON): PaymentAccount {
    return new PaymentAccount({
      authority: new PublicKey(obj.authority),
      bump: obj.bump,
    });
  }
}
