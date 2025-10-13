import loadSamples from '../utils/load-samples.js'
import { schemaToAttributes } from '../utils/schema-to-attributes.js'
import { PageSchema } from '../schemas/page.js'
import { ModelDefinition } from '../types/model.js'

export default function PageModel(): ModelDefinition {
  return {
    key: 'page',
    endpoint: 'pages',
    path: 'pages',
    name: 'Page',
    sample: loadSamples('page'),
    sorting: [],
    filters: {},
    includes: [],
    operations: {
      read: {
        schema: PageSchema,
        attributes: schemaToAttributes(PageSchema),
      },
    },
    webhooks: [],
  }
}
