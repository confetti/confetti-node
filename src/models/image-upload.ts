import { schemaToAttributes, schemaToCreateAttributes } from '../utils/schema-to-attributes.js'
import { ImageUploadSchema, ImageUploadCreateSchema, ImageUploadUpdateSchema } from '../schemas/image-upload.js'
import { ModelDefinition } from '../types/model.js'

export default function ImageUploadModel(): ModelDefinition {
  return {
    key: 'imageUpload',
    endpoint: 'image-uploads',
    path: 'image-uploads',
    name: 'Image Upload',
    sample: {
      single: { formatted: {}, raw: {} },
      multiple: { formatted: [], raw: { data: [] } },
    },
    sorting: [],
    filters: {},
    includes: [],
    operations: {
      read: {
        schema: ImageUploadSchema,
        attributes: schemaToAttributes(ImageUploadSchema),
      },
      create: {
        schema: ImageUploadCreateSchema,
        attributes: schemaToCreateAttributes(ImageUploadCreateSchema),
      },
      update: {
        schema: ImageUploadUpdateSchema,
        attributes: schemaToCreateAttributes(ImageUploadUpdateSchema),
      },
    },
    relationships: [
      { field: 'eventId', relationship: 'event', type: 'belongsTo' },
      { field: 'workspaceId', relationship: 'workspace', type: 'belongsTo' },
    ],
    webhooks: [],
  }
}
