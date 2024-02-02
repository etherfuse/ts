import { Keypair } from '@solana/web3.js';
import { Wallet, BN } from '@coral-xyz/anchor';
import Decimal from 'decimal.js';

export const getReadOnlyWallet = (): Wallet => {
  const keypair = Keypair.generate();
  return {
    payer: keypair,
    publicKey: keypair.publicKey,
    signAllTransactions: async (txs) => txs,
    signTransaction: async (txs) => txs,
  };
};

export const replaceBigNumberWithDecimal = <T>(obj: T): T => {
  for (let [key, value] of Object.entries(obj!)) {
    if (value instanceof BN) {
      // @ts-ignore
      obj[key] = new Decimal(value.toString());
    }
  }
  return obj;
};
