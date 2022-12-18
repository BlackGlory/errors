import { AssertionError } from './assertion-error'

/**
 * @throws {AssertionError}
 */
export function assert(
  condition: unknown
, message: string = 'Assertion failed'
): asserts condition {
  if (!condition) throw new AssertionError(message)
}
