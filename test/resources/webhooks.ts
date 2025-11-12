import { describe, test, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert'
import Confetti from '../../src'
import nock from 'nock'

type MockResponseData = Record<string, unknown>

describe('Webhooks', () => {
  beforeEach(() => {
    nock.cleanAll()
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('Instance', () => {
    test('should request one webhook', async () => {
      const mockData = Confetti.models.webhook.sample.single.raw

      nock('https://api.confetti.events')
        .get('/webhooks/1')
        .reply(200, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.webhooks.find(1)

      assert.deepStrictEqual(data, Confetti.models.webhook.sample.single.formatted)
    })
    test('should request multiple webhooks', async () => {
      const mockData = Confetti.models.webhook.sample.multiple.raw

      nock('https://api.confetti.events')
        .get('/webhooks')
        .reply(200, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.webhooks.findAll()

      assert.deepStrictEqual(data, Confetti.models.webhook.sample.multiple.formatted)
    })
  })

  describe('Static', () => {
    test('should request one webhook', async () => {
      const mockData = Confetti.models.webhook.sample.single.raw

      nock('https://api.confetti.events').get('/webhooks/1').reply(200, mockData)

      const data = await Confetti.webhooks.find(1, { apiKey: 'my-key' })
      assert.deepStrictEqual(data, Confetti.models.webhook.sample.single.formatted)
    })
    test('should request multiple webhooks', async () => {
      const mockData = Confetti.models.webhook.sample.multiple.raw

      nock('https://api.confetti.events').get('/webhooks').reply(200, mockData)

      const data = await Confetti.webhooks.findAll({ apiKey: 'my-key' })
      assert.deepStrictEqual(data, Confetti.models.webhook.sample.multiple.formatted)
    })

    test('should request webhooks with eventId', async () => {
      const mockData = Confetti.models.webhook.sample.multiple.raw

      nock('https://api.confetti.events')
        .get('/webhooks')
        .query({ filter: { eventId: 2 } })
        .reply(200, mockData)

      const data = await Confetti.webhooks.findAll({ apiKey: 'my-key', filter: { eventId: 2 } })

      assert.deepStrictEqual(data, Confetti.models.webhook.sample.multiple.formatted)
    })

    test('should create a webhook', async () => {
      const mockData = Confetti.models.webhook.sample.single.raw

      nock('https://api.confetti.events')
        .post('/webhooks')
        .reply(201, mockData as MockResponseData)

      const data = await Confetti.webhooks.create(
        {
          type: 'ticket.attending',
          url: 'https://hooks.zapier.com/hooks/standard/1337/',
          provider: 'zapier',
          workspaceId: 57,
          eventId: 2,
        },
        { apiKey: 'my-key' },
      )
      assert.deepStrictEqual(data, Confetti.models.webhook.sample.single.formatted)
    })
    test('should delete a webhook', async () => {
      nock('https://api.confetti.events').delete('/webhooks/1').reply(204)

      await Confetti.webhooks.delete(1, { apiKey: 'my-key' })
    })
  })
})
