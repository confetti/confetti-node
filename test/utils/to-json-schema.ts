import { describe, test } from 'node:test'
import assert from 'node:assert'
import { z } from 'zod'
import Ajv from 'ajv'
import { schemaToJsonSchema, filterToJsonSchema } from '../../src/utils/to-json-schema.js'
import type { JsonSchemaProperty } from '../../src/utils/to-json-schema.js'
import type { BaseFilter } from '../../src/types/model.js'

const ajv = new Ajv()

function assertValidSchema(property: JsonSchemaProperty) {
  const schema = {
    type: 'object' as const,
    properties: { value: property },
  }
  const valid = ajv.validateSchema(schema)
  assert.ok(valid, `Invalid JSON Schema: ${JSON.stringify(ajv.errors)}`)
}

describe('schemaToJsonSchema()', () => {
  test('should convert basic types correctly', () => {
    const schema = z.object({
      name: z.string().meta({ label: 'Name', description: 'The name' }),
      age: z.number(),
      active: z.boolean(),
    })

    const result = schemaToJsonSchema(schema)

    assert.strictEqual(result.type, 'object')
    assert.ok(!('$schema' in result))

    const props = result.properties as Record<string, Record<string, unknown>>
    assert.strictEqual(props.name.type, 'string')
    assert.strictEqual(props.name.description, 'The name')
    assert.ok(!('label' in props.name))
    assert.strictEqual(props.age.type, 'number')
    assert.strictEqual(props.active.type, 'boolean')

    const required = result.required as string[]
    assert.ok(required.includes('name'))
    assert.ok(required.includes('age'))
    assert.ok(required.includes('active'))
  })

  test('should convert z.date() to string with date-time format', () => {
    const schema = z.object({
      startDate: z.date(),
    })

    const result = schemaToJsonSchema(schema)
    const props = result.properties as Record<string, Record<string, unknown>>
    assert.strictEqual(props.startDate.type, 'string')
    assert.strictEqual(props.startDate.format, 'date-time')
  })

  test('should convert z.enum() correctly', () => {
    const schema = z.object({
      status: z.enum(['active', 'inactive']),
    })

    const result = schemaToJsonSchema(schema)
    const props = result.properties as Record<string, Record<string, unknown>>
    assert.strictEqual(props.status.type, 'string')
    assert.deepStrictEqual(props.status.enum, ['active', 'inactive'])
  })

  test('should handle email format', () => {
    const schema = z.object({
      email: z.string().email(),
    })

    const result = schemaToJsonSchema(schema)
    const props = result.properties as Record<string, Record<string, unknown>>
    assert.strictEqual(props.email.type, 'string')
    assert.strictEqual(props.email.format, 'email')
  })

  test('should handle optional fields (not in required)', () => {
    const schema = z.object({
      name: z.string(),
      nickname: z.string().optional(),
    })

    const result = schemaToJsonSchema(schema)
    const required = result.required as string[]
    assert.ok(required.includes('name'))
    assert.ok(!required.includes('nickname'))

    const props = result.properties as Record<string, Record<string, unknown>>
    assert.ok('nickname' in props)
  })

  test('should strip non-standard .meta() keys', () => {
    const schema = z.object({
      phone: z.string().meta({
        label: 'Phone',
        description: 'Contact number',
        placeholder: '+1 555-1234',
        helpText: 'Include country code',
        values: ['a', 'b'],
      }),
    })

    const result = schemaToJsonSchema(schema)
    const props = result.properties as Record<string, Record<string, unknown>>
    assert.strictEqual(props.phone.description, 'Contact number')
    assert.ok(!('label' in props.phone))
    assert.ok(!('placeholder' in props.phone))
    assert.ok(!('helpText' in props.phone))
    assert.ok(!('values' in props.phone))
  })

  test('should strip specified fields with stripFields option', () => {
    const schema = z.object({
      name: z.string(),
      eventId: z.number(),
      workspaceId: z.number().optional(),
    })

    const result = schemaToJsonSchema(schema, { stripFields: ['eventId', 'workspaceId'] })
    const props = result.properties as Record<string, Record<string, unknown>>
    assert.ok('name' in props)
    assert.ok(!('eventId' in props))
    assert.ok(!('workspaceId' in props))

    const required = result.required as string[]
    assert.ok(!required.includes('eventId'))
  })

  test('should handle .partial() schemas', () => {
    const base = z.object({
      name: z.string().meta({ label: 'Name' }),
      age: z.number(),
    })
    const partial = base.partial()

    const result = schemaToJsonSchema(partial)
    assert.strictEqual(result.type, 'object')
    assert.ok(!result.required || (result.required as string[]).length === 0)

    const props = result.properties as Record<string, Record<string, unknown>>
    assert.ok('name' in props)
    assert.ok('age' in props)
  })

  test('should remove $schema key', () => {
    const schema = z.object({ name: z.string() })
    const result = schemaToJsonSchema(schema)
    assert.ok(!('$schema' in result))
  })
})

describe('filterToJsonSchema()', () => {
  test('should convert a string filter', () => {
    const filter: BaseFilter = { type: 'string', label: 'Search' }
    const result = filterToJsonSchema(filter)
    assert.deepStrictEqual(result, { type: 'string', description: 'Search' })
    assertValidSchema(result)
  })

  test('should convert a number filter', () => {
    const filter: BaseFilter = { type: 'number', label: 'Event ID' }
    const result = filterToJsonSchema(filter)
    assert.deepStrictEqual(result, { type: 'number', description: 'Event ID' })
    assertValidSchema(result)
  })

  test('should convert a boolean filter', () => {
    const filter: BaseFilter = { type: 'boolean', label: 'Checked In' }
    const result = filterToJsonSchema(filter)
    assert.deepStrictEqual(result, { type: 'boolean', description: 'Checked In' })
    assertValidSchema(result)
  })

  test('should convert an enum filter with options', () => {
    const filter: BaseFilter = {
      type: 'enum',
      label: 'Status',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
      ],
    }
    const result = filterToJsonSchema(filter)
    assert.deepStrictEqual(result, {
      type: 'string',
      description: 'Status',
      enum: ['active', 'inactive'],
    })
    assertValidSchema(result)
  })

  test('should convert an enum filter with values', () => {
    const filter: BaseFilter = {
      type: 'enum',
      label: 'Sort By',
      values: [
        { value: 'name', label: 'Name' },
        { value: 'date', label: 'Date' },
      ],
    }
    const result = filterToJsonSchema(filter)
    assert.deepStrictEqual(result, {
      type: 'string',
      description: 'Sort By',
      enum: ['name', 'date'],
    })
    assertValidSchema(result)
  })

  test('should convert an array filter with values', () => {
    const filter: BaseFilter = {
      type: 'array',
      label: 'Statuses',
      values: [
        { value: 'attending', label: 'Attending' },
        { value: 'declined', label: 'Declined' },
      ],
    }
    const result = filterToJsonSchema(filter)
    assert.deepStrictEqual(result, {
      type: 'array',
      description: 'Statuses',
      items: { type: 'string' },
      enum: ['attending', 'declined'],
    })
    assertValidSchema(result)
  })
})
