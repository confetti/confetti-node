import loadSamples from '../utils/load-samples.js'
import { schemaToAttributes } from '../utils/schema-to-attributes.js'
import { BlockSchema } from '../schemas/block.js'
import { ModelDefinition } from '../types/model.js'

export default function BlockModel(): ModelDefinition {
  return {
    key: 'block',
    endpoint: 'blocks',
    path: 'blocks',
    name: 'Block',
    sample: loadSamples('block'),
    sorting: [],
    filters: {},
    includes: [],
    operations: {
      read: {
        schema: BlockSchema,
        attributes: schemaToAttributes(BlockSchema),
      },
    },
    webhooks: [],
  }
}
