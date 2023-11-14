export type CustomError =
  | InvalidBondAdmin
  | InvalidProgramAuthority
  | InvalidKycAuthority
  | InvalidMint
  | InvalidArgument
  | AdminIsDisabled
  | InvalidFundingAccount
  | InvalidCollection
  | TimeIsBeforeFundingDate
  | TimeIsAfterStartDate
  | SupplyIsZero
  | SupplyIsInsufficient
  | MathOverflow
  | FundingAccountsAlreadySet
  | InvalidCounter
  | InternalError
  | NoInterestToCredit
  | NoParValueToCredit
  | CollectionIsFrozen
  | KycUserIsAlreadyDisabled
  | PythError
  | PythOffline
  | TryToSerializePriceAccount
  | InvalidOracleAccount
  | InvalidOraclePrice
  | StaleOraclePrice
  | UnsupportedOracle
  | InvalidCollectionOwner
  | KycRequired
  | AccessPassRequired
  | InvalidOperation

export class InvalidBondAdmin extends Error {
  static readonly code = 6000
  readonly code = 6000
  readonly name = "InvalidBondAdmin"
  readonly msg = "Invalid bond admin"

  constructor(readonly logs?: string[]) {
    super("6000: Invalid bond admin")
  }
}

export class InvalidProgramAuthority extends Error {
  static readonly code = 6001
  readonly code = 6001
  readonly name = "InvalidProgramAuthority"
  readonly msg = "Invalid program authority"

  constructor(readonly logs?: string[]) {
    super("6001: Invalid program authority")
  }
}

export class InvalidKycAuthority extends Error {
  static readonly code = 6002
  readonly code = 6002
  readonly name = "InvalidKycAuthority"
  readonly msg = "Invalid kyc authority"

  constructor(readonly logs?: string[]) {
    super("6002: Invalid kyc authority")
  }
}

export class InvalidMint extends Error {
  static readonly code = 6003
  readonly code = 6003
  readonly name = "InvalidMint"
  readonly msg = "Invalid mint"

  constructor(readonly logs?: string[]) {
    super("6003: Invalid mint")
  }
}

export class InvalidArgument extends Error {
  static readonly code = 6004
  readonly code = 6004
  readonly name = "InvalidArgument"
  readonly msg = "Invalid argument"

  constructor(readonly logs?: string[]) {
    super("6004: Invalid argument")
  }
}

export class AdminIsDisabled extends Error {
  static readonly code = 6005
  readonly code = 6005
  readonly name = "AdminIsDisabled"
  readonly msg = "Admin is disabled"

  constructor(readonly logs?: string[]) {
    super("6005: Admin is disabled")
  }
}

export class InvalidFundingAccount extends Error {
  static readonly code = 6006
  readonly code = 6006
  readonly name = "InvalidFundingAccount"
  readonly msg = "Invalid funding account"

  constructor(readonly logs?: string[]) {
    super("6006: Invalid funding account")
  }
}

export class InvalidCollection extends Error {
  static readonly code = 6007
  readonly code = 6007
  readonly name = "InvalidCollection"
  readonly msg = "Invalid collection"

  constructor(readonly logs?: string[]) {
    super("6007: Invalid collection")
  }
}

export class TimeIsBeforeFundingDate extends Error {
  static readonly code = 6008
  readonly code = 6008
  readonly name = "TimeIsBeforeFundingDate"
  readonly msg = "Current time is before funding date availability"

  constructor(readonly logs?: string[]) {
    super("6008: Current time is before funding date availability")
  }
}

export class TimeIsAfterStartDate extends Error {
  static readonly code = 6009
  readonly code = 6009
  readonly name = "TimeIsAfterStartDate"
  readonly msg = "Current time is after start date. Bond already started"

  constructor(readonly logs?: string[]) {
    super("6009: Current time is after start date. Bond already started")
  }
}

