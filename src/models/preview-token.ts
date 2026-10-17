import { z } from 'zod'
import { schemaToAttributes, schemaToCreateAttributes } from '../utils/schema-to-attributes.js'
import { PreviewTokenSchema, PreviewTokenCreateSchema } from '../schemas/preview-token.js'
import { ModelDefinition } from '../types/model.js'
import loadSamples from '../utils/load-samples.js'

// Merge union variants into a single optional-all object for attribute display.
// The actual validation still uses the union schema.
const previewTokenCreateAttributesSchema = z.object(
  Object.assign({}, ...PreviewTokenCreateSchema.options.map((opt) => opt.shape)),
).partial()

export default function PreviewTokenModel(): ModelDefinition {
  return {
    key: 'previewToken',
    endpoint: 'preview-tokens',
    path: 'preview-tokens',
    name: 'Preview Token',
    sample: loadSamples('previewToken'),
    sorting: [],
    filters: {},
    includes: [],
    operations: {
      read: {
        schema: PreviewTokenSchema,
        attributes: schemaToAttributes(PreviewTokenSchema),
      },
      create: {
        schema: PreviewTokenCreateSchema,
        attributes: schemaToCreateAttributes(previewTokenCreateAttributesSchema),
      },
    },
    relationships: [],
    webhooks: [],
  }
}
