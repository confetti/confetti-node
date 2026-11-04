import { z } from 'zod'
import { describe, test } from 'node:test'
import assert from 'node:assert'
import { BlockCreateSchema, BlockUpdateSchema } from '../../src/schemas/block.js'
import { schemaToJsonSchema } from '../../src/utils/to-json-schema.js'

describe('BlockUpdateSchema', () => {
  test('should strip fields the API ignores on update', () => {
    const result = BlockUpdateSchema.parse({
      status: 'published',
      slug: 'x',
      blockStyleId: 1,
      pageId: 1,
      eventId: 1,
      workspaceId: 1,
    })
    assert.deepStrictEqual(result, { status: 'published' })
  })
})

describe('blockLinkId', () => {
  test('should accept a linked block id, and null to remove the link', () => {
    assert.strictEqual(BlockCreateSchema.parse({ type: 'link', status: 'published', blockLinkId: 7 }).blockLinkId, 7)
    assert.strictEqual(BlockUpdateSchema.parse({ blockLinkId: null }).blockLinkId, null)
  })
})

describe('BlockCreateSchema', () => {
  test('should keep the owner and strip slug and block style', () => {
    const result = BlockCreateSchema.parse({ type: 'text', status: 'published', pageId: 1, slug: 'x', blockStyleId: 1 })
    assert.deepStrictEqual(result, { type: 'text', status: 'published', pageId: 1 })
  })
})

describe('block content', () => {
  test('should accept typed content and drop null values from the API', () => {
    const content = {
      title: 'Speakers',
      speakersLayout: 'grid',
      speakersSettings: [{ id: 3, order: 1, show: true }],
      headerStyle: null,
      style: { spacingTop: 'large', spacingBottom: null },
      blockStyleSettings: { customCss: '.x {}' },
    }
    assert.deepStrictEqual(BlockUpdateSchema.parse({ content }).content, {
      title: 'Speakers',
      speakersLayout: 'grid',
      speakersSettings: [{ id: 3, order: 1, show: true }],
      style: { spacingTop: 'large' },
      blockStyleSettings: { customCss: '.x {}' },
    })
  })

  test('should give every content field a single JSON Schema type', () => {
    const content = schemaToJsonSchema(BlockUpdateSchema).properties?.content
    const serialized = JSON.stringify(content)
    assert.ok(!serialized.includes('anyOf'))
    assert.ok(!serialized.includes('"null"'))
  })

  test('should keep fields it does not know about', () => {
    const result = BlockUpdateSchema.parse({ content: { html: '<p>Hi</p>', id: 'abc' } })
    assert.deepStrictEqual(result.content, { html: '<p>Hi</p>', id: 'abc' })
  })

  test('should keep fields the schema does not list, also in style settings', () => {
    const content = {
      includeTickets: true,
      style: { id: 'x', spacing: 'large' },
      blockStyleSettings: { fontPolicy: 'legacy', colorText: '#000', effects: [{ name: 'wave-divider' }] },
    }
    assert.deepStrictEqual(BlockUpdateSchema.parse({ content }).content, content)
  })

  test('should reject an unknown enum value', () => {
    assert.throws(() => BlockUpdateSchema.parse({ content: { textLayout: 'sideways' } }), z.ZodError)
  })
})
