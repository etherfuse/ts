type Content = {
  $schema: string;
  json_uri: string;
  files: File[];
  metadata: Metadata;
  links: Links;
};

type File = {
  uri: string;
  cdn_uri: string;
  mime: string;
};

type Metadata = {
  attributes: any[];
  description: string;
  name: string;
  symbol: string;
  token_standard: string;
};

type Links = {
  image: string;
};

type Authority = {
  address: string;
  scopes: string[];
};

interface Compression {
  eligible: boolean;
  compressed: boolean;
  data_hash: string;
  creator_hash: string;
  asset_hash: string;
  tree: string;
  seq: number;
  leaf_id: number;
}

type Grouping = {
  group_key: string;
  group_value: string;
};

type Royalty = {
  royalty_model: string;
  target: null | string;
  percent: number;
  basis_points: number;
  primary_sale_happened: boolean;
  locked: boolean;
};

type Creator = {
  address: string;
  share: number;
  verified: boolean;
};

type Ownership = {
  frozen: boolean;
  delegated: boolean;
  delegate: null | string;
  ownership_model: string;
  owner: string;
};

type Supply = {
  print_max_supply: number;
  print_current_supply: number;
  edition_nonce: number;
};

export type AssetInfo = {
  interface: string;
  id: string;
  content: Content;
  authorities: Authority[];
  compression: Compression;
  grouping: Grouping[];
  royalty: Royalty;
  creators: Creator[];
  ownership: Ownership;
  supply: Supply;
  mutable: boolean;
  burnt: boolean;
};

export default AssetInfo;
