import loadSamples from '../utils/load-samples.js'
import { schemaToAttributes, schemaToCreateAttributes } from '../utils/schema-to-attributes.js'
import { ImageSchema, ImageCreateSchema, ImageUpdateSchema, imagesFindAllOptionsSchema } from '../schemas/image.js'
import { ModelDefinition } from '../types/model.js'
import {
  extractFiltersFromSchema,
  extractSortingFromSchema,
  extractIncludesFromSchema,
} from '../utils/resource-options-to-model.js'

export default function ImageModel(): ModelDefinition {
  return {
    key: 'image',
    endpoint: 'images',
    path: 'images',
    name: 'Image',
    sample: loadSamples('image'),
    sorting: extractSortingFromSchema(imagesFindAllOptionsSchema),
    filters: extractFiltersFromSchema(imagesFindAllOptionsSchema),
    includes: extractIncludesFromSchema(imagesFindAllOptionsSchema),
    operations: {
      read: {
        schema: ImageSchema,
        attributes: schemaToAttributes(ImageSchema),
      },
      create: {
        schema: ImageCreateSchema,
        attributes: schemaToCreateAttributes(ImageCreateSchema),
      },
      update: {
        schema: ImageUpdateSchema,
        attributes: schemaToCreateAttributes(ImageUpdateSchema),
      },
    },
    relationships: [
      { field: 'blockId', relationship: 'block', type: 'belongsTo' },
      { field: 'eventId', relationship: 'event', type: 'belongsTo' },
      { field: 'workspaceId', relationship: 'workspace', type: 'belongsTo' },
    ],
    webhooks: [],
  }
}
