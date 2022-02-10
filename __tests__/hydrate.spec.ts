import { hydrate } from '@src/hydrate'
import { normalize } from '@src/normalize'
import { CustomError } from '@src/custom-error'

test('hydrate', () => {
  class TestError extends CustomError {}
  const err = new TestError('test')
  const serializableError = normalize(err)
  
  const hydratedError = hydrate(serializableError)

  expect(hydratedError).toBeInstanceOf(Error)
  expect(hydratedError).toBeInstanceOf(CustomError)
  expect(hydratedError).toBeInstanceOf(TestError)
  expect(hydratedError.name).toBe(err.name)
  expect(hydratedError.message).toBe(err.message)
  expect(hydratedError.stack).toBe(err.stack)
  expect(normalize(hydratedError)).toStrictEqual(serializableError)
})
