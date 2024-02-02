import { expect } from 'chai';
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import { Bond } from '../src/Bond';

describe('Bond SDK', () => {
  let connection: Connection;

  before(() => {
    connection = new Connection(clusterApiUrl('devnet'));
  });

  it('create bond instance', async () => {
    let bond = new Bond(
      connection,
      new PublicKey('E1UhfWQYVQP8BfNcNMuPM3j2fypxU6o8JsCkAmcSy1Ui'),
      new PublicKey('H7HAVkjcxNYcSDF8r2R43AypAobMGbZ5x9SYkyv8pqxk')
    );
    let collections = await bond.getCollections();
    console.log(collections);
  });
});
