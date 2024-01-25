import Decimal from 'decimal.js';
import { BN } from '@coral-xyz/anchor';

/**
 * Replace all big numbers ({@link BN} with {@link Decimal}) of an object
 * We use this because Anchor deserializes everything to BN, but it doesn't support decimals.
 * @param obj Object of type T
 */
export const replaceBigNumberWithDecimal = <T>(obj: T): T => {
  for (let [key, value] of Object.entries(obj!)) {
    if (value instanceof BN) {
      // @ts-ignore
      obj[key] = new Decimal(value.toString());
    }
  }
  return obj;
};
