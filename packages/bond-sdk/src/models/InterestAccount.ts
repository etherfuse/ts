import { PublicKey } from '@solana/web3.js';
import Decimal from 'decimal.js';

export type InterestAccount = {
  authority: PublicKey;
  runningTotal: Array<Decimal>;
  counter: Decimal;
};

export default InterestAccount;
