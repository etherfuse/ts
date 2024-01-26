import { PublicKey } from '@solana/web3.js';
import Decimal from 'decimal.js';
import { OracleParams } from './Oracle';
import { FundingAccounts } from './FundingAccounts';

export type Collection = {
  bondAdmin: PublicKey;
  mint: PublicKey;
  description: string;
  nftMint: PublicKey;
  supply: Decimal;
  totalBondsMinted: Decimal;
  authority: PublicKey;
  paymentMint: PublicKey;
  paymentUsdCost: Decimal;
  paymentDecimals: number;
  oracleParams: OracleParams;
  fundingAccounts: FundingAccounts;
  fundingDate: number;
  startDate: number;
  maturityDate: number;
  interestRate: Decimal;
  isFrozen: boolean;
  nftAccessPassCollection: PublicKey;
  tokenUri: string;
  tokenName: string;
  tokenSymbol: string;
  nftUri: string;
  nftName: string;
  nftSymbol: string;
};

export default Collection;
