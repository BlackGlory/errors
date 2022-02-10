import * as index from '@src/index'

test('index', () => {
  const expected = [
    'CustomError'
  , 'AssertionError'

  , 'normalize'
  , 'hydrate'
  , 'isSerializableError'
  , 'assert'

  , 'getErrorNames'
  , 'traverseErrorPrototypeChain'
  ].sort()

  const result = Object.keys(index).sort()

  expect(result).toStrictEqual(expected)
})
