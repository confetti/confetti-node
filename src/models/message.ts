import loadSamples from '../utils/load-samples.js'
import { schemaToAttributes, schemaToCreateAttributes } from '../utils/schema-to-attributes.js'
import {
  MessageSchema,
  MessageCreateSchema,
  MessageUpdateSchema,
  messagesFindAllOptionsSchema,
} from '../schemas/message.js'
import { ModelDefinition } from '../types/model.js'
import {
  extractFiltersFromSchema,
  extractSortingFromSchema,
  extractIncludesFromSchema,
} from '../utils/resource-options-to-model.js'

export default function MessageModel(): ModelDefinition {
  return {
    key: 'message',
    endpoint: 'messages',
    path: 'messages',
    name: 'Message',
    sample: loadSamples('message'),
    sorting: extractSortingFromSchema(messagesFindAllOptionsSchema),
    filters: extractFiltersFromSchema(messagesFindAllOptionsSchema),
    includes: extractIncludesFromSchema(messagesFindAllOptionsSchema),
    operations: {
      read: {
        schema: MessageSchema,
        attributes: schemaToAttributes(MessageSchema),
      },
      create: {
        schema: MessageCreateSchema,
        attributes: schemaToCreateAttributes(MessageCreateSchema),
      },
      update: {
        schema: MessageUpdateSchema,
        attributes: schemaToCreateAttributes(MessageUpdateSchema),
      },
    },
    relationships: [
      { field: 'eventId', relationship: 'event', type: 'belongsTo' },
      { field: 'workspaceId', relationship: 'workspace', type: 'belongsTo' },
      { field: 'imageId', relationship: 'image', type: 'belongsTo' },
    ],
    webhooks: [],
  }
}
