import BondIdl from './bond.json';

/**
 * Bond IDL
 */

export const BOND_IDL = BondIdl;

export type Bond = {
  version: '0.1.0';
  name: 'bond';
  instructions: [
    {
      name: 'mintBond';
      accounts: [
        {
          name: 'owner';
          isMut: true;
          isSigner: true;
          docs: ['The soon to be owner of the bond.'];
        },
        {
          name: 'paymentAccount';
          isMut: true;
          isSigner: false;
          docs: ['The payment account pda which has an ata which receives the payment for the bond'];
        },
        {
          name: 'paymentTokenAccount';
          isMut: true;
          isSigner: false;
          docs: ['The payment token account that is used to receive payment for the bond'];
        },
        {
          name: 'ownerTokenAccount';
          isMut: true;
          isSigner: false;
          docs: ['The owner token account that is used to pay for the bond'];
        },
        {
          name: 'mint';
          isMut: true;
          isSigner: false;
          docs: ['The mint pubkey of the bond that is set in the collection'];
        },
        {
          name: 'paymentMint';
          isMut: false;
          isSigner: false;
          docs: ['The mint of the token that is used to pay for the bond'];
        },
        {
          name: 'paymentPriceFeed';
          isMut: false;
          isSigner: false;
          docs: ['The price feed from the oracle that is used to calculate the payment amount'];
        },
        {
          name: 'bondTokenAccount';
          isMut: true;
          isSigner: false;
          docs: ['The bond token account for the user that is minting the bond'];
        },
        {
          name: 'collection';
          isMut: true;
          isSigner: false;
          docs: ['The collection that the bond is being minted from'];
        },
        {
          name: 'kyc';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'pass';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
          docs: ['The token program since we are minting a token'];
        },
        {
          name: 'associatedTokenProgram';
          isMut: false;
          isSigner: false;
          docs: ['The associated token program since we are potentially creating a new associated token account'];
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
          docs: ['The system program since we are creating accounts'];
        },
      ];
      args: [
        {
          name: 'params';
          type: {
            defined: 'MintBondParams';
          };
        },
      ];
    },
    {
      name: 'exchangeTokensForNft';
      accounts: [
        {
          name: 'owner';
          isMut: true;
          isSigner: true;
          docs: ['The owner of the bonds'];
        },
        {
          name: 'collection';
          isMut: false;
          isSigner: false;
          docs: ['TODO: add in the needs to not be in funding period and other time checks'];
        },
        {
          name: 'nft';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'nftMint';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'bondMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'pdaBondTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'ownerBondTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'ownerNftTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'kyc';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'associatedTokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'params';
          type: {
            defined: 'ExchangeTokensForNFTParams';
          };
        },
      ];
    },
    {
      name: 'setNft';
      accounts: [
        {
          name: 'owner';
          isMut: true;
          isSigner: true;
          docs: ['The owner of the bonds'];
        },
        {
          name: 'collection';
          isMut: false;
          isSigner: false;
          docs: ['TODO: add in the needs to not be in funding period and other time checks'];
        },
        {
          name: 'nft';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'nftMint';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'ownerNftTokenAccount';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'collectionNftMint';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'kyc';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'metadata';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'masterEdition';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'collectionMasterEdition';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'collectionMetadata';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'tokenMetadataProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'params';
          type: {
            defined: 'SetNFTParams';
          };
        },
      ];
    },
    {
      name: 'collectCoupon';
      accounts: [
        {
          name: 'owner';
          isMut: true;
          isSigner: true;
          docs: ['The owner of the nft that is collecting interest.'];
        },
        {
          name: 'collection';
          isMut: false;
          isSigner: false;
          docs: ['The collection of the bond for checks.'];
        },
        {
          name: 'pass';
          isMut: true;
          isSigner: false;
          docs: ['The pass account that is being added if needed'];
        },
        {
          name: 'ownerNftTokenAccount';
          isMut: false;
          isSigner: false;
          docs: ['The token account with the nft that proves ownership and how many tokens are in the PDA.'];
        },
        {
          name: 'ownerPaymentTokenAccount';
          isMut: true;
          isSigner: false;
          docs: ['The token account of the payment account that is used to receive interest payment'];
        },
        {
          name: 'pdaBondTokenAccount';
          isMut: false;
          isSigner: false;
          docs: ['The pda bond token account that holds the bond tokens.'];
        },
        {
          name: 'nft';
          isMut: true;
          isSigner: false;
          docs: ['The PDA that holds the bonds that collect interest.'];
        },
        {
          name: 'interestPaymentTokenAccount';
          isMut: true;
          isSigner: false;
          docs: ['The global interest payment token account'];
        },
        {
          name: 'interest';
          isMut: false;
          isSigner: false;
          docs: ['The global interest PDA account'];
        },
        {
          name: 'bondMint';
          isMut: false;
          isSigner: false;
          docs: ['The bond mint'];
        },
        {
          name: 'paymentMint';
          isMut: false;
          isSigner: false;
          docs: ['The payment mint'];
        },
        {
          name: 'nftMint';
          isMut: false;
          isSigner: false;
          docs: ['The nft mint'];
        },
        {
          name: 'kyc';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'params';
          type: {
            defined: 'CollectCouponParams';
          };
        },
      ];
    },
    {
      name: 'collectParValue';
      accounts: [
        {
          name: 'owner';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'ownerBondTokenAccount';
          isMut: true;
          isSigner: false;
          docs: ['The token account of the bond mint'];
        },
        {
          name: 'ownerPaymentTokenAccount';
          isMut: true;
          isSigner: false;
          docs: ['The token account of the payment mint'];
        },
        {
          name: 'collection';
          isMut: true;
          isSigner: false;
          docs: ['The collection of the bond'];
        },
        {
          name: 'pass';
          isMut: true;
          isSigner: false;
          docs: ['The pass account that is being added if needed'];
        },
        {
          name: 'bondMint';
          isMut: true;
          isSigner: false;
          docs: ['The bond mint'];
        },
        {
          name: 'parValueTokenAccount';
          isMut: true;
          isSigner: false;
          docs: ['The global par value payment token account'];
        },
        {
          name: 'parValue';
          isMut: false;
          isSigner: false;
          docs: ['The global par value PDA account'];
        },
        {
          name: 'interestPaymentTokenAccount';
          isMut: true;
          isSigner: false;
          docs: ['The global interest payment token account'];
        },
        {
          name: 'interest';
          isMut: false;
          isSigner: false;
          docs: ['The global interest PDA account'];
        },
        {
          name: 'paymentMint';
          isMut: false;
          isSigner: false;
          docs: ['The payment mint that was used to purchase the bond'];
        },
        {
          name: 'kyc';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'params';
          type: {
            defined: 'CollectParValueParams';
          };
        },
      ];
    },
    {
      name: 'collectParValueForNft';
      accounts: [
        {
          name: 'owner';
          isMut: true;
          isSigner: true;
          docs: ['The owner of the nft that is collecting par value.'];
        },
        {
          name: 'collection';
          isMut: true;
          isSigner: false;
          docs: ['The collection of the bond for checks.'];
        },
        {
          name: 'pass';
          isMut: true;
          isSigner: false;
          docs: ['The pass account that is being added if needed'];
        },
        {
          name: 'ownerNftTokenAccount';
          isMut: true;
          isSigner: false;
          docs: ['The token account with the nft that proves ownership and how many tokens are in the PDA.'];
        },
        {
          name: 'ownerPaymentTokenAccount';
          isMut: true;
          isSigner: false;
          docs: ['The token account of the payment account that is used to receive par value payment'];
        },
        {
          name: 'pdaBondTokenAccount';
          isMut: true;
          isSigner: false;
          docs: ['The pda bond token account that holds the bond tokens.'];
        },
        {
          name: 'nft';
          isMut: true;
          isSigner: false;
          docs: ['The PDA that holds the bonds that collect par value.'];
        },
        {
          name: 'parValueTokenAccount';
          isMut: true;
          isSigner: false;
          docs: ['The global par value payment token account'];
        },
        {
          name: 'parValue';
          isMut: false;
          isSigner: false;
          docs: ['The global par value PDA account'];
        },
        {
          name: 'interestPaymentTokenAccount';
          isMut: true;
          isSigner: false;
          docs: ['The global interest payment token account'];
        },
        {
          name: 'interest';
          isMut: false;
          isSigner: false;
          docs: ['The global interest PDA account'];
        },
        {
          name: 'bondMint';
          isMut: true;
          isSigner: false;
          docs: ['The bond mint'];
        },
        {
          name: 'paymentMint';
          isMut: false;
          isSigner: false;
          docs: ['The payment mint'];
        },
        {
          name: 'nftMint';
          isMut: true;
          isSigner: false;
          docs: ['The nft mint'];
        },
        {
          name: 'kyc';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'params';
          type: {
            defined: 'CollectParValueForNFTParams';
          };
        },
      ];
    },
    {
      name: 'viewCouponReturns';
      accounts: [
        {
          name: 'collection';
          isMut: false;
          isSigner: false;
          docs: ['The collection of the bond'];
        },
        {
          name: 'bondMint';
          isMut: false;
          isSigner: false;
          docs: ['The bond mint'];
        },
        {
          name: 'interestPaymentTokenAccount';
          isMut: false;
          isSigner: false;
          docs: ['The global interest payment token account'];
        },
        {
          name: 'interest';
          isMut: false;
          isSigner: false;
          docs: ['The global interest PDA account'];
        },
        {
          name: 'paymentMint';
          isMut: false;
          isSigner: false;
          docs: ['The payment mint that was used to purchase the bond'];
        },
      ];
      args: [
        {
          name: 'params';
          type: {
            defined: 'ViewCouponReturnsParams';
          };
        },
      ];
      returns: {
        defined: 'ViewCouponReturnsOutput';
      };
    },
    {
      name: 'viewParValueReturns';
      accounts: [
        {
          name: 'collection';
          isMut: false;
          isSigner: false;
          docs: ['The collection of the bond'];
        },
        {
          name: 'bondMint';
          isMut: false;
          isSigner: false;
          docs: ['The bond mint'];
        },
        {
          name: 'parValueTokenAccount';
          isMut: false;
          isSigner: false;
          docs: ['The global par value payment token account'];
        },
        {
          name: 'parValue';
          isMut: false;
          isSigner: false;
          docs: ['The global par value PDA account'];
        },
        {
          name: 'paymentMint';
          isMut: false;
          isSigner: false;
          docs: ['The payment mint that was used to purchase the bond'];
        },
      ];
      args: [
        {
          name: 'params';
          type: {
            defined: 'ViewParValueReturnsParams';
          };
        },
      ];
      returns: {
        defined: 'ViewParValueReturnsOutput';
      };
    },
    {
      name: 'viewParValueForNftReturns';
      accounts: [
        {
          name: 'collection';
          isMut: false;
          isSigner: false;
          docs: ['The collection of the bond for checks.'];
        },
        {
          name: 'pdaBondTokenAccount';
          isMut: false;
          isSigner: false;
          docs: ['The pda bond token account that holds the bond tokens.'];
        },
        {
          name: 'nft';
          isMut: false;
          isSigner: false;
          docs: ['The PDA that holds the bonds that collect par value.'];
        },
        {
          name: 'parValueTokenAccount';
          isMut: false;
          isSigner: false;
          docs: ['The global par value payment token account'];
        },
        {
          name: 'parValue';
          isMut: false;
          isSigner: false;
          docs: ['The global par value PDA account'];
        },
        {
          name: 'bondMint';
          isMut: false;
          isSigner: false;
          docs: ['The bond mint'];
        },
        {
          name: 'paymentMint';
          isMut: false;
          isSigner: false;
          docs: ['The payment mint'];
        },
        {
          name: 'nftMint';
          isMut: false;
          isSigner: false;
          docs: ['The nft mint'];
        },
      ];
      args: [
        {
          name: 'params';
          type: {
            defined: 'ViewParValueForNftReturnsParams';
          };
        },
      ];
      returns: {
        defined: 'ViewParValueForNftReturnsOutput';
      };
    },
    {
      name: 'burnPass';
      accounts: [
        {
          name: 'passOwner';
          isMut: true;
          isSigner: true;
          docs: ['The kyc authority of the bond admin account of any collection'];
        },
        {
          name: 'pass';
          isMut: true;
          isSigner: false;
          docs: ['The pass account that is being added'];
        },
        {
          name: 'globalPassConfig';
          isMut: false;
          isSigner: false;
          docs: ['The global pass config account with collection_owner tree address to check against'];
        },
        {
          name: 'collectionOwner';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'leafDelegate';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'treeAuthority';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'merkleTree';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'logWrapper';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'compressionProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'bubblegumProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'params';
          type: {
            defined: 'BurnPassParams';
          };
        },
      ];
    },
    {
      name: 'viewCouponReturnsForNft';
      accounts: [
        {
          name: 'collection';
          isMut: false;
          isSigner: false;
          docs: ['The collection of the bond for checks.'];
        },
        {
          name: 'pdaBondTokenAccount';
          isMut: false;
          isSigner: false;
          docs: ['The pda bond token account that holds the bond tokens.'];
        },
        {
          name: 'nft';
          isMut: false;
          isSigner: false;
          docs: ['The PDA that holds the bonds that collect interest.'];
        },
        {
          name: 'interestPaymentTokenAccount';
          isMut: false;
          isSigner: false;
          docs: ['The global interest payment token account'];
        },
        {
          name: 'interest';
          isMut: false;
          isSigner: false;
          docs: ['The global interest PDA account'];
        },
        {
          name: 'bondMint';
          isMut: false;
          isSigner: false;
          docs: ['The bond mint'];
        },
        {
          name: 'paymentMint';
          isMut: false;
          isSigner: false;
          docs: ['The payment mint'];
        },
        {
          name: 'nftMint';
          isMut: false;
          isSigner: false;
          docs: ['The nft mint'];
        },
      ];
      args: [
        {
          name: 'params';
          type: {
            defined: 'ViewCouponReturnsForNftParams';
          };
        },
      ];
      returns: {
        defined: 'ViewCouponReturnsForNftOutput';
      };
    },
  ];
  accounts: [
    {
      name: 'collection';
      docs: ['The collection pda'];
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'bondAdmin';
            docs: ['The bond admin that is adding the collection'];
            type: 'publicKey';
          },
          {
            name: 'mint';
            docs: ['The mint that will be used to mint the bonds'];
            type: 'publicKey';
          },
          {
            name: 'description';
            docs: ['The bond type description'];
            type: 'string';
          },
          {
            name: 'nftMint';
            docs: ['The nft mint that will be used to show collection nft details'];
            type: 'publicKey';
          },
          {
            name: 'supply';
            docs: ['The total supply of bonds that can be minted', 'This total amount is deducted from each mint'];
            type: 'u64';
          },
          {
            name: 'totalBondsMinted';
            docs: ['The total amount of bonds that have been minted'];
            type: 'u64';
          },
          {
            name: 'authority';
            docs: ['The authority that can mint bonds', 'This would be the pda so that it can sign for the mint'];
            type: 'publicKey';
          },
          {
            name: 'paymentMint';
            docs: ['The payment mint that is used to pay for the bond'];
            type: 'publicKey';
          },
          {
            name: 'paymentUsdCost';
            docs: ['The payment usd cost of the bond in the payment mint'];
            type: 'u64';
          },
          {
            name: 'paymentDecimals';
            docs: ['The decimals of the mint that is used to pay for the bond'];
            type: 'u8';
          },
          {
            name: 'oracleParams';
            docs: ['The oracle type that is used to get the price feed'];
            type: {
              defined: 'OracleParams';
            };
          },
          {
            name: 'fundingAccounts';
            docs: ['The funding accounts for the collection'];
            type: {
              defined: 'FundingAccounts';
            };
          },
          {
            name: 'fundingDate';
            docs: ['The date that that collection starts accepting funds'];
            type: 'i64';
          },
          {
            name: 'startDate';
            docs: ['The start date that the bonds start accumulating interest and the mint closes'];
            type: 'i64';
          },
          {
            name: 'maturityDate';
            docs: ['The maturity date of the bond. This is the date that the bond can be redeemed'];
            type: 'i64';
          },
          {
            name: 'interestRate';
            docs: ['The interest rate of the bond collection. **This is cosmetic and is not used in the program**'];
            type: 'f64';
          },
          {
            name: 'isFrozen';
            docs: ['Whether the collection is frozen or not'];
            type: 'bool';
          },
          {
            name: 'nftAccessPassCollection';
            docs: ['The NFT pass collection metadata mint'];
            type: 'publicKey';
          },
          {
            name: 'tokenUri';
            docs: ['The bond spl token uri'];
            type: 'string';
          },
          {
            name: 'tokenName';
            docs: ['The bond spl token name'];
            type: 'string';
          },
          {
            name: 'tokenSymbol';
            docs: ['The bond spl token symbol'];
            type: 'string';
          },
          {
            name: 'nftUri';
            docs: ['The bond nft token uri'];
            type: 'string';
          },
          {
            name: 'nftName';
            docs: ['The bond nft token name'];
            type: 'string';
          },
          {
            name: 'nftSymbol';
            docs: ['The bond nft token symbol'];
            type: 'string';
          },
          {
            name: 'bump';
            docs: ['The bump seed for the collection pda'];
            type: 'u8';
          },
        ];
      };
    },
    {
      name: 'paymentAccount';
      docs: ['The PDA used for the payments recieved for minting a bond'];
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'authority';
            type: 'publicKey';
          },
          {
            name: 'bump';
            type: 'u8';
          },
        ];
      };
    },
    {
      name: 'interestAccount';
      docs: ['The PDA used for the interest payments'];
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'authority';
            type: 'publicKey';
          },
          {
            name: 'bump';
            type: 'u8';
          },
          {
            name: 'runningTotal';
            type: {
              vec: 'u64';
            };
          },
          {
            name: 'counter';
            type: 'u64';
          },
        ];
      };
    },
    {
      name: 'parValueAccount';
      docs: ['The PDA used for the par value payments'];
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'authority';
            type: 'publicKey';
          },
          {
            name: 'runningTotal';
            type: {
              vec: 'u64';
            };
          },
          {
            name: 'bump';
            type: 'u8';
          },
        ];
      };
    },
    {
      name: 'kyc';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'wallet';
            type: 'publicKey';
          },
          {
            name: 'isDisabled';
            type: 'bool';
          },
          {
            name: 'bump';
            type: 'u8';
          },
        ];
      };
    },
    {
      name: 'nft';
      docs: [
        "NFT PDA with the mint it's tied to, the bump seed for the PDA,",
        'and the counter to keep track of when the interest payment',
        'was last collected compared to the interest funding account',
      ];
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'mint';
            type: 'publicKey';
          },
          {
            name: 'bump';
            type: 'u8';
          },
          {
            name: 'counter';
            type: 'u64';
          },
        ];
      };
    },
    {
      name: 'globalPassConfig';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'collectionOwner';
            type: 'publicKey';
          },
          {
            name: 'bump';
            type: 'u8';
          },
        ];
      };
    },
    {
      name: 'pass';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'wallet';
            type: 'publicKey';
          },
          {
            name: 'isDisabled';
            type: 'bool';
          },
          {
            name: 'bump';
            type: 'u8';
          },
        ];
      };
    },
  ];
  types: [
    {
      name: 'BurnPassParams';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'root';
            type: {
              array: ['u8', 32];
            };
          },
          {
            name: 'dataHash';
            type: {
              array: ['u8', 32];
            };
          },
          {
            name: 'creatorHash';
            type: {
              array: ['u8', 32];
            };
          },
          {
            name: 'nonce';
            type: 'u64';
          },
          {
            name: 'index';
            type: 'u32';
          },
        ];
      };
    },
    {
      name: 'CollectCouponParams';
      type: {
        kind: 'struct';
        fields: [];
      };
    },
    {
      name: 'CollectParValueForNFTParams';
      type: {
        kind: 'struct';
        fields: [];
      };
    },
    {
      name: 'CollectParValueParams';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'amount';
            type: 'u64';
          },
        ];
      };
    },
    {
      name: 'ExchangeTokensForNFTParams';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'amount';
            type: 'u64';
          },
        ];
      };
    },
    {
      name: 'MintBondParams';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'amount';
            type: 'u64';
          },
        ];
      };
    },
    {
      name: 'SetNFTParams';
      type: {
        kind: 'struct';
        fields: [];
      };
    },
    {
      name: 'ViewCouponReturnsForNftParams';
      type: {
        kind: 'struct';
        fields: [];
      };
    },
    {
      name: 'ViewCouponReturnsForNftOutput';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'amount';
            type: 'u64';
          },
        ];
      };
    },
    {
      name: 'ViewCouponReturnsParams';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'amount';
            type: 'u64';
          },
        ];
      };
    },
    {
      name: 'ViewCouponReturnsOutput';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'amount';
            type: 'u64';
          },
        ];
      };
    },
    {
      name: 'ViewParValueForNftReturnsParams';
      type: {
        kind: 'struct';
        fields: [];
      };
    },
    {
      name: 'ViewParValueForNftReturnsOutput';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'amount';
            type: 'u64';
          },
        ];
      };
    },
    {
      name: 'ViewParValueReturnsParams';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'amount';
            type: 'u64';
          },
        ];
      };
    },
    {
      name: 'ViewParValueReturnsOutput';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'amount';
            type: 'u64';
          },
        ];
      };
    },
    {
      name: 'FundingAccounts';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'paymentTokenAccount';
            docs: ['The funding token account that is used to receive payment for the bond'];
            type: 'publicKey';
          },
          {
            name: 'interestPaymentTokenAccount';
            docs: ['The interest payment token account that is used', 'to distribute interest that has accrued'];
            type: 'publicKey';
          },
          {
            name: 'parValuePaymentTokenAccount';
            docs: [
              'The par value payment token account that is used',
              'to distribute the par value payment up maturity',
            ];
            type: 'publicKey';
          },
        ];
      };
    },
    {
      name: 'OraclePrice';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'price';
            type: 'u64';
          },
          {
            name: 'exponent';
            type: 'i32';
          },
        ];
      };
    },
    {
      name: 'OracleParams';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'oracleAccount';
            type: 'publicKey';
          },
          {
            name: 'oracleType';
            type: {
              defined: 'OracleType';
            };
          },
          {
            name: 'maxPriceError';
            type: 'u64';
          },
          {
            name: 'maxPriceAgeSec';
            type: 'u32';
          },
        ];
      };
    },
    {
      name: 'OracleType';
      type: {
        kind: 'enum';
        variants: [
          {
            name: 'None';
          },
          {
            name: 'Test';
          },
          {
            name: 'Pyth';
          },
        ];
      };
    },
  ];
  errors: [
    {
      code: 6000;
      name: 'InvalidBondAdmin';
      msg: 'Invalid bond admin';
    },
    {
      code: 6001;
      name: 'InvalidProgramAuthority';
      msg: 'Invalid program authority';
    },
    {
      code: 6002;
      name: 'InvalidKycAuthority';
      msg: 'Invalid kyc authority';
    },
    {
      code: 6003;
      name: 'InvalidMint';
      msg: 'Invalid mint';
    },
    {
      code: 6004;
      name: 'InvalidArgument';
      msg: 'Invalid argument';
    },
    {
      code: 6005;
      name: 'AdminIsDisabled';
      msg: 'Admin is disabled';
    },
    {
      code: 6006;
      name: 'InvalidFundingAccount';
      msg: 'Invalid funding account';
    },
    {
      code: 6007;
      name: 'InvalidCollection';
      msg: 'Invalid collection';
    },
    {
      code: 6008;
      name: 'TimeIsBeforeFundingDate';
      msg: 'Current time is before funding date availability';
    },
    {
      code: 6009;
      name: 'TimeIsAfterStartDate';
      msg: 'Current time is after start date. Bond already started';
    },
    {
      code: 6010;
      name: 'SupplyIsZero';
      msg: 'Supply is zero';
    },
    {
      code: 6011;
      name: 'SupplyIsInsufficient';
      msg: 'Supply is insufficient';
    },
    {
      code: 6012;
      name: 'MathOverflow';
      msg: 'Overflow in arithmetic operation';
    },
    {
      code: 6013;
      name: 'FundingAccountsAlreadySet';
      msg: 'Funding accounts already set';
    },
    {
      code: 6014;
      name: 'InvalidCounter';
      msg: 'Invalid Counter';
    },
    {
      code: 6015;
      name: 'InternalError';
      msg: 'Internal Error';
    },
    {
      code: 6016;
      name: 'NoInterestToCredit';
      msg: 'No interest payment to credit';
    },
    {
      code: 6017;
      name: 'NoParValueToCredit';
      msg: 'No par value payment to credit';
    },
    {
      code: 6018;
      name: 'CollectionIsFrozen';
      msg: 'Collection is frozen';
    },
    {
      code: 6019;
      name: 'KycUserIsAlreadyDisabled';
      msg: 'Kyc user is disabled';
    },
    {
      code: 6020;
      name: 'PythError';
      msg: 'Pyth has an internal error.';
    },
    {
      code: 6021;
      name: 'PythOffline';
      msg: 'Pyth price oracle is offline.';
    },
    {
      code: 6022;
      name: 'TryToSerializePriceAccount';
      msg: 'Program should not try to serialize a price account.';
    },
    {
      code: 6023;
      name: 'InvalidOracleAccount';
      msg: 'Invalid oracle account';
    },
    {
      code: 6024;
      name: 'InvalidOraclePrice';
      msg: 'Invalid oracle price';
    },
    {
      code: 6025;
      name: 'StaleOraclePrice';
      msg: 'Stale oracle price';
    },
    {
      code: 6026;
      name: 'UnsupportedOracle';
      msg: 'Unsupported Oracle';
    },
    {
      code: 6027;
      name: 'InvalidCollectionOwner';
      msg: 'Invalid Collection Owner';
    },
    {
      code: 6028;
      name: 'KycRequired';
      msg: 'Kyc required';
    },
    {
      code: 6029;
      name: 'AccessPassRequired';
      msg: 'Access pass required';
    },
    {
      code: 6030;
      name: 'InvalidOperation';
      msg: 'Invalid operation';
    },
  ];
};

