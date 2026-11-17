import { describe, test, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert'
import Confetti from '../../src'
import nock from 'nock'

type MockResponseData = Record<string, unknown>

describe('Messages', () => {
  beforeEach(() => {
    nock.cleanAll()
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('Instance', () => {
    test('should request messages for an event', async () => {
      const mockData = Confetti.models.message.sample.multiple.raw

      nock('https://api.confetti.events')
        .get('/messages')
        .query({ filter: { eventId: 1 } })
        .reply(200, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.messages.findAll({ filter: { eventId: 1 } })

      assert.deepStrictEqual(data, Confetti.models.message.sample.multiple.formatted)
    })
    test('should reject an unknown type', async () => {
      const confetti = new Confetti({ apiKey: 'my-key' })
      assert.throws(() => confetti.messages.update(1, { type: 'fax' } as never))
    })
    test('should request one message', async () => {
      const mockData = Confetti.models.message.sample.single.raw

      nock('https://api.confetti.events')
        .get('/messages/1')
        .reply(200, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.messages.find(1)

      assert.deepStrictEqual(data, Confetti.models.message.sample.single.formatted)
    })
    test('should create a message', async () => {
      const mockData = Confetti.models.message.sample.single.raw

      nock('https://api.confetti.events')
        .post('/messages')
        .reply(201, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.messages.create({ eventId: 1, content: { subject: 'Hello', message: '<p>Hi</p>' } })

      assert.deepStrictEqual(data, Confetti.models.message.sample.single.formatted)
    })
    test('should update a message', async () => {
      const mockData = Confetti.models.message.sample.single.raw

      nock('https://api.confetti.events')
        .put('/messages/1')
        .reply(200, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.messages.update(1, { content: { subject: 'Updated' } })

      assert.deepStrictEqual(data, Confetti.models.message.sample.single.formatted)
    })
    test('should delete a message', async () => {
      nock('https://api.confetti.events').delete('/messages/1').reply(204)

      const confetti = new Confetti({ apiKey: 'my-key' })
      await confetti.messages.delete(1)
    })
  })

  describe('Static', () => {
    test('should request one message', async () => {
      const mockData = Confetti.models.message.sample.single.raw

      nock('https://api.confetti.events')
        .get('/messages/1')
        .reply(200, mockData as MockResponseData)

      const data = await Confetti.messages.find(1, { apiKey: 'my-key' })
      assert.deepStrictEqual(data, Confetti.models.message.sample.single.formatted)
    })
    test('should create a message', async () => {
      const mockData = Confetti.models.message.sample.single.raw

      nock('https://api.confetti.events')
        .post('/messages')
        .reply(201, mockData as MockResponseData)

      const data = await Confetti.messages.create(
        { eventId: 1, content: { subject: 'Hello', message: '<p>Hi</p>' } },
        { apiKey: 'my-key' },
      )
      assert.deepStrictEqual(data, Confetti.models.message.sample.single.formatted)
    })
    test('should update a message', async () => {
      const mockData = Confetti.models.message.sample.single.raw

      nock('https://api.confetti.events')
        .put('/messages/1')
        .reply(200, mockData as MockResponseData)

      const data = await Confetti.messages.update(1, { content: { subject: 'Updated' } }, { apiKey: 'my-key' })
      assert.deepStrictEqual(data, Confetti.models.message.sample.single.formatted)
    })
    test('should delete a message', async () => {
      nock('https://api.confetti.events').delete('/messages/1').reply(204)

      await Confetti.messages.delete(1, { apiKey: 'my-key' })
    })
  })
})
