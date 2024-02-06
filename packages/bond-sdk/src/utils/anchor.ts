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
