import { PublicKey } from '@solana/web3.js';
import Decimal from 'decimal.js';

export type BondToken = {
  mint: PublicKey;
  description: string;
  isNft: boolean;
  supply: Decimal;
  interestRate: Decimal;
  coupon: Decimal;
  parValue: Decimal;
  uri: string;
  imageUrl: string;
  simulatedPriceError: boolean;
};

export default BondToken;
