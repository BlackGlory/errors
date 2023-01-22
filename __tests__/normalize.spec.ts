import { normalize } from '@src/normalize.js'
import { CustomError } from '@src/custom-error.js'

describe('normalize(err: Error): SerializableError', () => {
  test('Error', () => {
    const err = new Error('test')

    const result = normalize(err)

    expect(result).toEqual({
      name: 'Error'
    , ancestors: []
    , message: 'test'
    , stack: expect.stringContaining('\n')
    })
  })

  test('CustomError', () => {
    const err = new CustomError('test')

    const result = normalize(err)

    expect(result).toEqual({
      name: 'CustomError'
    , ancestors: ['Error']
    , message: 'test'
    , stack: expect.stringContaining('\n')
    })
  })

  test('extends Error', () => {
    class ExtendsError extends Error {}
    const err = new ExtendsError('test')

    const result = normalize(err)

    expect(result).toEqual({
      name: 'ExtendsError'
    , ancestors: ['Error']
    , message: 'test'
    , stack: expect.stringContaining('\n')
    })
  })

  test('extends CustomError', () => {
    class ExtendsCustomError extends CustomError {}
    const err = new ExtendsCustomError('test')

    const result = normalize(err)

    expect(result).toEqual({
      name: 'ExtendsCustomError'
    , ancestors: ['CustomError', 'Error']
    , message: 'test'
    , stack: expect.stringContaining('\n')
    })
  })
})
