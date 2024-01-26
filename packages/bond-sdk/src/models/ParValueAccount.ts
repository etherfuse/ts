import { PublicKey } from '@solana/web3.js';
import { Decimal } from 'decimal.js';

export type ParValueAccount = {
  authority: PublicKey;
  runningTotal: Array<Decimal>;
};
