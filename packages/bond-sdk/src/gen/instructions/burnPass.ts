import { TransactionInstruction, PublicKey, AccountMeta } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from 'bn.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from '../programId';

export interface BurnPassArgs {
  params: types.BurnPassParamsFields;
}

export interface BurnPassAccounts {
  /** The kyc authority of the bond admin account of any collection */
  passOwner: PublicKey;
  /** The pass account that is being added */
  pass: PublicKey;
  /** The global pass config account with collection_owner tree address to check against */
  globalPassConfig: PublicKey;
  collectionOwner: PublicKey;
  leafDelegate: PublicKey;
  treeAuthority: PublicKey;
  merkleTree: PublicKey;
  logWrapper: PublicKey;
  compressionProgram: PublicKey;
  bubblegumProgram: PublicKey;
  systemProgram: PublicKey;
}

export const layout = borsh.struct([types.BurnPassParams.layout('params')]);

export function burnPass(args: BurnPassArgs, accounts: BurnPassAccounts, programId: PublicKey = PROGRAM_ID) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.passOwner, isSigner: true, isWritable: true },
    { pubkey: accounts.pass, isSigner: false, isWritable: true },
    { pubkey: accounts.globalPassConfig, isSigner: false, isWritable: false },
    { pubkey: accounts.collectionOwner, isSigner: false, isWritable: false },
    { pubkey: accounts.leafDelegate, isSigner: true, isWritable: true },
    { pubkey: accounts.treeAuthority, isSigner: false, isWritable: true },
    { pubkey: accounts.merkleTree, isSigner: false, isWritable: true },
    { pubkey: accounts.logWrapper, isSigner: false, isWritable: false },
    { pubkey: accounts.compressionProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.bubblegumProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ];
  const identifier = Buffer.from([180, 84, 193, 242, 253, 193, 239, 147]);
  const buffer = Buffer.alloc(1000);
  const len = layout.encode(
    {
      params: types.BurnPassParams.toEncodable(args.params),
    },
    buffer
  );
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
  const ix = new TransactionInstruction({ keys, programId, data });
  return ix;
}
