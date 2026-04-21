import loadSamples from '../utils/load-samples.js'
import { schemaToAttributes } from '../utils/schema-to-attributes.js'
import { FormSchema } from '../schemas/form.js'
import { ModelDefinition } from '../types/model.js'
import {
  extractFiltersFromSchema,
  extractSortingFromSchema,
  extractIncludesFromSchema,
} from '../utils/resource-options-to-model.js'
import { formsFindAllOptionsSchema } from '../schemas/form.js'

export default function FormModel(): ModelDefinition {
  return {
    key: 'form',
    endpoint: 'forms',
    path: 'forms',
    name: 'Form',
    sample: loadSamples('form'),
    sorting: extractSortingFromSchema(formsFindAllOptionsSchema),
    filters: extractFiltersFromSchema(formsFindAllOptionsSchema),
    includes: extractIncludesFromSchema(formsFindAllOptionsSchema),
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
