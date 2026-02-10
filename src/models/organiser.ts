import loadSamples from '../utils/load-samples.js'
import { schemaToAttributes } from '../utils/schema-to-attributes.js'
import { OrganiserSchema } from '../schemas/organiser.js'
import { ModelDefinition } from '../types/model.js'

export default function OrganiserModel(): ModelDefinition {
  return {
    key: 'organiser',
    endpoint: 'organisers',
    path: 'organisers',
    name: 'Organiser',
    sample: loadSamples('organiser'),
    sorting: [],
    filters: {},
    includes: [],
    operations: {
      read: {
        schema: OrganiserSchema,
        attributes: schemaToAttributes(OrganiserSchema),
      },
    },
    webhooks: [],
  }
}
