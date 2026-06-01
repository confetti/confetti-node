import { z } from 'zod'
import type { JSONSchema } from 'zod/v4/core'
import { BaseFilter } from '../types/model.js'

export interface JsonSchemaProperty {
  type: string
  description?: string
  enum?: string[]
  items?: JsonSchemaProperty
  properties?: Record<string, JsonSchemaProperty>
  required?: string[]
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

const metaKeysToStrip = ['label', 'helpText', 'placeholder', 'values']

export function schemaToJsonSchema(
  schema: z.core.$ZodType,
  options?: { stripFields?: string[] },
): JSONSchema.JSONSchema {
  const result = z.toJSONSchema(schema, {
    unrepresentable: 'any',
    override: (ctx) => {
      // Convert z.date() → { type: 'string', format: 'date-time' }
      if (ctx.zodSchema instanceof z.ZodDate) {
        ctx.jsonSchema.type = 'string'
        ctx.jsonSchema.format = 'date-time'
      }
      // Strip non-standard .meta() keys from JSON Schema output
      for (const key of metaKeysToStrip) delete ctx.jsonSchema[key]
    },
  })

  // Remove $schema key
  delete result.$schema

  // Strip specified relationship fields from properties
  if (options?.stripFields?.length && result.properties) {
    for (const field of options.stripFields) {
      delete result.properties[field]
      if (result.required) {
        const idx = result.required.indexOf(field)
        if (idx >= 0) result.required.splice(idx, 1)
      }
    }
  }

  return result
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
