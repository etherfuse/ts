import { PublicKey } from '@solana/web3.js';
import Decimal from 'decimal.js';

export type BondNft = {
  mint: PublicKey;
  description: string;
  supply: Decimal;
  interestRate: Decimal;
  coupon: Decimal;
  parValue: Decimal;
  uri: string;
  imageUrl: string;
  simulatedPriceError: boolean;
};

export default BondNft;
