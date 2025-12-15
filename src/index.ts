import adapter, { Adapter } from './adapter.js'
import models from './models/index.js'
import {
  contactsResource,
  eventsResource,
  ticketsResource,
  paymentsResource,
  webhooksResource,
  workspacesResource,
  categoriesResource,
  ticketBatchesResource,
} from './resources.js'
import type {
  CategoriesFindAllOptions,
  CategoriesFindOptions,
  StaticCategoriesFindAllOptions,
  StaticCategoriesFindOptions,
} from './schemas/category.js'
import type {
  ContactsFindAllOptions,
  ContactsCreateOptions,
  StaticContactsFindAllOptions,
  StaticContactsFindOptions,
  StaticContactsCreateOptions,
  ContactCreateData,
  ContactsFindOptions,
} from './schemas/contact.js'
import type {
  EventsFindAllOptions,
  EventsFindOptions,
  StaticEventsFindAllOptions,
  StaticEventsFindOptions,
} from './schemas/event.js'
import type {
  PaymentsFindAllOptions,
  PaymentsFindOptions,
  StaticPaymentsFindAllOptions,
  StaticPaymentsFindOptions,
} from './schemas/payment.js'
import type {
  TicketBatchesFindAllOptions,
  StaticTicketBatchesFindAllOptions,
  StaticTicketBatchesFindOptions,
  TicketBatchesFindOptions,
} from './schemas/ticket-batch.js'
import type {
  TicketsFindAllOptions,
  TicketsFindOptions,
  TicketsCreateOptions,
  StaticTicketsFindAllOptions,
  StaticTicketsFindOptions,
  StaticTicketsCreateOptions,
  TicketCreateData,
} from './schemas/ticket.js'
import type {
  WebhooksFindAllOptions,
  WebhooksCreateOptions,
  StaticWebhooksFindAllOptions,
  StaticWebhooksFindOptions,
  StaticWebhooksCreateOptions,
  WebhookCreateData,
  WebhooksFindOptions,
} from './schemas/webhook.js'
import type {
  WorkspacesFindAllOptions,
  StaticWorkspacesFindAllOptions,
  StaticWorkspacesFindOptions,
  WorkspacesFindOptions,
} from './schemas/workspace.js'

export interface ConfettiSettings {
  apiKey?: string
  apiHost?: string
  apiProtocol?: string
}

// Export all types
export * from './types/index.js'

class Confetti {
  private adapter: Adapter

  constructor(settings: ConfettiSettings = {}) {
    this.adapter = adapter({
      apiKey: settings.apiKey || undefined,
      apiHost: settings.apiHost || undefined,
      apiProtocol: settings.apiProtocol || undefined,
    })
  }

  static models = models

  events = {
    findAll: (options: EventsFindAllOptions = {}) => {
      return eventsResource.findAll(options, this.adapter)
    },
    find: (id: string | number, options: EventsFindOptions = {}) => {
      return eventsResource.find(id, options, this.adapter)
    },
  }
  static events = {
    findAll: (options: StaticEventsFindAllOptions) => {
      return eventsResource.findAll(options, adapter(options))
    },
    find: (id: string | number, options: StaticEventsFindOptions) => {
      return eventsResource.find(id, options, adapter(options))
    },
  }

  tickets = {
    findAll: (options: TicketsFindAllOptions) => {
      return ticketsResource.findAll(options, this.adapter)
    },
    find: (id: string | number, options: TicketsFindOptions = {}) => {
      return ticketsResource.find(id, options, this.adapter)
    },
    create: (json: TicketCreateData, options: TicketsCreateOptions = {}) => {
      return ticketsResource.create(json, options, this.adapter)
    },
  }
  static tickets = {
    findAll: (options: StaticTicketsFindAllOptions) => {
      return ticketsResource.findAll(options, adapter(options))
    },
    find: (id: string | number, options: StaticTicketsFindOptions) => {
      return ticketsResource.find(id, options, adapter(options))
    },
    create: (json: TicketCreateData, options: StaticTicketsCreateOptions) => {
      return ticketsResource.create(json, options, adapter(options))
    },
  }

