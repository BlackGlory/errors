import { CustomError } from '@src/custom-error.js'
import { SerializableError } from '@src/serializable-error.js'

describe('CustomError', () => {
  describe('instanceof', () => {
    it('return true if instanceof Error', () => {
      const err = new CustomError()

      expect(err).toBeInstanceOf(Error)
    })

    it('return true if instanceof CustomError', () => {
      const err = new CustomError()

      expect(err).toBeInstanceOf(CustomError)
    })

    it('return true if instance and class are end with same names', () => {
      class ParentError extends CustomError {}
      class UserError extends ParentError {}

      const err: SerializableError = {
        name: 'UserError'
      , ancestors: ['ParentError', 'CustomError', 'Error']
      , message: 'message'
      , stack: null
      }

      expect(err).toBeInstanceOf(UserError)
      expect(err).toBeInstanceOf(ParentError)
      expect(err).toBeInstanceOf(CustomError)
      expect(err).not.toBeInstanceOf(Error)
    })

    it('return false if instance and class do not end with same names', () => {
      class ParentError extends CustomError {}
      class UserError extends ParentError {}

      const err: SerializableError = {
        name: 'UserError'
      , ancestors: ['CustomError', 'Error']
      , message: 'message'
      , stack: null
      }

      expect(err).not.toBeInstanceOf(UserError)
      expect(err).not.toBeInstanceOf(ParentError)
      expect(err).toBeInstanceOf(CustomError)
      expect(err).not.toBeInstanceOf(Error)
    })
  })

  it('prop name return the name of constructor', () => {
    class UserError extends CustomError {}

    const err = new UserError()

    expect(err.name).toBe('UserError')
  })
})
