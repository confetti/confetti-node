import { z } from 'zod'

export interface AttributeOptions {
  includeRequired?: boolean
  includeCreateFields?: boolean
}

export interface BaseAttribute {
  key: string
  label: string
  description?: string
  type: string
}

export interface CreateAttribute extends BaseAttribute {
  required: boolean
  placeholder?: string
  helpText?: string
  values?: string[]
}

export type Attribute = BaseAttribute | CreateAttribute

export function schemaToAttributes(schema: z.ZodObject<z.ZodRawShape>, options: AttributeOptions = {}): Attribute[] {
  const { includeRequired = false, includeCreateFields = false } = options
  const attributes: Attribute[] = []

  const shape = schema.shape

  for (const [key, fieldSchema] of Object.entries(shape)) {
    let type = 'string'
    let required = true
    let values: string[] | undefined

    // Extract metadata from Zod schema
    let metadata: {
      label?: string
      description?: string
      placeholder?: string
      helpText?: string
      values?: string[]
    } = {}

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const fieldWithDescription = fieldSchema as unknown as { description?: string }
    if (fieldWithDescription.description) {
      try {
        metadata = JSON.parse(fieldWithDescription.description)
      } catch (_error) {
        // If JSON parsing fails, use empty metadata
        metadata = {}
      }
    }

    // Determine type and required status from Zod schema
    if (fieldSchema instanceof z.ZodNumber) {
      type = 'number'
    } else if (fieldSchema instanceof z.ZodDate) {
      type = 'date'
    } else if (fieldSchema instanceof z.ZodBoolean) {
      type = 'boolean'
    } else if (fieldSchema instanceof z.ZodRecord) {
      type = 'object'
    } else if (fieldSchema instanceof z.ZodArray) {
      type = 'array'
    } else if (fieldSchema instanceof z.ZodEnum) {
      type = 'enum'
      values = fieldSchema.options.map(String)
    } else if (fieldSchema instanceof z.ZodOptional) {
      // Handle optional fields - get the inner type
      const innerSchema = fieldSchema._def.innerType
      required = false

      if (innerSchema instanceof z.ZodNumber) {
        type = 'number'
      } else if (innerSchema instanceof z.ZodDate) {
        type = 'date'
      } else if (innerSchema instanceof z.ZodBoolean) {
        type = 'boolean'
      } else if (innerSchema instanceof z.ZodRecord) {
        type = 'object'
      } else if (innerSchema instanceof z.ZodArray) {
        type = 'array'
      } else if (innerSchema instanceof z.ZodEnum) {
        type = 'enum'
        values = innerSchema.options.map(String)
      }
    } else if (fieldSchema instanceof z.ZodString) {
      type = 'string'
    }

    // Use metadata label if available, otherwise generate from key
    const label =
      metadata.label ||
      key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase())
        .trim()

    const description = metadata.description

    // Create base attribute
    const baseAttribute: BaseAttribute = {
      key,
      label,
      type,
    }

    if (description) {
      baseAttribute.description = description
    }

    // If we need create-specific fields, extend the attribute
    if (includeCreateFields) {
      const createAttribute: CreateAttribute = {
        ...baseAttribute,
        required,
      }

      if (metadata.placeholder) {
        createAttribute.placeholder = metadata.placeholder
      }
      if (metadata.helpText) {
        createAttribute.helpText = metadata.helpText
      }
      if (metadata.values) {
        createAttribute.values = metadata.values.map(String)
      } else if (values) {
        createAttribute.values = values
      }

      attributes.push(createAttribute)
    } else if (includeRequired) {
      // For backward compatibility, include required field in base attributes
      const attributeWithRequired = {
        ...baseAttribute,
        required,
      }
      attributes.push(attributeWithRequired)
    } else {
      // Standard base attribute
      attributes.push(baseAttribute)
    }
  }

  return attributes
}

// Convenience functions for backward compatibility
export function schemaToBaseAttributes(schema: z.ZodObject<z.ZodRawShape>): BaseAttribute[] {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return schemaToAttributes(schema) as BaseAttribute[]
}

export function schemaToCreateAttributes(schema: z.ZodObject<z.ZodRawShape>): CreateAttribute[] {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return schemaToAttributes(schema, { includeCreateFields: true }) as CreateAttribute[]
}
