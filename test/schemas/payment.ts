import { describe, test } from 'node:test'
import assert from 'node:assert'
import { z } from 'zod'
import { PaymentSchema } from '../../src/schemas/payment.js'

describe('PaymentSchema', () => {
  describe('valid payment', () => {
    test('should create a payment with all required fields', () => {
      const paymentData = {
        id: 288298,
        name: 'Foo Bar',
        email: 'foo@bar.com',
        company: 'The Company',
        amount: 13,
        vat: 3,
        vatPercentage: 30,
        commission: 5.65,
        commissionVat: 1.13,
        customer: {
          other: 'Extra information',
        },
        token: '2447b4acef764836169b53c4',
        currency: 'SEK',
        status: 'paid',
        paidAt: new Date('2020-03-09T20:05:10.000Z'),
      }

      const result = PaymentSchema.parse(paymentData)

      assert.strictEqual(result.id, 288298)
      assert.strictEqual(result.name, 'Foo Bar')
      assert.strictEqual(result.email, 'foo@bar.com')
      assert.strictEqual(result.company, 'The Company')
      assert.strictEqual(result.amount, 13)
      assert.strictEqual(result.vat, 3)
      assert.strictEqual(result.vatPercentage, 30)
      assert.strictEqual(result.commission, '5.65')
      assert.strictEqual(result.commissionVat, '1.13')
      assert.deepStrictEqual(result.customer, { other: 'Extra information' })
      assert.strictEqual(result.token, '2447b4acef764836169b53c4')
      assert.strictEqual(result.currency, 'SEK')
      assert.strictEqual(result.status, 'paid')
      assert.deepStrictEqual(result.paidAt, new Date('2020-03-09T20:05:10.000Z'))
    })

    test('should transform commission and commissionVat from numbers to decimal strings', () => {
      const paymentData = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        amount: 100,
        vat: 25,
        vatPercentage: 25,
        commission: 12.301,
        commissionVat: 3.456,
        customer: {},
        token: 'test-token',
        currency: 'SEK',
        status: 'paid',
        paidAt: new Date(),
      }

      const result = PaymentSchema.parse(paymentData)

      assert.strictEqual(result.commission, '12.30')
      assert.strictEqual(result.commissionVat, '3.46')
    })

    test('should transform commission and commissionVat from numeric strings to decimal strings', () => {
      const paymentData = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        amount: 100,
        vat: 25,
        vatPercentage: 25,
        commission: '12.301',
        commissionVat: '3.456',
        customer: {},
        token: 'test-token',
        currency: 'SEK',
        status: 'paid',
        paidAt: new Date(),
      }

      const result = PaymentSchema.parse(paymentData)

      assert.strictEqual(result.commission, '12.30')
      assert.strictEqual(result.commissionVat, '3.46')
    })
  })

  describe('invalid payment', () => {
    test('should throw error when commission is not a number or numeric string', () => {
      const paymentData = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        amount: 100,
        vat: 25,
        vatPercentage: 25,
        commission: 'abc',
        commissionVat: '1.13',
        customer: {},
        token: 'test-token',
        currency: 'SEK',
        status: 'paid',
        paidAt: new Date(),
      }

      assert.throws(() => PaymentSchema.parse(paymentData), z.ZodError)
    })

    test('should throw error when commissionVat is not a number or numeric string', () => {
      const paymentData = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        amount: 100,
        vat: 25,
        vatPercentage: 25,
        commission: '5.65',
        commissionVat: 'invalid',
        customer: {},
        token: 'test-token',
        currency: 'SEK',
        status: 'paid',
        paidAt: new Date(),
      }

      assert.throws(() => PaymentSchema.parse(paymentData), z.ZodError)
    })

    test('should throw error when required field is missing', () => {
      const paymentData = {
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        amount: 100,
        vat: 25,
        vatPercentage: 25,
        commission: '5.65',
        commissionVat: '1.13',
        customer: {},
        token: 'test-token',
        currency: 'SEK',
        status: 'paid',
        paidAt: new Date(),
      }

      assert.throws(() => PaymentSchema.parse(paymentData), z.ZodError)
    })

    test('should throw error when id is not a number', () => {
      const paymentData = {
        id: 'not-a-number',
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        amount: 100,
        vat: 25,
        vatPercentage: 25,
        commission: '5.65',
        commissionVat: '1.13',
        customer: {},
        token: 'test-token',
        currency: 'SEK',
        status: 'paid',
        paidAt: new Date(),
      }

      assert.throws(() => PaymentSchema.parse(paymentData), z.ZodError)
    })

    test('should throw error when paidAt is not a date', () => {
      const paymentData = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        amount: 100,
        vat: 25,
        vatPercentage: 25,
        commission: '5.65',
        commissionVat: '1.13',
        customer: {},
        token: 'test-token',
        currency: 'SEK',
        status: 'paid',
        paidAt: 'not-a-date',
      }

      assert.throws(() => PaymentSchema.parse(paymentData), z.ZodError)
    })
  })
})