export class SupplyIsZero extends Error {
  static readonly code = 6010
  readonly code = 6010
  readonly name = "SupplyIsZero"
  readonly msg = "Supply is zero"

  constructor(readonly logs?: string[]) {
    super("6010: Supply is zero")
  }
}

export class SupplyIsInsufficient extends Error {
  static readonly code = 6011
  readonly code = 6011
  readonly name = "SupplyIsInsufficient"
  readonly msg = "Supply is insufficient"

  constructor(readonly logs?: string[]) {
    super("6011: Supply is insufficient")
  }
}

export class MathOverflow extends Error {
  static readonly code = 6012
  readonly code = 6012
  readonly name = "MathOverflow"
  readonly msg = "Overflow in arithmetic operation"

  constructor(readonly logs?: string[]) {
    super("6012: Overflow in arithmetic operation")
  }
}

export class FundingAccountsAlreadySet extends Error {
  static readonly code = 6013
  readonly code = 6013
  readonly name = "FundingAccountsAlreadySet"
  readonly msg = "Funding accounts already set"

  constructor(readonly logs?: string[]) {
    super("6013: Funding accounts already set")
  }
}

export class InvalidCounter extends Error {
  static readonly code = 6014
  readonly code = 6014
  readonly name = "InvalidCounter"
  readonly msg = "Invalid Counter"

  constructor(readonly logs?: string[]) {
    super("6014: Invalid Counter")
  }
}

export class InternalError extends Error {
  static readonly code = 6015
  readonly code = 6015
  readonly name = "InternalError"
  readonly msg = "Internal Error"

  constructor(readonly logs?: string[]) {
    super("6015: Internal Error")
  }
}

export class NoInterestToCredit extends Error {
  static readonly code = 6016
  readonly code = 6016
  readonly name = "NoInterestToCredit"
  readonly msg = "No interest payment to credit"

  constructor(readonly logs?: string[]) {
    super("6016: No interest payment to credit")
  }
}

export class NoParValueToCredit extends Error {
  static readonly code = 6017
  readonly code = 6017
  readonly name = "NoParValueToCredit"
  readonly msg = "No par value payment to credit"

  constructor(readonly logs?: string[]) {
    super("6017: No par value payment to credit")
  }
}

export class CollectionIsFrozen extends Error {
  static readonly code = 6018
  readonly code = 6018
  readonly name = "CollectionIsFrozen"
  readonly msg = "Collection is frozen"

  constructor(readonly logs?: string[]) {
    super("6018: Collection is frozen")
  }
}

export class KycUserIsAlreadyDisabled extends Error {
  static readonly code = 6019
  readonly code = 6019
  readonly name = "KycUserIsAlreadyDisabled"
  readonly msg = "Kyc user is disabled"

  constructor(readonly logs?: string[]) {
    super("6019: Kyc user is disabled")
  }
}

export class PythError extends Error {
  static readonly code = 6020
  readonly code = 6020
  readonly name = "PythError"
  readonly msg = "Pyth has an internal error."

  constructor(readonly logs?: string[]) {
    super("6020: Pyth has an internal error.")
  }
}

export class PythOffline extends Error {
  static readonly code = 6021
  readonly code = 6021
  readonly name = "PythOffline"
  readonly msg = "Pyth price oracle is offline."

  constructor(readonly logs?: string[]) {
    super("6021: Pyth price oracle is offline.")
  }
}

export class TryToSerializePriceAccount extends Error {
  static readonly code = 6022
  readonly code = 6022
  readonly name = "TryToSerializePriceAccount"
  readonly msg = "Program should not try to serialize a price account."

  constructor(readonly logs?: string[]) {
    super("6022: Program should not try to serialize a price account.")
  }
}

export class InvalidOracleAccount extends Error {
  static readonly code = 6023
  readonly code = 6023
  readonly name = "InvalidOracleAccount"
  readonly msg = "Invalid oracle account"

  constructor(readonly logs?: string[]) {
    super("6023: Invalid oracle account")
  }
}

