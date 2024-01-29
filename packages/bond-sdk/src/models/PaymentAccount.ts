import { PublicKey } from '@solana/web3.js';

export type PaymentAccount = {
  authority: PublicKey;
};

export default PaymentAccount;
