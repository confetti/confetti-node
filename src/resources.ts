import {
  EventsFindAllOptions,
  ContactsFindAllOptions,
  TicketsFindAllOptions,
  PaymentsFindAllOptions,
  WebhooksFindAllOptions,
  WorkspacesFindAllOptions,
  CategoriesFindAllOptions,
  TicketBatchesFindAllOptions,
  EventsFindOptions,
  TicketsFindOptions,
  ContactsFindOptions,
  PaymentsFindOptions,
  WebhooksFindOptions,
  WorkspacesFindOptions,
  CategoriesFindOptions,
  TicketBatchesFindOptions,
  TicketsCreateOptions,
  ContactsCreateOptions,
  WebhooksCreateOptions,
  TicketCreateData,
  ContactCreateData,
  WebhookCreateData,
} from './types/resources.js'

import { eventsResourceOptionsSchema, eventsFindOptionsSchema } from './schemas/event.js'
import { contactsResourceOptionsSchema, contactsFindOptionsSchema } from './schemas/contact.js'
import { ticketsResourceOptionsSchema, ticketsFindOptionsSchema } from './schemas/ticket.js'
import { paymentsResourceOptionsSchema, paymentsFindOptionsSchema } from './schemas/payment.js'
import { webhooksResourceOptionsSchema, webhooksFindOptionsSchema } from './schemas/webhook.js'
import { workspacesResourceOptionsSchema, workspacesFindOptionsSchema } from './schemas/workspace.js'
import { categoriesResourceOptionsSchema, categoriesFindOptionsSchema } from './schemas/category.js'
import { ticketBatchesResourceOptionsSchema, ticketBatchesFindOptionsSchema } from './schemas/ticket-batch.js'
import { baseResourceOptionsSchema } from './schemas/resource-options.js'

import { Adapter } from './adapter.js'
import { Event, Contact, Ticket, Payment, Webhook, Workspace, Category, TicketBatch } from './types/models.js'
import models from './models/index.js'

export const eventsResource = {
  findAll: (options: EventsFindAllOptions = {}, adapter: Adapter): Promise<Event[]> => {
    const validatedOptions = eventsResourceOptionsSchema.parse(options)
    return adapter.get<Event[]>({ path: models.event.path, type: models.event.endpoint, ...validatedOptions })
  },
  find: (id: string | number, options: EventsFindOptions = {}, adapter: Adapter): Promise<Event> => {
    const validatedOptions = eventsFindOptionsSchema.parse(options)
    return adapter.get<Event>({ path: `${models.event.path}/${id}`, type: models.event.endpoint, ...validatedOptions })
  },
}

export const ticketsResource = {
  findAll: (options: TicketsFindAllOptions, adapter: Adapter): Promise<Ticket[]> => {
    const validatedOptions = ticketsResourceOptionsSchema.parse(options)
    return adapter.get<Ticket[]>({ path: models.ticket.path, type: models.ticket.endpoint, ...validatedOptions })
  },
  find: (id: string | number, options: TicketsFindOptions = {}, adapter: Adapter): Promise<Ticket> => {
    const validatedOptions = ticketsFindOptionsSchema.parse(options)
    return adapter.get<Ticket>({
      path: `${models.ticket.path}/${id}`,
      type: models.ticket.endpoint,
      ...validatedOptions,
    })
  },
  create: (json: TicketCreateData, options: TicketsCreateOptions = {}, adapter: Adapter): Promise<Ticket> => {
    const validatedOptions = baseResourceOptionsSchema.parse(options)
    if (!models.ticket.operations.create) throw new Error('Ticket create operation not found')
    const validatedData = models.ticket.operations.create.schema.parse(json)

    return adapter.post<Ticket>({
      json: validatedData as any, // eslint-disable-line @typescript-eslint/no-explicit-any
      path: models.ticket.path,
      type: models.ticket.endpoint,
      ...validatedOptions,
    })
  },
}

export const contactsResource = {
  findAll: (options: ContactsFindAllOptions = {}, adapter: Adapter): Promise<Contact[]> => {
    const validatedOptions = contactsResourceOptionsSchema.parse(options)
    return adapter.get<Contact[]>({ path: models.contact.path, type: models.contact.endpoint, ...validatedOptions })
  },
  find: (id: string | number, options: ContactsFindOptions = {}, adapter: Adapter): Promise<Contact> => {
    const validatedOptions = contactsFindOptionsSchema.parse(options)
    return adapter.get<Contact>({
      path: `${models.contact.path}/${id}`,
      type: models.contact.endpoint,
      ...validatedOptions,
    })
  },
  create: (json: ContactCreateData, options: ContactsCreateOptions = {}, adapter: Adapter): Promise<Contact> => {
    const validatedOptions = baseResourceOptionsSchema.parse(options)
    if (!models.contact.operations.create) throw new Error('Contact create operation not found')
    const validatedData = models.contact.operations.create.schema.parse(json)

    return adapter.post<Contact>({
      json: validatedData as any, // eslint-disable-line @typescript-eslint/no-explicit-any
      path: models.contact.path,
      type: models.contact.endpoint,
      ...validatedOptions,
    })
  },
}

