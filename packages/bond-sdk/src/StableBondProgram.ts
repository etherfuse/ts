import { Wallet } from '@coral-xyz/anchor/dist/cjs/provider';
import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import { Address, Stablebond } from './models';
import Decimal from 'decimal.js';
export class StablebondProgram {
    constructor(connection: Connection, wallet: Wallet, bondProgramId?: PublicKey){

    }

    static getBonds(connection: Connection, bondProgramId: PublicKey): Promise<Stablebond[]> {
        return Promise.resolve([]);
    }

    static getBond(connection: Connection, bondProgramId: PublicKey, mint: Address): Promise<Stablebond> {
        return Promise.resolve({} as Stablebond);
    }

    mintBond(stablebondAddress: Address, uiAmount: Decimal): Promise<Transaction> {
        return Promise.resolve({} as Transaction);
    }

    redeemBond(stablebondAddress: Address, uiAmount?: Decimal): Promise<Transaction> {
        return Promise.resolve({} as Transaction);
    }

    redeemNFT(stablebondAddress: Address, nftMint: Address): Promise<Transaction> {
        return Promise.resolve({} as Transaction);
    }

    getUserTokens(): Promise<Stablebond[]> {
        return Promise.resolve([]);
    }
}
export default StablebondProgram;
