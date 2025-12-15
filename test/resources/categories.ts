import { describe, test, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert'
import Confetti from '../../src'
import nock from 'nock'

type MockResponseData = Record<string, unknown>

describe('Categories', () => {
  beforeEach(() => {
    nock.cleanAll()
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('Instance', () => {
    test('should request multiple categories', async () => {
      const mockData = Confetti.models.category.sample.multiple.raw

      nock('https://api.confetti.events')
        .get('/categories')
        .reply(200, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.categories.findAll()

      assert.deepStrictEqual(data, Confetti.models.category.sample.multiple.formatted)
    })
    test('should request one category', async () => {
      const mockData = Confetti.models.category.sample.single.raw

      nock('https://api.confetti.events')
        .get('/categories/1')
        .reply(200, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.categories.find(1)

      assert.deepStrictEqual(data, Confetti.models.category.sample.single.formatted)
    })
  })

  describe('Static', () => {
    test('should request multiple categories', async () => {
      const mockData = Confetti.models.category.sample.multiple.raw

      nock('https://api.confetti.events')
        .get('/categories')
        .reply(200, mockData as MockResponseData)

      const data = await Confetti.categories.findAll({ apiKey: 'my-key' })
      assert.deepStrictEqual(data, Confetti.models.category.sample.multiple.formatted)
    })
    test('should request one category', async () => {
      const mockData = Confetti.models.category.sample.single.raw

      nock('https://api.confetti.events')
        .get('/categories/1')
        .reply(200, mockData as MockResponseData)

      const data = await Confetti.categories.find(1, { apiKey: 'my-key' })
      assert.deepStrictEqual(data, Confetti.models.category.sample.single.formatted)
    })
  })
})
