import { describe, test, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert'
import Confetti from '../../../src'
import nock from 'nock'

type MockResponseData = Record<string, unknown>

describe('Payments', () => {
  beforeEach(() => {
    nock.cleanAll()
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('Instance', () => {
    test('should request one payment', async () => {
      const mockData = Confetti.models.payment.sample.single.raw

      nock('https://api.confetti.events')
        .get('/payments/1')
        .reply(200, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.payments.find(1)

      assert.deepStrictEqual(data, Confetti.models.payment.sample.single.formatted)
    })
    test('should request multiple payments', async () => {
      const mockData = Confetti.models.payment.sample.multiple.raw

      nock('https://api.confetti.events')
        .get('/payments')
        .query({ filter: { eventId: 12 } })
        .reply(200, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.payments.findAll({ filter: { eventId: 12 } })

      assert.deepStrictEqual(data, Confetti.models.payment.sample.multiple.formatted)
    })
  })

  describe('Static', () => {
    test('should request one payment', async () => {
      const mockData = Confetti.models.payment.sample.single.raw

      nock('https://api.confetti.events')
        .get('/payments/1')
        .reply(200, mockData as MockResponseData)

      const data = await Confetti.payments.find(1, { apiKey: 'my-key' })
      assert.deepStrictEqual(data, Confetti.models.payment.sample.single.formatted)
    })
    test('should request multiple payments', async () => {
      const mockData = Confetti.models.payment.sample.multiple.raw

      nock('https://api.confetti.events')
        .get('/payments')
        .query({ filter: { eventId: 12 } })
        .reply(200, mockData as MockResponseData)

      const data = await Confetti.payments.findAll({ apiKey: 'my-key', filter: { eventId: 12 } })
      assert.deepStrictEqual(data, Confetti.models.payment.sample.multiple.formatted)
    })
  })
})

