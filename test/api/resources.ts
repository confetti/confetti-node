import { describe, test, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert'
import Confetti from '../../src'
import nock from 'nock'

type MockResponseData = Record<string, unknown>

describe('Resources', () => {
  beforeEach(() => {
    nock.cleanAll()
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('Instance', () => {
    describe('Events', () => {
      test('should request one event', async () => {
        const mockData = Confetti.models.event.sample.single.raw

        nock('https://api.confetti.events')
          .get('/events/1')
          .reply(200, mockData as MockResponseData)

        const confetti = new Confetti({ apiKey: 'my-key' })
        const data = await confetti.events.find(1)

        assert.deepStrictEqual(data, Confetti.models.event.sample.single.formatted)
      })
      test('should request multiple events', async () => {
        const mockData = Confetti.models.event.sample.multiple.raw

        nock('https://api.confetti.events')
          .get('/events')
          .reply(200, mockData as MockResponseData)

        const confetti = new Confetti({ apiKey: 'my-key' })
        const data = await confetti.events.findAll()

        assert.deepStrictEqual(data, Confetti.models.event.sample.multiple.formatted)
      })
    })

    describe('Payments', () => {
      test('should request one payment', async () => {
        const mockData = Confetti.models.payment.sample.single.raw

        nock('https://api.confetti.events')
          .get('/payments/1')
          .reply(200, mockData as MockResponseData)

        const confetti = new Confetti({ apiKey: 'my-key' })
        const data = await confetti.payments.find(1)

        assert.deepStrictEqual(data, Confetti.models.payment.sample.single.formatted)
      })
      test('should request multiple payments', async () => {
        const mockData = Confetti.models.payment.sample.multiple.raw

        nock('https://api.confetti.events')
          .get('/payments')
          .query({ filter: { eventId: 12 } })
          .reply(200, mockData as MockResponseData)

        const confetti = new Confetti({ apiKey: 'my-key' })
        const data = await confetti.payments.findAll({ filter: { eventId: 12 } })

        assert.deepStrictEqual(data, Confetti.models.payment.sample.multiple.formatted)
      })
    })

    describe('TicketBatches', () => {
      test('should request one ticketBatch', async () => {
        const mockData = Confetti.models.ticketBatch.sample.single.raw

        nock('https://api.confetti.events')
          .get('/ticket-batches/1')
          .reply(200, mockData as MockResponseData)

        const confetti = new Confetti({ apiKey: 'my-key' })
        const data = await confetti.ticketBatches.find(1)

        assert.deepStrictEqual(data, Confetti.models.ticketBatch.sample.single.formatted)
      })
      test('should request multiple ticketBatches', async () => {
        const mockData = Confetti.models.ticketBatch.sample.multiple.raw

        nock('https://api.confetti.events')
          .get('/ticket-batches')
          .reply(200, mockData as MockResponseData)

        const confetti = new Confetti({ apiKey: 'my-key' })
        const data = await confetti.ticketBatches.findAll()

        assert.deepStrictEqual(data, Confetti.models.ticketBatch.sample.multiple.formatted)
      })
    })

    describe('Tickets', () => {
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

    describe('Contacts', () => {
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

    describe('Webhooks', () => {
      test('should request one webhook', async () => {
        const mockData = Confetti.models.webhook.sample.single.raw

        nock('https://api.confetti.events')
          .get('/webhooks/1')
          .reply(200, mockData as MockResponseData)

        const confetti = new Confetti({ apiKey: 'my-key' })
        const data = await confetti.webhooks.find(1)

        assert.deepStrictEqual(data, Confetti.models.webhook.sample.single.formatted)
      })
      test('should request multiple webhooks', async () => {
        const mockData = Confetti.models.webhook.sample.multiple.raw

        nock('https://api.confetti.events')
          .get('/webhooks')
          .reply(200, mockData as MockResponseData)

        const confetti = new Confetti({ apiKey: 'my-key' })
        const data = await confetti.webhooks.findAll()

        assert.deepStrictEqual(data, Confetti.models.webhook.sample.multiple.formatted)
      })
    })

    describe('Workspaces', () => {
      test('should request one workspace', async () => {
        const mockData = Confetti.models.workspace.sample.single.raw

        nock('https://api.confetti.events')
          .get('/workspaces/1')
          .reply(200, mockData as MockResponseData)

        const confetti = new Confetti({ apiKey: 'my-key' })
        const data = await confetti.workspaces.find(1)

        assert.deepStrictEqual(data, Confetti.models.workspace.sample.single.formatted)
      })
      test('should request multiple workspaces', async () => {
        const mockData = Confetti.models.workspace.sample.multiple.raw

        nock('https://api.confetti.events')
          .get('/workspaces')
          .reply(200, mockData as MockResponseData)

        const confetti = new Confetti({ apiKey: 'my-key' })
        const data = await confetti.workspaces.findAll()

        assert.deepStrictEqual(data, Confetti.models.workspace.sample.multiple.formatted)
      })
    })

    describe('Categories', () => {
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
  })

  describe('Static', () => {
    describe('Events', () => {
      test('should request one event', async () => {
        const mockData = Confetti.models.event.sample.single.raw

        nock('https://api.confetti.events')
          .get('/events/1')
          .reply(200, mockData as MockResponseData)

        const data = await Confetti.events.find(1, { apiKey: 'my-key' })
        assert.deepStrictEqual(data, Confetti.models.event.sample.single.formatted)
      })
      test('should request multiple events', async () => {
        const mockData = Confetti.models.event.sample.multiple.raw

        nock('https://api.confetti.events')
          .get('/events')
          .reply(200, mockData as MockResponseData)

        const data = await Confetti.events.findAll({ apiKey: 'my-key' })
        assert.deepStrictEqual(data, Confetti.models.event.sample.multiple.formatted)
      })
    })

    describe('Payments', () => {
      test('should request one payment', async () => {
        const mockData = Confetti.models.payment.sample.single.raw

        nock('https://api.confetti.events')
          .get('/payments/1')
          .reply(200, mockData as MockResponseData)

        const data = await Confetti.payments.find(1, { apiKey: 'my-key' })
        assert.deepStrictEqual(data, Confetti.models.payment.sample.single.formatted)
      })
      test('should request multiple payments', async () => {
        const mockData = Confetti.models.payment.sample.multiple.raw

        nock('https://api.confetti.events')
          .get('/payments')
          .query({ filter: { eventId: 12 } })
          .reply(200, mockData as MockResponseData)

        const data = await Confetti.payments.findAll({ apiKey: 'my-key', filter: { eventId: 12 } })
        assert.deepStrictEqual(data, Confetti.models.payment.sample.multiple.formatted)
      })
    })

    describe('TicketBatches', () => {
      test('should request one ticketBatch', async () => {
        const mockData = Confetti.models.ticketBatch.sample.single.raw

        nock('https://api.confetti.events')
          .get('/ticket-batches/1')
          .reply(200, mockData as MockResponseData)

        const data = await Confetti.ticketBatches.find(1, { apiKey: 'my-key' })
        assert.deepStrictEqual(data, Confetti.models.ticketBatch.sample.single.formatted)
      })
      test('should request multiple ticketBatches', async () => {
        const mockData = Confetti.models.ticketBatch.sample.multiple.raw

        nock('https://api.confetti.events')
          .get('/ticket-batches')
          .reply(200, mockData as MockResponseData)

        const data = await Confetti.ticketBatches.findAll({ apiKey: 'my-key' })
        assert.deepStrictEqual(data, Confetti.models.ticketBatch.sample.multiple.formatted)
      })
    })

    describe('Tickets', () => {
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

    describe('Webhooks', () => {
      test('should request one webhook', async () => {
        const mockData = Confetti.models.webhook.sample.single.raw

        nock('https://api.confetti.events')
          .get('/webhooks/1')
          .reply(200, mockData as MockResponseData)

        const data = await Confetti.webhooks.find(1, { apiKey: 'my-key' })
        assert.deepStrictEqual(data, Confetti.models.webhook.sample.single.formatted)
      })
      test('should request multiple webhooks', async () => {
        const mockData = Confetti.models.webhook.sample.multiple.raw

        nock('https://api.confetti.events')
          .get('/webhooks')
          .reply(200, mockData as MockResponseData)

        const data = await Confetti.webhooks.findAll({ apiKey: 'my-key' })
        assert.deepStrictEqual(data, Confetti.models.webhook.sample.multiple.formatted)
      })
      test('should create a webhook', async () => {
        const mockData = Confetti.models.webhook.sample.single.raw

        nock('https://api.confetti.events')
          .post('/webhooks')
          .reply(201, mockData as MockResponseData)

        const data = await Confetti.webhooks.create(
          {
            type: 'ticket.attending',
            url: 'https://hooks.zapier.com/hooks/standard/1337/',
            provider: 'zapier',
            workspaceId: 57,
            eventId: 2,
          },
          { apiKey: 'my-key' },
        )
        assert.deepStrictEqual(data, Confetti.models.webhook.sample.single.formatted)
      })
      test('should delete a webhook', async () => {
        nock('https://api.confetti.events').delete('/webhooks/1').reply(204)

        await Confetti.webhooks.delete(1, { apiKey: 'my-key' })
      })
    })

    describe('Workspaces', () => {
      test('should request one workspace', async () => {
        const mockData = Confetti.models.workspace.sample.single.raw

        nock('https://api.confetti.events')
          .get('/workspaces/1')
          .reply(200, mockData as MockResponseData)

        const data = await Confetti.workspaces.find(1, { apiKey: 'my-key' })
        assert.deepStrictEqual(data, Confetti.models.workspace.sample.single.formatted)
      })
      test('should request multiple workspaces', async () => {
        const mockData = Confetti.models.workspace.sample.multiple.raw

        nock('https://api.confetti.events')
          .get('/workspaces')
          .reply(200, mockData as MockResponseData)

        const data = await Confetti.workspaces.findAll({ apiKey: 'my-key' })
        assert.deepStrictEqual(data, Confetti.models.workspace.sample.multiple.formatted)
      })
    })

    describe('Categories', () => {
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

    describe('Contacts', () => {
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
})
