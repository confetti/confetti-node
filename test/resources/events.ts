import { describe, test, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert'
import Confetti from '../../src'
import nock from 'nock'

type MockResponseData = Record<string, unknown>

describe('Events', () => {
  beforeEach(() => {
    nock.cleanAll()
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('Instance', () => {
    test('should request one event', async () => {
      const mockData = Confetti.models.event.sample.single.raw

      nock('https://api.confetti.events')
        .get('/events/1')
        .reply(200, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.events.find(1)

      assert.deepStrictEqual(data, Confetti.models.event.sample.single.formatted)
    })
    test('should request multiple events', async () => {
      const mockData = Confetti.models.event.sample.multiple.raw

      nock('https://api.confetti.events')
        .get('/events')
        .reply(200, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.events.findAll()

      assert.deepStrictEqual(data, Confetti.models.event.sample.multiple.formatted)
    })
  })

  describe('Static', () => {
    test('should request one event', async () => {
      const mockData = Confetti.models.event.sample.single.raw

      nock('https://api.confetti.events')
        .get('/events/1')
        .reply(200, mockData as MockResponseData)

      const data = await Confetti.events.find(1, { apiKey: 'my-key' })
      assert.deepStrictEqual(data, Confetti.models.event.sample.single.formatted)
    })
    test('should request multiple events', async () => {
      const mockData = Confetti.models.event.sample.multiple.raw

      nock('https://api.confetti.events')
        .get('/events')
        .reply(200, mockData as MockResponseData)

      const data = await Confetti.events.findAll({ apiKey: 'my-key' })
      assert.deepStrictEqual(data, Confetti.models.event.sample.multiple.formatted)
    })
  })
})
