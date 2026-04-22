import { describe, test, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert'
import Confetti from '../../src'
import nock from 'nock'

type MockResponseData = Record<string, unknown>

describe('SponsorLevels', () => {
  beforeEach(() => {
    nock.cleanAll()
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('Instance', () => {
    test('should request one sponsor level', async () => {
      const mockData = Confetti.models.sponsorLevel.sample.single.raw

      nock('https://api.confetti.events')
        .get('/sponsor-levels/1')
        .reply(200, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.sponsorLevels.find(1)

      assert.deepStrictEqual(data, Confetti.models.sponsorLevel.sample.single.formatted)
    })
    test('should create a sponsor level', async () => {
      const mockData = Confetti.models.sponsorLevel.sample.single.raw

      nock('https://api.confetti.events')
        .post('/sponsor-levels')
        .reply(201, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.sponsorLevels.create({ name: 'Gold', eventId: 1 })

      assert.deepStrictEqual(data, Confetti.models.sponsorLevel.sample.single.formatted)
    })
    test('should update a sponsor level', async () => {
      const mockData = Confetti.models.sponsorLevel.sample.single.raw

      nock('https://api.confetti.events')
        .put('/sponsor-levels/1')
        .reply(200, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.sponsorLevels.update(1, { name: 'Platinum' })

      assert.deepStrictEqual(data, Confetti.models.sponsorLevel.sample.single.formatted)
    })
    test('should delete a sponsor level', async () => {
      nock('https://api.confetti.events').delete('/sponsor-levels/1').reply(204)

      const confetti = new Confetti({ apiKey: 'my-key' })
      await confetti.sponsorLevels.delete(1)
    })
  })

  describe('Static', () => {
    test('should request one sponsor level', async () => {
      const mockData = Confetti.models.sponsorLevel.sample.single.raw

      nock('https://api.confetti.events')
        .get('/sponsor-levels/1')
        .reply(200, mockData as MockResponseData)

      const data = await Confetti.sponsorLevels.find(1, { apiKey: 'my-key' })
      assert.deepStrictEqual(data, Confetti.models.sponsorLevel.sample.single.formatted)
    })
    test('should create a sponsor level', async () => {
      const mockData = Confetti.models.sponsorLevel.sample.single.raw

      nock('https://api.confetti.events')
        .post('/sponsor-levels')
        .reply(201, mockData as MockResponseData)

      const data = await Confetti.sponsorLevels.create(
        { name: 'Gold', eventId: 1 },
        { apiKey: 'my-key' },
      )
      assert.deepStrictEqual(data, Confetti.models.sponsorLevel.sample.single.formatted)
    })
    test('should update a sponsor level', async () => {
      const mockData = Confetti.models.sponsorLevel.sample.single.raw

      nock('https://api.confetti.events')
        .put('/sponsor-levels/1')
        .reply(200, mockData as MockResponseData)

      const data = await Confetti.sponsorLevels.update(1, { name: 'Platinum' }, { apiKey: 'my-key' })
      assert.deepStrictEqual(data, Confetti.models.sponsorLevel.sample.single.formatted)
    })
    test('should delete a sponsor level', async () => {
      nock('https://api.confetti.events').delete('/sponsor-levels/1').reply(204)

      await Confetti.sponsorLevels.delete(1, { apiKey: 'my-key' })
    })
  })
})
