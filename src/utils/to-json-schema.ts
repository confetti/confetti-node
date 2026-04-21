import { BaseFilter } from '../types/model.js'
import { CreateAttribute } from './schema-to-attributes.js'

export interface JsonSchemaProperty {
  type: string
  description?: string
  enum?: string[]
  items?: { type: string }
}

const typeMap: Record<string, string> = {
  string: 'string',
  number: 'number',
  boolean: 'boolean',
  date: 'string',
  array: 'array',
  enum: 'string',
  object: 'object',
}

export function attributeToJsonSchema(attr: CreateAttribute): JsonSchemaProperty {
  const schema: JsonSchemaProperty = {
    type: typeMap[attr.type] ?? 'string',
  }

  const description = attr.description ?? attr.helpText
  if (description) {
    schema.description = description
  }

  if (attr.values?.length) {
    schema.enum = attr.values
  }

  if (attr.type === 'array') {
    schema.items = { type: 'string' }
  }

  return schema
}

export function filterToJsonSchema(filter: BaseFilter): JsonSchemaProperty {
  const schema: JsonSchemaProperty = {
    type: typeMap[filter.type] ?? 'string',
  }

  if (filter.label) {
    schema.description = filter.label
  }

  if (filter.type === 'enum' || filter.type === 'array') {
    const values = filter.values ?? filter.options
    if (values?.length) {
      const enumValues = values.map((v) => ('value' in v ? v.value : String(v)))
      if (filter.type === 'array') {
        schema.items = { type: 'string' }
        schema.enum = enumValues
      } else {
        schema.enum = enumValues
      }
    }
  }

  return schema
}
