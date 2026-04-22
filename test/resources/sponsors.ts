import { describe, test, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert'
import Confetti from '../../src'
import nock from 'nock'

type MockResponseData = Record<string, unknown>

describe('Sponsors', () => {
  beforeEach(() => {
    nock.cleanAll()
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('Instance', () => {
    test('should request one sponsor', async () => {
      const mockData = Confetti.models.sponsor.sample.single.raw

      nock('https://api.confetti.events')
        .get('/sponsors/1')
        .reply(200, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.sponsors.find(1)

      assert.deepStrictEqual(data, Confetti.models.sponsor.sample.single.formatted)
    })
    test('should create a sponsor', async () => {
      const mockData = Confetti.models.sponsor.sample.single.raw

      nock('https://api.confetti.events')
        .post('/sponsors')
        .reply(201, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.sponsors.create({ name: 'Acme', sponsorLevelId: 1 })

      assert.deepStrictEqual(data, Confetti.models.sponsor.sample.single.formatted)
    })
    test('should update a sponsor', async () => {
      const mockData = Confetti.models.sponsor.sample.single.raw

      nock('https://api.confetti.events')
        .put('/sponsors/1')
        .reply(200, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.sponsors.update(1, { name: 'Renamed' })

      assert.deepStrictEqual(data, Confetti.models.sponsor.sample.single.formatted)
    })
    test('should delete a sponsor', async () => {
      nock('https://api.confetti.events').delete('/sponsors/1').reply(204)

      const confetti = new Confetti({ apiKey: 'my-key' })
      await confetti.sponsors.delete(1)
    })
  })

  describe('Static', () => {
    test('should request one sponsor', async () => {
      const mockData = Confetti.models.sponsor.sample.single.raw

      nock('https://api.confetti.events')
        .get('/sponsors/1')
        .reply(200, mockData as MockResponseData)

      const data = await Confetti.sponsors.find(1, { apiKey: 'my-key' })
      assert.deepStrictEqual(data, Confetti.models.sponsor.sample.single.formatted)
    })
    test('should create a sponsor', async () => {
      const mockData = Confetti.models.sponsor.sample.single.raw

      nock('https://api.confetti.events')
        .post('/sponsors')
        .reply(201, mockData as MockResponseData)

      const data = await Confetti.sponsors.create(
        { name: 'Acme', sponsorLevelId: 1 },
        { apiKey: 'my-key' },
      )
      assert.deepStrictEqual(data, Confetti.models.sponsor.sample.single.formatted)
    })
    test('should update a sponsor', async () => {
      const mockData = Confetti.models.sponsor.sample.single.raw

      nock('https://api.confetti.events')
        .put('/sponsors/1')
        .reply(200, mockData as MockResponseData)

      const data = await Confetti.sponsors.update(1, { name: 'Renamed' }, { apiKey: 'my-key' })
      assert.deepStrictEqual(data, Confetti.models.sponsor.sample.single.formatted)
    })
    test('should delete a sponsor', async () => {
      nock('https://api.confetti.events').delete('/sponsors/1').reply(204)

      await Confetti.sponsors.delete(1, { apiKey: 'my-key' })
    })
  })
})
