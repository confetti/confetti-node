import loadSamples from '../utils/load-samples.js'
import { schemaToAttributes, schemaToCreateAttributes } from '../utils/schema-to-attributes.js'
import { TicketBatchSchema, TicketBatchCreateSchema, TicketBatchUpdateSchema } from '../schemas/ticket-batch.js'
import { ModelDefinition } from '../types/model.js'
import {
  extractFiltersFromSchema,
  extractSortingFromSchema,
  extractIncludesFromSchema,
} from '../utils/resource-options-to-model.js'
import { ticketBatchesFindAllOptionsSchema } from '../schemas/ticket-batch.js'

export default function TicketBatchModel(): ModelDefinition {
  return {
    key: 'ticketBatch',
    endpoint: 'ticketBatches',
    path: 'ticket-batches',
    name: 'Ticket Batch',
    sample: loadSamples('ticketBatch'),
    sorting: extractSortingFromSchema(ticketBatchesFindAllOptionsSchema),
    filters: extractFiltersFromSchema(ticketBatchesFindAllOptionsSchema),
    includes: extractIncludesFromSchema(ticketBatchesFindAllOptionsSchema),
    operations: {
      read: {
        schema: TicketBatchSchema,
        attributes: schemaToAttributes(TicketBatchSchema),
      },
      create: {
        schema: TicketBatchCreateSchema,
        attributes: schemaToCreateAttributes(TicketBatchCreateSchema),
      },
      update: {
        schema: TicketBatchUpdateSchema,
        attributes: schemaToCreateAttributes(TicketBatchUpdateSchema),
      },
    },
    webhooks: [],
    relationships: [
      { field: 'eventId', relationship: 'event', type: 'belongsTo' },
      { field: 'formId', relationship: 'form', type: 'belongsTo' },
    ],
  }
}
