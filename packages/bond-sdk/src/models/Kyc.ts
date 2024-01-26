import { PublicKey } from '@solana/web3.js';

export type Kyc = {
  wallet: PublicKey;
  is_disabled: boolean;
};