export class InvalidOraclePrice extends Error {
  static readonly code = 6024
  readonly code = 6024
  readonly name = "InvalidOraclePrice"
  readonly msg = "Invalid oracle price"

  constructor(readonly logs?: string[]) {
    super("6024: Invalid oracle price")
  }
}

export class StaleOraclePrice extends Error {
  static readonly code = 6025
  readonly code = 6025
  readonly name = "StaleOraclePrice"
  readonly msg = "Stale oracle price"

  constructor(readonly logs?: string[]) {
    super("6025: Stale oracle price")
  }
}

export class UnsupportedOracle extends Error {
  static readonly code = 6026
  readonly code = 6026
  readonly name = "UnsupportedOracle"
  readonly msg = "Unsupported Oracle"

  constructor(readonly logs?: string[]) {
    super("6026: Unsupported Oracle")
  }
}

export class InvalidCollectionOwner extends Error {
  static readonly code = 6027
  readonly code = 6027
  readonly name = "InvalidCollectionOwner"
  readonly msg = "Invalid Collection Owner"

  constructor(readonly logs?: string[]) {
    super("6027: Invalid Collection Owner")
  }
}

export class KycRequired extends Error {
  static readonly code = 6028
  readonly code = 6028
  readonly name = "KycRequired"
  readonly msg = "Kyc required"

  constructor(readonly logs?: string[]) {
    super("6028: Kyc required")
  }
}

export class AccessPassRequired extends Error {
  static readonly code = 6029
  readonly code = 6029
  readonly name = "AccessPassRequired"
  readonly msg = "Access pass required"

  constructor(readonly logs?: string[]) {
    super("6029: Access pass required")
  }
}

export class InvalidOperation extends Error {
  static readonly code = 6030
  readonly code = 6030
  readonly name = "InvalidOperation"
  readonly msg = "Invalid operation"

  constructor(readonly logs?: string[]) {
    super("6030: Invalid operation")
  }
}

export function fromCode(code: number, logs?: string[]): CustomError | null {
  switch (code) {
    case 6000:
      return new InvalidBondAdmin(logs)
    case 6001:
      return new InvalidProgramAuthority(logs)
    case 6002:
      return new InvalidKycAuthority(logs)
    case 6003:
      return new InvalidMint(logs)
    case 6004:
      return new InvalidArgument(logs)
    case 6005:
      return new AdminIsDisabled(logs)
    case 6006:
      return new InvalidFundingAccount(logs)
    case 6007:
      return new InvalidCollection(logs)
    case 6008:
      return new TimeIsBeforeFundingDate(logs)
    case 6009:
      return new TimeIsAfterStartDate(logs)
    case 6010:
      return new SupplyIsZero(logs)
    case 6011:
      return new SupplyIsInsufficient(logs)
    case 6012:
      return new MathOverflow(logs)
    case 6013:
      return new FundingAccountsAlreadySet(logs)
    case 6014:
      return new InvalidCounter(logs)
    case 6015:
      return new InternalError(logs)
    case 6016:
      return new NoInterestToCredit(logs)
    case 6017:
      return new NoParValueToCredit(logs)
    case 6018:
      return new CollectionIsFrozen(logs)
    case 6019:
      return new KycUserIsAlreadyDisabled(logs)
    case 6020:
      return new PythError(logs)
    case 6021:
      return new PythOffline(logs)
    case 6022:
      return new TryToSerializePriceAccount(logs)
    case 6023:
      return new InvalidOracleAccount(logs)
    case 6024:
      return new InvalidOraclePrice(logs)
    case 6025:
      return new StaleOraclePrice(logs)
    case 6026:
      return new UnsupportedOracle(logs)
    case 6027:
      return new InvalidCollectionOwner(logs)
    case 6028:
      return new KycRequired(logs)
    case 6029:
      return new AccessPassRequired(logs)
    case 6030:
      return new InvalidOperation(logs)
  }

  return null
}