export const IDL: Bond = {
  version: '0.1.0',
  name: 'bond',
  instructions: [
    {
      name: 'mintBond',
      accounts: [
        {
          name: 'owner',
          isMut: true,
          isSigner: true,
          docs: ['The soon to be owner of the bond.'],
        },
        {
          name: 'paymentAccount',
          isMut: true,
          isSigner: false,
          docs: ['The payment account pda which has an ata which receives the payment for the bond'],
        },
        {
          name: 'paymentTokenAccount',
          isMut: true,
          isSigner: false,
          docs: ['The payment token account that is used to receive payment for the bond'],
        },
        {
          name: 'ownerTokenAccount',
          isMut: true,
          isSigner: false,
          docs: ['The owner token account that is used to pay for the bond'],
        },
        {
          name: 'mint',
          isMut: true,
          isSigner: false,
          docs: ['The mint pubkey of the bond that is set in the collection'],
        },
        {
          name: 'paymentMint',
          isMut: false,
          isSigner: false,
          docs: ['The mint of the token that is used to pay for the bond'],
        },
        {
          name: 'paymentPriceFeed',
          isMut: false,
          isSigner: false,
          docs: ['The price feed from the oracle that is used to calculate the payment amount'],
        },
        {
          name: 'bondTokenAccount',
          isMut: true,
          isSigner: false,
          docs: ['The bond token account for the user that is minting the bond'],
        },
        {
          name: 'collection',
          isMut: true,
          isSigner: false,
          docs: ['The collection that the bond is being minted from'],
        },
        {
          name: 'kyc',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'pass',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
          docs: ['The token program since we are minting a token'],
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
          docs: ['The associated token program since we are potentially creating a new associated token account'],
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
          docs: ['The system program since we are creating accounts'],
        },
      ],
      args: [
        {
          name: 'params',
          type: {
            defined: 'MintBondParams',
          },
        },
      ],
    },
    {
      name: 'exchangeTokensForNft',
      accounts: [
        {
          name: 'owner',
          isMut: true,
          isSigner: true,
          docs: ['The owner of the bonds'],
        },
        {
          name: 'collection',
          isMut: false,
          isSigner: false,
          docs: ['TODO: add in the needs to not be in funding period and other time checks'],
        },
        {
          name: 'nft',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'nftMint',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'bondMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'pdaBondTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'ownerBondTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'ownerNftTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'kyc',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'params',
          type: {
            defined: 'ExchangeTokensForNFTParams',
          },
        },
      ],
    },
    {
      name: 'setNft',
      accounts: [
        {
          name: 'owner',
          isMut: true,
          isSigner: true,
          docs: ['The owner of the bonds'],
        },
        {
          name: 'collection',
          isMut: false,
          isSigner: false,
          docs: ['TODO: add in the needs to not be in funding period and other time checks'],
        },
        {
          name: 'nft',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'nftMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'ownerNftTokenAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'collectionNftMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'kyc',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'metadata',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'masterEdition',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'collectionMasterEdition',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'collectionMetadata',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenMetadataProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'params',
          type: {
            defined: 'SetNFTParams',
          },
        },
      ],
    },
    {
      name: 'collectCoupon',
      accounts: [
        {
          name: 'owner',
          isMut: true,
          isSigner: true,
          docs: ['The owner of the nft that is collecting interest.'],
        },
        {
          name: 'collection',
          isMut: false,
          isSigner: false,
          docs: ['The collection of the bond for checks.'],
        },
        {
          name: 'pass',
          isMut: true,
          isSigner: false,
          docs: ['The pass account that is being added if needed'],
        },
        {
          name: 'ownerNftTokenAccount',
          isMut: false,
          isSigner: false,
          docs: ['The token account with the nft that proves ownership and how many tokens are in the PDA.'],
        },
        {
          name: 'ownerPaymentTokenAccount',
          isMut: true,
          isSigner: false,
          docs: ['The token account of the payment account that is used to receive interest payment'],
        },
        {
          name: 'pdaBondTokenAccount',
          isMut: false,
          isSigner: false,
          docs: ['The pda bond token account that holds the bond tokens.'],
        },
        {
          name: 'nft',
          isMut: true,
          isSigner: false,
          docs: ['The PDA that holds the bonds that collect interest.'],
        },
        {
          name: 'interestPaymentTokenAccount',
          isMut: true,
          isSigner: false,
          docs: ['The global interest payment token account'],
        },
        {
          name: 'interest',
          isMut: false,
          isSigner: false,
          docs: ['The global interest PDA account'],
        },
        {
          name: 'bondMint',
          isMut: false,
          isSigner: false,
          docs: ['The bond mint'],
        },
        {
          name: 'paymentMint',
          isMut: false,
          isSigner: false,
          docs: ['The payment mint'],
        },
        {
          name: 'nftMint',
          isMut: false,
          isSigner: false,
          docs: ['The nft mint'],
        },
        {
          name: 'kyc',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'params',
          type: {
            defined: 'CollectCouponParams',
          },
        },
      ],
    },
    {
      name: 'collectParValue',
      accounts: [
        {
          name: 'owner',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'ownerBondTokenAccount',
          isMut: true,
          isSigner: false,
          docs: ['The token account of the bond mint'],
        },
        {
          name: 'ownerPaymentTokenAccount',
          isMut: true,
          isSigner: false,
          docs: ['The token account of the payment mint'],
        },
        {
          name: 'collection',
          isMut: true,
          isSigner: false,
          docs: ['The collection of the bond'],
        },
        {
          name: 'pass',
          isMut: true,
          isSigner: false,
          docs: ['The pass account that is being added if needed'],
        },
        {
          name: 'bondMint',
          isMut: true,
          isSigner: false,
          docs: ['The bond mint'],
        },
        {
          name: 'parValueTokenAccount',
          isMut: true,
          isSigner: false,
          docs: ['The global par value payment token account'],
        },
        {
          name: 'parValue',
          isMut: false,
          isSigner: false,
          docs: ['The global par value PDA account'],
        },
        {
          name: 'interestPaymentTokenAccount',
          isMut: true,
          isSigner: false,
          docs: ['The global interest payment token account'],
        },
        {
          name: 'interest',
          isMut: false,
          isSigner: false,
          docs: ['The global interest PDA account'],
        },
        {
          name: 'paymentMint',
          isMut: false,
          isSigner: false,
          docs: ['The payment mint that was used to purchase the bond'],
        },
        {
          name: 'kyc',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'params',
          type: {
            defined: 'CollectParValueParams',
          },
        },
      ],
    },
    {
      name: 'collectParValueForNft',
      accounts: [
        {
          name: 'owner',
          isMut: true,
          isSigner: true,
          docs: ['The owner of the nft that is collecting par value.'],
        },
        {
          name: 'collection',
          isMut: true,
          isSigner: false,
          docs: ['The collection of the bond for checks.'],
        },
        {
          name: 'pass',
          isMut: true,
          isSigner: false,
          docs: ['The pass account that is being added if needed'],
        },
        {
          name: 'ownerNftTokenAccount',
          isMut: true,
          isSigner: false,
          docs: ['The token account with the nft that proves ownership and how many tokens are in the PDA.'],
        },
        {
          name: 'ownerPaymentTokenAccount',
          isMut: true,
          isSigner: false,
          docs: ['The token account of the payment account that is used to receive par value payment'],
        },
        {
          name: 'pdaBondTokenAccount',
          isMut: true,
          isSigner: false,
          docs: ['The pda bond token account that holds the bond tokens.'],
        },
        {
          name: 'nft',
          isMut: true,
          isSigner: false,
          docs: ['The PDA that holds the bonds that collect par value.'],
        },
        {
          name: 'parValueTokenAccount',
          isMut: true,
          isSigner: false,
          docs: ['The global par value payment token account'],
        },
        {
          name: 'parValue',
          isMut: false,
          isSigner: false,
          docs: ['The global par value PDA account'],
        },
        {
          name: 'interestPaymentTokenAccount',
          isMut: true,
          isSigner: false,
          docs: ['The global interest payment token account'],
        },
        {
          name: 'interest',
          isMut: false,
          isSigner: false,
          docs: ['The global interest PDA account'],
        },
        {
          name: 'bondMint',
          isMut: true,
          isSigner: false,
          docs: ['The bond mint'],
        },
        {
          name: 'paymentMint',
          isMut: false,
          isSigner: false,
          docs: ['The payment mint'],
        },
        {
          name: 'nftMint',
          isMut: true,
          isSigner: false,
          docs: ['The nft mint'],
        },
        {
          name: 'kyc',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'params',
          type: {
            defined: 'CollectParValueForNFTParams',
          },
        },
      ],
    },
    {
      name: 'viewCouponReturns',
      accounts: [
        {
          name: 'collection',
          isMut: false,
          isSigner: false,
          docs: ['The collection of the bond'],
        },
        {
          name: 'bondMint',
          isMut: false,
          isSigner: false,
          docs: ['The bond mint'],
        },
        {
          name: 'interestPaymentTokenAccount',
          isMut: false,
          isSigner: false,
          docs: ['The global interest payment token account'],
        },
        {
          name: 'interest',
          isMut: false,
          isSigner: false,
          docs: ['The global interest PDA account'],
        },
        {
          name: 'paymentMint',
          isMut: false,
          isSigner: false,
          docs: ['The payment mint that was used to purchase the bond'],
        },
      ],
      args: [
        {
          name: 'params',
          type: {
            defined: 'ViewCouponReturnsParams',
          },
        },
      ],
      returns: {
        defined: 'ViewCouponReturnsOutput',
      },
    },
    {
      name: 'viewParValueReturns',
      accounts: [
        {
          name: 'collection',
          isMut: false,
          isSigner: false,
          docs: ['The collection of the bond'],
        },
        {
          name: 'bondMint',
          isMut: false,
          isSigner: false,
          docs: ['The bond mint'],
        },
        {
          name: 'parValueTokenAccount',
          isMut: false,
          isSigner: false,
          docs: ['The global par value payment token account'],
        },
        {
          name: 'parValue',
          isMut: false,
          isSigner: false,
          docs: ['The global par value PDA account'],
        },
        {
          name: 'paymentMint',
          isMut: false,
          isSigner: false,
          docs: ['The payment mint that was used to purchase the bond'],
        },
      ],
      args: [
        {
          name: 'params',
          type: {
            defined: 'ViewParValueReturnsParams',
          },
        },
      ],
      returns: {
        defined: 'ViewParValueReturnsOutput',
      },
    },
    {
      name: 'viewParValueForNftReturns',
      accounts: [
        {
          name: 'collection',
          isMut: false,
          isSigner: false,
          docs: ['The collection of the bond for checks.'],
        },
        {
          name: 'pdaBondTokenAccount',
          isMut: false,
          isSigner: false,
          docs: ['The pda bond token account that holds the bond tokens.'],
        },
        {
          name: 'nft',
          isMut: false,
          isSigner: false,
          docs: ['The PDA that holds the bonds that collect par value.'],
        },
        {
          name: 'parValueTokenAccount',
          isMut: false,
          isSigner: false,
          docs: ['The global par value payment token account'],
        },
        {
          name: 'parValue',
          isMut: false,
          isSigner: false,
          docs: ['The global par value PDA account'],
        },
        {
          name: 'bondMint',
          isMut: false,
          isSigner: false,
          docs: ['The bond mint'],
        },
        {
          name: 'paymentMint',
          isMut: false,
          isSigner: false,
          docs: ['The payment mint'],
        },
        {
          name: 'nftMint',
          isMut: false,
          isSigner: false,
          docs: ['The nft mint'],
        },
      ],
      args: [
        {
          name: 'params',
          type: {
            defined: 'ViewParValueForNftReturnsParams',
          },
        },
      ],
      returns: {
        defined: 'ViewParValueForNftReturnsOutput',
      },
    },
    {
      name: 'burnPass',
      accounts: [
        {
          name: 'passOwner',
          isMut: true,
          isSigner: true,
          docs: ['The kyc authority of the bond admin account of any collection'],
        },
        {
          name: 'pass',
          isMut: true,
          isSigner: false,
          docs: ['The pass account that is being added'],
        },
        {
          name: 'globalPassConfig',
          isMut: false,
          isSigner: false,
          docs: ['The global pass config account with collection_owner tree address to check against'],
        },
        {
          name: 'collectionOwner',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'leafDelegate',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'treeAuthority',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'merkleTree',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'logWrapper',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'compressionProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'bubblegumProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'params',
          type: {
            defined: 'BurnPassParams',
          },
        },
      ],
    },
    {
      name: 'viewCouponReturnsForNft',
      accounts: [
        {
          name: 'collection',
          isMut: false,
          isSigner: false,
          docs: ['The collection of the bond for checks.'],
        },
        {
          name: 'pdaBondTokenAccount',
          isMut: false,
          isSigner: false,
          docs: ['The pda bond token account that holds the bond tokens.'],
        },
        {
          name: 'nft',
          isMut: false,
          isSigner: false,
          docs: ['The PDA that holds the bonds that collect interest.'],
        },
        {
          name: 'interestPaymentTokenAccount',
          isMut: false,
          isSigner: false,
          docs: ['The global interest payment token account'],
        },
        {
          name: 'interest',
          isMut: false,
          isSigner: false,
          docs: ['The global interest PDA account'],
        },
        {
          name: 'bondMint',
          isMut: false,
          isSigner: false,
          docs: ['The bond mint'],
        },
        {
          name: 'paymentMint',
          isMut: false,
          isSigner: false,
          docs: ['The payment mint'],
        },
        {
          name: 'nftMint',
          isMut: false,
          isSigner: false,
          docs: ['The nft mint'],
        },
      ],
      args: [
        {
          name: 'params',
          type: {
            defined: 'ViewCouponReturnsForNftParams',
          },
        },
      ],
      returns: {
        defined: 'ViewCouponReturnsForNftOutput',
      },
    },
  ],
  accounts: [
    {
      name: 'collection',
      docs: ['The collection pda'],
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'bondAdmin',
            docs: ['The bond admin that is adding the collection'],
            type: 'publicKey',
          },
          {
            name: 'mint',
            docs: ['The mint that will be used to mint the bonds'],
            type: 'publicKey',
          },
          {
            name: 'description',
            docs: ['The bond type description'],
            type: 'string',
          },
          {
            name: 'nftMint',
            docs: ['The nft mint that will be used to show collection nft details'],
            type: 'publicKey',
          },
          {
            name: 'supply',
            docs: ['The total supply of bonds that can be minted', 'This total amount is deducted from each mint'],
            type: 'u64',
          },
          {
            name: 'totalBondsMinted',
            docs: ['The total amount of bonds that have been minted'],
            type: 'u64',
          },
          {
            name: 'authority',
            docs: ['The authority that can mint bonds', 'This would be the pda so that it can sign for the mint'],
            type: 'publicKey',
          },
          {
            name: 'paymentMint',
            docs: ['The payment mint that is used to pay for the bond'],
            type: 'publicKey',
          },
          {
            name: 'paymentUsdCost',
            docs: ['The payment usd cost of the bond in the payment mint'],
            type: 'u64',
          },
          {
            name: 'paymentDecimals',
            docs: ['The decimals of the mint that is used to pay for the bond'],
            type: 'u8',
          },
          {
            name: 'oracleParams',
            docs: ['The oracle type that is used to get the price feed'],
            type: {
              defined: 'OracleParams',
            },
          },
          {
            name: 'fundingAccounts',
            docs: ['The funding accounts for the collection'],
            type: {
              defined: 'FundingAccounts',
            },
          },
          {
            name: 'fundingDate',
            docs: ['The date that that collection starts accepting funds'],
            type: 'i64',
          },
          {
            name: 'startDate',
            docs: ['The start date that the bonds start accumulating interest and the mint closes'],
            type: 'i64',
          },
          {
            name: 'maturityDate',
            docs: ['The maturity date of the bond. This is the date that the bond can be redeemed'],
            type: 'i64',
          },
          {
            name: 'interestRate',
            docs: ['The interest rate of the bond collection. **This is cosmetic and is not used in the program**'],
            type: 'f64',
          },
          {
            name: 'isFrozen',
            docs: ['Whether the collection is frozen or not'],
            type: 'bool',
          },
          {
            name: 'nftAccessPassCollection',
            docs: ['The NFT pass collection metadata mint'],
            type: 'publicKey',
          },
          {
            name: 'tokenUri',
            docs: ['The bond spl token uri'],
            type: 'string',
          },
          {
            name: 'tokenName',
            docs: ['The bond spl token name'],
            type: 'string',
          },
          {
            name: 'tokenSymbol',
            docs: ['The bond spl token symbol'],
            type: 'string',
          },
          {
            name: 'nftUri',
            docs: ['The bond nft token uri'],
            type: 'string',
          },
          {
            name: 'nftName',
            docs: ['The bond nft token name'],
            type: 'string',
          },
          {
            name: 'nftSymbol',
            docs: ['The bond nft token symbol'],
            type: 'string',
          },
          {
            name: 'bump',
            docs: ['The bump seed for the collection pda'],
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'paymentAccount',
      docs: ['The PDA used for the payments recieved for minting a bond'],
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'authority',
            type: 'publicKey',
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'interestAccount',
      docs: ['The PDA used for the interest payments'],
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'authority',
            type: 'publicKey',
          },
          {
            name: 'bump',
            type: 'u8',
          },
          {
            name: 'runningTotal',
            type: {
              vec: 'u64',
            },
          },
          {
            name: 'counter',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'parValueAccount',
      docs: ['The PDA used for the par value payments'],
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'authority',
            type: 'publicKey',
          },
          {
            name: 'runningTotal',
            type: {
              vec: 'u64',
            },
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'kyc',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'wallet',
            type: 'publicKey',
          },
          {
            name: 'isDisabled',
            type: 'bool',
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'nft',
      docs: [
        "NFT PDA with the mint it's tied to, the bump seed for the PDA,",
        'and the counter to keep track of when the interest payment',
        'was last collected compared to the interest funding account',
      ],
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'mint',
            type: 'publicKey',
          },
          {
            name: 'bump',
            type: 'u8',
          },
          {
            name: 'counter',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'globalPassConfig',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'collectionOwner',
            type: 'publicKey',
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'pass',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'wallet',
            type: 'publicKey',
          },
          {
            name: 'isDisabled',
            type: 'bool',
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
  ],
  types: [
    {
      name: 'BurnPassParams',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'root',
            type: {
              array: ['u8', 32],
            },
          },
          {
            name: 'dataHash',
            type: {
              array: ['u8', 32],
            },
          },
          {
            name: 'creatorHash',
            type: {
              array: ['u8', 32],
            },
          },
          {
            name: 'nonce',
            type: 'u64',
          },
          {
            name: 'index',
            type: 'u32',
          },
        ],
      },
    },
    {
      name: 'CollectCouponParams',
      type: {
        kind: 'struct',
        fields: [],
      },
    },
    {
      name: 'CollectParValueForNFTParams',
      type: {
        kind: 'struct',
        fields: [],
      },
    },
    {
      name: 'CollectParValueParams',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'amount',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'ExchangeTokensForNFTParams',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'amount',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'MintBondParams',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'amount',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'SetNFTParams',
      type: {
        kind: 'struct',
        fields: [],
      },
    },
    {
      name: 'ViewCouponReturnsForNftParams',
      type: {
        kind: 'struct',
        fields: [],
      },
    },
    {
      name: 'ViewCouponReturnsForNftOutput',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'amount',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'ViewCouponReturnsParams',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'amount',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'ViewCouponReturnsOutput',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'amount',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'ViewParValueForNftReturnsParams',
      type: {
        kind: 'struct',
        fields: [],
      },
    },
    {
      name: 'ViewParValueForNftReturnsOutput',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'amount',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'ViewParValueReturnsParams',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'amount',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'ViewParValueReturnsOutput',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'amount',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'FundingAccounts',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'paymentTokenAccount',
            docs: ['The funding token account that is used to receive payment for the bond'],
            type: 'publicKey',
          },
          {
            name: 'interestPaymentTokenAccount',
            docs: ['The interest payment token account that is used', 'to distribute interest that has accrued'],
            type: 'publicKey',
          },
          {
            name: 'parValuePaymentTokenAccount',
            docs: [
              'The par value payment token account that is used',
              'to distribute the par value payment up maturity',
            ],
            type: 'publicKey',
          },
        ],
      },
    },
    {
      name: 'OraclePrice',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'price',
            type: 'u64',
          },
          {
            name: 'exponent',
            type: 'i32',
          },
        ],
      },
    },
    {
      name: 'OracleParams',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'oracleAccount',
            type: 'publicKey',
          },
          {
            name: 'oracleType',
            type: {
              defined: 'OracleType',
            },
          },
          {
            name: 'maxPriceError',
            type: 'u64',
          },
          {
            name: 'maxPriceAgeSec',
            type: 'u32',
          },
        ],
      },
    },
    {
      name: 'OracleType',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'None',
          },
          {
            name: 'Test',
          },
          {
            name: 'Pyth',
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'InvalidBondAdmin',
      msg: 'Invalid bond admin',
    },
    {
      code: 6001,
      name: 'InvalidProgramAuthority',
      msg: 'Invalid program authority',
    },
    {
      code: 6002,
      name: 'InvalidKycAuthority',
      msg: 'Invalid kyc authority',
    },
    {
      code: 6003,
      name: 'InvalidMint',
      msg: 'Invalid mint',
    },
    {
      code: 6004,
      name: 'InvalidArgument',
      msg: 'Invalid argument',
    },
    {
      code: 6005,
      name: 'AdminIsDisabled',
      msg: 'Admin is disabled',
    },
    {
      code: 6006,
      name: 'InvalidFundingAccount',
      msg: 'Invalid funding account',
    },
    {
      code: 6007,
      name: 'InvalidCollection',
      msg: 'Invalid collection',
    },
    {
      code: 6008,
      name: 'TimeIsBeforeFundingDate',
      msg: 'Current time is before funding date availability',
    },
    {
      code: 6009,
      name: 'TimeIsAfterStartDate',
      msg: 'Current time is after start date. Bond already started',
    },
    {
      code: 6010,
      name: 'SupplyIsZero',
      msg: 'Supply is zero',
    },
    {
      code: 6011,
      name: 'SupplyIsInsufficient',
      msg: 'Supply is insufficient',
    },
    {
      code: 6012,
      name: 'MathOverflow',
      msg: 'Overflow in arithmetic operation',
    },
    {
      code: 6013,
      name: 'FundingAccountsAlreadySet',
      msg: 'Funding accounts already set',
    },
    {
      code: 6014,
      name: 'InvalidCounter',
      msg: 'Invalid Counter',
    },
    {
      code: 6015,
      name: 'InternalError',
      msg: 'Internal Error',
    },
    {
      code: 6016,
      name: 'NoInterestToCredit',
      msg: 'No interest payment to credit',
    },
    {
      code: 6017,
      name: 'NoParValueToCredit',
      msg: 'No par value payment to credit',
    },
    {
      code: 6018,
      name: 'CollectionIsFrozen',
      msg: 'Collection is frozen',
    },
    {
      code: 6019,
      name: 'KycUserIsAlreadyDisabled',
      msg: 'Kyc user is disabled',
    },
    {
      code: 6020,
      name: 'PythError',
      msg: 'Pyth has an internal error.',
    },
    {
      code: 6021,
      name: 'PythOffline',
      msg: 'Pyth price oracle is offline.',
    },
    {
      code: 6022,
      name: 'TryToSerializePriceAccount',
      msg: 'Program should not try to serialize a price account.',
    },
    {
      code: 6023,
      name: 'InvalidOracleAccount',
      msg: 'Invalid oracle account',
    },
    {
      code: 6024,
      name: 'InvalidOraclePrice',
      msg: 'Invalid oracle price',
    },
    {
      code: 6025,
      name: 'StaleOraclePrice',
      msg: 'Stale oracle price',
    },
    {
      code: 6026,
      name: 'UnsupportedOracle',
      msg: 'Unsupported Oracle',
    },
    {
      code: 6027,
      name: 'InvalidCollectionOwner',
      msg: 'Invalid Collection Owner',
    },
    {
      code: 6028,
      name: 'KycRequired',
      msg: 'Kyc required',
    },
    {
      code: 6029,
      name: 'AccessPassRequired',
      msg: 'Access pass required',
    },
    {
      code: 6030,
      name: 'InvalidOperation',
      msg: 'Invalid operation',
    },
  ],
};