  contacts = {
    findAll: (options: ContactsFindAllOptions = {}) => {
      return contactsResource.findAll(options, this.adapter)
    },
    find: (id: string | number, options: ContactsFindOptions = {}) => {
      return contactsResource.find(id, options, this.adapter)
    },
    create: (json: ContactCreateData, options: ContactsCreateOptions = {}) => {
      return contactsResource.create(json, options, this.adapter)
    },
  }
  static contacts = {
    findAll: (options: StaticContactsFindAllOptions) => {
      return contactsResource.findAll(options, adapter(options))
    },
    find: (id: string | number, options: StaticContactsFindOptions) => {
      return contactsResource.find(id, options, adapter(options))
    },
    create: (json: ContactCreateData, options: StaticContactsCreateOptions) => {
      return contactsResource.create(json, options, adapter(options))
    },
  }

  payments = {
    findAll: (options: PaymentsFindAllOptions) => {
      return paymentsResource.findAll(options, this.adapter)
    },
    find: (id: string | number, options: PaymentsFindOptions = {}) => {
      return paymentsResource.find(id, options, this.adapter)
    },
  }
  static payments = {
    findAll: (options: StaticPaymentsFindAllOptions) => {
      return paymentsResource.findAll(options, adapter(options))
    },
    find: (id: string | number, options: StaticPaymentsFindOptions) => {
      return paymentsResource.find(id, options, adapter(options))
    },
  }

  workspaces = {
    findAll: (options: WorkspacesFindAllOptions = {}) => {
      return workspacesResource.findAll(options, this.adapter)
    },
    find: (id: string | number, options: WorkspacesFindOptions = {}) => {
      return workspacesResource.find(id, options, this.adapter)
    },
  }
  static workspaces = {
    findAll: (options: StaticWorkspacesFindAllOptions) => {
      return workspacesResource.findAll(options, adapter(options))
    },
    find: (id: string | number, options: StaticWorkspacesFindOptions) => {
      return workspacesResource.find(id, options, adapter(options))
    },
  }

  webhooks = {
    findAll: (options: WebhooksFindAllOptions = {}) => {
      return webhooksResource.findAll(options, this.adapter)
    },
    find: (id: string | number, options: WebhooksFindOptions = {}) => {
      return webhooksResource.find(id, options, this.adapter)
    },
    create: (json: WebhookCreateData, options: WebhooksCreateOptions = {}) => {
      return webhooksResource.create(json, options, this.adapter)
    },
    delete: (id: string | number, options: WebhooksFindAllOptions = {}) => {
      return webhooksResource.delete(id, options, this.adapter)
    },
  }
  static webhooks = {
    findAll: (options: StaticWebhooksFindAllOptions) => {
      return webhooksResource.findAll(options, adapter(options))
    },
    find: (id: string | number, options: StaticWebhooksFindOptions) => {
      return webhooksResource.find(id, options, adapter(options))
    },
    create: (json: WebhookCreateData, options: StaticWebhooksCreateOptions) => {
      return webhooksResource.create(json, options, adapter(options))
    },
    delete: (id: string | number, options: StaticWebhooksFindOptions) => {
      return webhooksResource.delete(id, options, adapter(options))
    },
  }

  categories = {
    findAll: (options: CategoriesFindAllOptions = {}) => {
      return categoriesResource.findAll(options, this.adapter)
    },
    find: (id: string | number, options: CategoriesFindOptions = {}) => {
      return categoriesResource.find(id, options, this.adapter)
    },
  }
  static categories = {
    findAll: (options: StaticCategoriesFindAllOptions) => {
      return categoriesResource.findAll(options, adapter(options))
    },
    find: (id: string | number, options: StaticCategoriesFindOptions) => {
      return categoriesResource.find(id, options, adapter(options))
    },
  }

  ticketBatches = {
    findAll: (options: TicketBatchesFindAllOptions) => {
      return ticketBatchesResource.findAll(options, this.adapter)
    },
    find: (id: string | number, options: TicketBatchesFindOptions = {}) => {
      return ticketBatchesResource.find(id, options, this.adapter)
    },
  }
  static ticketBatches = {
    findAll: (options: StaticTicketBatchesFindAllOptions) => {
      return ticketBatchesResource.findAll(options, adapter(options))
    },
    find: (id: string | number, options: StaticTicketBatchesFindOptions) => {
      return ticketBatchesResource.find(id, options, adapter(options))
    },
  }
}

export default Confetti
