import loadSamples from '../utils/load-samples.js'
import { schemaToAttributes } from '../utils/schema-to-attributes.js'
import { FormFieldSchema } from '../schemas/form-field.js'
import { ModelDefinition } from '../types/model.js'
import {
  extractFiltersFromSchema,
  extractSortingFromSchema,
  extractIncludesFromSchema,
} from '../utils/resource-options-to-model.js'
import { formFieldsFindAllOptionsSchema } from '../schemas/form-field.js'

export default function FormFieldModel(): ModelDefinition {
  return {
    key: 'formField',
    endpoint: 'form-fields',
    path: 'form-fields',
    name: 'Form Field',
    sample: loadSamples('formField'),
    sorting: extractSortingFromSchema(formFieldsFindAllOptionsSchema),
    filters: extractFiltersFromSchema(formFieldsFindAllOptionsSchema),
    includes: extractIncludesFromSchema(formFieldsFindAllOptionsSchema),
    operations: {
      read: {
        schema: FormFieldSchema,
        attributes: schemaToAttributes(FormFieldSchema),
      },
    },
    webhooks: [],
    relationships: [
      { field: 'formId', relationship: 'form', type: 'belongsTo' },
      { field: 'sectionId', relationship: 'section', type: 'belongsTo' },
    ],
  }
}
