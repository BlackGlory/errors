import { SerializableError } from './serializable-error'
import { isError } from '@blackglory/types'
import { traverseErrorPrototypeChain } from './traverse-error-prototype-chain'

export function* getErrorNames(err: Error | SerializableError): Iterable<string> {
  if (isError(err)) {
    for (const prototype of traverseErrorPrototypeChain(err)) {
      // 一些错误实现的原型可能不具有constructor成员
      if (prototype.constructor?.name) {
        yield prototype.constructor.name
      }
    }
  } else {
    yield err.name
    yield* err.ancestors
  }
}
