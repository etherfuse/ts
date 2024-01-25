import { PublicKey } from '@solana/web3.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from 'bn.js'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from '../types'; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from '@coral-xyz/borsh';

export interface InitCollectionParamsFields {
  /** The description of the bond collection i.e. the type of bond */
  description: string;
  /** The total mint supply of the collection that we cap at */
  supply: BN;
  /** The date that that collection starts accepting funds */
  fundingDate: BN;
  /** The start date that the bonds start accumulating interest and the mint closes */
  startDate: BN;
  /** The maturity date of the bond. This is the date that the bond can be redeemed */
  maturityDate: BN;
  /** The usd cost of the bond in the payment mint */
  paymentUsdCost: BN;
  /** The number of decimals in the payment mint */
  paymentDecimals: number;
  /** The oracle type: pyth, switchboard, etc */
  oracleParams: types.OracleParamsFields;
  /** nft access pass collection mint */
  nftAccessPassCollection: PublicKey;
  /** token uri */
  tokenUri: string;
  /** token name */
  tokenName: string;
  /** token symbol */
  tokenSymbol: string;
  /** nft uri */
  nftUri: string;
  /** nft name */
  nftName: string;
  /** nft symbol */
  nftSymbol: string;
}

export interface InitCollectionParamsJSON {
  /** The description of the bond collection i.e. the type of bond */
  description: string;
  /** The total mint supply of the collection that we cap at */
  supply: string;
  /** The date that that collection starts accepting funds */
  fundingDate: string;
  /** The start date that the bonds start accumulating interest and the mint closes */
  startDate: string;
  /** The maturity date of the bond. This is the date that the bond can be redeemed */
  maturityDate: string;
  /** The usd cost of the bond in the payment mint */
  paymentUsdCost: string;
  /** The number of decimals in the payment mint */
  paymentDecimals: number;
  /** The oracle type: pyth, switchboard, etc */
  oracleParams: types.OracleParamsJSON;
  /** nft access pass collection mint */
  nftAccessPassCollection: string;
  /** token uri */
  tokenUri: string;
  /** token name */
  tokenName: string;
  /** token symbol */
  tokenSymbol: string;
  /** nft uri */
  nftUri: string;
  /** nft name */
  nftName: string;
  /** nft symbol */
  nftSymbol: string;
}

/** The parameters for the init collection instruction */
export class InitCollectionParams {
  /** The description of the bond collection i.e. the type of bond */
  readonly description: string;
  /** The total mint supply of the collection that we cap at */
  readonly supply: BN;
  /** The date that that collection starts accepting funds */
  readonly fundingDate: BN;
  /** The start date that the bonds start accumulating interest and the mint closes */
  readonly startDate: BN;
  /** The maturity date of the bond. This is the date that the bond can be redeemed */
  readonly maturityDate: BN;
  /** The usd cost of the bond in the payment mint */
  readonly paymentUsdCost: BN;
  /** The number of decimals in the payment mint */
  readonly paymentDecimals: number;
  /** The oracle type: pyth, switchboard, etc */
  readonly oracleParams: types.OracleParams;
  /** nft access pass collection mint */
  readonly nftAccessPassCollection: PublicKey;
  /** token uri */
  readonly tokenUri: string;
  /** token name */
  readonly tokenName: string;
  /** token symbol */
  readonly tokenSymbol: string;
  /** nft uri */
  readonly nftUri: string;
  /** nft name */
  readonly nftName: string;
  /** nft symbol */
  readonly nftSymbol: string;

