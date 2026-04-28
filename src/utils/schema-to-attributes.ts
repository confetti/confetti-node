import { z } from 'zod'
import { getMeta } from './schema-meta.js'

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
  children?: CreateAttribute[]
  itemType?: string
}

export type Attribute = BaseAttribute | CreateAttribute

// Extract children from a ZodObject's shape (recursive)
function extractObjectChildren(zodObj: z.ZodObject<z.ZodRawShape>): CreateAttribute[] {
  const shape = zodObj.shape
  if (!shape || Object.keys(shape).length === 0) return []
  return schemaToAttributes(zodObj, { includeCreateFields: true })
}

// Get array element type info, recursing into object elements
function getArrayElementInfo(arraySchema: z.ZodArray): {
  itemType: string
  children?: CreateAttribute[]
} {
  const element = arraySchema.element
  if (element instanceof z.ZodObject) {
    const children = extractObjectChildren(element)
    return { itemType: 'object', ...(children.length > 0 ? { children } : {}) }
  } else if (element instanceof z.ZodNumber) {
    return { itemType: 'number' }
  } else if (element instanceof z.ZodBoolean) {
    return { itemType: 'boolean' }
  }
  return { itemType: 'string' }
}

// Extract type info from a resolved (non-optional) Zod schema
function resolveTypeInfo(schema: unknown): {
  type: string
  values?: string[]
  children?: CreateAttribute[]
  itemType?: string
} {
  if (schema instanceof z.ZodNumber) return { type: 'number' }
  if (schema instanceof z.ZodDate) return { type: 'date' }
  if (schema instanceof z.ZodBoolean) return { type: 'boolean' }
  if (schema instanceof z.ZodRecord) return { type: 'object' }
  if (schema instanceof z.ZodObject) {
    const children = extractObjectChildren(schema)
    return { type: 'object', ...(children.length > 0 ? { children } : {}) }
  }
  if (schema instanceof z.ZodArray) {
    const { itemType, children } = getArrayElementInfo(schema)
    return { type: 'array', itemType, ...(children ? { children } : {}) }
  }
  if (schema instanceof z.ZodEnum) {
    return { type: 'enum', values: schema.options.map(String) }
  }
  if (schema instanceof z.ZodString) return { type: 'string' }
  return { type: 'string' }
}

export function schemaToAttributes(
  schema: z.ZodObject<z.ZodRawShape>,
  options: { includeCreateFields: true } & AttributeOptions,
): CreateAttribute[]
export function schemaToAttributes(schema: z.ZodObject<z.ZodRawShape>, options?: AttributeOptions): BaseAttribute[]
export function schemaToAttributes(schema: z.ZodObject<z.ZodRawShape>, options: AttributeOptions = {}): Attribute[] {
  const { includeRequired = false, includeCreateFields = false } = options
  const attributes: Attribute[] = []

  const shape = schema.shape

  for (const [key, fieldSchema] of Object.entries(shape)) {
    let type = 'string'
    let required = true
    let values: string[] | undefined
    let children: CreateAttribute[] | undefined
    let itemType: string | undefined

    // Extract metadata from Zod schema .meta()
    let metadata: {
      label?: string
      description?: string
      placeholder?: string
      helpText?: string
      values?: string[]
    } = {}

    // Try outer schema first, then inner type (for .partial() wrapping)
    const meta =
      getMeta(fieldSchema) ?? (fieldSchema instanceof z.ZodOptional ? getMeta(fieldSchema._def.innerType) : undefined)
    if (meta) {
      metadata = {
        label: meta.label,
        description: meta.description,
        placeholder: meta.placeholder,
        helpText: meta.helpText,
        values: meta.values?.map(String),
      }
    }

    // Determine type and required status from Zod schema
    if (fieldSchema instanceof z.ZodOptional) {
      const inner = fieldSchema._def.innerType
      required = false
      const info = resolveTypeInfo(inner)
      type = info.type
      values = info.values
      children = info.children
      itemType = info.itemType
    } else {
      const info = resolveTypeInfo(fieldSchema)
      type = info.type
      values = info.values
      children = info.children
      itemType = info.itemType
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
      if (children) createAttribute.children = children
      if (itemType) createAttribute.itemType = itemType

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
  return schemaToAttributes(schema)
}

export function schemaToCreateAttributes(schema: z.ZodObject<z.ZodRawShape>): CreateAttribute[] {
  return schemaToAttributes(schema, { includeCreateFields: true })
}
