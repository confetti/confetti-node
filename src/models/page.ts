import loadSamples from '../utils/load-samples.js'
import { schemaToAttributes, schemaToCreateAttributes } from '../utils/schema-to-attributes.js'
import {
  PageSchema,
  PageCreateSchema,
  PageUpdateSchema,
  pagesFindAllOptionsSchema,
} from '../schemas/page.js'
import { ModelDefinition } from '../types/model.js'
import {
  extractFiltersFromSchema,
  extractSortingFromSchema,
  extractIncludesFromSchema,
} from '../utils/resource-options-to-model.js'

export default function PageModel(): ModelDefinition {
  return {
    key: 'page',
    endpoint: 'pages',
    path: 'pages',
    name: 'Page',
    sample: loadSamples('page'),
    sorting: extractSortingFromSchema(pagesFindAllOptionsSchema),
    filters: extractFiltersFromSchema(pagesFindAllOptionsSchema),
    includes: extractIncludesFromSchema(pagesFindAllOptionsSchema),
    operations: {
      read: {
        schema: PageSchema,
        attributes: schemaToAttributes(PageSchema),
      },
      create: {
        schema: PageCreateSchema,
        attributes: schemaToCreateAttributes(PageCreateSchema),
      },
      update: {
        schema: PageUpdateSchema,
        attributes: schemaToCreateAttributes(PageUpdateSchema),
      },
    },
    relationships: [
      { field: 'eventId', relationship: 'event', type: 'belongsTo' },
      { field: 'workspaceId', relationship: 'workspace', type: 'belongsTo' },
    ],
    webhooks: [],
  }
}
