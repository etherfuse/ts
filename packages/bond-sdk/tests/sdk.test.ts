import { expect } from 'chai';
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import { Bond } from '../src/Bond';

describe('Bond SDK', () => {
  let connection: Connection;

  before(() => {
    connection = new Connection(clusterApiUrl('devnet'));
  });

  it('create bond instance', () => {
    let bond = new Bond(connection);
  });
});
