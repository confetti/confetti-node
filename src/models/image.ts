import loadSamples from '../utils/load-samples.js'
import { schemaToAttributes } from '../utils/schema-to-attributes.js'
import { ImageSchema } from '../schemas/image.js'
import { ModelDefinition } from '../types/model.js'

export default function ImageModel(): ModelDefinition {
  return {
    key: 'image',
    endpoint: 'images',
    path: 'images',
    name: 'Image',
    sample: loadSamples('image'),
    sorting: [],
    filters: {},
    includes: [],
    operations: {
      read: {
        schema: ImageSchema,
        attributes: schemaToAttributes(ImageSchema),
      },
    },
    webhooks: [],
  }
}
