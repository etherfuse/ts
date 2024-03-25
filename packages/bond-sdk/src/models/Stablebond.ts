import Decimal from "decimal.js";

export type Address = string;
export interface Stablebond {
    address: Address;
    issuanceNumber: number;
    cutoffInSeconds: number;
    lengthInSeconds: number;
    bondFeeBps: number;
    mint: StablebondToken;
    paymentPriceFeedId: Address;
    paymentMint: Address;
    version: number;
    padding: Array<number>;
  }
  
  export interface StablebondToken {
    address: Address;
    decimals: number;
    name: string;
    symbol: string;
    totalSupply: Decimal;
    logoUri: string;
    UIAmount: Decimal;
  }

  export interface StablebondIssuance {
    address: Address;
    liquidity: number;
    requestedRedemptions: number;
    startingTokenAmount: number;
    endingTokenAmount: number;
    startDatetime: number;
    interestRateBps: number;
    status: IssuanceStatus;
    parentBond: Address;
    version: number;
    padding: Array<number>;
  }

  export enum IssuanceStatus {
    Upcoming,
    Started,
    Matured,
  }
  