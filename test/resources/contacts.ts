import { describe, test, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert'
import Confetti from '../../src'
import nock from 'nock'

type MockResponseData = Record<string, unknown>

describe('Contacts', () => {
  beforeEach(() => {
    nock.cleanAll()
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('Instance', () => {
    test('should request one contact', async () => {
      const mockData = Confetti.models.contact.sample.single.raw

      nock('https://api.confetti.events')
        .get('/contacts/1')
        .reply(200, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.contacts.find(1)

      assert.deepStrictEqual(data, Confetti.models.contact.sample.single.formatted)
    })
    test('should request multiple contacts', async () => {
      const mockData = Confetti.models.contact.sample.multiple.raw

      nock('https://api.confetti.events')
        .get('/contacts')
        .reply(200, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.contacts.findAll()

      assert.deepStrictEqual(data, Confetti.models.contact.sample.multiple.formatted)
    })
    test('should create a contact', async () => {
      const mockData = Confetti.models.contact.sample.single.raw

      nock('https://api.confetti.events')
        .post('/contacts')
        .reply(201, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.contacts.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@doe.se',
        categoryIds: [1, 3],
        workspaceId: 57,
      })

      assert.deepStrictEqual(data, Confetti.models.contact.sample.single.formatted)
    })
  })

  describe('Static', () => {
    test('should request one contact', async () => {
      const mockData = Confetti.models.contact.sample.single.raw

      nock('https://api.confetti.events')
        .get('/contacts/1')
        .reply(200, mockData as MockResponseData)

      const data = await Confetti.contacts.find(1, { apiKey: 'my-key' })
      assert.deepStrictEqual(data, Confetti.models.contact.sample.single.formatted)
    })
    test('should request multiple contacts', async () => {
      const mockData = Confetti.models.contact.sample.multiple.raw

      nock('https://api.confetti.events')
        .get('/contacts')
        .reply(200, mockData as MockResponseData)

      const data = await Confetti.contacts.findAll({ apiKey: 'my-key' })
      assert.deepStrictEqual(data, Confetti.models.contact.sample.multiple.formatted)
    })
    test('should create a contact', async () => {
      const mockData = Confetti.models.contact.sample.single.raw

      nock('https://api.confetti.events')
        .post('/contacts')
        .reply(201, mockData as MockResponseData)

      const data = await Confetti.contacts.create(
        {
          workspaceId: 57,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@doe.se',
          categoryIds: [1, 3],
          company: 'My new company AB',
        },
        { apiKey: 'my-key' },
      )
      assert.deepStrictEqual(data, Confetti.models.contact.sample.single.formatted)
    })
  })
})
