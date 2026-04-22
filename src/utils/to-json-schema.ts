import { z } from 'zod'
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

export function schemaToJsonSchema(schema: z.ZodType, options?: { stripFields?: string[] }): Record<string, unknown> {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions, @typescript-eslint/no-explicit-any
  const raw = z.toJSONSchema(schema as any, {
    unrepresentable: 'any',
    override: (ctx) => {
      // Convert z.date() → { type: 'string', format: 'date-time' }
      if (ctx.zodSchema instanceof z.ZodDate) {
        ctx.jsonSchema.type = 'string'
        ctx.jsonSchema.format = 'date-time'
      }
      // Strip non-standard .meta() keys from JSON Schema output
      const js: Record<string, unknown> = ctx.jsonSchema
      for (const key of metaKeysToStrip) delete js[key]
    },
  })
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const result = raw as Record<string, unknown>

  // Remove $schema key
  delete result.$schema

  // Strip specified relationship fields from properties
  if (options?.stripFields?.length && result.properties) {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const props = result.properties as Record<string, unknown>
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const required = result.required as string[] | undefined
    for (const field of options.stripFields) {
      delete props[field]
      if (required) {
        const idx = required.indexOf(field)
        if (idx >= 0) required.splice(idx, 1)
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
