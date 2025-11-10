import Confetti from '../../src'
import { expect } from '../helper'
import nock from 'nock'

type MockResponseData = Record<string, unknown>

describe('Resources', () => {
  beforeEach(() => {
    nock.cleanAll()
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('Instance', function () {
    describe('Events', function () {
      it('should request one event', async function () {
        const mockData = Confetti.models.event.sample.single.raw

        nock('https://api.confetti.events')
          .get('/events/1')
          .reply(200, mockData as MockResponseData)

        const confetti = new Confetti({ apiKey: 'my-key' })
        const data = await confetti.events.find(1)

        expect(data).to.deep.equal(Confetti.models.event.sample.single.formatted)
      })
      it('should request multiple events', async function () {
        const mockData = Confetti.models.event.sample.multiple.raw

        nock('https://api.confetti.events')
          .get('/events')
          .reply(200, mockData as MockResponseData)

        const confetti = new Confetti({ apiKey: 'my-key' })
        const data = await confetti.events.findAll()

        expect(data).to.deep.equal(Confetti.models.event.sample.multiple.formatted)
      })
    })

    describe('Payments', function () {
      it('should request one payment', async function () {
        const mockData = Confetti.models.payment.sample.single.raw

        nock('https://api.confetti.events')
          .get('/payments/1')
          .reply(200, mockData as MockResponseData)

        const confetti = new Confetti({ apiKey: 'my-key' })
        const data = await confetti.payments.find(1)

        expect(data).to.deep.equal(Confetti.models.payment.sample.single.formatted)
      })
      it('should request multiple payments', async function () {
        const mockData = Confetti.models.payment.sample.multiple.raw

        nock('https://api.confetti.events')
          .get('/payments')
          .query({ filter: { eventId: 12 } })
          .reply(200, mockData as MockResponseData)

        const confetti = new Confetti({ apiKey: 'my-key' })
        const data = await confetti.payments.findAll({ filter: { eventId: 12 } })

        expect(data).to.deep.equal(Confetti.models.payment.sample.multiple.formatted)
      })
    })

    describe('TicketBatches', function () {
      it('should request one ticketBatch', async function () {
        const mockData = Confetti.models.ticketBatch.sample.single.raw

        nock('https://api.confetti.events')
          .get('/ticket-batches/1')
          .reply(200, mockData as MockResponseData)

        const confetti = new Confetti({ apiKey: 'my-key' })
        const data = await confetti.ticketBatches.find(1)

        expect(data).to.deep.equal(Confetti.models.ticketBatch.sample.single.formatted)
      })
      it('should request multiple ticketBatches', async function () {
        const mockData = Confetti.models.ticketBatch.sample.multiple.raw

        nock('https://api.confetti.events')
          .get('/ticket-batches')
          .reply(200, mockData as MockResponseData)

        const confetti = new Confetti({ apiKey: 'my-key' })
        const data = await confetti.ticketBatches.findAll()

        expect(data).to.deep.equal(Confetti.models.ticketBatch.sample.multiple.formatted)
      })
    })

    describe('Tickets', function () {
      it('should request one ticket', async function () {
        const mockData = Confetti.models.ticket.sample.single.raw

        nock('https://api.confetti.events')
          .get('/tickets/1')
          .reply(200, mockData as MockResponseData)

        const confetti = new Confetti({ apiKey: 'my-key' })
        const data = await confetti.tickets.find(1)

        expect(data).to.deep.equal(Confetti.models.ticket.sample.single.formatted)
      })
      it('should request multiple tickets', async function () {
        const mockData = Confetti.models.ticket.sample.multiple.raw

        nock('https://api.confetti.events')
          .get('/tickets')
          .query({ filter: { eventId: 1 } })
          .reply(200, mockData as MockResponseData)

        const confetti = new Confetti({ apiKey: 'my-key' })
        const data = await confetti.tickets.findAll({ filter: { eventId: 1 } })

        expect(data).to.deep.equal(Confetti.models.ticket.sample.multiple.formatted)
      })
      it('should create a ticket', async function () {
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

        expect(data).to.deep.equal(Confetti.models.ticket.sample.single.formatted)
      })
    })

    describe('Contacts', function () {
      it('should request one contact', async function () {
        const mockData = Confetti.models.contact.sample.single.raw

        nock('https://api.confetti.events')
          .get('/contacts/1')
          .reply(200, mockData as MockResponseData)

        const confetti = new Confetti({ apiKey: 'my-key' })
        const data = await confetti.contacts.find(1)

        expect(data).to.deep.equal(Confetti.models.contact.sample.single.formatted)
      })
      it('should request multiple contacts', async function () {
        const mockData = Confetti.models.contact.sample.multiple.raw

        nock('https://api.confetti.events')
          .get('/contacts')
          .reply(200, mockData as MockResponseData)

        const confetti = new Confetti({ apiKey: 'my-key' })
        const data = await confetti.contacts.findAll()

        expect(data).to.deep.equal(Confetti.models.contact.sample.multiple.formatted)
      })
      it('should create a contact', async function () {
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

        expect(data).to.deep.equal(Confetti.models.contact.sample.single.formatted)
      })
    })

    describe('Webhooks', function () {
      it('should request one webhook', async function () {
        const mockData = Confetti.models.webhook.sample.single.raw

        nock('https://api.confetti.events')
          .get('/webhooks/1')
          .reply(200, mockData as MockResponseData)

        const confetti = new Confetti({ apiKey: 'my-key' })
        const data = await confetti.webhooks.find(1)

        expect(data).to.deep.equal(Confetti.models.webhook.sample.single.formatted)
      })
      it('should request multiple webhooks', async function () {
        const mockData = Confetti.models.webhook.sample.multiple.raw

        nock('https://api.confetti.events')
          .get('/webhooks')
          .reply(200, mockData as MockResponseData)

        const confetti = new Confetti({ apiKey: 'my-key' })
        const data = await confetti.webhooks.findAll()

        expect(data).to.deep.equal(Confetti.models.webhook.sample.multiple.formatted)
      })
    })

    describe('Workspaces', function () {
      it('should request one workspace', async function () {
        const mockData = Confetti.models.workspace.sample.single.raw

        nock('https://api.confetti.events')
          .get('/workspaces/1')
          .reply(200, mockData as MockResponseData)

        const confetti = new Confetti({ apiKey: 'my-key' })
        const data = await confetti.workspaces.find(1)

        expect(data).to.deep.equal(Confetti.models.workspace.sample.single.formatted)
      })
      it('should request multiple workspaces', async function () {
        const mockData = Confetti.models.workspace.sample.multiple.raw

        nock('https://api.confetti.events')
          .get('/workspaces')
          .reply(200, mockData as MockResponseData)

        const confetti = new Confetti({ apiKey: 'my-key' })
        const data = await confetti.workspaces.findAll()

        expect(data).to.deep.equal(Confetti.models.workspace.sample.multiple.formatted)
      })
    })

    describe('Categories', function () {
      it('should request multiple categories', async function () {
        const mockData = Confetti.models.category.sample.multiple.raw

        nock('https://api.confetti.events')
          .get('/categories')
          .reply(200, mockData as MockResponseData)

        const confetti = new Confetti({ apiKey: 'my-key' })
        const data = await confetti.categories.findAll()

        expect(data).to.deep.equal(Confetti.models.category.sample.multiple.formatted)
      })
      it('should request one category', async function () {
        const mockData = Confetti.models.category.sample.single.raw

        nock('https://api.confetti.events')
          .get('/categories/1')
          .reply(200, mockData as MockResponseData)

        const confetti = new Confetti({ apiKey: 'my-key' })
        const data = await confetti.categories.find(1)

        expect(data).to.deep.equal(Confetti.models.category.sample.single.formatted)
      })
    })
  })

  describe('Static', function () {
    describe('Events', function () {
      it('should request one event', async function () {
        const mockData = Confetti.models.event.sample.single.raw

        nock('https://api.confetti.events')
          .get('/events/1')
          .reply(200, mockData as MockResponseData)

        const data = await Confetti.events.find(1, { apiKey: 'my-key' })
        expect(data).to.deep.equal(Confetti.models.event.sample.single.formatted)
      })
      it('should request multiple events', async function () {
        const mockData = Confetti.models.event.sample.multiple.raw

        nock('https://api.confetti.events')
          .get('/events')
          .reply(200, mockData as MockResponseData)

        const data = await Confetti.events.findAll({ apiKey: 'my-key' })
        expect(data).to.deep.equal(Confetti.models.event.sample.multiple.formatted)
      })
    })

    describe('Payments', function () {
      it('should request one payment', async function () {
        const mockData = Confetti.models.payment.sample.single.raw

        nock('https://api.confetti.events')
          .get('/payments/1')
          .reply(200, mockData as MockResponseData)

        const data = await Confetti.payments.find(1, { apiKey: 'my-key' })
        expect(data).to.deep.equal(Confetti.models.payment.sample.single.formatted)
      })
      it('should request multiple payments', async function () {
        const mockData = Confetti.models.payment.sample.multiple.raw

        nock('https://api.confetti.events')
          .get('/payments')
          .query({ filter: { eventId: 12 } })
          .reply(200, mockData as MockResponseData)

        const data = await Confetti.payments.findAll({ apiKey: 'my-key', filter: { eventId: 12 } })
        expect(data).to.deep.equal(Confetti.models.payment.sample.multiple.formatted)
      })
    })

    describe('TicketBatches', function () {
      it('should request one ticketBatch', async function () {
        const mockData = Confetti.models.ticketBatch.sample.single.raw

        nock('https://api.confetti.events')
          .get('/ticket-batches/1')
          .reply(200, mockData as MockResponseData)

        const data = await Confetti.ticketBatches.find(1, { apiKey: 'my-key' })
        expect(data).to.deep.equal(Confetti.models.ticketBatch.sample.single.formatted)
      })
      it('should request multiple ticketBatches', async function () {
        const mockData = Confetti.models.ticketBatch.sample.multiple.raw

        nock('https://api.confetti.events')
          .get('/ticket-batches')
          .reply(200, mockData as MockResponseData)

        const data = await Confetti.ticketBatches.findAll({ apiKey: 'my-key' })
        expect(data).to.deep.equal(Confetti.models.ticketBatch.sample.multiple.formatted)
      })
    })

    describe('Tickets', function () {
      it('should request one ticket', async function () {
        const mockData = Confetti.models.ticket.sample.single.raw

        nock('https://api.confetti.events')
          .get('/tickets/1')
          .reply(200, mockData as MockResponseData)

        const data = await Confetti.tickets.find(1, { apiKey: 'my-key' })
        expect(data).to.deep.equal(Confetti.models.ticket.sample.single.formatted)
      })
      it('should request multiple tickets', async function () {
        const mockData = Confetti.models.ticket.sample.multiple.raw

        nock('https://api.confetti.events')
          .get('/tickets')
          .query({ filter: { eventId: 1 } })
          .reply(200, mockData as MockResponseData)

        const data = await Confetti.tickets.findAll({ apiKey: 'my-key', filter: { eventId: 1 } })
        expect(data).to.deep.equal(Confetti.models.ticket.sample.multiple.formatted)
      })
      it('should create a ticket', async function () {
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
        expect(data).to.deep.equal(Confetti.models.ticket.sample.single.formatted)
      })
    })

    describe('Webhooks', function () {
      it('should request one webhook', async function () {
        const mockData = Confetti.models.webhook.sample.single.raw

        nock('https://api.confetti.events')
          .get('/webhooks/1')
          .reply(200, mockData as MockResponseData)

        const data = await Confetti.webhooks.find(1, { apiKey: 'my-key' })
        expect(data).to.deep.equal(Confetti.models.webhook.sample.single.formatted)
      })
      it('should request multiple webhooks', async function () {
        const mockData = Confetti.models.webhook.sample.multiple.raw

        nock('https://api.confetti.events')
          .get('/webhooks')
          .reply(200, mockData as MockResponseData)

        const data = await Confetti.webhooks.findAll({ apiKey: 'my-key' })
        expect(data).to.deep.equal(Confetti.models.webhook.sample.multiple.formatted)
      })
      it('should create a webhook', async function () {
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
        expect(data).to.deep.equal(Confetti.models.webhook.sample.single.formatted)
      })
      it('should delete a webhook', async function () {
        nock('https://api.confetti.events').delete('/webhooks/1').reply(204)

        await Confetti.webhooks.delete(1, { apiKey: 'my-key' })
      })
    })

    describe('Workspaces', function () {
      it('should request one workspace', async function () {
        const mockData = Confetti.models.workspace.sample.single.raw

        nock('https://api.confetti.events')
          .get('/workspaces/1')
          .reply(200, mockData as MockResponseData)

        const data = await Confetti.workspaces.find(1, { apiKey: 'my-key' })
        expect(data).to.deep.equal(Confetti.models.workspace.sample.single.formatted)
      })
      it('should request multiple workspaces', async function () {
        const mockData = Confetti.models.workspace.sample.multiple.raw

        nock('https://api.confetti.events')
          .get('/workspaces')
          .reply(200, mockData as MockResponseData)

        const data = await Confetti.workspaces.findAll({ apiKey: 'my-key' })
        expect(data).to.deep.equal(Confetti.models.workspace.sample.multiple.formatted)
      })
    })

    describe('Categories', function () {
      it('should request multiple categories', async function () {
        const mockData = Confetti.models.category.sample.multiple.raw

        nock('https://api.confetti.events')
          .get('/categories')
          .reply(200, mockData as MockResponseData)

        const data = await Confetti.categories.findAll({ apiKey: 'my-key' })
        expect(data).to.deep.equal(Confetti.models.category.sample.multiple.formatted)
      })
      it('should request one category', async function () {
        const mockData = Confetti.models.category.sample.single.raw

        nock('https://api.confetti.events')
          .get('/categories/1')
          .reply(200, mockData as MockResponseData)

        const data = await Confetti.categories.find(1, { apiKey: 'my-key' })
        expect(data).to.deep.equal(Confetti.models.category.sample.single.formatted)
      })
    })

    describe('Contacts', function () {
      it('should request one contact', async function () {
        const mockData = Confetti.models.contact.sample.single.raw

        nock('https://api.confetti.events')
          .get('/contacts/1')
          .reply(200, mockData as MockResponseData)

        const data = await Confetti.contacts.find(1, { apiKey: 'my-key' })
        expect(data).to.deep.equal(Confetti.models.contact.sample.single.formatted)
      })
      it('should request multiple contacts', async function () {
        const mockData = Confetti.models.contact.sample.multiple.raw

        nock('https://api.confetti.events')
          .get('/contacts')
          .reply(200, mockData as MockResponseData)

        const data = await Confetti.contacts.findAll({ apiKey: 'my-key' })
        expect(data).to.deep.equal(Confetti.models.contact.sample.multiple.formatted)
      })
      it('should create a contact', async function () {
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
        expect(data).to.deep.equal(Confetti.models.contact.sample.single.formatted)
      })
    })
  })
})
