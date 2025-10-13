import { z } from 'zod';
export function extractFiltersFromSchema(schema) {
    const filters = {};
    if (schema instanceof z.ZodObject) {
        const shape = schema.shape;
        const filterShape = shape.filter;
        if (filterShape) {
            let actualFilterShape = filterShape;
            // Handle optional filter
            if (filterShape instanceof z.ZodOptional) {
                actualFilterShape = filterShape._def.innerType;
            }
            if (actualFilterShape instanceof z.ZodObject) {
                const filterFields = actualFilterShape.shape;
                for (const [key, field] of Object.entries(filterFields)) {
                    if (field instanceof z.ZodOptional) {
                        const innerType = field._def.innerType;
                        filters[key] = extractFieldConfig(innerType, key);
                    }
                    else {
                        filters[key] = extractFieldConfig(field, key);
                    }
                }
            }
        }
    }
    return filters;
}
export function extractSortingFromSchema(schema) {
    if (schema instanceof z.ZodObject) {
        const shape = schema.shape;
        const sortField = shape.sort;
        if (sortField instanceof z.ZodEnum) {
            return sortField.options.map(String);
        }
        if (sortField instanceof z.ZodOptional) {
            const innerType = sortField._def.innerType;
            if (innerType instanceof z.ZodEnum) {
                return innerType.options.map(String);
            }
        }
    }
    return [];
}
export function extractIncludesFromSchema(schema) {
    if (schema instanceof z.ZodObject) {
        const shape = schema.shape;
        const includeField = shape.include;
        if (includeField instanceof z.ZodArray) {
            const elementType = includeField.element;
            if (elementType instanceof z.ZodEnum) {
                return elementType.options.map(String);
            }
        }
        if (includeField instanceof z.ZodOptional) {
            const innerType = includeField._def.innerType;
            if (innerType instanceof z.ZodArray) {
                const elementType = innerType.element;
                if (elementType instanceof z.ZodEnum) {
                    return elementType.options.map(String);
                }
            }
        }
    }
    return [];
}
function extractFieldConfig(field, key) {
    const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
    if (field instanceof z.ZodString) {
        return { type: 'string', label };
    }
    if (field instanceof z.ZodNumber) {
        return { type: 'number', label };
    }
    if (field instanceof z.ZodBoolean) {
        return { type: 'boolean', label };
    }
    if (field instanceof z.ZodArray) {
        const elementType = field.element;
        if (elementType instanceof z.ZodEnum) {
            return {
                type: 'array',
                label,
                options: elementType.options.map((value) => ({
                    value: String(value),
                    label: String(value)
                        .replace(/-/g, ' ')
                        .replace(/\b\w/g, (l) => l.toUpperCase()),
                })),
            };
        }
        return { type: 'array', label };
    }
    if (field instanceof z.ZodEnum) {
        // Check if the enum has enhanced descriptions
        const description = field.description;
        if (description) {
            try {
                const parsed = JSON.parse(description);
                if (parsed.values && Array.isArray(parsed.values)) {
                    return {
                        type: 'enum',
                        label: parsed.label || label,
                        default: '',
                        values: parsed.values,
                    };
                }
            }
            catch (_e) {
                // Fall back to default behavior if parsing fails
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
        };
    }
    return { type: 'string', label };
}
