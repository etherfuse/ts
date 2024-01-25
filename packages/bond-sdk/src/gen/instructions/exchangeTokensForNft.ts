import { TransactionInstruction, PublicKey, AccountMeta } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from 'bn.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from '../programId';

export interface ExchangeTokensForNftArgs {
  params: types.ExchangeTokensForNFTParamsFields;
}

export interface ExchangeTokensForNftAccounts {
  /** The owner of the bonds */
  owner: PublicKey;
  /** TODO: add in the needs to not be in funding period and other time checks */
  collection: PublicKey;
  nft: PublicKey;
  nftMint: PublicKey;
  bondMint: PublicKey;
  pdaBondTokenAccount: PublicKey;
  ownerBondTokenAccount: PublicKey;
  ownerNftTokenAccount: PublicKey;
  kyc: PublicKey;
  tokenProgram: PublicKey;
  associatedTokenProgram: PublicKey;
  systemProgram: PublicKey;
}

export const layout = borsh.struct([types.ExchangeTokensForNFTParams.layout('params')]);

export function exchangeTokensForNft(
  args: ExchangeTokensForNftArgs,
  accounts: ExchangeTokensForNftAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.owner, isSigner: true, isWritable: true },
    { pubkey: accounts.collection, isSigner: false, isWritable: false },
    { pubkey: accounts.nft, isSigner: false, isWritable: true },
    { pubkey: accounts.nftMint, isSigner: true, isWritable: true },
    { pubkey: accounts.bondMint, isSigner: false, isWritable: false },
    { pubkey: accounts.pdaBondTokenAccount, isSigner: false, isWritable: true },
    {
      pubkey: accounts.ownerBondTokenAccount,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: accounts.ownerNftTokenAccount,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: accounts.kyc, isSigner: false, isWritable: false },
    { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
    {
      pubkey: accounts.associatedTokenProgram,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ];
  const identifier = Buffer.from([205, 148, 176, 44, 60, 115, 118, 176]);
  const buffer = Buffer.alloc(1000);
  const len = layout.encode(
    {
      params: types.ExchangeTokensForNFTParams.toEncodable(args.params),
    },
    buffer
  );
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
  const ix = new TransactionInstruction({ keys, programId, data });
  return ix;
}
