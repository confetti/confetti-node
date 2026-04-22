import { describe, test, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert'
import Confetti from '../../src'
import nock from 'nock'

type MockResponseData = Record<string, unknown>

describe('FormFields', () => {
  beforeEach(() => {
    nock.cleanAll()
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('Instance', () => {
    test('should request multiple formFields', async () => {
      const mockData = Confetti.models.formField.sample.multiple.raw

      nock('https://api.confetti.events')
        .get('/form-fields')
        .query({ filter: { formId: 1 } })
        .reply(200, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.formFields.findAll({ filter: { formId: 1 } })

      assert.deepStrictEqual(data, Confetti.models.formField.sample.multiple.formatted)
    })
    test('should request one formField', async () => {
      const mockData = Confetti.models.formField.sample.single.raw

      nock('https://api.confetti.events')
        .get('/form-fields/1')
        .reply(200, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.formFields.find(1)

      assert.deepStrictEqual(data, Confetti.models.formField.sample.single.formatted)
    })
    test('should create a formField', async () => {
      const mockData = Confetti.models.formField.sample.single.raw

      nock('https://api.confetti.events')
        .post('/form-fields')
        .reply(201, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.formFields.create({
        formId: 1,
        name: 'location',
        title: 'Location',
        field: 'text',
      })

      assert.deepStrictEqual(data, Confetti.models.formField.sample.single.formatted)
    })
    test('should update a formField', async () => {
      const mockData = Confetti.models.formField.sample.single.raw

      nock('https://api.confetti.events')
        .put('/form-fields/1')
        .reply(200, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.formFields.update(1, { title: 'Renamed' })

      assert.deepStrictEqual(data, Confetti.models.formField.sample.single.formatted)
    })
    test('should delete a formField', async () => {
      nock('https://api.confetti.events').delete('/form-fields/1').reply(204)

      const confetti = new Confetti({ apiKey: 'my-key' })
      await confetti.formFields.delete(1)
    })
  })

  describe('Static', () => {
    test('should request multiple formFields', async () => {
      const mockData = Confetti.models.formField.sample.multiple.raw

      nock('https://api.confetti.events')
        .get('/form-fields')
        .query({ filter: { formId: 1 } })
        .reply(200, mockData as MockResponseData)

      const data = await Confetti.formFields.findAll({ apiKey: 'my-key', filter: { formId: 1 } })
      assert.deepStrictEqual(data, Confetti.models.formField.sample.multiple.formatted)
    })
    test('should request one formField', async () => {
      const mockData = Confetti.models.formField.sample.single.raw

      nock('https://api.confetti.events')
        .get('/form-fields/1')
        .reply(200, mockData as MockResponseData)

      const data = await Confetti.formFields.find(1, { apiKey: 'my-key' })
      assert.deepStrictEqual(data, Confetti.models.formField.sample.single.formatted)
    })
    test('should create a formField', async () => {
      const mockData = Confetti.models.formField.sample.single.raw

      nock('https://api.confetti.events')
        .post('/form-fields')
        .reply(201, mockData as MockResponseData)

      const data = await Confetti.formFields.create(
        { formId: 1, name: 'location', title: 'Location', field: 'text' },
        { apiKey: 'my-key' },
      )
      assert.deepStrictEqual(data, Confetti.models.formField.sample.single.formatted)
    })
    test('should update a formField', async () => {
      const mockData = Confetti.models.formField.sample.single.raw

      nock('https://api.confetti.events')
        .put('/form-fields/1')
        .reply(200, mockData as MockResponseData)

      const data = await Confetti.formFields.update(1, { title: 'Renamed' }, { apiKey: 'my-key' })
      assert.deepStrictEqual(data, Confetti.models.formField.sample.single.formatted)
    })
    test('should delete a formField', async () => {
      nock('https://api.confetti.events').delete('/form-fields/1').reply(204)

      await Confetti.formFields.delete(1, { apiKey: 'my-key' })
    })
  })
})
