import loadSamples from '../utils/load-samples.js';
import { schemaToAttributes, schemaToCreateAttributes } from '../utils/schema-to-attributes.js';
import { WebhookSchema, WebhookCreateSchema } from '../schemas/webhook.js';
import { extractFiltersFromSchema, extractSortingFromSchema, extractIncludesFromSchema, } from '../utils/resource-options-to-model.js';
import { webhooksResourceOptionsSchema } from '../schemas/webhook.js';
export default function WebhookModel() {
    return {
        key: 'webhook',
        endpoint: 'webhooks',
        name: 'Webhook',
        sample: loadSamples('webhook'),
        sorting: extractSortingFromSchema(webhooksResourceOptionsSchema),
        filters: extractFiltersFromSchema(webhooksResourceOptionsSchema),
        includes: extractIncludesFromSchema(webhooksResourceOptionsSchema),
        operations: {
            read: {
                schema: WebhookSchema,
                attributes: schemaToAttributes(WebhookSchema),
            },
            create: {
                schema: WebhookCreateSchema,
                attributes: schemaToCreateAttributes(WebhookCreateSchema),
            },
        },
        webhooks: [],
    };
}
