import loadSamples from '../utils/load-samples.js'
import { schemaToAttributes } from '../utils/schema-to-attributes.js'
import { FormSchema } from '../schemas/form.js'
import { ModelDefinition } from '../types/model.js'

export default function FormModel(): ModelDefinition {
  return {
    key: 'form',
    endpoint: 'forms',
    path: 'forms',
    name: 'Form',
    sample: loadSamples('form'),
    sorting: [],
    filters: {},
    includes: [],
    operations: {
      read: {
        schema: FormSchema,
        attributes: schemaToAttributes(FormSchema),
      },
    },
    webhooks: [],
    relationships: [{ field: 'eventId', relationship: 'event', type: 'belongsTo' }],
  }
}
