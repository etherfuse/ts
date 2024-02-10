import { PublicKey } from '@solana/web3.js';
import Decimal from 'decimal.js';
import { OracleParams } from './Oracle';
import { FundingAccounts } from './FundingAccounts';

export type Collection = {
  bondAdmin: PublicKey;
  mint: PublicKey;
  description: string;
  nftMint: PublicKey;
  supply: number;
  totalBondsMinted: number;
  authority: PublicKey;
  paymentMint: PublicKey;
  paymentUsdCost: Decimal;
  paymentDecimals: number;
  oracleParams: OracleParams;
  fundingAccounts: FundingAccounts;
  fundingDate: Date;
  startDate: Date;
  maturityDate: Date;
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
