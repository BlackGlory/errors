import { assert } from '@src/assert.js'
import { AssertionError } from '@src/assertion-error.js'
import { expectType } from 'tsd'
import { getError } from 'return-style'

describe('assert(condition: unknown, message?: string): asserts condition', () => {
  describe('condition is true', () => {
    it('pass', () => {
      const val: number | null = null

      assert(val === null, 'The val should be null')

      expectType<null>(val)
    })
  })

  describe('condition is false', () => {
    it('throws AssertionError', () => {
      const message = 'message'
      const val: number | null = null

      const err = getError(() => assert(typeof val === 'number', message))

      expect(err).toBeInstanceOf(AssertionError)
      expect(err!.message).toBe(message)
    })
  })
})
