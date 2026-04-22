import { z } from 'zod'
import { getMeta } from './schema-meta.js'

type FilterValues =
  | Array<{ value: string; label: string }>
  | Array<{ label: string; description: string; type: string; key: string; value: string }>

export function extractFiltersFromSchema(schema: z.ZodSchema): Record<
  string,
  {
    type: 'string' | 'number' | 'boolean' | 'array' | 'date' | 'enum'
    label: string
    required?: boolean
    default?: string | number | boolean
    options?: Array<{ value: string; label: string }>
    values?:
      | Array<{ value: string; label: string }>
      | Array<{
          label: string
          description: string
          type: string
          key: string
          value: string
        }>
  }
> {
  const filters: Record<
    string,
    {
      type: 'string' | 'number' | 'boolean' | 'array' | 'date' | 'enum'
      label: string
      required?: boolean
      default?: string | number | boolean
      options?: Array<{ value: string; label: string }>
      values?:
        | Array<{ value: string; label: string }>
        | Array<{
            label: string
            description: string
            type: string
            key: string
            value: string
          }>
    }
  > = {}

  if (schema instanceof z.ZodObject) {
    const shape = schema.shape
    const filterShape = shape.filter

    if (filterShape) {
      let actualFilterShape = filterShape

      // Handle optional filter
      if (filterShape instanceof z.ZodOptional) {
        actualFilterShape = filterShape._def.innerType
      }

      if (actualFilterShape instanceof z.ZodObject) {
        const filterFields = actualFilterShape.shape

        for (const [key, field] of Object.entries(filterFields)) {
          if (field instanceof z.ZodOptional) {
            const innerType = field._def.innerType
            const config = extractFieldConfig(innerType, key)
            // Explicitly ensure required is not set for optional fields
            filters[key] = { ...config }
            delete filters[key].required
          } else {
            const config = extractFieldConfig(field, key)
            filters[key] = { ...config, required: true }
          }
        }
      }
    }
  }

  return filters
}

export function extractSortingFromSchema(schema: z.ZodSchema): string[] {
  if (schema instanceof z.ZodObject) {
    const shape = schema.shape
    const sortField = shape.sort

    if (sortField instanceof z.ZodEnum) {
      return sortField.options.map(String)
    }

    if (sortField instanceof z.ZodOptional) {
      const innerType = sortField._def.innerType
      if (innerType instanceof z.ZodEnum) {
        return innerType.options.map(String)
      }
    }
  }

  return []
}

export function extractIncludesFromSchema(schema: z.ZodSchema): string[] {
  if (schema instanceof z.ZodObject) {
    const shape = schema.shape
    const includeField = shape.include

    if (includeField instanceof z.ZodArray) {
      const elementType = includeField.element
      if (elementType instanceof z.ZodEnum) {
        return elementType.options.map(String)
      }
    }

    if (includeField instanceof z.ZodOptional) {
      const innerType = includeField._def.innerType
      if (innerType instanceof z.ZodArray) {
        const elementType = innerType.element
        if (elementType instanceof z.ZodEnum) {
          return elementType.options.map(String)
        }
      }
    }
  }

  return []
}

function extractFieldConfig(
  field: unknown,
  key: string,
): {
  type: 'string' | 'number' | 'boolean' | 'array' | 'date' | 'enum'
  label: string
  required?: boolean
  default?: string | number | boolean
  options?: Array<{ value: string; label: string }>
  values?:
    | Array<{ value: string; label: string }>
    | Array<{
        label: string
        description: string
        type: string
        key: string
        value: string
      }>
} {
  const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')

  if (field instanceof z.ZodString) {
    return { type: 'string', label }
  }

  if (field instanceof z.ZodNumber) {
    return { type: 'number', label }
  }

  if (field instanceof z.ZodBoolean) {
    return { type: 'boolean', label }
  }

  if (field instanceof z.ZodUnion) {
    // For unions, try to find an array option first, then enum, then string
    const options = field._def.options
    for (const option of options) {
      if (option instanceof z.ZodArray) {
        const elementType = option.element
        if (elementType instanceof z.ZodEnum) {
          // Check if the enum has enhanced metadata
          const meta = getMeta(elementType)
          if (meta?.values && Array.isArray(meta.values)) {
            return {
              type: 'array',
              label, // Use key-based label for filter fields
              // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
              values: meta.values as FilterValues,
            }
          }
          return {
            type: 'array',
            label,
            options: elementType.options.map((value) => ({
              value: String(value),
              label: String(value)
                .replace(/-/g, ' ')
                .replace(/\b\w/g, (l) => l.toUpperCase()),
            })),
          }
        }
        return { type: 'array', label }
      }
      if (option instanceof z.ZodEnum) {
        // Check if the enum has enhanced metadata
        const meta = getMeta(option)
        if (meta?.values && Array.isArray(meta.values)) {
          return {
            type: 'enum',
            label: meta.label || label,
            default: '',
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            values: meta.values as FilterValues,
          }
        }
        return {
          type: 'string',
          label,
          options: option.options.map((value) => ({
            value: String(value),
            label: String(value)
              .replace(/-/g, ' ')
              .replace(/\b\w/g, (l) => l.toUpperCase()),
          })),
        }
      }
    }
    // If no array or enum found, default to string (for string refine cases)
    return { type: 'string', label }
  }

  if (field instanceof z.ZodArray) {
    const elementType = field.element
    if (elementType instanceof z.ZodEnum) {
      // Check if the enum has enhanced metadata
      const meta = getMeta(elementType)
      if (meta?.values && Array.isArray(meta.values)) {
        return {
          type: 'array',
          label: meta.label || label,
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          values: meta.values as FilterValues,
        }
      }
      return {
        type: 'array',
        label,
        options: elementType.options.map((value) => ({
          value: String(value),
          label: String(value)
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (l) => l.toUpperCase()),
        })),
      }
    }
    return { type: 'array', label }
  }

  if (field instanceof z.ZodEnum) {
    // Check if the enum has enhanced metadata
    const meta = getMeta(field)
    if (meta?.values && Array.isArray(meta.values)) {
      return {
        type: 'enum',
        label: meta.label || label,
        default: '',
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        values: meta.values as FilterValues,
      }
    }

    return {
      type: 'string',
      label,
      options: field.options.map((value) => ({
        value: String(value),
        label: String(value)
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (l) => l.toUpperCase()),
      })),
    }
  }

  return { type: 'string', label }
}
