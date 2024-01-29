import { PublicKey } from '@solana/web3.js';
import Decimal from 'decimal.js';

export enum OracleType {
  None,
  Test,
  Pyth,
}

export type OraclePrice = {
  price: Decimal;
  exponent: number;
};

export type OracleParams = {
  oracleAccount: PublicKey;
  oracleType: OracleType;
  maxPriceError: Decimal;
  maxPriceAgeSec: Decimal;
};

export default OracleParams;