  constructor(fields: InitCollectionParamsFields) {
    this.description = fields.description;
    this.supply = fields.supply;
    this.fundingDate = fields.fundingDate;
    this.startDate = fields.startDate;
    this.maturityDate = fields.maturityDate;
    this.paymentUsdCost = fields.paymentUsdCost;
    this.paymentDecimals = fields.paymentDecimals;
    this.oracleParams = new types.OracleParams({ ...fields.oracleParams });
    this.nftAccessPassCollection = fields.nftAccessPassCollection;
    this.tokenUri = fields.tokenUri;
    this.tokenName = fields.tokenName;
    this.tokenSymbol = fields.tokenSymbol;
    this.nftUri = fields.nftUri;
    this.nftName = fields.nftName;
    this.nftSymbol = fields.nftSymbol;
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.str('description'),
        borsh.u64('supply'),
        borsh.i64('fundingDate'),
        borsh.i64('startDate'),
        borsh.i64('maturityDate'),
        borsh.u64('paymentUsdCost'),
        borsh.u8('paymentDecimals'),
        types.OracleParams.layout('oracleParams'),
        borsh.publicKey('nftAccessPassCollection'),
        borsh.str('tokenUri'),
        borsh.str('tokenName'),
        borsh.str('tokenSymbol'),
        borsh.str('nftUri'),
        borsh.str('nftName'),
        borsh.str('nftSymbol'),
      ],
      property
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new InitCollectionParams({
      description: obj.description,
      supply: obj.supply,
      fundingDate: obj.fundingDate,
      startDate: obj.startDate,
      maturityDate: obj.maturityDate,
      paymentUsdCost: obj.paymentUsdCost,
      paymentDecimals: obj.paymentDecimals,
      oracleParams: types.OracleParams.fromDecoded(obj.oracleParams),
      nftAccessPassCollection: obj.nftAccessPassCollection,
      tokenUri: obj.tokenUri,
      tokenName: obj.tokenName,
      tokenSymbol: obj.tokenSymbol,
      nftUri: obj.nftUri,
      nftName: obj.nftName,
      nftSymbol: obj.nftSymbol,
    });
  }

  static toEncodable(fields: InitCollectionParamsFields) {
    return {
      description: fields.description,
      supply: fields.supply,
      fundingDate: fields.fundingDate,
      startDate: fields.startDate,
      maturityDate: fields.maturityDate,
      paymentUsdCost: fields.paymentUsdCost,
      paymentDecimals: fields.paymentDecimals,
      oracleParams: types.OracleParams.toEncodable(fields.oracleParams),
      nftAccessPassCollection: fields.nftAccessPassCollection,
      tokenUri: fields.tokenUri,
      tokenName: fields.tokenName,
      tokenSymbol: fields.tokenSymbol,
      nftUri: fields.nftUri,
      nftName: fields.nftName,
      nftSymbol: fields.nftSymbol,
    };
  }

  toJSON(): InitCollectionParamsJSON {
    return {
      description: this.description,
      supply: this.supply.toString(),
      fundingDate: this.fundingDate.toString(),
      startDate: this.startDate.toString(),
      maturityDate: this.maturityDate.toString(),
      paymentUsdCost: this.paymentUsdCost.toString(),
      paymentDecimals: this.paymentDecimals,
      oracleParams: this.oracleParams.toJSON(),
      nftAccessPassCollection: this.nftAccessPassCollection.toString(),
      tokenUri: this.tokenUri,
      tokenName: this.tokenName,
      tokenSymbol: this.tokenSymbol,
      nftUri: this.nftUri,
      nftName: this.nftName,
      nftSymbol: this.nftSymbol,
    };
  }

  static fromJSON(obj: InitCollectionParamsJSON): InitCollectionParams {
    return new InitCollectionParams({
      description: obj.description,
      supply: new BN(obj.supply),
      fundingDate: new BN(obj.fundingDate),
      startDate: new BN(obj.startDate),
      maturityDate: new BN(obj.maturityDate),
      paymentUsdCost: new BN(obj.paymentUsdCost),
      paymentDecimals: obj.paymentDecimals,
      oracleParams: types.OracleParams.fromJSON(obj.oracleParams),
      nftAccessPassCollection: new PublicKey(obj.nftAccessPassCollection),
      tokenUri: obj.tokenUri,
      tokenName: obj.tokenName,
      tokenSymbol: obj.tokenSymbol,
      nftUri: obj.nftUri,
      nftName: obj.nftName,
      nftSymbol: obj.nftSymbol,
    });
  }

  toEncodable() {
    return InitCollectionParams.toEncodable(this);
  }
}
