import { describe, test, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert'
import Confetti from '../../src'
import nock from 'nock'

type MockResponseData = Record<string, unknown>

describe('Speakers', () => {
  beforeEach(() => {
    nock.cleanAll()
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('Instance', () => {
    test('should request one speaker', async () => {
      const mockData = Confetti.models.speaker.sample.single.raw

      nock('https://api.confetti.events')
        .get('/speakers/1')
        .reply(200, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.speakers.find(1)

      assert.deepStrictEqual(data, Confetti.models.speaker.sample.single.formatted)
    })
    test('should create a speaker', async () => {
      const mockData = Confetti.models.speaker.sample.single.raw

      nock('https://api.confetti.events')
        .post('/speakers')
        .reply(201, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.speakers.create({ firstName: 'Ada', eventId: 1 })

      assert.deepStrictEqual(data, Confetti.models.speaker.sample.single.formatted)
    })
    test('should update a speaker', async () => {
      const mockData = Confetti.models.speaker.sample.single.raw

      nock('https://api.confetti.events')
        .put('/speakers/1')
        .reply(200, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.speakers.update(1, { firstName: 'Grace' })

      assert.deepStrictEqual(data, Confetti.models.speaker.sample.single.formatted)
    })
    test('should delete a speaker', async () => {
      nock('https://api.confetti.events').delete('/speakers/1').reply(204)

      const confetti = new Confetti({ apiKey: 'my-key' })
      await confetti.speakers.delete(1)
    })
  })

  describe('Static', () => {
    test('should request one speaker', async () => {
      const mockData = Confetti.models.speaker.sample.single.raw

      nock('https://api.confetti.events')
        .get('/speakers/1')
        .reply(200, mockData as MockResponseData)

      const data = await Confetti.speakers.find(1, { apiKey: 'my-key' })
      assert.deepStrictEqual(data, Confetti.models.speaker.sample.single.formatted)
    })
    test('should create a speaker', async () => {
      const mockData = Confetti.models.speaker.sample.single.raw

      nock('https://api.confetti.events')
        .post('/speakers')
        .reply(201, mockData as MockResponseData)

      const data = await Confetti.speakers.create({ firstName: 'Ada', eventId: 1 }, { apiKey: 'my-key' })
      assert.deepStrictEqual(data, Confetti.models.speaker.sample.single.formatted)
    })
    test('should update a speaker', async () => {
      const mockData = Confetti.models.speaker.sample.single.raw

      nock('https://api.confetti.events')
        .put('/speakers/1')
        .reply(200, mockData as MockResponseData)

      const data = await Confetti.speakers.update(1, { firstName: 'Grace' }, { apiKey: 'my-key' })
      assert.deepStrictEqual(data, Confetti.models.speaker.sample.single.formatted)
    })
    test('should delete a speaker', async () => {
      nock('https://api.confetti.events').delete('/speakers/1').reply(204)

      await Confetti.speakers.delete(1, { apiKey: 'my-key' })
    })
  })
})
