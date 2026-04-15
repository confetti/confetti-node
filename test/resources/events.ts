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
    test('should create an event', async () => {
      const mockData = Confetti.models.event.sample.single.raw

      nock('https://api.confetti.events')
        .post('/events')
        .reply(201, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.events.create({
        name: 'My event',
        startDate: '2026-01-01T12:00:00Z',
      })

      assert.deepStrictEqual(data, Confetti.models.event.sample.single.formatted)
    })
    test('should update an event', async () => {
      const mockData = Confetti.models.event.sample.single.raw

      nock('https://api.confetti.events')
        .put('/events/1')
        .reply(200, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.events.update(1, { name: 'Renamed' })

      assert.deepStrictEqual(data, Confetti.models.event.sample.single.formatted)
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
    test('should create an event', async () => {
      const mockData = Confetti.models.event.sample.single.raw

      nock('https://api.confetti.events')
        .post('/events')
        .reply(201, mockData as MockResponseData)

      const data = await Confetti.events.create(
        { name: 'My event', startDate: '2026-01-01T12:00:00Z' },
        { apiKey: 'my-key' },
      )
      assert.deepStrictEqual(data, Confetti.models.event.sample.single.formatted)
    })
    test('should update an event', async () => {
      const mockData = Confetti.models.event.sample.single.raw

      nock('https://api.confetti.events')
        .put('/events/1')
        .reply(200, mockData as MockResponseData)

      const data = await Confetti.events.update(1, { name: 'Renamed' }, { apiKey: 'my-key' })
      assert.deepStrictEqual(data, Confetti.models.event.sample.single.formatted)
    })
  })
})
