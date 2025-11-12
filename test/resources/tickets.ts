import { describe, test, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert'
import Confetti from '../../src'
import nock from 'nock'

type MockResponseData = Record<string, unknown>

describe('Tickets', () => {
  beforeEach(() => {
    nock.cleanAll()
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('Instance', () => {
    test('should request one ticket', async () => {
      const mockData = Confetti.models.ticket.sample.single.raw

      nock('https://api.confetti.events')
        .get('/tickets/1')
        .reply(200, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.tickets.find(1)

      assert.deepStrictEqual(data, Confetti.models.ticket.sample.single.formatted)
    })
    test('should request multiple tickets', async () => {
      const mockData = Confetti.models.ticket.sample.multiple.raw

      nock('https://api.confetti.events')
        .get('/tickets')
        .query({ filter: { eventId: 1 } })
        .reply(200, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.tickets.findAll({ filter: { eventId: 1 } })

      assert.deepStrictEqual(data, Confetti.models.ticket.sample.multiple.formatted)
    })
    test('should create a ticket', async () => {
      const mockData = Confetti.models.ticket.sample.single.raw

      nock('https://api.confetti.events')
        .post('/tickets')
        .reply(201, mockData as MockResponseData)

      const confetti = new Confetti({ apiKey: 'my-key' })
      const data = await confetti.tickets.create({
        eventId: 1,
        firstName: 'John',
        lastName: 'Doe',
        status: 'invited',
        email: 'john@doe.se',
        sendEmailConfirmation: true,
      })

      assert.deepStrictEqual(data, Confetti.models.ticket.sample.single.formatted)
    })
  })

  describe('Static', () => {
    test('should request one ticket', async () => {
      const mockData = Confetti.models.ticket.sample.single.raw

      nock('https://api.confetti.events')
        .get('/tickets/1')
        .reply(200, mockData as MockResponseData)

      const data = await Confetti.tickets.find(1, { apiKey: 'my-key' })
      assert.deepStrictEqual(data, Confetti.models.ticket.sample.single.formatted)
    })
    test('should request multiple tickets', async () => {
      const mockData = Confetti.models.ticket.sample.multiple.raw

      nock('https://api.confetti.events')
        .get('/tickets')
        .query({ filter: { eventId: 1 } })
        .reply(200, mockData as MockResponseData)

      const data = await Confetti.tickets.findAll({ apiKey: 'my-key', filter: { eventId: 1 } })
      assert.deepStrictEqual(data, Confetti.models.ticket.sample.multiple.formatted)
    })
    test('should create a ticket', async () => {
      const mockData = Confetti.models.ticket.sample.single.raw

      nock('https://api.confetti.events')
        .post('/tickets')
        .reply(201, mockData as MockResponseData)

      const data = await Confetti.tickets.create(
        {
          eventId: 1,
          firstName: 'John',
          lastName: 'Doe',
          status: 'invited',
          email: 'john@doe.se',
          company: 'Company AB',
          sendEmailConfirmation: true,
        },
        { apiKey: 'my-key' },
      )
      assert.deepStrictEqual(data, Confetti.models.ticket.sample.single.formatted)
    })
  })
})
