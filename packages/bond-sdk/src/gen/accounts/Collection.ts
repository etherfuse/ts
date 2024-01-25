import { PublicKey, Connection } from '@solana/web3.js';
import BN from 'bn.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from '../programId';

export interface CollectionFields {
  /** The bond admin that is adding the collection */
  bondAdmin: PublicKey;
  /** The mint that will be used to mint the bonds */
  mint: PublicKey;
  /** The bond type description */
  description: string;
  /** The nft mint that will be used to show collection nft details */
  nftMint: PublicKey;
  /**
   * The total supply of bonds that can be minted
   * This total amount is deducted from each mint
   */
  supply: BN;
  /** The total amount of bonds that have been minted */
  totalBondsMinted: BN;
  /**
   * The authority that can mint bonds
   * This would be the pda so that it can sign for the mint
   */
  authority: PublicKey;
  /** The payment mint that is used to pay for the bond */
  paymentMint: PublicKey;
  /** The payment usd cost of the bond in the payment mint */
  paymentUsdCost: BN;
  /** The decimals of the mint that is used to pay for the bond */
  paymentDecimals: number;
  /** The oracle type that is used to get the price feed */
  oracleParams: types.OracleParamsFields;
  /** The funding accounts for the collection */
  fundingAccounts: types.FundingAccountsFields;
  /** The date that that collection starts accepting funds */
  fundingDate: BN;
  /** The start date that the bonds start accumulating interest and the mint closes */
  startDate: BN;
  /** The maturity date of the bond. This is the date that the bond can be redeemed */
  maturityDate: BN;
  /** The interest rate of the bond collection. **This is cosmetic and is not used in the program** */
  interestRate: number;
  /** Whether the collection is frozen or not */
  isFrozen: boolean;
  /** The NFT pass collection metadata mint */
  nftAccessPassCollection: PublicKey;
  /** The bond spl token uri */
  tokenUri: string;
  /** The bond spl token name */
  tokenName: string;
  /** The bond spl token symbol */
  tokenSymbol: string;
  /** The bond nft token uri */
  nftUri: string;
  /** The bond nft token name */
  nftName: string;
  /** The bond nft token symbol */
  nftSymbol: string;
  /** The bump seed for the collection pda */
  bump: number;
}

export interface CollectionJSON {
  /** The bond admin that is adding the collection */
  bondAdmin: string;
  /** The mint that will be used to mint the bonds */
  mint: string;
  /** The bond type description */
  description: string;
  /** The nft mint that will be used to show collection nft details */
  nftMint: string;
  /**
   * The total supply of bonds that can be minted
   * This total amount is deducted from each mint
   */
  supply: string;
  /** The total amount of bonds that have been minted */
  totalBondsMinted: string;
  /**
   * The authority that can mint bonds
   * This would be the pda so that it can sign for the mint
   */
  authority: string;
  /** The payment mint that is used to pay for the bond */
  paymentMint: string;
  /** The payment usd cost of the bond in the payment mint */
  paymentUsdCost: string;
  /** The decimals of the mint that is used to pay for the bond */
  paymentDecimals: number;
  /** The oracle type that is used to get the price feed */
  oracleParams: types.OracleParamsJSON;
  /** The funding accounts for the collection */
  fundingAccounts: types.FundingAccountsJSON;
  /** The date that that collection starts accepting funds */
  fundingDate: string;
  /** The start date that the bonds start accumulating interest and the mint closes */
  startDate: string;
  /** The maturity date of the bond. This is the date that the bond can be redeemed */
  maturityDate: string;
  /** The interest rate of the bond collection. **This is cosmetic and is not used in the program** */
  interestRate: number;
  /** Whether the collection is frozen or not */
  isFrozen: boolean;
  /** The NFT pass collection metadata mint */
  nftAccessPassCollection: string;
  /** The bond spl token uri */
  tokenUri: string;
  /** The bond spl token name */
  tokenName: string;
  /** The bond spl token symbol */
  tokenSymbol: string;
  /** The bond nft token uri */
  nftUri: string;
  /** The bond nft token name */
  nftName: string;
  /** The bond nft token symbol */
  nftSymbol: string;
  /** The bump seed for the collection pda */
  bump: number;
}

