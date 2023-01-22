import * as index from '@src/index.js'

test('index', () => {
  const expected = [
    'CustomError'
  , 'AssertionError'

  , 'normalize'
  , 'hydrate'
  , 'isSerializableError'
  , 'assert'
  , 'isError'
  , 'isntError'

  , 'getErrorNames'
  , 'traverseErrorPrototypeChain'
  ].sort()

  const result = Object.keys(index).sort()

  expect(result).toStrictEqual(expected)
})