export const paymentsResource = {
  findAll: (options: PaymentsFindAllOptions = {}, adapter: Adapter): Promise<Payment[]> => {
    const validatedOptions = paymentsResourceOptionsSchema.parse(options)
    return adapter.get<Payment[]>({ path: models.payment.path, type: models.payment.endpoint, ...validatedOptions })
  },
  find: (id: string | number, options: PaymentsFindOptions = {}, adapter: Adapter): Promise<Payment> => {
    const validatedOptions = paymentsFindOptionsSchema.parse(options)
    return adapter.get<Payment>({
      path: `${models.payment.path}/${id}`,
      type: models.payment.endpoint,
      ...validatedOptions,
    })
  },
}

export const webhooksResource = {
  findAll: (options: WebhooksFindAllOptions = {}, adapter: Adapter): Promise<Webhook[]> => {
    const validatedOptions = webhooksResourceOptionsSchema.parse(options)
    return adapter.get<Webhook[]>({ path: models.webhook.path, type: models.webhook.endpoint, ...validatedOptions })
  },
  find: (id: string | number, options: WebhooksFindOptions = {}, adapter: Adapter): Promise<Webhook> => {
    const validatedOptions = webhooksFindOptionsSchema.parse(options)
    return adapter.get<Webhook>({
      path: `${models.webhook.path}/${id}`,
      type: models.webhook.endpoint,
      ...validatedOptions,
    })
  },
  create: (json: WebhookCreateData, options: WebhooksCreateOptions = {}, adapter: Adapter): Promise<Webhook> => {
    const validatedOptions = baseResourceOptionsSchema.parse(options)
    if (!models.webhook.operations.create) throw new Error('Webhook create operation not found')
    const validatedData = models.webhook.operations.create.schema.parse(json)
    return adapter.post<Webhook>({
      path: models.webhook.path,
      json: validatedData as any, // eslint-disable-line @typescript-eslint/no-explicit-any
      type: models.webhook.endpoint,
      ...validatedOptions,
    })
  },
  delete: (id: string | number, options: WebhooksFindOptions = {}, adapter: Adapter): Promise<void> => {
    const validatedOptions = webhooksFindOptionsSchema.parse(options)
    return adapter.delete<void>({
      path: `${models.webhook.path}/${id}`,
      type: models.webhook.endpoint,
      ...validatedOptions,
    })
  },
}

export const workspacesResource = {
  findAll: (options: WorkspacesFindAllOptions = {}, adapter: Adapter): Promise<Workspace[]> => {
    const validatedOptions = workspacesResourceOptionsSchema.parse(options)
    return adapter.get<Workspace[]>({
      path: models.workspace.path,
      type: models.workspace.endpoint,
      ...validatedOptions,
    })
  },
  find: (id: string | number, options: WorkspacesFindOptions = {}, adapter: Adapter): Promise<Workspace> => {
    const validatedOptions = workspacesFindOptionsSchema.parse(options)
    return adapter.get<Workspace>({
      path: `${models.workspace.path}/${id}`,
      type: models.workspace.endpoint,
      ...validatedOptions,
    })
  },
}

export const categoriesResource = {
  findAll: (options: CategoriesFindAllOptions = {}, adapter: Adapter): Promise<Category[]> => {
    const validatedOptions = categoriesResourceOptionsSchema.parse(options)
    return adapter.get<Category[]>({ path: models.category.path, type: models.category.endpoint, ...validatedOptions })
  },
  find: (id: string | number, options: CategoriesFindOptions = {}, adapter: Adapter): Promise<Category> => {
    const validatedOptions = categoriesFindOptionsSchema.parse(options)
    return adapter.get<Category>({
      path: `${models.category.path}/${id}`,
      type: models.category.endpoint,
      ...validatedOptions,
    })
  },
}

export const ticketBatchesResource = {
  findAll: (options: TicketBatchesFindAllOptions = {}, adapter: Adapter): Promise<TicketBatch[]> => {
    const validatedOptions = ticketBatchesResourceOptionsSchema.parse(options)
    return adapter.get<TicketBatch[]>({
      path: models.ticketBatch.path,
      type: models.ticketBatch.endpoint,
      ...validatedOptions,
    })
  },
  find: (id: string | number, options: TicketBatchesFindOptions = {}, adapter: Adapter): Promise<TicketBatch> => {
    const validatedOptions = ticketBatchesFindOptionsSchema.parse(options)
    return adapter.get<TicketBatch>({
      path: `${models.ticketBatch.path}/${id}`,
      type: models.ticketBatch.endpoint,
      ...validatedOptions,
    })
  },
}
