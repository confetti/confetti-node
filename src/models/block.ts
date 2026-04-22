import loadSamples from '../utils/load-samples.js'
import { schemaToAttributes, schemaToCreateAttributes } from '../utils/schema-to-attributes.js'
import { BlockSchema, BlockCreateSchema, BlockUpdateSchema, blocksFindAllOptionsSchema } from '../schemas/block.js'
import { ModelDefinition } from '../types/model.js'
import {
  extractFiltersFromSchema,
  extractSortingFromSchema,
  extractIncludesFromSchema,
} from '../utils/resource-options-to-model.js'

export default function BlockModel(): ModelDefinition {
  return {
    key: 'block',
    endpoint: 'blocks',
    path: 'blocks',
    name: 'Block',
    sample: loadSamples('block'),
    sorting: extractSortingFromSchema(blocksFindAllOptionsSchema),
    filters: extractFiltersFromSchema(blocksFindAllOptionsSchema),
    includes: extractIncludesFromSchema(blocksFindAllOptionsSchema),
    operations: {
      read: {
        schema: BlockSchema,
        attributes: schemaToAttributes(BlockSchema),
      },
      create: {
        schema: BlockCreateSchema,
        attributes: schemaToCreateAttributes(BlockCreateSchema),
      },
      update: {
        schema: BlockUpdateSchema,
        attributes: schemaToCreateAttributes(BlockUpdateSchema),
      },
    },
    relationships: [
      { field: 'pageId', relationship: 'page', type: 'belongsTo' },
      { field: 'eventId', relationship: 'event', type: 'belongsTo' },
      { field: 'workspaceId', relationship: 'workspace', type: 'belongsTo' },
      { field: 'categoryIds', relationship: 'categories', type: 'hasMany' },
    ],
    webhooks: [],
  }
}
