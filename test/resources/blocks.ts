import { describe, test, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert'
import Confetti from '../../src'
import nock from 'nock'

type MockResponseData = Record<string, unknown>

describe('Blocks', () => {
  beforeEach(() => {
    nock.cleanAll()
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('Instance', () => {
    test('should request one block', async () => {
      const mockData = Confetti.models.block.sample.single.raw

      nock('https://api.confetti.events')
        .get('/blocks/1')
        .reply(200, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.blocks.find(1)

      assert.deepStrictEqual(data, Confetti.models.block.sample.single.formatted)
    })
    test('should request multiple blocks', async () => {
      const mockData = Confetti.models.block.sample.multiple.raw

      nock('https://api.confetti.events')
        .get('/blocks')
        .query({ filter: { pageId: 1 } })
        .reply(200, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.blocks.findAll({ filter: { pageId: 1 } })

      assert.deepStrictEqual(data, Confetti.models.block.sample.multiple.formatted)
    })
    test('should create a block', async () => {
      const mockData = Confetti.models.block.sample.single.raw

      nock('https://api.confetti.events')
        .post('/blocks')
        .reply(201, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.blocks.create({
        blockType: 'text',
        status: 'published',
        pageId: 1,
        eventId: 1,
      })

      assert.deepStrictEqual(data, Confetti.models.block.sample.single.formatted)
    })
    test('should update a block', async () => {
      const mockData = Confetti.models.block.sample.single.raw

      nock('https://api.confetti.events')
        .put('/blocks/1')
        .reply(200, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.blocks.update(1, { order: 5 })

      assert.deepStrictEqual(data, Confetti.models.block.sample.single.formatted)
    })
    test('should delete a block', async () => {
      nock('https://api.confetti.events').delete('/blocks/1').reply(204)

      const confetti = new Confetti({ apiKey: 'my-key' })
      await confetti.blocks.delete(1)
    })
  })

  describe('Static', () => {
    test('should request one block', async () => {
      const mockData = Confetti.models.block.sample.single.raw

      nock('https://api.confetti.events')
        .get('/blocks/1')
        .reply(200, mockData as MockResponseData)

      const data = await Confetti.blocks.find(1, { apiKey: 'my-key' })
      assert.deepStrictEqual(data, Confetti.models.block.sample.single.formatted)
    })
    test('should create a block', async () => {
      const mockData = Confetti.models.block.sample.single.raw

      nock('https://api.confetti.events')
        .post('/blocks')
        .reply(201, mockData as MockResponseData)

      const data = await Confetti.blocks.create(
        { blockType: 'text', status: 'published', pageId: 1, eventId: 1 },
        { apiKey: 'my-key' },
      )
      assert.deepStrictEqual(data, Confetti.models.block.sample.single.formatted)
    })
    test('should update a block', async () => {
      const mockData = Confetti.models.block.sample.single.raw

      nock('https://api.confetti.events')
        .put('/blocks/1')
        .reply(200, mockData as MockResponseData)

      const data = await Confetti.blocks.update(1, { order: 5 }, { apiKey: 'my-key' })
      assert.deepStrictEqual(data, Confetti.models.block.sample.single.formatted)
    })
    test('should delete a block', async () => {
      nock('https://api.confetti.events').delete('/blocks/1').reply(204)

      await Confetti.blocks.delete(1, { apiKey: 'my-key' })
    })
  })
})
