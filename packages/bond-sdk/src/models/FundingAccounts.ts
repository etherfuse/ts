import { PublicKey } from '@solana/web3.js';

export type FundingAccounts = {
  paymentTokenAccount: PublicKey;
  interestPaymentTokenAccount: PublicKey;
  parValuePaymentTokenAccount: PublicKey;
};
