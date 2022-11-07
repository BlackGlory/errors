import { first, toArray } from 'iterable-operator'
import { getErrorNames } from './get-error-names'
import { isError } from './is-error'
import { isSerializableError } from './serializable-error'

export type CustomErrorConstructor<T extends CustomError = CustomError> =
  new (message?: string) => T

export class CustomError extends Error {
  get name(): string {
    return first(getErrorNames(this))
        ?? CustomError.name
        ?? 'CustomError'
  }

  static [Symbol.hasInstance](instance: unknown): boolean {
    if (isError(instance) || isSerializableError(instance)) {
      const reversedClassNames: string[] = [
        this.prototype.constructor.name ?? this.name
      , ...getErrorNames(this.prototype) 
      ].reverse()
      const reversedInstanceNames = toArray(getErrorNames(instance)).reverse()

      return reversedClassNames.every((x, i) => x === reversedInstanceNames[i])
    } else {
      return false
    }
  }
}
