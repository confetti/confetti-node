import {
  eventsFindAllOptionsSchema,
  eventsFindOptionsSchema,
  type EventsFindAllOptions,
  type EventsFindOptions,
  type EventsCreateOptions,
  type EventsUpdateOptions,
  type EventCreateData,
  type EventUpdateData,
} from './schemas/event.js'
import {
  contactsFindOptionsSchema,
  type ContactsFindAllOptions,
  type ContactsFindOptions,
  type ContactsCreateOptions,
  type ContactCreateData,
  contactsFindAllOptionsSchema,
} from './schemas/contact.js'
import {
  ticketsFindAllOptionsSchema,
  ticketsFindOptionsSchema,
  type TicketsFindAllOptions,
  type TicketsFindOptions,
  type TicketsCreateOptions,
  type TicketCreateData,
} from './schemas/ticket.js'
import {
  paymentsFindAllOptionsSchema,
  paymentsFindOptionsSchema,
  type PaymentsFindAllOptions,
  type PaymentsFindOptions,
} from './schemas/payment.js'
import {
  webhooksFindAllOptionsSchema,
  webhooksFindOptionsSchema,
  type WebhooksFindAllOptions,
  type WebhooksFindOptions,
  type WebhooksCreateOptions,
  type WebhookCreateData,
} from './schemas/webhook.js'
import {
  workspacesFindAllOptionsSchema,
  workspacesFindOptionsSchema,
  type WorkspacesFindAllOptions,
  type WorkspacesFindOptions,
} from './schemas/workspace.js'
import {
  categoriesFindAllOptionsSchema,
  categoriesFindOptionsSchema,
  type CategoriesFindAllOptions,
  type CategoriesFindOptions,
} from './schemas/category.js'
import {
  ticketBatchesFindAllOptionsSchema,
  ticketBatchesFindOptionsSchema,
  type TicketBatchesFindAllOptions,
  type TicketBatchesFindOptions,
} from './schemas/ticket-batch.js'
import {
  pagesFindAllOptionsSchema,
  pagesFindOptionsSchema,
  type PagesFindAllOptions,
  type PagesFindOptions,
  type PagesCreateOptions,
  type PagesUpdateOptions,
  type PageCreateData,
  type PageUpdateData,
} from './schemas/page.js'
import {
  blocksFindAllOptionsSchema,
  blocksFindOptionsSchema,
  type BlocksFindAllOptions,
  type BlocksFindOptions,
  type BlocksCreateOptions,
  type BlocksUpdateOptions,
  type BlockCreateData,
  type BlockUpdateData,
} from './schemas/block.js'
import {
  imagesFindAllOptionsSchema,
  imagesFindOptionsSchema,
  type ImagesFindAllOptions,
  type ImagesFindOptions,
  type ImagesCreateOptions,
  type ImagesUpdateOptions,
  type ImageCreateData,
  type ImageUpdateData,
} from './schemas/image.js'
import { baseOptionsSchema } from './schemas/resource-options.js'

import { Adapter } from './adapter.js'
import {
  Event,
  Contact,
  Ticket,
  Payment,
  Webhook,
  Workspace,
  Category,
  TicketBatch,
  Page,
  Block,
  Image,
} from './types/models.js'
import models from './models/index.js'

export const eventsResource = {
  findAll: (options: EventsFindAllOptions = {}, adapter: Adapter): Promise<Event[]> => {
    const validatedOptions = eventsFindAllOptionsSchema.parse(options)
    return adapter.get<Event[]>({ path: models.event.path, type: models.event.endpoint, ...validatedOptions })
  },
  find: (id: string | number, options: EventsFindOptions = {}, adapter: Adapter): Promise<Event> => {
    const validatedOptions = eventsFindOptionsSchema.parse(options)
    return adapter.get<Event>({ path: `${models.event.path}/${id}`, type: models.event.endpoint, ...validatedOptions })
  },
  create: (json: EventCreateData, options: EventsCreateOptions = {}, adapter: Adapter): Promise<Event> => {
    const validatedOptions = baseOptionsSchema.parse(options)
    if (!models.event.operations.create) throw new Error('Event create operation not found')
    const validatedData = models.event.operations.create.schema.parse(json)
    return adapter.post<Event>({
      json: validatedData,
      path: models.event.path,
      type: models.event.endpoint,
      ...validatedOptions,
    })
  },
  update: (
    id: string | number,
    json: EventUpdateData,
    options: EventsUpdateOptions = {},
    adapter: Adapter,
  ): Promise<Event> => {
    const validatedOptions = baseOptionsSchema.parse(options)
    if (!models.event.operations.update) throw new Error('Event update operation not found')
    const validatedData = models.event.operations.update.schema.parse(json)
    return adapter.put<Event>({
      json: validatedData,
      path: `${models.event.path}/${id}`,
      type: models.event.endpoint,
      ...validatedOptions,
    })
  },
}

