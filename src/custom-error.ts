import { getErrorNames } from './get-error-names.js'
import { isError } from './is-error.js'
import { isSerializableError } from './serializable-error.js'
import { first, toArray } from './utils.js'

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
        // `this.prototype.constructor`为调用类的构造函数.
        // 在原型实现错误的情况下, 可能不具有constructor成员, 此时尝试通过`this.name`来代替.
        this.prototype.constructor?.name ?? this.name
      , ...getErrorNames(this.prototype)
      ].reverse()
      const reversedInstanceNames = toArray(
        getErrorNames(instance)
      ).reverse()

      return reversedClassNames.every((x, i) => x === reversedInstanceNames[i])
    } else {
      return false
    }
  }
}