/** The collection pda */
export class Collection {
  /** The bond admin that is adding the collection */
  readonly bondAdmin: PublicKey;
  /** The mint that will be used to mint the bonds */
  readonly mint: PublicKey;
  /** The bond type description */
  readonly description: string;
  /** The nft mint that will be used to show collection nft details */
  readonly nftMint: PublicKey;
  /**
   * The total supply of bonds that can be minted
   * This total amount is deducted from each mint
   */
  readonly supply: BN;
  /** The total amount of bonds that have been minted */
  readonly totalBondsMinted: BN;
  /**
   * The authority that can mint bonds
   * This would be the pda so that it can sign for the mint
   */
  readonly authority: PublicKey;
  /** The payment mint that is used to pay for the bond */
  readonly paymentMint: PublicKey;
  /** The payment usd cost of the bond in the payment mint */
  readonly paymentUsdCost: BN;
  /** The decimals of the mint that is used to pay for the bond */
  readonly paymentDecimals: number;
  /** The oracle type that is used to get the price feed */
  readonly oracleParams: types.OracleParams;
  /** The funding accounts for the collection */
  readonly fundingAccounts: types.FundingAccounts;
  /** The date that that collection starts accepting funds */
  readonly fundingDate: BN;
  /** The start date that the bonds start accumulating interest and the mint closes */
  readonly startDate: BN;
  /** The maturity date of the bond. This is the date that the bond can be redeemed */
  readonly maturityDate: BN;
  /** The interest rate of the bond collection. **This is cosmetic and is not used in the program** */
  readonly interestRate: number;
  /** Whether the collection is frozen or not */
  readonly isFrozen: boolean;
  /** The NFT pass collection metadata mint */
  readonly nftAccessPassCollection: PublicKey;
  /** The bond spl token uri */
  readonly tokenUri: string;
  /** The bond spl token name */
  readonly tokenName: string;
  /** The bond spl token symbol */
  readonly tokenSymbol: string;
  /** The bond nft token uri */
  readonly nftUri: string;
  /** The bond nft token name */
  readonly nftName: string;
  /** The bond nft token symbol */
  readonly nftSymbol: string;
  /** The bump seed for the collection pda */
  readonly bump: number;

  static readonly discriminator = Buffer.from([48, 160, 232, 205, 191, 207, 26, 141]);

  static readonly layout = borsh.struct([
    borsh.publicKey('bondAdmin'),
    borsh.publicKey('mint'),
    borsh.str('description'),
    borsh.publicKey('nftMint'),
    borsh.u64('supply'),
    borsh.u64('totalBondsMinted'),
    borsh.publicKey('authority'),
    borsh.publicKey('paymentMint'),
    borsh.u64('paymentUsdCost'),
    borsh.u8('paymentDecimals'),
    types.OracleParams.layout('oracleParams'),
    types.FundingAccounts.layout('fundingAccounts'),
    borsh.i64('fundingDate'),
    borsh.i64('startDate'),
    borsh.i64('maturityDate'),
    borsh.f64('interestRate'),
    borsh.bool('isFrozen'),
    borsh.publicKey('nftAccessPassCollection'),
    borsh.str('tokenUri'),
    borsh.str('tokenName'),
    borsh.str('tokenSymbol'),
    borsh.str('nftUri'),
    borsh.str('nftName'),
    borsh.str('nftSymbol'),
    borsh.u8('bump'),
  ]);

  constructor(fields: CollectionFields) {
    this.bondAdmin = fields.bondAdmin;
    this.mint = fields.mint;
    this.description = fields.description;
    this.nftMint = fields.nftMint;
    this.supply = fields.supply;
    this.totalBondsMinted = fields.totalBondsMinted;
    this.authority = fields.authority;
    this.paymentMint = fields.paymentMint;
    this.paymentUsdCost = fields.paymentUsdCost;
    this.paymentDecimals = fields.paymentDecimals;
    this.oracleParams = new types.OracleParams({ ...fields.oracleParams });
    this.fundingAccounts = new types.FundingAccounts({
      ...fields.fundingAccounts,
    });
    this.fundingDate = fields.fundingDate;
    this.startDate = fields.startDate;
    this.maturityDate = fields.maturityDate;
    this.interestRate = fields.interestRate;
    this.isFrozen = fields.isFrozen;
    this.nftAccessPassCollection = fields.nftAccessPassCollection;
    this.tokenUri = fields.tokenUri;
    this.tokenName = fields.tokenName;
    this.tokenSymbol = fields.tokenSymbol;
    this.nftUri = fields.nftUri;
    this.nftName = fields.nftName;
    this.nftSymbol = fields.nftSymbol;
    this.bump = fields.bump;
  }

