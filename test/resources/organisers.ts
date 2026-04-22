import { describe, test, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert'
import Confetti from '../../src'
import nock from 'nock'

type MockResponseData = Record<string, unknown>

describe('Organisers', () => {
  beforeEach(() => {
    nock.cleanAll()
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('Instance', () => {
    test('should request one organiser', async () => {
      const mockData = Confetti.models.organiser.sample.single.raw

      nock('https://api.confetti.events')
        .get('/organisers/1')
        .reply(200, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.organisers.find(1)

      assert.deepStrictEqual(data, Confetti.models.organiser.sample.single.formatted)
    })
    test('should create an organiser', async () => {
      const mockData = Confetti.models.organiser.sample.single.raw

      nock('https://api.confetti.events')
        .post('/organisers')
        .reply(201, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.organisers.create({ name: 'Jane Doe', eventId: 1 })

      assert.deepStrictEqual(data, Confetti.models.organiser.sample.single.formatted)
    })
    test('should update an organiser', async () => {
      const mockData = Confetti.models.organiser.sample.single.raw

      nock('https://api.confetti.events')
        .put('/organisers/1')
        .reply(200, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.organisers.update(1, { name: 'Renamed' })

      assert.deepStrictEqual(data, Confetti.models.organiser.sample.single.formatted)
    })
    test('should delete an organiser', async () => {
      nock('https://api.confetti.events').delete('/organisers/1').reply(204)

      const confetti = new Confetti({ apiKey: 'my-key' })
      await confetti.organisers.delete(1)
    })
  })

  describe('Static', () => {
    test('should request one organiser', async () => {
      const mockData = Confetti.models.organiser.sample.single.raw

      nock('https://api.confetti.events')
        .get('/organisers/1')
        .reply(200, mockData as MockResponseData)

      const data = await Confetti.organisers.find(1, { apiKey: 'my-key' })
      assert.deepStrictEqual(data, Confetti.models.organiser.sample.single.formatted)
    })
    test('should create an organiser', async () => {
      const mockData = Confetti.models.organiser.sample.single.raw

      nock('https://api.confetti.events')
        .post('/organisers')
        .reply(201, mockData as MockResponseData)

      const data = await Confetti.organisers.create({ name: 'Jane Doe', eventId: 1 }, { apiKey: 'my-key' })
      assert.deepStrictEqual(data, Confetti.models.organiser.sample.single.formatted)
    })
    test('should update an organiser', async () => {
      const mockData = Confetti.models.organiser.sample.single.raw

      nock('https://api.confetti.events')
        .put('/organisers/1')
        .reply(200, mockData as MockResponseData)

      const data = await Confetti.organisers.update(1, { name: 'Renamed' }, { apiKey: 'my-key' })
      assert.deepStrictEqual(data, Confetti.models.organiser.sample.single.formatted)
    })
    test('should delete an organiser', async () => {
      nock('https://api.confetti.events').delete('/organisers/1').reply(204)

      await Confetti.organisers.delete(1, { apiKey: 'my-key' })
    })
  })
})
