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
      name: 'addAdmin';
      accounts: [
        {
          name: 'programAuthority';
          isMut: true;
          isSigner: true;
          docs: ['The program authority of the bond program'];
        },
        {
          name: 'admin';
          isMut: true;
          isSigner: false;
          docs: ['The admin account that is being added'];
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
          docs: ['The system program since we are creating an account'];
        },
      ];
      args: [
        {
          name: 'params';
          type: {
            defined: 'AddAdminParams';
          };
        },
      ];
    },
    {
      name: 'removeAdmin';
      accounts: [
        {
          name: 'programAuthority';
          isMut: true;
          isSigner: true;
          docs: ['Only the program authority can remove an admin'];
        },
        {
          name: 'admin';
          isMut: false;
          isSigner: false;
          docs: ['The admin pda derived from the authority field'];
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
            defined: 'RemoveAdminParams';
          };
        },
      ];
    },
    {
      name: 'initCollection';
      accounts: [
        {
          name: 'bondAdmin';
          isMut: true;
          isSigner: true;
          docs: ['The bond admin that is adding the collection'];
        },
        {
          name: 'mint';
          isMut: true;
          isSigner: true;
          docs: ['The mint that will be used to mint the bonds'];
        },
        {
          name: 'nftMint';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'admin';
          isMut: false;
          isSigner: false;
          docs: [
            'The admin pda that we use to validate',
            'that the admin exists and is enabled',
            'and the seed is derived from the signer',
          ];
        },
        {
          name: 'collection';
          isMut: true;
          isSigner: false;
          docs: ['The collection that is being created with', 'the mint as part of the seed'];
        },
        {
          name: 'paymentMint';
          isMut: false;
          isSigner: false;
          docs: ['The form of payment used to mint the bond'];
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
          docs: ['The token program since we are passing in mints'];
        },
        {
          name: 'associatedTokenProgram';
          isMut: false;
          isSigner: false;
          docs: ['The associated token program because we have associated token accounts'];
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
          docs: ['The system program because we are creating accounts'];
        },
      ];
      args: [
        {
          name: 'params';
          type: {
            defined: 'InitCollectionParams';
          };
        },
      ];
    },
    {
      name: 'initGlobalPassConfig';
      accounts: [
        {
          name: 'bondAdmin';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'admin';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'globalPassConfig';
          isMut: true;
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
            defined: 'InitGlobalPassConfigParams';
          };
        },
      ];
    },
    {
      name: 'setGlobalPassConfig';
      accounts: [
        {
          name: 'bondAdmin';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'admin';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'globalPassConfig';
          isMut: true;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'params';
          type: {
            defined: 'SetGlobalPassConfigParams';
          };
        },
      ];
    },
    {
      name: 'setCollectionMint';
      accounts: [
        {
          name: 'bondAdmin';
          isMut: true;
          isSigner: true;
          docs: ['The bond admin that is signing the transaction'];
        },
        {
          name: 'mint';
          isMut: true;
          isSigner: true;
          docs: ['The mint that is being initialized', 'Needs to be signed to be initialized'];
        },
        {
          name: 'admin';
          isMut: false;
          isSigner: false;
          docs: [
            'The admin PDA that is used to make sure the bond admin',
            'that signed the transaction is an active admin',
          ];
        },
        {
          name: 'collection';
          isMut: false;
          isSigner: false;
          docs: ['The collection where the mint is being set'];
        },
        {
          name: 'metadata';
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
          docs: ['The token program since we are minting'];
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
          docs: ['The rent sysvar'];
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
          docs: ['The system program since we create an account'];
        },
      ];
      args: [
        {
          name: 'params';
          type: {
            defined: 'SetCollectionMintParams';
          };
        },
      ];
    },
    {
      name: 'setCollectionNft';
      accounts: [
        {
          name: 'bondAdmin';
          isMut: true;
          isSigner: true;
          docs: ['The bond admin that is signing the transaction'];
        },
        {
          name: 'collectionNftMint';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'admin';
          isMut: false;
          isSigner: false;
          docs: [
            'The admin PDA that is used to make sure the bond admin',
            'that signed the transaction is an active admin',
          ];
        },
        {
          name: 'collection';
          isMut: false;
          isSigner: false;
          docs: ['The collection where the mint is being set'];
        },
        {
          name: 'bondMint';
          isMut: true;
          isSigner: false;
          docs: ['The bond mint'];
        },
        {
          name: 'pdaCollectionNftTokenAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'collectionMetadata';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'collectionMasterEdition';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'tokenMetadataProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'associatedTokenProgram';
          isMut: false;
          isSigner: false;
          docs: ['The associated token program'];
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
          docs: ['The token program since we are minting'];
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
          docs: ['The rent sysvar'];
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
          docs: ['The system program since we create an account'];
        },
      ];
      args: [
        {
          name: 'params';
          type: {
            defined: 'SetCollectionNFTParams';
          };
        },
      ];
    },
    {
      name: 'setFundingAccounts';
      accounts: [
        {
          name: 'bondAdmin';
          isMut: true;
          isSigner: true;
          docs: ['The bond admin of the collection'];
        },
        {
          name: 'admin';
          isMut: false;
          isSigner: false;
          docs: ['The admin pda that we use to validate the bond admin is an existing admin'];
        },
        {
          name: 'collection';
          isMut: true;
          isSigner: false;
          docs: ['The collection passed in has the bond admin as the admin'];
        },
        {
          name: 'paymentAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'interestAccount';
          isMut: true;
          isSigner: false;
          docs: ['The interest account PDA that also has a token account for USDC'];
        },
        {
          name: 'parValueAccount';
          isMut: true;
          isSigner: false;
          docs: ['The par value account PDA that also has a token account for USDC'];
        },
        {
          name: 'paymentTokenAccount';
          isMut: true;
          isSigner: false;
          docs: ['The payment token account being created and set'];
        },
        {
          name: 'interestPaymentTokenAccount';
          isMut: true;
          isSigner: false;
          docs: ['The interest payment token account being created and set'];
        },
        {
          name: 'parValuePaymentTokenAccount';
          isMut: true;
          isSigner: false;
          docs: ['The par value payment token account being created and set'];
        },
        {
          name: 'paymentMint';
          isMut: false;
          isSigner: false;
          docs: ['The form of payment used to mint the bond'];
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
          docs: ['The token program since we are passing in mints'];
        },
        {
          name: 'associatedTokenProgram';
          isMut: false;
          isSigner: false;
          docs: ['The associated token program because we have associated token accounts'];
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
            defined: 'SetFundingAccountsParams';
          };
        },
      ];
    },
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
      name: 'collectMintFunds';
      accounts: [
        {
          name: 'bondAdmin';
          isMut: true;
          isSigner: true;
          docs: ['Bond admin is the signer and validated against the PDA passed in'];
        },
        {
          name: 'admin';
          isMut: false;
          isSigner: false;
          docs: ['The admin pda has the authority as the bond admin and is enabled'];
        },
        {
          name: 'collection';
          isMut: true;
          isSigner: false;
          docs: [
            'The collection has the bond admin as the admin',
            'The payment mint matches the payment mint passed in',
            'TODO: Check on the collection that the funding date is over?',
          ];
        },
        {
          name: 'paymentAccount';
          isMut: true;
          isSigner: false;
          docs: ['The payment account passed in has the bond admin as the authority to withdraw funds'];
        },
        {
          name: 'paymentTokenAccount';
          isMut: true;
          isSigner: false;
          docs: [
            'The payment token account has the payment pda as the authority',
            'and the mint matches the payment mint passed in',
          ];
        },
        {
          name: 'bondAdminTokenAccount';
          isMut: true;
          isSigner: false;
          docs: [
            'The bond admin token account is created if needed and sets the authority as the bond admin',
            'If it already exists, then the authority is checked against the bond admin',
          ];
        },
        {
          name: 'paymentMint';
          isMut: false;
          isSigner: false;
          docs: ['The usdc payment'];
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
            defined: 'CollectMintFundsParams';
          };
        },
      ];
    },
    {
      name: 'fundInterestPayment';
      accounts: [
        {
          name: 'bondAdmin';
          isMut: true;
          isSigner: true;
          docs: ['Bond admin is signer'];
        },
        {
          name: 'admin';
          isMut: false;
          isSigner: false;
          docs: ['The admin pda has the bond admin as the authority as the bond admin and is enabled'];
        },
        {
          name: 'collection';
          isMut: true;
          isSigner: false;
          docs: [
            'collection has the bond admin as the admin and the payment mint matches',
            'the interest payment token account is also checked',
          ];
        },
        {
          name: 'interestAccount';
          isMut: true;
          isSigner: false;
          docs: ['The interest account so that we can validate the token account authority'];
        },
        {
          name: 'interestTokenAccount';
          isMut: true;
          isSigner: false;
          docs: ['The token account for the interest payment'];
        },
        {
          name: 'bondAdminTokenAccount';
          isMut: true;
          isSigner: false;
          docs: ['The bond admin token account with the matching mint to send interest payment funds'];
        },
        {
          name: 'paymentMint';
          isMut: false;
          isSigner: false;
          docs: ['The mint for the funds being transfered'];
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
            defined: 'FundInterestPaymentParams';
          };
        },
      ];
    },
    {
      name: 'fundParValuePayment';
      accounts: [
        {
          name: 'bondAdmin';
          isMut: true;
          isSigner: true;
          docs: ['Bond admin is signer'];
        },
        {
          name: 'admin';
          isMut: false;
          isSigner: false;
          docs: ['The admin pda has the bond admin as the authority as the bond admin and is enabled'];
        },
        {
          name: 'collection';
          isMut: true;
          isSigner: false;
          docs: [
            'collection has the bond admin as the admin and the payment mint matches',
            'the par_value payment token account is also checked',
          ];
        },
        {
          name: 'parValueAccount';
          isMut: true;
          isSigner: false;
          docs: ['The par_value account so that we can validate the token account authority'];
        },
        {
          name: 'parValueTokenAccount';
          isMut: true;
          isSigner: false;
          docs: ['The token account for the par_value payment'];
        },
        {
          name: 'bondAdminTokenAccount';
          isMut: true;
          isSigner: false;
          docs: ['The bond admin token account with the matching mint to send par_value payment funds'];
        },
        {
          name: 'paymentMint';
          isMut: false;
          isSigner: false;
          docs: ['The mint for the funds being transfered'];
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
            defined: 'FundParValuePaymentParams';
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
          isMut: false;
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
          name: 'pass';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
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
          name: 'pass';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
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
          isMut: false;
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
          name: 'pass';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
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
      name: 'setCollectionLimit';
      accounts: [
        {
          name: 'bondAdmin';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'admin';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'collection';
          isMut: true;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'params';
          type: {
            defined: 'SetCollectionLimitParams';
          };
        },
      ];
    },
    {
      name: 'setCollectionInterestRate';
      accounts: [
        {
          name: 'bondAdmin';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'admin';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'collection';
          isMut: true;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'params';
          type: {
            defined: 'SetCollectionInterestRateParams';
          };
        },
      ];
    },
    {
      name: 'freezeCollection';
      accounts: [
        {
          name: 'bondAdmin';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'admin';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'collection';
          isMut: true;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'params';
          type: {
            defined: 'FreezeCollectionParams';
          };
        },
      ];
    },
    {
      name: 'unfreezeCollection';
      accounts: [
        {
          name: 'bondAdmin';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'admin';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'collection';
          isMut: true;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'params';
          type: {
            defined: 'UnfreezeCollectionParams';
          };
        },
      ];
    },
    {
      name: 'addKycUser';
      accounts: [
        {
          name: 'kycAuthority';
          isMut: true;
          isSigner: true;
          docs: ['The kyc authority of the bond admin account of any collection'];
        },
        {
          name: 'bondAdmin';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'admin';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'kyc';
          isMut: true;
          isSigner: false;
          docs: ['The kyc account that is being added'];
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
          docs: ['The system program since we are creating an account'];
        },
      ];
      args: [
        {
          name: 'params';
          type: {
            defined: 'AddKycUserParams';
          };
        },
      ];
    },
    {
      name: 'disableKycUser';
      accounts: [
        {
          name: 'kycAuthority';
          isMut: true;
          isSigner: true;
          docs: ['The kyc authority of the bond admin account of any collection'];
        },
        {
          name: 'bondAdmin';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'admin';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'kyc';
          isMut: true;
          isSigner: false;
          docs: ['The kyc account that is being disabled'];
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
          docs: ['The system program since we are creating an account'];
        },
      ];
      args: [
        {
          name: 'params';
          type: {
            defined: 'DisableKycUserParams';
          };
        },
      ];
    },
    {
      name: 'setCollectionMaturityDate';
      accounts: [
        {
          name: 'bondAdmin';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'admin';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'collection';
          isMut: true;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'params';
          type: {
            defined: 'SetCollectionMaturityDateParams';
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
      name: 'admin';
      docs: ['The admin account is used to control the program.'];
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'authority';
            docs: ['What is the pubkey of the admin for this Admin PDA.'];
            type: 'publicKey';
          },
          {
            name: 'isEnabled';
            docs: ['is_enabled flag to allow us to disable the admin.'];
            type: 'bool';
          },
          {
            name: 'kycAuthority';
            docs: ['The kyc authority pubkey that can add a kyc user.'];
            type: 'publicKey';
          },
          {
            name: 'bump';
            docs: ['The bump seed for the admin account.'];
            type: 'u8';
          },
        ];
      };
    },
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
      name: 'AddAdminParams';
      docs: ['Pass in the admin pubkey as a param so that we can add it'];
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'admin';
            type: 'publicKey';
          },
          {
            name: 'kycAuthority';
            type: 'publicKey';
          },
        ];
      };
    },
    {
      name: 'AddKycUserParams';
      docs: ['Pass in the admin pubkey as a param so that we can add it'];
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'wallet';
            type: 'publicKey';
          },
        ];
      };
    },
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
      name: 'CollectMintFundsParams';
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
      name: 'DisableKycUserParams';
      docs: ['Pass in the admin pubkey as a param so that we can add it'];
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'wallet';
            type: 'publicKey';
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
      name: 'FreezeCollectionParams';
      type: {
        kind: 'struct';
        fields: [];
      };
    },
    {
      name: 'FundInterestPaymentParams';
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
      name: 'FundParValuePaymentParams';
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
      name: 'InitCollectionParams';
      docs: ['The parameters for the init collection instruction'];
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'description';
            docs: ['The description of the bond collection i.e. the type of bond'];
            type: 'string';
          },
          {
            name: 'supply';
            docs: ['The total mint supply of the collection that we cap at'];
            type: 'u64';
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
            name: 'paymentUsdCost';
            docs: ['The usd cost of the bond in the payment mint'];
            type: 'u64';
          },
          {
            name: 'paymentDecimals';
            docs: ['The number of decimals in the payment mint'];
            type: 'u8';
          },
          {
            name: 'oracleParams';
            docs: ['The oracle type: pyth, switchboard, etc'];
            type: {
              defined: 'OracleParams';
            };
          },
          {
            name: 'nftAccessPassCollection';
            docs: ['nft access pass collection mint'];
            type: 'publicKey';
          },
          {
            name: 'tokenUri';
            docs: ['token uri'];
            type: 'string';
          },
          {
            name: 'tokenName';
            docs: ['token name'];
            type: 'string';
          },
          {
            name: 'tokenSymbol';
            docs: ['token symbol'];
            type: 'string';
          },
          {
            name: 'nftUri';
            docs: ['nft uri'];
            type: 'string';
          },
          {
            name: 'nftName';
            docs: ['nft name'];
            type: 'string';
          },
          {
            name: 'nftSymbol';
            docs: ['nft symbol'];
            type: 'string';
          },
        ];
      };
    },
    {
      name: 'InitGlobalPassConfigParams';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'collectionOwner';
            type: 'publicKey';
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
      name: 'RemoveAdminParams';
      type: {
        kind: 'struct';
        fields: [];
      };
    },
    {
      name: 'SetCollectionInterestRateParams';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'interestRate';
            type: 'f64';
          },
        ];
      };
    },
    {
      name: 'SetCollectionLimitParams';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'limit';
            type: 'u64';
          },
        ];
      };
    },
    {
      name: 'SetCollectionMaturityDateParams';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'maturityDate';
            type: 'i64';
          },
        ];
      };
    },
    {
      name: 'SetCollectionMintParams';
      type: {
        kind: 'struct';
        fields: [];
      };
    },
    {
      name: 'SetCollectionNFTParams';
      type: {
        kind: 'struct';
        fields: [];
      };
    },
    {
      name: 'SetFundingAccountsParams';
      type: {
        kind: 'struct';
        fields: [];
      };
    },
    {
      name: 'SetGlobalPassConfigParams';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'collectionOwner';
            type: 'publicKey';
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
      name: 'UnfreezeCollectionParams';
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
      name: 'addAdmin',
      accounts: [
        {
          name: 'programAuthority',
          isMut: true,
          isSigner: true,
          docs: ['The program authority of the bond program'],
        },
        {
          name: 'admin',
          isMut: true,
          isSigner: false,
          docs: ['The admin account that is being added'],
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
          docs: ['The system program since we are creating an account'],
        },
      ],
      args: [
        {
          name: 'params',
          type: {
            defined: 'AddAdminParams',
          },
        },
      ],
    },
    {
      name: 'removeAdmin',
      accounts: [
        {
          name: 'programAuthority',
          isMut: true,
          isSigner: true,
          docs: ['Only the program authority can remove an admin'],
        },
        {
          name: 'admin',
          isMut: false,
          isSigner: false,
          docs: ['The admin pda derived from the authority field'],
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
            defined: 'RemoveAdminParams',
          },
        },
      ],
    },
    {
      name: 'initCollection',
      accounts: [
        {
          name: 'bondAdmin',
          isMut: true,
          isSigner: true,
          docs: ['The bond admin that is adding the collection'],
        },
        {
          name: 'mint',
          isMut: true,
          isSigner: true,
          docs: ['The mint that will be used to mint the bonds'],
        },
        {
          name: 'nftMint',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'admin',
          isMut: false,
          isSigner: false,
          docs: [
            'The admin pda that we use to validate',
            'that the admin exists and is enabled',
            'and the seed is derived from the signer',
          ],
        },
        {
          name: 'collection',
          isMut: true,
          isSigner: false,
          docs: ['The collection that is being created with', 'the mint as part of the seed'],
        },
        {
          name: 'paymentMint',
          isMut: false,
          isSigner: false,
          docs: ['The form of payment used to mint the bond'],
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
          docs: ['The token program since we are passing in mints'],
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
          docs: ['The associated token program because we have associated token accounts'],
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
          docs: ['The system program because we are creating accounts'],
        },
      ],
      args: [
        {
          name: 'params',
          type: {
            defined: 'InitCollectionParams',
          },
        },
      ],
    },
    {
      name: 'initGlobalPassConfig',
      accounts: [
        {
          name: 'bondAdmin',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'admin',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'globalPassConfig',
          isMut: true,
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
            defined: 'InitGlobalPassConfigParams',
          },
        },
      ],
    },
    {
      name: 'setGlobalPassConfig',
      accounts: [
        {
          name: 'bondAdmin',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'admin',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'globalPassConfig',
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'params',
          type: {
            defined: 'SetGlobalPassConfigParams',
          },
        },
      ],
    },
    {
      name: 'setCollectionMint',
      accounts: [
        {
          name: 'bondAdmin',
          isMut: true,
          isSigner: true,
          docs: ['The bond admin that is signing the transaction'],
        },
        {
          name: 'mint',
          isMut: true,
          isSigner: true,
          docs: ['The mint that is being initialized', 'Needs to be signed to be initialized'],
        },
        {
          name: 'admin',
          isMut: false,
          isSigner: false,
          docs: [
            'The admin PDA that is used to make sure the bond admin',
            'that signed the transaction is an active admin',
          ],
        },
        {
          name: 'collection',
          isMut: false,
          isSigner: false,
          docs: ['The collection where the mint is being set'],
        },
        {
          name: 'metadata',
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
          docs: ['The token program since we are minting'],
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
          docs: ['The rent sysvar'],
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
          docs: ['The system program since we create an account'],
        },
      ],
      args: [
        {
          name: 'params',
          type: {
            defined: 'SetCollectionMintParams',
          },
        },
      ],
    },
    {
      name: 'setCollectionNft',
      accounts: [
        {
          name: 'bondAdmin',
          isMut: true,
          isSigner: true,
          docs: ['The bond admin that is signing the transaction'],
        },
        {
          name: 'collectionNftMint',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'admin',
          isMut: false,
          isSigner: false,
          docs: [
            'The admin PDA that is used to make sure the bond admin',
            'that signed the transaction is an active admin',
          ],
        },
        {
          name: 'collection',
          isMut: false,
          isSigner: false,
          docs: ['The collection where the mint is being set'],
        },
        {
          name: 'bondMint',
          isMut: true,
          isSigner: false,
          docs: ['The bond mint'],
        },
        {
          name: 'pdaCollectionNftTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'collectionMetadata',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'collectionMasterEdition',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenMetadataProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
          docs: ['The associated token program'],
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
          docs: ['The token program since we are minting'],
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
          docs: ['The rent sysvar'],
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
          docs: ['The system program since we create an account'],
        },
      ],
      args: [
        {
          name: 'params',
          type: {
            defined: 'SetCollectionNFTParams',
          },
        },
      ],
    },
    {
      name: 'setFundingAccounts',
      accounts: [
        {
          name: 'bondAdmin',
          isMut: true,
          isSigner: true,
          docs: ['The bond admin of the collection'],
        },
        {
          name: 'admin',
          isMut: false,
          isSigner: false,
          docs: ['The admin pda that we use to validate the bond admin is an existing admin'],
        },
        {
          name: 'collection',
          isMut: true,
          isSigner: false,
          docs: ['The collection passed in has the bond admin as the admin'],
        },
        {
          name: 'paymentAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'interestAccount',
          isMut: true,
          isSigner: false,
          docs: ['The interest account PDA that also has a token account for USDC'],
        },
        {
          name: 'parValueAccount',
          isMut: true,
          isSigner: false,
          docs: ['The par value account PDA that also has a token account for USDC'],
        },
        {
          name: 'paymentTokenAccount',
          isMut: true,
          isSigner: false,
          docs: ['The payment token account being created and set'],
        },
        {
          name: 'interestPaymentTokenAccount',
          isMut: true,
          isSigner: false,
          docs: ['The interest payment token account being created and set'],
        },
        {
          name: 'parValuePaymentTokenAccount',
          isMut: true,
          isSigner: false,
          docs: ['The par value payment token account being created and set'],
        },
        {
          name: 'paymentMint',
          isMut: false,
          isSigner: false,
          docs: ['The form of payment used to mint the bond'],
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
          docs: ['The token program since we are passing in mints'],
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
          docs: ['The associated token program because we have associated token accounts'],
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
            defined: 'SetFundingAccountsParams',
          },
        },
      ],
    },
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
      name: 'collectMintFunds',
      accounts: [
        {
          name: 'bondAdmin',
          isMut: true,
          isSigner: true,
          docs: ['Bond admin is the signer and validated against the PDA passed in'],
        },
        {
          name: 'admin',
          isMut: false,
          isSigner: false,
          docs: ['The admin pda has the authority as the bond admin and is enabled'],
        },
        {
          name: 'collection',
          isMut: true,
          isSigner: false,
          docs: [
            'The collection has the bond admin as the admin',
            'The payment mint matches the payment mint passed in',
            'TODO: Check on the collection that the funding date is over?',
          ],
        },
        {
          name: 'paymentAccount',
          isMut: true,
          isSigner: false,
          docs: ['The payment account passed in has the bond admin as the authority to withdraw funds'],
        },
        {
          name: 'paymentTokenAccount',
          isMut: true,
          isSigner: false,
          docs: [
            'The payment token account has the payment pda as the authority',
            'and the mint matches the payment mint passed in',
          ],
        },
        {
          name: 'bondAdminTokenAccount',
          isMut: true,
          isSigner: false,
          docs: [
            'The bond admin token account is created if needed and sets the authority as the bond admin',
            'If it already exists, then the authority is checked against the bond admin',
          ],
        },
        {
          name: 'paymentMint',
          isMut: false,
          isSigner: false,
          docs: ['The usdc payment'],
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
            defined: 'CollectMintFundsParams',
          },
        },
      ],
    },
    {
      name: 'fundInterestPayment',
      accounts: [
        {
          name: 'bondAdmin',
          isMut: true,
          isSigner: true,
          docs: ['Bond admin is signer'],
        },
        {
          name: 'admin',
          isMut: false,
          isSigner: false,
          docs: ['The admin pda has the bond admin as the authority as the bond admin and is enabled'],
        },
        {
          name: 'collection',
          isMut: true,
          isSigner: false,
          docs: [
            'collection has the bond admin as the admin and the payment mint matches',
            'the interest payment token account is also checked',
          ],
        },
        {
          name: 'interestAccount',
          isMut: true,
          isSigner: false,
          docs: ['The interest account so that we can validate the token account authority'],
        },
        {
          name: 'interestTokenAccount',
          isMut: true,
          isSigner: false,
          docs: ['The token account for the interest payment'],
        },
        {
          name: 'bondAdminTokenAccount',
          isMut: true,
          isSigner: false,
          docs: ['The bond admin token account with the matching mint to send interest payment funds'],
        },
        {
          name: 'paymentMint',
          isMut: false,
          isSigner: false,
          docs: ['The mint for the funds being transfered'],
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
            defined: 'FundInterestPaymentParams',
          },
        },
      ],
    },
    {
      name: 'fundParValuePayment',
      accounts: [
        {
          name: 'bondAdmin',
          isMut: true,
          isSigner: true,
          docs: ['Bond admin is signer'],
        },
        {
          name: 'admin',
          isMut: false,
          isSigner: false,
          docs: ['The admin pda has the bond admin as the authority as the bond admin and is enabled'],
        },
        {
          name: 'collection',
          isMut: true,
          isSigner: false,
          docs: [
            'collection has the bond admin as the admin and the payment mint matches',
            'the par_value payment token account is also checked',
          ],
        },
        {
          name: 'parValueAccount',
          isMut: true,
          isSigner: false,
          docs: ['The par_value account so that we can validate the token account authority'],
        },
        {
          name: 'parValueTokenAccount',
          isMut: true,
          isSigner: false,
          docs: ['The token account for the par_value payment'],
        },
        {
          name: 'bondAdminTokenAccount',
          isMut: true,
          isSigner: false,
          docs: ['The bond admin token account with the matching mint to send par_value payment funds'],
        },
        {
          name: 'paymentMint',
          isMut: false,
          isSigner: false,
          docs: ['The mint for the funds being transfered'],
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
            defined: 'FundParValuePaymentParams',
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
          isMut: false,
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
          name: 'pass',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
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
          name: 'pass',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
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
          isMut: false,
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
          name: 'pass',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
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
      name: 'setCollectionLimit',
      accounts: [
        {
          name: 'bondAdmin',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'admin',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'collection',
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'params',
          type: {
            defined: 'SetCollectionLimitParams',
          },
        },
      ],
    },
    {
      name: 'setCollectionInterestRate',
      accounts: [
        {
          name: 'bondAdmin',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'admin',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'collection',
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'params',
          type: {
            defined: 'SetCollectionInterestRateParams',
          },
        },
      ],
    },
    {
      name: 'freezeCollection',
      accounts: [
        {
          name: 'bondAdmin',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'admin',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'collection',
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'params',
          type: {
            defined: 'FreezeCollectionParams',
          },
        },
      ],
    },
    {
      name: 'unfreezeCollection',
      accounts: [
        {
          name: 'bondAdmin',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'admin',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'collection',
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'params',
          type: {
            defined: 'UnfreezeCollectionParams',
          },
        },
      ],
    },
    {
      name: 'addKycUser',
      accounts: [
        {
          name: 'kycAuthority',
          isMut: true,
          isSigner: true,
          docs: ['The kyc authority of the bond admin account of any collection'],
        },
        {
          name: 'bondAdmin',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'admin',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'kyc',
          isMut: true,
          isSigner: false,
          docs: ['The kyc account that is being added'],
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
          docs: ['The system program since we are creating an account'],
        },
      ],
      args: [
        {
          name: 'params',
          type: {
            defined: 'AddKycUserParams',
          },
        },
      ],
    },
    {
      name: 'disableKycUser',
      accounts: [
        {
          name: 'kycAuthority',
          isMut: true,
          isSigner: true,
          docs: ['The kyc authority of the bond admin account of any collection'],
        },
        {
          name: 'bondAdmin',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'admin',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'kyc',
          isMut: true,
          isSigner: false,
          docs: ['The kyc account that is being disabled'],
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
          docs: ['The system program since we are creating an account'],
        },
      ],
      args: [
        {
          name: 'params',
          type: {
            defined: 'DisableKycUserParams',
          },
        },
      ],
    },
    {
      name: 'setCollectionMaturityDate',
      accounts: [
        {
          name: 'bondAdmin',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'admin',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'collection',
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'params',
          type: {
            defined: 'SetCollectionMaturityDateParams',
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
      name: 'admin',
      docs: ['The admin account is used to control the program.'],
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'authority',
            docs: ['What is the pubkey of the admin for this Admin PDA.'],
            type: 'publicKey',
          },
          {
            name: 'isEnabled',
            docs: ['is_enabled flag to allow us to disable the admin.'],
            type: 'bool',
          },
          {
            name: 'kycAuthority',
            docs: ['The kyc authority pubkey that can add a kyc user.'],
            type: 'publicKey',
          },
          {
            name: 'bump',
            docs: ['The bump seed for the admin account.'],
            type: 'u8',
          },
        ],
      },
    },
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
      name: 'AddAdminParams',
      docs: ['Pass in the admin pubkey as a param so that we can add it'],
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'admin',
            type: 'publicKey',
          },
          {
            name: 'kycAuthority',
            type: 'publicKey',
          },
        ],
      },
    },
    {
      name: 'AddKycUserParams',
      docs: ['Pass in the admin pubkey as a param so that we can add it'],
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'wallet',
            type: 'publicKey',
          },
        ],
      },
    },
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
      name: 'CollectMintFundsParams',
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
      name: 'DisableKycUserParams',
      docs: ['Pass in the admin pubkey as a param so that we can add it'],
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'wallet',
            type: 'publicKey',
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
      name: 'FreezeCollectionParams',
      type: {
        kind: 'struct',
        fields: [],
      },
    },
    {
      name: 'FundInterestPaymentParams',
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
      name: 'FundParValuePaymentParams',
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
      name: 'InitCollectionParams',
      docs: ['The parameters for the init collection instruction'],
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'description',
            docs: ['The description of the bond collection i.e. the type of bond'],
            type: 'string',
          },
          {
            name: 'supply',
            docs: ['The total mint supply of the collection that we cap at'],
            type: 'u64',
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
            name: 'paymentUsdCost',
            docs: ['The usd cost of the bond in the payment mint'],
            type: 'u64',
          },
          {
            name: 'paymentDecimals',
            docs: ['The number of decimals in the payment mint'],
            type: 'u8',
          },
          {
            name: 'oracleParams',
            docs: ['The oracle type: pyth, switchboard, etc'],
            type: {
              defined: 'OracleParams',
            },
          },
          {
            name: 'nftAccessPassCollection',
            docs: ['nft access pass collection mint'],
            type: 'publicKey',
          },
          {
            name: 'tokenUri',
            docs: ['token uri'],
            type: 'string',
          },
          {
            name: 'tokenName',
            docs: ['token name'],
            type: 'string',
          },
          {
            name: 'tokenSymbol',
            docs: ['token symbol'],
            type: 'string',
          },
          {
            name: 'nftUri',
            docs: ['nft uri'],
            type: 'string',
          },
          {
            name: 'nftName',
            docs: ['nft name'],
            type: 'string',
          },
          {
            name: 'nftSymbol',
            docs: ['nft symbol'],
            type: 'string',
          },
        ],
      },
    },
    {
      name: 'InitGlobalPassConfigParams',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'collectionOwner',
            type: 'publicKey',
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
      name: 'RemoveAdminParams',
      type: {
        kind: 'struct',
        fields: [],
      },
    },
    {
      name: 'SetCollectionInterestRateParams',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'interestRate',
            type: 'f64',
          },
        ],
      },
    },
    {
      name: 'SetCollectionLimitParams',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'limit',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'SetCollectionMaturityDateParams',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'maturityDate',
            type: 'i64',
          },
        ],
      },
    },
    {
      name: 'SetCollectionMintParams',
      type: {
        kind: 'struct',
        fields: [],
      },
    },
    {
      name: 'SetCollectionNFTParams',
      type: {
        kind: 'struct',
        fields: [],
      },
    },
    {
      name: 'SetFundingAccountsParams',
      type: {
        kind: 'struct',
        fields: [],
      },
    },
    {
      name: 'SetGlobalPassConfigParams',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'collectionOwner',
            type: 'publicKey',
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
      name: 'UnfreezeCollectionParams',
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
