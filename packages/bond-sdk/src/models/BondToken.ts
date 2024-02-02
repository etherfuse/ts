import { PublicKey } from '@solana/web3.js';
import Decimal from 'decimal.js';

export type BondToken = {
  mint: PublicKey;
  supply: Decimal;
  description: string;
  interestRate: Decimal;
  coupon: Decimal;
  parValue: Decimal;
  uri: string;
  imageUrl: string;
  simulatedPriceError: boolean;
};

export default BondToken;
