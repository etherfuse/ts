import { PublicKey } from '@solana/web3.js';

export type Pass = {
  wallet: PublicKey;
  isDisabled: boolean;
};
