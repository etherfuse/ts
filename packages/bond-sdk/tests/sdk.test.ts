import { expect } from 'chai';
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import { Bond } from '../src/Bond';
import { getReadOnlyWallet } from '../src/utils';

describe('Bond SDK', () => {
  let connection: Connection;

  before(() => {
    connection = new Connection(clusterApiUrl('devnet'));
  });

  it('create bond instance', async () => {
    let bond = new Bond(
      connection,
      getReadOnlyWallet(),
      new PublicKey('E1UhfWQYVQP8BfNcNMuPM3j2fypxU6o8JsCkAmcSy1Ui'),
      new PublicKey('H7HAVkjcxNYcSDF8r2R43AypAobMGbZ5x9SYkyv8pqxk')
    );
    let collections = await bond.getCollections();
    expect(collections).to.not.be.empty;
    let collection = await bond.getCollection(collections[0].mint);
    expect(collection).to.not.be.empty;
  });
});