  static async fetch(c: Connection, address: PublicKey, programId: PublicKey = PROGRAM_ID): Promise<Collection | null> {
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
  ): Promise<Array<Collection | null>> {
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

  static decode(data: Buffer): Collection {
    if (!data.slice(0, 8).equals(Collection.discriminator)) {
      throw new Error('invalid account discriminator');
    }

    const dec = Collection.layout.decode(data.slice(8));

    return new Collection({
      bondAdmin: dec.bondAdmin,
      mint: dec.mint,
      description: dec.description,
      nftMint: dec.nftMint,
      supply: dec.supply,
      totalBondsMinted: dec.totalBondsMinted,
      authority: dec.authority,
      paymentMint: dec.paymentMint,
      paymentUsdCost: dec.paymentUsdCost,
      paymentDecimals: dec.paymentDecimals,
      oracleParams: types.OracleParams.fromDecoded(dec.oracleParams),
      fundingAccounts: types.FundingAccounts.fromDecoded(dec.fundingAccounts),
      fundingDate: dec.fundingDate,
      startDate: dec.startDate,
      maturityDate: dec.maturityDate,
      interestRate: dec.interestRate,
      isFrozen: dec.isFrozen,
      nftAccessPassCollection: dec.nftAccessPassCollection,
      tokenUri: dec.tokenUri,
      tokenName: dec.tokenName,
      tokenSymbol: dec.tokenSymbol,
      nftUri: dec.nftUri,
      nftName: dec.nftName,
      nftSymbol: dec.nftSymbol,
      bump: dec.bump,
    });
  }

  toJSON(): CollectionJSON {
    return {
      bondAdmin: this.bondAdmin.toString(),
      mint: this.mint.toString(),
      description: this.description,
      nftMint: this.nftMint.toString(),
      supply: this.supply.toString(),
      totalBondsMinted: this.totalBondsMinted.toString(),
      authority: this.authority.toString(),
      paymentMint: this.paymentMint.toString(),
      paymentUsdCost: this.paymentUsdCost.toString(),
      paymentDecimals: this.paymentDecimals,
      oracleParams: this.oracleParams.toJSON(),
      fundingAccounts: this.fundingAccounts.toJSON(),
      fundingDate: this.fundingDate.toString(),
      startDate: this.startDate.toString(),
      maturityDate: this.maturityDate.toString(),
      interestRate: this.interestRate,
      isFrozen: this.isFrozen,
      nftAccessPassCollection: this.nftAccessPassCollection.toString(),
      tokenUri: this.tokenUri,
      tokenName: this.tokenName,
      tokenSymbol: this.tokenSymbol,
      nftUri: this.nftUri,
      nftName: this.nftName,
      nftSymbol: this.nftSymbol,
      bump: this.bump,
    };
  }

  static fromJSON(obj: CollectionJSON): Collection {
    return new Collection({
      bondAdmin: new PublicKey(obj.bondAdmin),
      mint: new PublicKey(obj.mint),
      description: obj.description,
      nftMint: new PublicKey(obj.nftMint),
      supply: new BN(obj.supply),
      totalBondsMinted: new BN(obj.totalBondsMinted),
      authority: new PublicKey(obj.authority),
      paymentMint: new PublicKey(obj.paymentMint),
      paymentUsdCost: new BN(obj.paymentUsdCost),
      paymentDecimals: obj.paymentDecimals,
      oracleParams: types.OracleParams.fromJSON(obj.oracleParams),
      fundingAccounts: types.FundingAccounts.fromJSON(obj.fundingAccounts),
      fundingDate: new BN(obj.fundingDate),
      startDate: new BN(obj.startDate),
      maturityDate: new BN(obj.maturityDate),
      interestRate: obj.interestRate,
      isFrozen: obj.isFrozen,
      nftAccessPassCollection: new PublicKey(obj.nftAccessPassCollection),
      tokenUri: obj.tokenUri,
      tokenName: obj.tokenName,
      tokenSymbol: obj.tokenSymbol,
      nftUri: obj.nftUri,
      nftName: obj.nftName,
      nftSymbol: obj.nftSymbol,
      bump: obj.bump,
    });
  }
}
