import loadSamples from '../utils/load-samples.js'
import { schemaToAttributes, schemaToCreateAttributes } from '../utils/schema-to-attributes.js'
import { FormFieldSchema, FormFieldCreateSchema, FormFieldUpdateSchema } from '../schemas/form-field.js'
import { ModelDefinition } from '../types/model.js'

export default function FormFieldModel(): ModelDefinition {
  return {
    key: 'formField',
    endpoint: 'formFields',
    path: 'form-fields',
    name: 'Form Field',
    sample: loadSamples('formField'),
    sorting: [],
    filters: {},
    includes: [],
    operations: {
      read: {
        schema: FormFieldSchema,
        attributes: schemaToAttributes(FormFieldSchema),
      },
      create: {
        schema: FormFieldCreateSchema,
        attributes: schemaToCreateAttributes(FormFieldCreateSchema),
      },
      update: {
        schema: FormFieldUpdateSchema,
        attributes: schemaToCreateAttributes(FormFieldUpdateSchema),
      },
    },
    webhooks: [],
    relationships: [
      { field: 'formId', relationship: 'form', type: 'belongsTo' },
      { field: 'sectionId', relationship: 'section', type: 'belongsTo' },
    ],
  }
}
