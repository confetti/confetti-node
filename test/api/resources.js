const Confetti = require('../../src')

const { expect, sinon, http, httpMock } = require('../helper')

describe('Resources', () => {
  before(function() {
    this.confetti = new Confetti({ key: 'my-key', http })
  })

  beforeEach(function() {
    sinon.stub(http, 'request').returns({})
  })
  afterEach(function() {
    http.request.restore()
  })

  describe('Events', function() {
    it('should request one event', async function() {
      httpMock(Confetti.models.event.sample.single.raw)
      const data = await this.confetti.events.find(1)
      expect(data).to.deep.equal(Confetti.models.event.sample.single.formatted)
    })
    it('should request multiple events', async function() {
      httpMock(Confetti.models.event.sample.multiple.raw)
      const data = await this.confetti.events.findAll()
      expect(data).to.deep.equal(
        Confetti.models.event.sample.multiple.formatted
      )
    })
  })

  describe('Payments', function() {
    it('should request one payment', async function() {
      httpMock(Confetti.models.payment.sample.single.raw)
      const data = await this.confetti.payments.find(1)
      expect(data).to.deep.equal(
        Confetti.models.payment.sample.single.formatted
      )
    })
    it('should request multiple payments', async function() {
      httpMock(Confetti.models.payment.sample.multiple.raw)
      const data = await this.confetti.payments.findAll()
      expect(data).to.deep.equal(
        Confetti.models.payment.sample.multiple.formatted
      )
    })
  })

  describe('Tickets', function() {
    it('should request one ticket', async function() {
      httpMock(Confetti.models.ticket.sample.single.raw)
      const data = await this.confetti.tickets.find(1)
      expect(data).to.deep.equal(Confetti.models.ticket.sample.single.formatted)
    })
    it('should request multiple tickets', async function() {
      httpMock(Confetti.models.ticket.sample.multiple.raw)
      const data = await this.confetti.tickets.findAll()
      expect(data).to.deep.equal(
        Confetti.models.ticket.sample.multiple.formatted
      )
    })
  })

  describe('Webhooks', function() {
    it('should request one webhook', async function() {
      httpMock(Confetti.models.webhook.sample.single.raw)
      const data = await this.confetti.webhooks.find(1)
      expect(data).to.deep.equal(
        Confetti.models.webhook.sample.single.formatted
      )
    })
    it('should request multiple webhooks', async function() {
      httpMock(Confetti.models.webhook.sample.multiple.raw)
      const data = await this.confetti.webhooks.findAll()
      expect(data).to.deep.equal(
        Confetti.models.webhook.sample.multiple.formatted
      )
    })
  })

  describe('Workspaces', function() {
    it('should request one workspace', async function() {
      httpMock(Confetti.models.workspace.sample.single.raw)
      const data = await this.confetti.workspaces.find(1)
      expect(data).to.deep.equal(
        Confetti.models.workspace.sample.single.formatted
      )
    })
    it('should request multiple workspaces', async function() {
      httpMock(Confetti.models.workspace.sample.multiple.raw)
      const data = await this.confetti.workspaces.findAll()
      expect(data).to.deep.equal(
        Confetti.models.workspace.sample.multiple.formatted
      )
    })
  })
})
