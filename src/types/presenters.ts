// Presenter types for Confetti API

import type { YaysonResult } from 'yayson'
import { Ticket, Webhook } from './models.js'

// Base presenter class type from yayson
export type YaysonPresenter = YaysonResult['Presenter']

// Base presenter interface - describes a constructor type with static properties and methods
export interface BasePresenter {
  new (): {
    attributes?(_data: unknown): unknown
    relationships?(): Record<string, unknown>
  }
  type: string
  plural: string
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
  AddonPresenter: AddonPresenter
  TicketBatchPresenter: TicketBatchPresenter
  PaymentPresenter: PaymentPresenter
  PagePresenter: PagePresenter
  BlockPresenter: BlockPresenter
  ImagePresenter: ImagePresenter
  FormPresenter: FormPresenter
  FormFieldPresenter: FormFieldPresenter
  SpeakerPresenter: SpeakerPresenter
  OrganiserPresenter: OrganiserPresenter
  ScheduleItemPresenter: ScheduleItemPresenter
  SponsorPresenter: SponsorPresenter
  SponsorLevelPresenter: SponsorLevelPresenter
}

// Specific presenter types
export interface CategoryPresenter extends BasePresenter {
  type: 'category'
  plural: 'categories'
}

export interface ContactPresenter extends BasePresenter {
  type: 'contact'
  plural: 'contacts'
  new (): {
    attributes(_contact: Record<string, unknown>): Record<string, unknown>
    relationships(): {
      workspace: WorkspacePresenter
      categories: CategoryPresenter
    }
  }
}

export interface EventPresenter extends BasePresenter {
  type: 'event'
  plural: 'events'
}

export interface AddonPresenter extends BasePresenter {
  type: 'addon'
  plural: 'addons'
}

export interface TicketPresenter extends BasePresenter {
  type: 'ticket'
  plural: 'tickets'
  new (): {
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
      addons: AddonPresenter
    }
  }
}

export interface WebhookPresenter extends BasePresenter {
  type: 'webhook'
  plural: 'webhooks'
  new (): {
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

export interface PagePresenter extends BasePresenter {
  type: 'page'
  plural: 'pages'
}

export interface BlockPresenter extends BasePresenter {
  type: 'block'
  plural: 'blocks'
}

export interface ImagePresenter extends BasePresenter {
  type: 'image'
  plural: 'images'
}

export interface FormPresenter extends BasePresenter {
  type: 'form'
  plural: 'forms'
}

export interface FormFieldPresenter extends BasePresenter {
  type: 'formField'
  plural: 'formFields'
}

export interface SpeakerPresenter extends BasePresenter {
  type: 'speaker'
  plural: 'speakers'
}

export interface OrganiserPresenter extends BasePresenter {
  type: 'organiser'
  plural: 'organisers'
}

export interface ScheduleItemPresenter extends BasePresenter {
  type: 'scheduleItem'
  plural: 'scheduleItems'
}

export interface SponsorPresenter extends BasePresenter {
  type: 'sponsor'
  plural: 'sponsors'
}

export interface SponsorLevelPresenter extends BasePresenter {
  type: 'sponsorLevel'
  plural: 'sponsorLevels'
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
  addons: AddonPresenter
  pages: PagePresenter
  blocks: BlockPresenter
  images: ImagePresenter
  forms: FormPresenter
  formFields: FormFieldPresenter
  speakers: SpeakerPresenter
  organisers: OrganiserPresenter
  scheduleItems: ScheduleItemPresenter
  sponsors: SponsorPresenter
  sponsorLevels: SponsorLevelPresenter
}
