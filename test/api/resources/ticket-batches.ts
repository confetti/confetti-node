import { describe, test, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert'
import Confetti from '../../../src'
import nock from 'nock'

type MockResponseData = Record<string, unknown>

describe('TicketBatches', () => {
  beforeEach(() => {
    nock.cleanAll()
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('Instance', () => {
    test('should request one ticketBatch', async () => {
      const mockData = Confetti.models.ticketBatch.sample.single.raw

      nock('https://api.confetti.events')
        .get('/ticket-batches/1')
        .reply(200, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.ticketBatches.find(1)

      assert.deepStrictEqual(data, Confetti.models.ticketBatch.sample.single.formatted)
    })
    test('should request multiple ticketBatches', async () => {
      const mockData = Confetti.models.ticketBatch.sample.multiple.raw

      nock('https://api.confetti.events')
        .get('/ticket-batches')
        .reply(200, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.ticketBatches.findAll()

      assert.deepStrictEqual(data, Confetti.models.ticketBatch.sample.multiple.formatted)
    })
  })

  describe('Static', () => {
    test('should request one ticketBatch', async () => {
      const mockData = Confetti.models.ticketBatch.sample.single.raw

      nock('https://api.confetti.events')
        .get('/ticket-batches/1')
        .reply(200, mockData as MockResponseData)

      const data = await Confetti.ticketBatches.find(1, { apiKey: 'my-key' })
      assert.deepStrictEqual(data, Confetti.models.ticketBatch.sample.single.formatted)
    })
    test('should request multiple ticketBatches', async () => {
      const mockData = Confetti.models.ticketBatch.sample.multiple.raw

      nock('https://api.confetti.events')
        .get('/ticket-batches')
        .reply(200, mockData as MockResponseData)

      const data = await Confetti.ticketBatches.findAll({ apiKey: 'my-key' })
      assert.deepStrictEqual(data, Confetti.models.ticketBatch.sample.multiple.formatted)
    })
  })
})

