import { describe, test } from 'node:test'
import assert from 'node:assert'
import { safeStringify } from '../../src/cli/output.js'

describe('CLI output', () => {
  test('serializes plain values like JSON.stringify', () => {
    assert.strictEqual(safeStringify({ a: 1, b: ['x'] }), JSON.stringify({ a: 1, b: ['x'] }, null, 2))
  })

  test('does not throw on circular relationship references and marks the cycle', () => {
    // Mirrors the SDK's resolved JSON:API: event.categories[0].events[0] === event.
    const event: Record<string, unknown> = { id: '1', name: 'Launch Party' }
    const category: Record<string, unknown> = { id: '7', name: 'Music', events: [event] }
    event.categories = [category]

    const output = safeStringify([event])
    const parsed: unknown = JSON.parse(output)

    assert.deepStrictEqual(parsed, [
      { id: '1', name: 'Launch Party', categories: [{ id: '7', name: 'Music', events: ['[Circular 1]'] }] },
    ])
  })

  test('keeps shared (non-cyclic) references intact', () => {
    const shared = { id: '9', name: 'Shared' }
    const output = safeStringify([{ a: shared }, { b: shared }])
    const parsed: unknown = JSON.parse(output)
    assert.deepStrictEqual(parsed, [{ a: { id: '9', name: 'Shared' } }, { b: { id: '9', name: 'Shared' } }])
  })
})
