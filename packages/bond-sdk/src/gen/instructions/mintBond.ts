import { TransactionInstruction, PublicKey, AccountMeta } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from 'bn.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from '../programId';

export interface MintBondArgs {
  params: types.MintBondParamsFields;
}

export interface MintBondAccounts {
  /** The soon to be owner of the bond. */
  owner: PublicKey;
  /** The payment account pda which has an ata which receives the payment for the bond */
  paymentAccount: PublicKey;
  /** The payment token account that is used to receive payment for the bond */
  paymentTokenAccount: PublicKey;
  /** The owner token account that is used to pay for the bond */
  ownerTokenAccount: PublicKey;
  /** The mint pubkey of the bond that is set in the collection */
  mint: PublicKey;
  /** The mint of the token that is used to pay for the bond */
  paymentMint: PublicKey;
  /** The price feed from the oracle that is used to calculate the payment amount */
  paymentPriceFeed: PublicKey;
  /** The bond token account for the user that is minting the bond */
  bondTokenAccount: PublicKey;
  /** The collection that the bond is being minted from */
  collection: PublicKey;
  kyc: PublicKey;
  pass: PublicKey;
  /** The token program since we are minting a token */
  tokenProgram: PublicKey;
  /** The associated token program since we are potentially creating a new associated token account */
  associatedTokenProgram: PublicKey;
  /** The system program since we are creating accounts */
  systemProgram: PublicKey;
}

export const layout = borsh.struct([types.MintBondParams.layout('params')]);

export function mintBond(args: MintBondArgs, accounts: MintBondAccounts, programId: PublicKey = PROGRAM_ID) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.owner, isSigner: true, isWritable: true },
    { pubkey: accounts.paymentAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.paymentTokenAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.ownerTokenAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.mint, isSigner: false, isWritable: true },
    { pubkey: accounts.paymentMint, isSigner: false, isWritable: false },
    { pubkey: accounts.paymentPriceFeed, isSigner: false, isWritable: false },
    { pubkey: accounts.bondTokenAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.collection, isSigner: false, isWritable: true },
    { pubkey: accounts.kyc, isSigner: false, isWritable: false },
    { pubkey: accounts.pass, isSigner: false, isWritable: false },
    { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
    {
      pubkey: accounts.associatedTokenProgram,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ];
  const identifier = Buffer.from([234, 94, 85, 225, 167, 102, 169, 32]);
  const buffer = Buffer.alloc(1000);
  const len = layout.encode(
    {
      params: types.MintBondParams.toEncodable(args.params),
    },
    buffer
  );
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
  const ix = new TransactionInstruction({ keys, programId, data });
  return ix;
}
