import { describe, test, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert'
import Confetti from '../../src'
import nock from 'nock'

type MockResponseData = Record<string, unknown>

describe('Forms', () => {
  beforeEach(() => {
    nock.cleanAll()
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('Instance', () => {
    test('should request multiple forms', async () => {
      const mockData = Confetti.models.form.sample.multiple.raw

      nock('https://api.confetti.events')
        .get('/forms')
        .query({ filter: { eventId: 1 } })
        .reply(200, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.forms.findAll({ filter: { eventId: 1 } })

      assert.deepStrictEqual(data, Confetti.models.form.sample.multiple.formatted)
    })
    test('should request one form', async () => {
      const mockData = Confetti.models.form.sample.single.raw

      nock('https://api.confetti.events')
        .get('/forms/1')
        .reply(200, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.forms.find(1)

      assert.deepStrictEqual(data, Confetti.models.form.sample.single.formatted)
    })
  })

  describe('Static', () => {
    test('should request multiple forms', async () => {
      const mockData = Confetti.models.form.sample.multiple.raw

      nock('https://api.confetti.events')
        .get('/forms')
        .query({ filter: { eventId: 1 } })
        .reply(200, mockData as MockResponseData)

      const data = await Confetti.forms.findAll({ apiKey: 'my-key', filter: { eventId: 1 } })
      assert.deepStrictEqual(data, Confetti.models.form.sample.multiple.formatted)
    })
    test('should request one form', async () => {
      const mockData = Confetti.models.form.sample.single.raw

      nock('https://api.confetti.events')
        .get('/forms/1')
        .reply(200, mockData as MockResponseData)

      const data = await Confetti.forms.find(1, { apiKey: 'my-key' })
      assert.deepStrictEqual(data, Confetti.models.form.sample.single.formatted)
    })
  })
})
