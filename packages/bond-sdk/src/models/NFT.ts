import { PublicKey } from '@solana/web3.js';

export type NFT = {
  mint: PublicKey;
  counter: number;
};
