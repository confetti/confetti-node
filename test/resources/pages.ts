import { describe, test, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert'
import Confetti from '../../src'
import nock from 'nock'

type MockResponseData = Record<string, unknown>

describe('Pages', () => {
  beforeEach(() => {
    nock.cleanAll()
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('Instance', () => {
    test('should request one page', async () => {
      const mockData = Confetti.models.page.sample.single.raw

      nock('https://api.confetti.events')
        .get('/pages/1')
        .reply(200, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.pages.find(1)

      assert.deepStrictEqual(data, Confetti.models.page.sample.single.formatted)
    })
    test('should request multiple pages', async () => {
      const mockData = Confetti.models.page.sample.multiple.raw

      nock('https://api.confetti.events')
        .get('/pages')
        .query({ filter: { eventId: 1 } })
        .reply(200, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.pages.findAll({ filter: { eventId: 1 } })

      assert.deepStrictEqual(data, Confetti.models.page.sample.multiple.formatted)
    })
    test('should create a page', async () => {
      const mockData = Confetti.models.page.sample.single.raw

      nock('https://api.confetti.events')
        .post('/pages')
        .reply(201, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.pages.create({ name: 'Home', eventId: 1 })

      assert.deepStrictEqual(data, Confetti.models.page.sample.single.formatted)
    })
    test('should update a page', async () => {
      const mockData = Confetti.models.page.sample.single.raw

      nock('https://api.confetti.events')
        .put('/pages/1')
        .reply(200, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.pages.update(1, { name: 'Renamed' })

      assert.deepStrictEqual(data, Confetti.models.page.sample.single.formatted)
    })
    test('should delete a page', async () => {
      nock('https://api.confetti.events').delete('/pages/1').reply(204)

      const confetti = new Confetti({ apiKey: 'my-key' })
      await confetti.pages.delete(1)
    })
  })

  describe('Static', () => {
    test('should request one page', async () => {
      const mockData = Confetti.models.page.sample.single.raw

      nock('https://api.confetti.events')
        .get('/pages/1')
        .reply(200, mockData as MockResponseData)

      const data = await Confetti.pages.find(1, { apiKey: 'my-key' })
      assert.deepStrictEqual(data, Confetti.models.page.sample.single.formatted)
    })
    test('should create a page', async () => {
      const mockData = Confetti.models.page.sample.single.raw

      nock('https://api.confetti.events')
        .post('/pages')
        .reply(201, mockData as MockResponseData)

      const data = await Confetti.pages.create(
        { name: 'Home', eventId: 1 },
        { apiKey: 'my-key' },
      )
      assert.deepStrictEqual(data, Confetti.models.page.sample.single.formatted)
    })
    test('should update a page', async () => {
      const mockData = Confetti.models.page.sample.single.raw

      nock('https://api.confetti.events')
        .put('/pages/1')
        .reply(200, mockData as MockResponseData)

      const data = await Confetti.pages.update(1, { name: 'Renamed' }, { apiKey: 'my-key' })
      assert.deepStrictEqual(data, Confetti.models.page.sample.single.formatted)
    })
    test('should delete a page', async () => {
      nock('https://api.confetti.events').delete('/pages/1').reply(204)

      await Confetti.pages.delete(1, { apiKey: 'my-key' })
    })
  })
})
