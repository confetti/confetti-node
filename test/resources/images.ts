import { describe, test, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert'
import Confetti from '../../src'
import nock from 'nock'

type MockResponseData = Record<string, unknown>

describe('Images', () => {
  beforeEach(() => {
    nock.cleanAll()
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('Instance', () => {
    test('should request one image', async () => {
      const mockData = Confetti.models.image.sample.single.raw

      nock('https://api.confetti.events')
        .get('/images/1')
        .reply(200, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.images.find(1)

      assert.deepStrictEqual(data, Confetti.models.image.sample.single.formatted)
    })
    test('should request multiple images', async () => {
      const mockData = Confetti.models.image.sample.multiple.raw

      nock('https://api.confetti.events')
        .get('/images')
        .query({ filter: { blockId: 1 } })
        .reply(200, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.images.findAll({ filter: { blockId: 1 } })

      assert.deepStrictEqual(data, Confetti.models.image.sample.multiple.formatted)
    })
    test('should create an image', async () => {
      const mockData = Confetti.models.image.sample.single.raw

      nock('https://api.confetti.events')
        .post('/images')
        .reply(201, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.images.create({
        type: 'cover',
        url: 'https://example.com/photo.jpg',
        blockId: 1,
        eventId: 1,
      })

      assert.deepStrictEqual(data, Confetti.models.image.sample.single.formatted)
    })
    test('should update an image', async () => {
      const mockData = Confetti.models.image.sample.single.raw

      nock('https://api.confetti.events')
        .put('/images/1')
        .reply(200, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.images.update(1, { title: 'New title' })

      assert.deepStrictEqual(data, Confetti.models.image.sample.single.formatted)
    })
    test('should delete an image', async () => {
      nock('https://api.confetti.events').delete('/images/1').reply(204)

      const confetti = new Confetti({ apiKey: 'my-key' })
      await confetti.images.delete(1)
    })
  })

  describe('Static', () => {
    test('should request one image', async () => {
      const mockData = Confetti.models.image.sample.single.raw

      nock('https://api.confetti.events')
        .get('/images/1')
        .reply(200, mockData as MockResponseData)

      const data = await Confetti.images.find(1, { apiKey: 'my-key' })
      assert.deepStrictEqual(data, Confetti.models.image.sample.single.formatted)
    })
    test('should create an image', async () => {
      const mockData = Confetti.models.image.sample.single.raw

      nock('https://api.confetti.events')
        .post('/images')
        .reply(201, mockData as MockResponseData)

      const data = await Confetti.images.create(
        {
          type: 'cover',
          url: 'https://example.com/photo.jpg',
          blockId: 1,
          eventId: 1,
        },
        { apiKey: 'my-key' },
      )
      assert.deepStrictEqual(data, Confetti.models.image.sample.single.formatted)
    })
    test('should update an image', async () => {
      const mockData = Confetti.models.image.sample.single.raw

      nock('https://api.confetti.events')
        .put('/images/1')
        .reply(200, mockData as MockResponseData)

      const data = await Confetti.images.update(1, { title: 'New title' }, { apiKey: 'my-key' })
      assert.deepStrictEqual(data, Confetti.models.image.sample.single.formatted)
    })
    test('should delete an image', async () => {
      nock('https://api.confetti.events').delete('/images/1').reply(204)

      await Confetti.images.delete(1, { apiKey: 'my-key' })
    })
  })
})
