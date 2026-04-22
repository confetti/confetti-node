import loadSamples from '../utils/load-samples.js'
import { schemaToAttributes, schemaToCreateAttributes } from '../utils/schema-to-attributes.js'
import { OrganiserSchema, OrganiserCreateSchema, OrganiserUpdateSchema } from '../schemas/organiser.js'
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
      create: {
        schema: OrganiserCreateSchema,
        attributes: schemaToCreateAttributes(OrganiserCreateSchema),
      },
      update: {
        schema: OrganiserUpdateSchema,
        attributes: schemaToCreateAttributes(OrganiserUpdateSchema),
      },
    },
    relationships: [{ field: 'eventId', relationship: 'event', type: 'belongsTo' }],
    webhooks: [],
  }
}
