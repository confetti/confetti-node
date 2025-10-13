import { eventsResourceOptionsSchema, eventsFindOptionsSchema } from './schemas/event.js';
import { contactsResourceOptionsSchema, contactsFindOptionsSchema } from './schemas/contact.js';
import { ticketsResourceOptionsSchema, ticketsFindOptionsSchema } from './schemas/ticket.js';
import { paymentsResourceOptionsSchema, paymentsFindOptionsSchema } from './schemas/payment.js';
import { webhooksResourceOptionsSchema, webhooksFindOptionsSchema } from './schemas/webhook.js';
import { workspacesResourceOptionsSchema, workspacesFindOptionsSchema } from './schemas/workspace.js';
import { categoriesResourceOptionsSchema, categoriesFindOptionsSchema } from './schemas/category.js';
import { ticketBatchesResourceOptionsSchema, ticketBatchesFindOptionsSchema } from './schemas/ticket-batch.js';
import { baseResourceOptionsSchema } from './schemas/resource-options.js';
import models from './models/index.js';
export const eventsResource = {
    findAll: (options = {}, adapter) => {
        const validatedOptions = eventsResourceOptionsSchema.parse(options);
        return adapter.get({ path: 'events', type: 'events', ...validatedOptions });
    },
    find: (id, options = {}, adapter) => {
        const validatedOptions = eventsFindOptionsSchema.parse(options);
        return adapter.get({ path: `events/${id}`, type: 'events', ...validatedOptions });
    },
};
export const ticketsResource = {
    findAll: (options = {}, adapter) => {
        const validatedOptions = ticketsResourceOptionsSchema.parse(options);
        return adapter.get({ path: 'tickets', type: 'tickets', ...validatedOptions });
    },
    find: (id, options = {}, adapter) => {
        const validatedOptions = ticketsFindOptionsSchema.parse(options);
        return adapter.get({ path: `tickets/${id}`, type: 'tickets', ...validatedOptions });
    },
    create: (json, options = {}, adapter) => {
        const validatedOptions = baseResourceOptionsSchema.parse(options);
        if (!models.ticket.operations.create)
            throw new Error('Ticket create operation not found');
        const validatedData = models.ticket.operations.create.schema.parse(json);
        return adapter.post({
            json: validatedData, // eslint-disable-line @typescript-eslint/no-explicit-any
            path: 'tickets',
            type: 'tickets',
            ...validatedOptions,
        });
    },
};
export const contactsResource = {
    findAll: (options = {}, adapter) => {
        const validatedOptions = contactsResourceOptionsSchema.parse(options);
        return adapter.get({ path: 'contacts', type: 'contacts', ...validatedOptions });
    },
    find: (id, options = {}, adapter) => {
        const validatedOptions = contactsFindOptionsSchema.parse(options);
        return adapter.get({ path: `contacts/${id}`, type: 'contacts', ...validatedOptions });
    },
    create: (json, options = {}, adapter) => {
        const validatedOptions = baseResourceOptionsSchema.parse(options);
        if (!models.contact.operations.create)
            throw new Error('Contact create operation not found');
        const validatedData = models.contact.operations.create.schema.parse(json);
        return adapter.post({
            json: validatedData, // eslint-disable-line @typescript-eslint/no-explicit-any
            path: 'contacts',
            type: 'contacts',
            ...validatedOptions,
        });
    },
};
export const paymentsResource = {
    findAll: (options = {}, adapter) => {
        const validatedOptions = paymentsResourceOptionsSchema.parse(options);
        return adapter.get({ path: 'payments', type: 'payments', ...validatedOptions });
    },
    find: (id, options = {}, adapter) => {
        const validatedOptions = paymentsFindOptionsSchema.parse(options);
        return adapter.get({ path: `payments/${id}`, type: 'payments', ...validatedOptions });
    },
};
export const webhooksResource = {
    findAll: (options = {}, adapter) => {
        const validatedOptions = webhooksResourceOptionsSchema.parse(options);
        return adapter.get({ path: 'webhooks', type: 'webhooks', ...validatedOptions });
    },
    find: (id, options = {}, adapter) => {
        const validatedOptions = webhooksFindOptionsSchema.parse(options);
        return adapter.get({ path: `webhooks/${id}`, type: 'webhooks', ...validatedOptions });
    },
    create: (json, options = {}, adapter) => {
        const validatedOptions = baseResourceOptionsSchema.parse(options);
        if (!models.webhook.operations.create)
            throw new Error('Webhook create operation not found');
        const validatedData = models.webhook.operations.create.schema.parse(json);
        return adapter.post({
            path: 'webhooks',
            json: validatedData, // eslint-disable-line @typescript-eslint/no-explicit-any
            type: 'webhooks',
            ...validatedOptions,
        });
    },
    delete: (id, options = {}, adapter) => {
        const validatedOptions = webhooksFindOptionsSchema.parse(options);
        return adapter.delete({ path: `webhooks/${id}`, type: 'webhooks', ...validatedOptions });
    },
};
export const workspacesResource = {
    findAll: (options = {}, adapter) => {
        const validatedOptions = workspacesResourceOptionsSchema.parse(options);
        return adapter.get({ path: 'workspaces', type: 'workspaces', ...validatedOptions });
    },
    find: (id, options = {}, adapter) => {
        const validatedOptions = workspacesFindOptionsSchema.parse(options);
        return adapter.get({ path: `workspaces/${id}`, type: 'workspaces', ...validatedOptions });
    },
};
export const categoriesResource = {
    findAll: (options = {}, adapter) => {
        const validatedOptions = categoriesResourceOptionsSchema.parse(options);
        return adapter.get({ path: 'categories', type: 'categories', ...validatedOptions });
    },
    find: (id, options = {}, adapter) => {
        const validatedOptions = categoriesFindOptionsSchema.parse(options);
        return adapter.get({ path: `categories/${id}`, type: 'categories', ...validatedOptions });
    },
};
export const ticketBatchesResource = {
    findAll: (options = {}, adapter) => {
        const validatedOptions = ticketBatchesResourceOptionsSchema.parse(options);
        return adapter.get({ path: 'ticket-batches', type: 'ticketBatches', ...validatedOptions });
    },
    find: (id, options = {}, adapter) => {
        const validatedOptions = ticketBatchesFindOptionsSchema.parse(options);
        return adapter.get({ path: `ticket-batches/${id}`, type: 'ticketBatches', ...validatedOptions });
    },
};
