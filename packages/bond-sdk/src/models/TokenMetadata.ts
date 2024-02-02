import Decimal from 'decimal.js';

type Attributes = {
  trait_type: string;
  value: string;
};

type FileProperty = {
  uri: string;
  type: string;
};

type Creator = {
  address: string;
  share: Decimal;
};

export type TokenMetadata = {
  name: string;
  symbol: string;
  description: string;
  seller_fee_basis_points: number;
  image: string;
  external_url: string;
  attributes: Attributes[];
  properties: {
    files: FileProperty[];
    creators: Creator[];
    category: string;
  };
};
