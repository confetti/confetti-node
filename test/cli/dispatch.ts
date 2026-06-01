import { describe, test, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert'
import nock from 'nock'
import Confetti from '../../src'
import { dispatch, listResources, UsageError } from '../../src/cli/commands/resource.js'

describe('CLI dispatch', () => {
  beforeEach(() => nock.cleanAll())
  afterEach(() => nock.cleanAll())

  test('derives the resource list without leaking internals', () => {
    const resources = listResources(new Confetti({ apiKey: 'k' }))
    assert.ok(resources.includes('events'))
    assert.ok(resources.includes('ticketBatches'))
    assert.ok(!resources.includes('adapter'))
  })

  test('rejects an unknown resource', async () => {
    const client = new Confetti({ apiKey: 'k' })
    await assert.rejects(
      () => dispatch({ client, resource: 'nope', method: 'findAll', options: {} }),
      (err: unknown) => err instanceof UsageError && /Unknown resource/.test(err.message),
    )
  })

  test('rejects a method the resource does not support', async () => {
    const client = new Confetti({ apiKey: 'k' })
    await assert.rejects(
      () => dispatch({ client, resource: 'events', method: 'delete', options: {} }),
      (err: unknown) => err instanceof UsageError && /has no method 'delete'/.test(err.message),
    )
  })

  test('passes options straight through to the SDK method', async () => {
    const scope = nock('https://api.confetti.events')
      .get('/events')
      .query({ 'page[limit]': '2' })
      .matchHeader('authorization', 'Bearer tok')
      .reply(200, { data: [] })

    const client = new Confetti({ accessToken: 'tok' })
    await dispatch({ client, resource: 'events', method: 'findAll', options: { page: { limit: 2 } } })
    assert.strictEqual(scope.isDone(), true)
  })

  test('passes the id to find', async () => {
    const scope = nock('https://api.confetti.events')
      .get('/events/5')
      .reply(200, { data: { id: '5', type: 'event' } })

    const client = new Confetti({ apiKey: 'k' })
    await dispatch({ client, resource: 'events', method: 'find', id: '5', options: {} })
    assert.strictEqual(scope.isDone(), true)
  })
})
