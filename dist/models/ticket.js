import loadSamples from '../utils/load-samples.js';
import { schemaToAttributes, schemaToCreateAttributes } from '../utils/schema-to-attributes.js';
import { TicketSchema, TicketCreateSchema } from '../schemas/ticket.js';
import { extractFiltersFromSchema, extractSortingFromSchema, extractIncludesFromSchema, } from '../utils/resource-options-to-model.js';
import { ticketsResourceOptionsSchema } from '../schemas/ticket.js';
export default function TicketModel() {
    return {
        key: 'ticket',
        endpoint: 'tickets',
        name: 'Ticket',
        sample: loadSamples('ticket'),
        sorting: extractSortingFromSchema(ticketsResourceOptionsSchema),
        filters: extractFiltersFromSchema(ticketsResourceOptionsSchema),
        includes: extractIncludesFromSchema(ticketsResourceOptionsSchema),
        operations: {
            read: {
                schema: TicketSchema,
                attributes: schemaToAttributes(TicketSchema),
            },
            create: {
                schema: TicketCreateSchema,
                attributes: schemaToCreateAttributes(TicketCreateSchema),
            },
        },
        webhooks: [
            {
                type: 'ticket.attending',
                label: 'Attending',
                description: 'Triggers when someone attendes a event.',
                important: true,
            },
            {
                type: 'ticket.declined',
                label: 'Declined',
                description: 'Triggers when someone declines.',
                important: true,
            },
            {
                type: 'ticket.invited',
                label: 'Invited',
                description: 'Triggers when someone is invited.',
            },
            {
                type: 'ticket.waitlist',
                label: 'Waitlisted',
                description: 'Triggers when someone is waitlisted.',
            },
            {
                type: 'ticket.updated',
                label: 'Updated',
                description: 'Triggers when a ticket is updated.',
            },
            {
                type: 'ticket.deleted',
                label: 'Deleted',
                description: 'Triggers when a ticket is deleted.',
            },
            {
                type: 'ticket.unsubscribed',
                label: 'Unsubscribed',
                description: 'Triggers when someone is unsubscribed from emails.',
            },
            {
                type: 'ticket.deletion-requested',
                label: 'Deletion requested',
                description: 'Triggers when someone requests to get deleted from an event.',
            },
        ],
    };
}
