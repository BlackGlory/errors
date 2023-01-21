import { getErrorNames } from './get-error-names'
import { SerializableError } from './serializable-error'
import { toArray } from './utils'

export function normalize(err: Error): SerializableError {
  const [name, ...ancestors] = toArray(getErrorNames(err))
  return {
    name
  , ancestors
  , message: err.message
  , stack: err.stack ?? null
  }
}
