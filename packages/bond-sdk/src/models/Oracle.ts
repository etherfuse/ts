import { IdlAccounts, Program } from '@coral-xyz/anchor';
import { Bond } from '@etherfuse/bond-idl';

export type OracleParams = IdlAccounts<Bond>['collection']['oracleParams'];


export default OracleParams;
