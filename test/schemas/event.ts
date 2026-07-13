import { describe, test } from 'node:test'
import assert from 'node:assert'
import { z } from 'zod'
import { EventCreateSchema, EventUpdateSchema, EventSchema } from '../../src/schemas/event.js'

describe('EventCreateSchema', () => {
  describe('status', () => {
    for (const status of ['draft', 'open', 'cancelled']) {
      test(`should accept writable status "${status}"`, () => {
        const result = EventCreateSchema.parse({
          name: 'My event',
          startDate: '2026-01-01T12:00:00Z',
          workspaceId: 123,
          status,
        })
        assert.strictEqual(result.status, status)
      })
    }

    for (const status of ['published', 'deleted', 'template', 'foo']) {
      test(`should reject invalid/non-writable status "${status}"`, () => {
        assert.throws(
          () =>
            EventCreateSchema.parse({
              name: 'My event',
              startDate: '2026-01-01T12:00:00Z',
              workspaceId: 123,
              status,
            }),
          z.ZodError,
        )
      })
    }

    test('should allow omitting status', () => {
      const result = EventCreateSchema.parse({
        name: 'My event',
        startDate: '2026-01-01T12:00:00Z',
        workspaceId: 123,
      })
      assert.strictEqual(result.status, undefined)
    })
  })

  describe('workspaceId', () => {
    test('should reject create without workspaceId', () => {
      assert.throws(() => EventCreateSchema.parse({ name: 'My event', startDate: '2026-01-01T12:00:00Z' }), z.ZodError)
    })

    test('should accept create with workspaceId', () => {
      const result = EventCreateSchema.parse({
        name: 'My event',
        startDate: '2026-01-01T12:00:00Z',
        workspaceId: 123,
      })
      assert.strictEqual(result.workspaceId, 123)
    })
  })

  describe('workspaceId on update', () => {
    test('should allow update without workspaceId (update stays partial)', () => {
      const result = EventUpdateSchema.parse({})
      assert.deepStrictEqual(result, {})
    })
  })

  describe('website (read-only)', () => {
    test('should strip a client-supplied website on create', () => {
      const result = EventCreateSchema.parse({
        name: 'My event',
        startDate: '2026-01-01T12:00:00Z',
        workspaceId: 123,
        website: 'https://evil.example/phish',
      })
      assert.ok(!('website' in result))
    })

    test('should strip a client-supplied website on update', () => {
      const result = EventUpdateSchema.parse({ website: 'https://evil.example/phish' })
      assert.ok(!('website' in result))
    })
  })
})

describe('EventSchema (read)', () => {
  test('should accept every valid stored status, including deleted/template', () => {
    for (const status of ['draft', 'open', 'cancelled', 'deleted', 'template']) {
      assert.strictEqual(EventSchema.shape.status.parse(status), status)
    }
  })

  test('should reject a non-existent status on read', () => {
    assert.throws(() => EventSchema.shape.status.parse('published'), z.ZodError)
  })
})
