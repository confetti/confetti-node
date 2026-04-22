import { describe, test, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert'
import Confetti from '../../src'
import nock from 'nock'

type MockResponseData = Record<string, unknown>

describe('ScheduleItems', () => {
  beforeEach(() => {
    nock.cleanAll()
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('Instance', () => {
    test('should request one schedule item', async () => {
      const mockData = Confetti.models.scheduleItem.sample.single.raw

      nock('https://api.confetti.events')
        .get('/schedule-items/1')
        .reply(200, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.scheduleItems.find(1)

      assert.deepStrictEqual(data, Confetti.models.scheduleItem.sample.single.formatted)
    })
    test('should create a schedule item', async () => {
      const mockData = Confetti.models.scheduleItem.sample.single.raw

      nock('https://api.confetti.events')
        .post('/schedule-items')
        .reply(201, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.scheduleItems.create({ title: 'Keynote', eventId: 1 })

      assert.deepStrictEqual(data, Confetti.models.scheduleItem.sample.single.formatted)
    })
    test('should update a schedule item', async () => {
      const mockData = Confetti.models.scheduleItem.sample.single.raw

      nock('https://api.confetti.events')
        .put('/schedule-items/1')
        .reply(200, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.scheduleItems.update(1, { title: 'Renamed' })

      assert.deepStrictEqual(data, Confetti.models.scheduleItem.sample.single.formatted)
    })
    test('should delete a schedule item', async () => {
      nock('https://api.confetti.events').delete('/schedule-items/1').reply(204)

      const confetti = new Confetti({ apiKey: 'my-key' })
      await confetti.scheduleItems.delete(1)
    })
  })

  describe('Static', () => {
    test('should request one schedule item', async () => {
      const mockData = Confetti.models.scheduleItem.sample.single.raw

      nock('https://api.confetti.events')
        .get('/schedule-items/1')
        .reply(200, mockData as MockResponseData)

      const data = await Confetti.scheduleItems.find(1, { apiKey: 'my-key' })
      assert.deepStrictEqual(data, Confetti.models.scheduleItem.sample.single.formatted)
    })
    test('should create a schedule item', async () => {
      const mockData = Confetti.models.scheduleItem.sample.single.raw

      nock('https://api.confetti.events')
        .post('/schedule-items')
        .reply(201, mockData as MockResponseData)

      const data = await Confetti.scheduleItems.create(
        { title: 'Keynote', eventId: 1 },
        { apiKey: 'my-key' },
      )
      assert.deepStrictEqual(data, Confetti.models.scheduleItem.sample.single.formatted)
    })
    test('should update a schedule item', async () => {
      const mockData = Confetti.models.scheduleItem.sample.single.raw

      nock('https://api.confetti.events')
        .put('/schedule-items/1')
        .reply(200, mockData as MockResponseData)

      const data = await Confetti.scheduleItems.update(1, { title: 'Renamed' }, { apiKey: 'my-key' })
      assert.deepStrictEqual(data, Confetti.models.scheduleItem.sample.single.formatted)
    })
    test('should delete a schedule item', async () => {
      nock('https://api.confetti.events').delete('/schedule-items/1').reply(204)

      await Confetti.scheduleItems.delete(1, { apiKey: 'my-key' })
    })
  })
})
