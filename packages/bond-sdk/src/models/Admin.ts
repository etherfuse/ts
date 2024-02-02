import { PublicKey } from '@solana/web3.js';

export type Admin = {
  authority: PublicKey;
  isEnabled: boolean;
  kycAuthority: PublicKey;
};

export default Admin;
