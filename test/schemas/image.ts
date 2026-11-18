import { describe, test } from 'node:test'
import assert from 'node:assert'
import { ImageCreateSchema, ImageUpdateSchema } from '../../src/schemas/image.js'

describe('ImageUpdateSchema', () => {
  test('should keep the text fields and order', () => {
    const data = { title: 'T', description: 'D', link: 'https://x.test', alt: 'A', order: 2 }
    assert.deepStrictEqual(ImageUpdateSchema.parse(data), data)
  })

  test('should strip fields that cannot change after create', () => {
    const result = ImageUpdateSchema.parse({
      type: 'cover',
      provider: 's3',
      public_id: 'key',
      url: 'https://x.test/a.png',
      content: { color: '#fff' },
      blockId: 1,
      eventId: 1,
    })
    assert.deepStrictEqual(result, {})
  })
})

describe('ImageCreateSchema', () => {
  test('should accept alt text', () => {
    assert.strictEqual(ImageCreateSchema.parse({ type: 'block', alt: 'A' }).alt, 'A')
  })

  test('should not accept a block style', () => {
    assert.ok(!('blockStyleId' in ImageCreateSchema.parse({ type: 'block', blockStyleId: 1 })))
  })
})
