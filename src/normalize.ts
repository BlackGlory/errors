import { getErrorNames } from './get-error-names'
import { toArray } from 'iterable-operator'
import { SerializableError } from './serializable-error'

export function normalize(err: Error): SerializableError {
  const [name, ...ancestors] = toArray(getErrorNames(err))
  return {
    name
  , ancestors
  , message: err.message
  , stack: err.stack ?? null
  }
}
