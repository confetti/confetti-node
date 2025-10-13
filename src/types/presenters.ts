// Presenter types for Confetti API

import { Contact, Ticket, Webhook } from './models.js'

// Base presenter class type from yayson
export interface YaysonPresenter {
  new (): {
    attributes?(_data: unknown): unknown
    relationships?(): Record<string, unknown>
    render(_data: unknown): unknown
  }
  type: string
  plural: string
}

// Base presenter interface
export interface BasePresenter {
  type: string
  plural: string
  attributes(_data: unknown): unknown
  relationships(): Record<string, unknown>
  render(_data: unknown): unknown
}

// Presenter factory function type
export type PresenterFactory<T extends BasePresenter> = (_options: {
  presenters: PresentersMap
  Presenter: YaysonPresenter
}) => T

// Presenter options interface
export interface PresenterOptions {
  presenters: PresentersMap
  Presenter: YaysonPresenter
}

// Map of all presenters
export interface PresentersMap {
  WebhookPresenter: WebhookPresenter
  EventPresenter: EventPresenter
  WorkspacePresenter: WorkspacePresenter
  ContactPresenter: ContactPresenter
  TicketPresenter: TicketPresenter
  CategoryPresenter: CategoryPresenter
  TicketBatchPresenter: TicketBatchPresenter
  PaymentPresenter: PaymentPresenter
}

// Specific presenter types
export interface CategoryPresenter extends BasePresenter {
  type: 'category'
  plural: 'categories'
}

export interface ContactPresenter extends BasePresenter {
  type: 'contact'
  plural: 'contacts'
  attributes(
    _contact: Contact & {
      workspaceId?: number
      categoryIds?: number[]
    },
  ): Contact & {
    workspace?: { id: number }
    categories?: { id: number }[]
  }
  relationships(): {
    workspace: WorkspacePresenter
    categories: CategoryPresenter
  }
}

export interface EventPresenter extends BasePresenter {
  type: 'event'
  plural: 'events'
}

export interface TicketPresenter extends BasePresenter {
  type: 'ticket'
  plural: 'tickets'
  attributes(
    _ticket: Ticket & {
      eventId?: number
      ticketBatchId?: number
      sendEmailConfirmation?: boolean
    },
  ): Ticket & {
    event?: { id: number }
    ticketBatch?: { id: number }
    meta?: { sendEmailConfirmation: boolean }
  }
  relationships(): {
    event: EventPresenter
    ticketBatch: TicketBatchPresenter
  }
}

export interface WebhookPresenter extends BasePresenter {
  type: 'webhook'
  plural: 'webhooks'
  attributes(
    _webhook: Webhook & {
      eventId?: number
      workspaceId?: number
    },
  ): Webhook & {
    event?: { id: number }
    workspace?: { id: number }
  }
  relationships(): {
    event: EventPresenter
    workspace: WorkspacePresenter
  }
}

export interface WorkspacePresenter extends BasePresenter {
  type: 'workspace'
  plural: 'workspaces'
}

export interface TicketBatchPresenter extends BasePresenter {
  type: 'ticketBatch'
  plural: 'ticketBatches'
}

export interface PaymentPresenter extends BasePresenter {
  type: 'payment'
  plural: 'payments'
}

// Presenters collection type
export interface Presenters {
  webhooks: WebhookPresenter
  events: EventPresenter
  workspaces: WorkspacePresenter
  contacts: ContactPresenter
  tickets: TicketPresenter
  ticketBatches: TicketBatchPresenter
  categories: CategoryPresenter
  payments: PaymentPresenter
}
