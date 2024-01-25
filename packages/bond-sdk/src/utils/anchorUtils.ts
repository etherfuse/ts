import { Keypair } from '@solana/web3.js';
import { Wallet } from '@coral-xyz/anchor';

export const getReadOnlyWallet = (): Wallet => {
  const keypair = Keypair.generate();
  return {
    payer: keypair,
    publicKey: keypair.publicKey,
    signAllTransactions: async (txs) => txs,
    signTransaction: async (txs) => txs,
  };
};
