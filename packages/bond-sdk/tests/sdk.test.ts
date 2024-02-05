import { expect } from 'chai';
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import { Bond } from '../src/Bond';
import { getReadOnlyWallet } from '../src/utils';
import { DEVNET_ACCESS_PASS_COLLECTION_ID, DEVNET_BOND_PROGRAM_ID } from '../src/constants';

describe('Bond SDK', () => {
  let connection: Connection;

  before(() => {
    connection = new Connection(clusterApiUrl('devnet'));
  });

  it('create bond instance', async () => {
    let bond = new Bond(
      connection,
      getReadOnlyWallet(),
      new PublicKey(DEVNET_BOND_PROGRAM_ID),
      new PublicKey(DEVNET_ACCESS_PASS_COLLECTION_ID)
    );
    let collections = await bond.getCollections();
    expect(collections).to.not.be.empty;
    let collection = await bond.getCollection(collections[0].mint);
    expect(collection).to.not.be.empty;
  });
});
