const Confetti = require('../../src')

const { expect, sinon, fetch } = require('../helper')

describe('Resources', () => {
  afterEach(() => {
    fetch.restore()
  })

  describe('Events', function() {
    it('should request one event', async function() {
      fetch.get(
        'https://api.confetti.events/events/1',
        Confetti.models.event.sample.single.raw
      )
      const confetti = new Confetti({ key: 'my-key', fetch })
      const data = await confetti.events.find(1)
      expect(data).to.deep.equal(Confetti.models.event.sample.single.formatted)
    })
    it('should request multiple events', async function() {
      fetch.get(
        'https://api.confetti.events/events',
        Confetti.models.event.sample.multiple.raw
      )
      const confetti = new Confetti({ key: 'my-key', fetch })
      const data = await confetti.events.findAll()
      expect(data).to.deep.equal(
        Confetti.models.event.sample.multiple.formatted
      )
    })
  })

  describe('Payments', function() {
    it('should request one payment', async function() {
      fetch.get(
        'https://api.confetti.events/payments/1',
        Confetti.models.payment.sample.single.raw
      )
      const confetti = new Confetti({ key: 'my-key', fetch })
      const data = await confetti.payments.find(1)
      expect(data).to.deep.equal(
        Confetti.models.payment.sample.single.formatted
      )
    })
    it('should request multiple payments', async function() {
      fetch.get(
        'https://api.confetti.events/payments',
        Confetti.models.payment.sample.multiple.raw
      )
      const confetti = new Confetti({ key: 'my-key', fetch })
      const data = await confetti.payments.findAll()
      expect(data).to.deep.equal(
        Confetti.models.payment.sample.multiple.formatted
      )
    })
  })

  describe('Tickets', function() {
    it('should request one ticket', async function() {
      fetch.get(
        'https://api.confetti.events/tickets/1',
        Confetti.models.ticket.sample.single.raw
      )
      const confetti = new Confetti({ key: 'my-key', fetch })
      const data = await confetti.tickets.find(1)
      expect(data).to.deep.equal(Confetti.models.ticket.sample.single.formatted)
    })
    it('should request multiple tickets', async function() {
      fetch.get(
        'https://api.confetti.events/tickets',
        Confetti.models.ticket.sample.multiple.raw
      )
      const confetti = new Confetti({ key: 'my-key', fetch })
      const data = await confetti.tickets.findAll()
      expect(data).to.deep.equal(
        Confetti.models.ticket.sample.multiple.formatted
      )
    })
  })

  describe('Webhooks', function() {
    it('should request one webhook', async function() {
      fetch.get(
        'https://api.confetti.events/webhooks/1',
        Confetti.models.webhook.sample.single.raw
      )
      const confetti = new Confetti({ key: 'my-key', fetch })
      const data = await confetti.webhooks.find(1)
      expect(data).to.deep.equal(
        Confetti.models.webhook.sample.single.formatted
      )
    })
    it('should request multiple webhooks', async function() {
      fetch.get(
        'https://api.confetti.events/webhooks',
        Confetti.models.webhook.sample.multiple.raw
      )
      const confetti = new Confetti({ key: 'my-key', fetch })
      const data = await confetti.webhooks.findAll()
      expect(data).to.deep.equal(
        Confetti.models.webhook.sample.multiple.formatted
      )
    })
  })

  describe('Workspaces', function() {
    it('should request one workspace', async function() {
      fetch.get(
        'https://api.confetti.events/workspaces/1',
        Confetti.models.workspace.sample.single.raw
      )
      const confetti = new Confetti({ key: 'my-key', fetch })
      const data = await confetti.workspaces.find(1)
      expect(data).to.deep.equal(
        Confetti.models.workspace.sample.single.formatted
      )
    })
    it('should request multiple workspaces', async function() {
      fetch.get(
        'https://api.confetti.events/workspaces',
        Confetti.models.workspace.sample.multiple.raw
      )
      const confetti = new Confetti({ key: 'my-key', fetch })
      const data = await confetti.workspaces.findAll()
      expect(data).to.deep.equal(
        Confetti.models.workspace.sample.multiple.formatted
      )
    })
  })
})
