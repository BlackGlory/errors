import { CustomError } from '@src/custom-error'
import { getErrorNames } from '@src/get-error-names'
import { toArray } from 'iterable-operator'
import { SerializableError } from '@src/serializable-error'

describe('getErrorNames', () => {
  test('SerializedErrorl', () => {
    const err: SerializableError = {
      name: 'UserError'
    , ancestors: ['Error']
    , message: 'message'
    , stack: null
    }

    const iter = getErrorNames(err)
    const result = toArray(iter)

    expect(result).toStrictEqual([
      'UserError'
    , 'Error'
    ])
  })

  test('Error', () => {
    const err = new Error()

    const iter = getErrorNames(err)
    const result = toArray(iter)

    expect(result).toStrictEqual([
      'Error'
    ])
  })

  test('CustomError', () => {
    const err = new CustomError()

    const iter = getErrorNames(err)
    const result = toArray(iter)

    expect(result).toStrictEqual([
      'CustomError'
    , 'Error'
  ])
  })

  test('extends Error and has its own name property', () => {
    const err = new TypeError()

    const iter = getErrorNames(err)
    const result = toArray(iter)

    expect(result).toStrictEqual([
      'TypeError'
    , 'Error'
    ])
  })

  test('extends Error but does not have its own name property', () => {
    class UserError extends Error {}
    const err = new UserError()

    const iter = getErrorNames(err)
    const result = toArray(iter)

    expect(result).toStrictEqual([
      'UserError'
    , 'Error'
    ])
  })

  test('extends CustomError', () => {
    class ExtendsCustomError extends CustomError {}
    const err = new ExtendsCustomError()

    const iter = getErrorNames(err)
    const result = toArray(iter)

    expect(result).toStrictEqual([
      'ExtendsCustomError'
    , 'CustomError'
    , 'Error'
    ])
  })

  test('extends extends CustomError', () => {
    class ExtendsCustomError extends CustomError {}
    class ExtendsExtendsCustomError extends ExtendsCustomError {}
    const err = new ExtendsExtendsCustomError()

    const iter = getErrorNames(err)
    const result = toArray(iter)

    expect(result).toStrictEqual([
      'ExtendsExtendsCustomError'
    , 'ExtendsCustomError'
    , 'CustomError'
    , 'Error'
    ])
  })
})
