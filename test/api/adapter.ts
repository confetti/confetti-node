import Confetti from '../../src'
import { expect } from '../helper'
import nock from 'nock'
import { ParameterError, NotFoundError } from '../../src/errors.js'

describe('Adapter', function () {
  beforeEach(() => {
    nock.cleanAll()
  })

  afterEach(() => {
    nock.cleanAll()
  })

  it('should make a find all request with correct url', async function () {
    const scope = nock('https://api.confetti.events')
      .get('/events')
      .matchHeader('authorization', 'apikey my-key')
      .matchHeader('content-type', 'application/json')
      .matchHeader('accept-encoding', 'gzip')
      .reply(200, { data: [] })

    const confetti = new Confetti({ apiKey: 'my-key' })
    await confetti.events.findAll()

    expect(scope.isDone()).to.be.true
  })

  it('should make a complicated find all request with correct url', async function () {
    const scope = nock('https://api.confetti.events')
      .get('/events')
      .query({
        'page[limit]': '1',
        'page[offset]': '10',
        include: 'categories,pages.blocks',
      })
      .matchHeader('authorization', 'apikey my-key')
      .matchHeader('content-type', 'application/json')
      .matchHeader('accept-encoding', 'gzip')
      .reply(200, { data: [] })

    const confetti = new Confetti({ apiKey: 'my-key' })
    await confetti.events.findAll({
      filter: {},
      include: ['categories', 'pages.blocks'],
      page: {
        limit: 1,
        offset: 10,
      },
    })

    expect(scope.isDone()).to.be.true
  })

  it('should make a find request with correct url', async function () {
    const scope = nock('https://api.confetti.events')
      .get('/events/3')
      .matchHeader('authorization', 'apikey my-key')
      .matchHeader('content-type', 'application/json')
      .matchHeader('accept-encoding', 'gzip')
      .reply(200, { data: {} })

    const confetti = new Confetti({ apiKey: 'my-key' })
    await confetti.events.find(3)

    expect(scope.isDone()).to.be.true
  })

  it('should make a find request with includes with correct url', async function () {
    const scope = nock('https://api.confetti.events')
      .get('/events/3')
      .query({ include: 'categories,pages.blocks' })
      .matchHeader('authorization', 'apikey my-key')
      .matchHeader('content-type', 'application/json')
      .matchHeader('accept-encoding', 'gzip')
      .reply(200, { data: {} })

    const confetti = new Confetti({ apiKey: 'my-key' })
    await confetti.events.find(3, {
      include: ['categories', 'pages.blocks'],
    })

    expect(scope.isDone()).to.be.true
  })

  it('should handle a text response', async function () {
    const scope = nock('https://api.confetti.events').get('/events/1').reply(200, 'foo')

    const confetti = new Confetti({ apiKey: 'my-key' })
    const res = await confetti.events.find(1, { raw: true })

    expect(res).to.equal('foo')
    expect(scope.isDone()).to.be.true
  })

  it('should handle a json response', async function () {
    const mockData = { data: { id: '1', type: 'event', attributes: { name: 'Test Event' } } }

    const scope = nock('https://api.confetti.events').get('/events/1').reply(200, mockData)

    const confetti = new Confetti({ apiKey: 'my-key' })
    const res = await confetti.events.find(1)

    expect(res).to.have.property('name', 'Test Event')
    expect(scope.isDone()).to.be.true
  })

  it('should handle a 400 error', async function () {
    const scope = nock('https://api.confetti.events').get('/events/1').reply(400, { message: 'Bad Request' })

    const confetti = new Confetti({ apiKey: 'my-key' })

    try {
      await confetti.events.find(1)
      expect.fail('Should have thrown an error')
    } catch (error: unknown) {
      if (!(error instanceof ParameterError)) {
        throw error
      }
      expect(error.name).to.equal('ParameterError')
      expect(error.errorType).to.equal('validation')
    }

    expect(scope.isDone()).to.be.true
  })

  it('should handle a 404 error', async function () {
    const scope = nock('https://api.confetti.events').get('/events/1').reply(404, { message: 'Not Found' })

    const confetti = new Confetti({ apiKey: 'my-key' })

    try {
      await confetti.events.find(1)
      expect.fail('Should have thrown an error')
    } catch (error: unknown) {
      if (!(error instanceof NotFoundError)) {
        throw error
      }
      expect(error.name).to.equal('NotFoundError')
      expect(error.errorType).to.equal('Not Found')
    }

    expect(scope.isDone()).to.be.true
  })

  it('should make a post request with correct url and body', async function () {
    const mockData = { data: { id: '1', type: 'ticket', attributes: { firstName: 'John' } } }

    const scope = nock('https://api.confetti.events')
      .post('/tickets')
      .matchHeader('authorization', 'apikey my-key')
      .matchHeader('content-type', 'application/json')
      .matchHeader('accept-encoding', 'gzip')
      .reply(201, mockData)

    const confetti = new Confetti({ apiKey: 'my-key' })
    await confetti.tickets.create({
      eventId: 1,
      firstName: 'John',
      lastName: 'Doe',
      status: 'invited',
      email: 'john@doe.se',
      sendEmailConfirmation: true,
    })

    expect(scope.isDone()).to.be.true
  })

  it('should make a delete request with correct url', async function () {
    const scope = nock('https://api.confetti.events')
      .delete('/webhooks/1')
      .matchHeader('authorization', 'apikey my-key')
      .matchHeader('content-type', 'application/json')
      .matchHeader('accept-encoding', 'gzip')
      .reply(204)

    const confetti = new Confetti({ apiKey: 'my-key' })
    await confetti.webhooks.delete(1)

    expect(scope.isDone()).to.be.true
  })

  it('should use custom api host', async function () {
    const scope = nock('https://custom.api.host').get('/events').reply(200, { data: [] })

    const confetti = new Confetti({
      apiKey: 'my-key',
      apiHost: 'custom.api.host',
    })
    await confetti.events.findAll()

    expect(scope.isDone()).to.be.true
  })

  it('should use custom api protocol', async function () {
    const scope = nock('http://api.confetti.events').get('/events').reply(200, { data: [] })

    const confetti = new Confetti({
      apiKey: 'my-key',
      apiProtocol: 'http',
    })
    await confetti.events.findAll()

    expect(scope.isDone()).to.be.true
  })
})
