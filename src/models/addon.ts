import loadSamples from '../utils/load-samples.js'
import { schemaToAttributes, schemaToCreateAttributes } from '../utils/schema-to-attributes.js'
import { AddonSchema, AddonCreateSchema } from '../schemas/addon.js'
import { ModelDefinition } from '../types/model.js'

export default function AddonModel(): ModelDefinition {
  return {
    key: 'addon',
    endpoint: 'addons',
    path: 'addons',
    name: 'Addon',
    sample: loadSamples('addon'),
    sorting: [],
    filters: {},
    includes: [],
    operations: {
      read: {
        schema: AddonSchema,
        attributes: schemaToAttributes(AddonSchema),
      },
      create: {
        schema: AddonCreateSchema,
        attributes: schemaToCreateAttributes(AddonCreateSchema),
      },
    },
    webhooks: [],
    relationships: [
      { field: 'ticketId', relationship: 'ticket', type: 'belongsTo' },
      { field: 'addonBatchId', relationship: 'addonBatch', type: 'belongsTo' },
    ],
  }
}
