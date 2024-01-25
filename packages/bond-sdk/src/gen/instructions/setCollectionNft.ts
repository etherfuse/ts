import { TransactionInstruction, PublicKey, AccountMeta } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from 'bn.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from '../programId';

export interface SetCollectionNftArgs {
  params: types.SetCollectionNFTParamsFields;
}

export interface SetCollectionNftAccounts {
  /** The bond admin that is signing the transaction */
  bondAdmin: PublicKey;
  collectionNftMint: PublicKey;
  /**
   * The admin PDA that is used to make sure the bond admin
   * that signed the transaction is an active admin
   */
  admin: PublicKey;
  /** The collection where the mint is being set */
  collection: PublicKey;
  /** The bond mint */
  bondMint: PublicKey;
  pdaCollectionNftTokenAccount: PublicKey;
  collectionMetadata: PublicKey;
  collectionMasterEdition: PublicKey;
  tokenMetadataProgram: PublicKey;
  /** The associated token program */
  associatedTokenProgram: PublicKey;
  /** The token program since we are minting */
  tokenProgram: PublicKey;
  /** The rent sysvar */
  rent: PublicKey;
  /** The system program since we create an account */
  systemProgram: PublicKey;
}

export const layout = borsh.struct([types.SetCollectionNFTParams.layout('params')]);

export function setCollectionNft(
  args: SetCollectionNftArgs,
  accounts: SetCollectionNftAccounts,
  programId: PublicKey = PROGRAM_ID
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.bondAdmin, isSigner: true, isWritable: true },
    { pubkey: accounts.collectionNftMint, isSigner: true, isWritable: true },
    { pubkey: accounts.admin, isSigner: false, isWritable: false },
    { pubkey: accounts.collection, isSigner: false, isWritable: false },
    { pubkey: accounts.bondMint, isSigner: false, isWritable: true },
    {
      pubkey: accounts.pdaCollectionNftTokenAccount,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: accounts.collectionMetadata, isSigner: false, isWritable: true },
    {
      pubkey: accounts.collectionMasterEdition,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: accounts.tokenMetadataProgram,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: accounts.associatedTokenProgram,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.rent, isSigner: false, isWritable: false },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ];
  const identifier = Buffer.from([195, 122, 23, 106, 157, 69, 87, 193]);
  const buffer = Buffer.alloc(1000);
  const len = layout.encode(
    {
      params: types.SetCollectionNFTParams.toEncodable(args.params),
    },
    buffer
  );
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len);
  const ix = new TransactionInstruction({ keys, programId, data });
  return ix;
}
