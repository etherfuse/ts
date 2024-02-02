import { PublicKey } from '@solana/web3.js';
import Decimal from 'decimal.js';

export type BondNft = {
  mint: PublicKey;
  description: string;
  bondCollectionNftMint: PublicKey;
  bondCollectionMint: PublicKey;
  userWallet: PublicKey;
  supply: Decimal;
  interestRate: Decimal;
  coupon: Decimal;
  parValue: Decimal;
  uri: string;
  imageUrl: string;
  simulatedPriceError: boolean;
};

export default BondNft;