export const ticketsResource = {
  findAll: (options: TicketsFindAllOptions, adapter: Adapter): Promise<Ticket[]> => {
    const validatedOptions = ticketsFindAllOptionsSchema.parse(options)
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
    const validatedOptions = baseOptionsSchema.parse(options)
    if (!models.ticket.operations.create) throw new Error('Ticket create operation not found')
    const validatedData = models.ticket.operations.create.schema.parse(json)

    return adapter.post<Ticket>({
      json: validatedData,
      path: models.ticket.path,
      type: models.ticket.endpoint,
      ...validatedOptions,
    })
  },
}

export const contactsResource = {
  findAll: (options: ContactsFindAllOptions = {}, adapter: Adapter): Promise<Contact[]> => {
    const validatedOptions = contactsFindAllOptionsSchema.parse(options)
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
    const validatedOptions = baseOptionsSchema.parse(options)
    if (!models.contact.operations.create) throw new Error('Contact create operation not found')
    const validatedData = models.contact.operations.create.schema.parse(json)

    return adapter.post<Contact>({
      json: validatedData,
      path: models.contact.path,
      type: models.contact.endpoint,
      ...validatedOptions,
    })
  },
}

export const paymentsResource = {
  findAll: (options: PaymentsFindAllOptions, adapter: Adapter): Promise<Payment[]> => {
    const validatedOptions = paymentsFindAllOptionsSchema.parse(options)
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
    const validatedOptions = webhooksFindAllOptionsSchema.parse(options)
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
    const validatedOptions = baseOptionsSchema.parse(options)
    if (!models.webhook.operations.create) throw new Error('Webhook create operation not found')
    const validatedData = models.webhook.operations.create.schema.parse(json)
    return adapter.post<Webhook>({
      path: models.webhook.path,
      json: validatedData,
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
    const validatedOptions = workspacesFindAllOptionsSchema.parse(options)
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
    const validatedOptions = categoriesFindAllOptionsSchema.parse(options)
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
  findAll: (options: TicketBatchesFindAllOptions, adapter: Adapter): Promise<TicketBatch[]> => {
    const validatedOptions = ticketBatchesFindAllOptionsSchema.parse(options)
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

export const pagesResource = {
  findAll: (options: PagesFindAllOptions = {}, adapter: Adapter): Promise<Page[]> => {
    const validatedOptions = pagesFindAllOptionsSchema.parse(options)
    return adapter.get<Page[]>({ path: models.page.path, type: models.page.endpoint, ...validatedOptions })
  },
  find: (id: string | number, options: PagesFindOptions = {}, adapter: Adapter): Promise<Page> => {
    const validatedOptions = pagesFindOptionsSchema.parse(options)
    return adapter.get<Page>({
      path: `${models.page.path}/${id}`,
      type: models.page.endpoint,
      ...validatedOptions,
    })
  },
  create: (json: PageCreateData, options: PagesCreateOptions = {}, adapter: Adapter): Promise<Page> => {
    const validatedOptions = baseOptionsSchema.parse(options)
    if (!models.page.operations.create) throw new Error('Page create operation not found')
    const validatedData = models.page.operations.create.schema.parse(json)
    return adapter.post<Page>({
      json: validatedData,
      path: models.page.path,
      type: models.page.endpoint,
      ...validatedOptions,
    })
  },
  update: (
    id: string | number,
    json: PageUpdateData,
    options: PagesUpdateOptions = {},
    adapter: Adapter,
  ): Promise<Page> => {
    const validatedOptions = baseOptionsSchema.parse(options)
    if (!models.page.operations.update) throw new Error('Page update operation not found')
    const validatedData = models.page.operations.update.schema.parse(json)
    return adapter.put<Page>({
      json: validatedData,
      path: `${models.page.path}/${id}`,
      type: models.page.endpoint,
      ...validatedOptions,
    })
  },
  delete: (id: string | number, options: PagesFindOptions = {}, adapter: Adapter): Promise<void> => {
    const validatedOptions = pagesFindOptionsSchema.parse(options)
    return adapter.delete<void>({
      path: `${models.page.path}/${id}`,
      type: models.page.endpoint,
      ...validatedOptions,
    })
  },
}

export const blocksResource = {
  findAll: (options: BlocksFindAllOptions = {}, adapter: Adapter): Promise<Block[]> => {
    const validatedOptions = blocksFindAllOptionsSchema.parse(options)
    return adapter.get<Block[]>({ path: models.block.path, type: models.block.endpoint, ...validatedOptions })
  },
  find: (id: string | number, options: BlocksFindOptions = {}, adapter: Adapter): Promise<Block> => {
    const validatedOptions = blocksFindOptionsSchema.parse(options)
    return adapter.get<Block>({
      path: `${models.block.path}/${id}`,
      type: models.block.endpoint,
      ...validatedOptions,
    })
  },
  create: (json: BlockCreateData, options: BlocksCreateOptions = {}, adapter: Adapter): Promise<Block> => {
    const validatedOptions = baseOptionsSchema.parse(options)
    if (!models.block.operations.create) throw new Error('Block create operation not found')
    const validatedData = models.block.operations.create.schema.parse(json)
    return adapter.post<Block>({
      json: validatedData,
      path: models.block.path,
      type: models.block.endpoint,
      ...validatedOptions,
    })
  },
  update: (
    id: string | number,
    json: BlockUpdateData,
    options: BlocksUpdateOptions = {},
    adapter: Adapter,
  ): Promise<Block> => {
    const validatedOptions = baseOptionsSchema.parse(options)
    if (!models.block.operations.update) throw new Error('Block update operation not found')
    const validatedData = models.block.operations.update.schema.parse(json)
    return adapter.put<Block>({
      json: validatedData,
      path: `${models.block.path}/${id}`,
      type: models.block.endpoint,
      ...validatedOptions,
    })
  },
  delete: (id: string | number, options: BlocksFindOptions = {}, adapter: Adapter): Promise<void> => {
    const validatedOptions = blocksFindOptionsSchema.parse(options)
    return adapter.delete<void>({
      path: `${models.block.path}/${id}`,
      type: models.block.endpoint,
      ...validatedOptions,
    })
  },
}

export const imagesResource = {
  findAll: (options: ImagesFindAllOptions = {}, adapter: Adapter): Promise<Image[]> => {
    const validatedOptions = imagesFindAllOptionsSchema.parse(options)
    return adapter.get<Image[]>({ path: models.image.path, type: models.image.endpoint, ...validatedOptions })
  },
  find: (id: string | number, options: ImagesFindOptions = {}, adapter: Adapter): Promise<Image> => {
    const validatedOptions = imagesFindOptionsSchema.parse(options)
    return adapter.get<Image>({
      path: `${models.image.path}/${id}`,
      type: models.image.endpoint,
      ...validatedOptions,
    })
  },
  create: (json: ImageCreateData, options: ImagesCreateOptions = {}, adapter: Adapter): Promise<Image> => {
    const validatedOptions = baseOptionsSchema.parse(options)
    if (!models.image.operations.create) throw new Error('Image create operation not found')
    const validatedData = models.image.operations.create.schema.parse(json)
    return adapter.post<Image>({
      json: validatedData,
      path: models.image.path,
      type: models.image.endpoint,
      ...validatedOptions,
    })
  },
  update: (
    id: string | number,
    json: ImageUpdateData,
    options: ImagesUpdateOptions = {},
    adapter: Adapter,
  ): Promise<Image> => {
    const validatedOptions = baseOptionsSchema.parse(options)
    if (!models.image.operations.update) throw new Error('Image update operation not found')
    const validatedData = models.image.operations.update.schema.parse(json)
    return adapter.put<Image>({
      json: validatedData,
      path: `${models.image.path}/${id}`,
      type: models.image.endpoint,
      ...validatedOptions,
    })
  },
  delete: (id: string | number, options: ImagesFindOptions = {}, adapter: Adapter): Promise<void> => {
    const validatedOptions = imagesFindOptionsSchema.parse(options)
    return adapter.delete<void>({
      path: `${models.image.path}/${id}`,
      type: models.image.endpoint,
      ...validatedOptions,
    })
  },
}
