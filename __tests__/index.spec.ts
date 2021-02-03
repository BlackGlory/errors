import * as index from '@src/index'

test('index', () => {
  const expected = [
    'CustomError'

  , 'normalize'
  ].sort()

  const result = Object.keys(index).sort()

  expect(result).toStrictEqual(expected)
})
