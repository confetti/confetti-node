import { describe, test } from 'node:test'
import assert from 'node:assert'
import Ajv from 'ajv'
import { attributeToJsonSchema, filterToJsonSchema } from '../../src/utils/to-json-schema.js'
import type { JsonSchemaProperty } from '../../src/utils/to-json-schema.js'
import type { CreateAttribute } from '../../src/utils/schema-to-attributes.js'
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

describe('attributeToJsonSchema()', () => {
  test('should convert a string attribute', () => {
    const attr: CreateAttribute = { key: 'name', label: 'Name', type: 'string', required: true }
    const result = attributeToJsonSchema(attr)
    assert.deepStrictEqual(result, { type: 'string' })
    assertValidSchema(result)
  })

  test('should convert a number attribute', () => {
    const attr: CreateAttribute = { key: 'age', label: 'Age', type: 'number', required: true }
    const result = attributeToJsonSchema(attr)
    assert.deepStrictEqual(result, { type: 'number' })
    assertValidSchema(result)
  })

  test('should convert a boolean attribute', () => {
    const attr: CreateAttribute = { key: 'active', label: 'Active', type: 'boolean', required: false }
    const result = attributeToJsonSchema(attr)
    assert.deepStrictEqual(result, { type: 'boolean' })
    assertValidSchema(result)
  })

  test('should convert a date attribute to string type', () => {
    const attr: CreateAttribute = { key: 'startDate', label: 'Start Date', type: 'date', required: true }
    const result = attributeToJsonSchema(attr)
    assert.deepStrictEqual(result, { type: 'string' })
    assertValidSchema(result)
  })

  test('should convert an enum attribute with values', () => {
    const attr: CreateAttribute = {
      key: 'status',
      label: 'Status',
      type: 'enum',
      required: true,
      values: ['attending', 'invited'],
    }
    const result = attributeToJsonSchema(attr)
    assert.deepStrictEqual(result, {
      type: 'string',
      enum: ['attending', 'invited'],
    })
    assertValidSchema(result)
  })

  test('should convert an array attribute with items', () => {
    const attr: CreateAttribute = { key: 'tags', label: 'Tags', type: 'array', required: false }
    const result = attributeToJsonSchema(attr)
    assert.deepStrictEqual(result, { type: 'array', items: { type: 'string' } })
    assertValidSchema(result)
  })

  test('should convert an object attribute', () => {
    const attr: CreateAttribute = { key: 'settings', label: 'Settings', type: 'object', required: false }
    const result = attributeToJsonSchema(attr)
    assert.deepStrictEqual(result, { type: 'object' })
    assertValidSchema(result)
  })

  test('should include description from attribute description', () => {
    const attr: CreateAttribute = {
      key: 'email',
      label: 'Email',
      type: 'string',
      required: true,
      description: 'Email address of the attendee',
    }
    const result = attributeToJsonSchema(attr)
    assert.deepStrictEqual(result, {
      type: 'string',
      description: 'Email address of the attendee',
    })
    assertValidSchema(result)
  })

  test('should fall back to helpText when description is missing', () => {
    const attr: CreateAttribute = {
      key: 'phone',
      label: 'Phone',
      type: 'string',
      required: false,
      helpText: 'Include country code',
    }
    const result = attributeToJsonSchema(attr)
    assert.deepStrictEqual(result, {
      type: 'string',
      description: 'Include country code',
    })
    assertValidSchema(result)
  })

  test('should prefer description over helpText', () => {
    const attr: CreateAttribute = {
      key: 'phone',
      label: 'Phone',
      type: 'string',
      required: false,
      description: 'Phone number',
      helpText: 'Include country code',
    }
    const result = attributeToJsonSchema(attr)
    assert.deepStrictEqual(result, {
      type: 'string',
      description: 'Phone number',
    })
    assertValidSchema(result)
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
