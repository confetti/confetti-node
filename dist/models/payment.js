import loadSamples from '../utils/load-samples.js';
import { schemaToAttributes } from '../utils/schema-to-attributes.js';
import { PaymentSchema } from '../schemas/payment.js';
import { extractFiltersFromSchema, extractSortingFromSchema, extractIncludesFromSchema, } from '../utils/resource-options-to-model.js';
import { paymentsResourceOptionsSchema } from '../schemas/payment.js';
export default function PaymentModel() {
    return {
        key: 'payment',
        endpoint: 'payments',
        name: 'Payment',
        sample: loadSamples('payment'),
        sorting: extractSortingFromSchema(paymentsResourceOptionsSchema),
        filters: extractFiltersFromSchema(paymentsResourceOptionsSchema),
        includes: extractIncludesFromSchema(paymentsResourceOptionsSchema),
        operations: {
            read: {
                schema: PaymentSchema,
                attributes: schemaToAttributes(PaymentSchema),
            },
        },
        webhooks: [
            {
                type: 'payment.paid',
                label: 'Paid',
                description: 'Triggers when a payment is paid.',
            },
            {
                type: 'payment.refunded',
                label: 'Refunded',
                description: 'Triggers when a payment is refunded.',
            },
        ],
    };
}
