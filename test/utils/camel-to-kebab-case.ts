import { describe, test } from 'node:test'
import assert from 'node:assert'
import camelToKebebCase from '../../src/utils/camel-to-kebab-case'

describe('camelCase to kebab-case', () => {
  test('should transform string of camel case to kebab case', () => {
    assert.strictEqual(camelToKebebCase('ticketBatch'), 'ticket-batch')
    assert.strictEqual(camelToKebebCase('ticketBatches'), 'ticket-batches')
  })
  test('should handle string without camelCase', () => {
    assert.strictEqual(camelToKebebCase('categories'), 'categories')
    assert.strictEqual(camelToKebebCase('category'), 'category')
  })
})
