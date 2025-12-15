import { describe, test } from 'node:test'
import assert from 'node:assert'
import { z } from 'zod'
import { decimalStringSchema } from '../../src/utils/zod.js'

describe('decimalStringSchema()', () => {
  describe('valid numbers', () => {
    test('should transform 12.301 to "12.30"', () => {
      const schema = decimalStringSchema()
      const result = schema.parse(12.301)
      assert.strictEqual(result, '12.30')
    })

    test('should transform 0 to "0.00"', () => {
      const schema = decimalStringSchema()
      const result = schema.parse(0)
      assert.strictEqual(result, '0.00')
    })

    test('should transform 0.0 to "0.00"', () => {
      const schema = decimalStringSchema()
      const result = schema.parse(0.0)
      assert.strictEqual(result, '0.00')
    })

    test('should transform 0.00 to "0.00"', () => {
      const schema = decimalStringSchema()
      const result = schema.parse(0.0)
      assert.strictEqual(result, '0.00')
    })

    test('should transform 10 to "10.00"', () => {
      const schema = decimalStringSchema()
      const result = schema.parse(10)
      assert.strictEqual(result, '10.00')
    })

    test('should transform 10.5 to "10.50"', () => {
      const schema = decimalStringSchema()
      const result = schema.parse(10.5)
      assert.strictEqual(result, '10.50')
    })

    test('should transform 10.50 to "10.50"', () => {
      const schema = decimalStringSchema()
      const result = schema.parse(10.5)
      assert.strictEqual(result, '10.50')
    })
  })

  describe('valid numeric strings', () => {
    test('should transform "12.301" to "12.30"', () => {
      const schema = decimalStringSchema()
      const result = schema.parse('12.301')
      assert.strictEqual(result, '12.30')
    })

    test('should transform "0" to "0.00"', () => {
      const schema = decimalStringSchema()
      const result = schema.parse('0')
      assert.strictEqual(result, '0.00')
    })

    test('should transform "10" to "10.00"', () => {
      const schema = decimalStringSchema()
      const result = schema.parse('10')
      assert.strictEqual(result, '10.00')
    })

    test('should transform "10.5" to "10.50"', () => {
      const schema = decimalStringSchema()
      const result = schema.parse('10.5')
      assert.strictEqual(result, '10.50')
    })
  })

  describe('invalid values', () => {
    test('should throw error for null', () => {
      const schema = decimalStringSchema()
      assert.throws(() => schema.parse(null), z.ZodError)
    })

    test('should throw error for undefined', () => {
      const schema = decimalStringSchema()
      assert.throws(() => schema.parse(undefined), z.ZodError)
    })

    test('should throw error for non-numeric string "abc"', () => {
      const schema = decimalStringSchema()
      assert.throws(() => schema.parse('abc'), z.ZodError)
    })

    test('should throw error for boolean true', () => {
      const schema = decimalStringSchema()
      assert.throws(() => schema.parse(true), z.ZodError)
    })

    test('should throw error for object {}', () => {
      const schema = decimalStringSchema()
      assert.throws(() => schema.parse({}), z.ZodError)
    })

    test('should throw error for array []', () => {
      const schema = decimalStringSchema()
      assert.throws(() => schema.parse([]), z.ZodError)
    })
  })
})
