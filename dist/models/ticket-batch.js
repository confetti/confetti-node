import loadSamples from '../utils/load-samples.js';
import { schemaToAttributes } from '../utils/schema-to-attributes.js';
import { TicketBatchSchema } from '../schemas/ticket-batch.js';
import { extractFiltersFromSchema, extractSortingFromSchema, extractIncludesFromSchema, } from '../utils/resource-options-to-model.js';
import { ticketBatchesResourceOptionsSchema } from '../schemas/ticket-batch.js';
export default function TicketBatchModel() {
    return {
        key: 'ticketBatch',
        endpoint: 'ticketBatches',
        name: 'Ticket Batch',
        sample: loadSamples('ticketBatch'),
        sorting: extractSortingFromSchema(ticketBatchesResourceOptionsSchema),
        filters: extractFiltersFromSchema(ticketBatchesResourceOptionsSchema),
        includes: extractIncludesFromSchema(ticketBatchesResourceOptionsSchema),
        operations: {
            read: {
                schema: TicketBatchSchema,
                attributes: schemaToAttributes(TicketBatchSchema),
            },
        },
        webhooks: [],
    };
}
