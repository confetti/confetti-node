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
  pagesResource,
  blocksResource,
  imagesResource,
  formsResource,
  formFieldsResource,
  speakersResource,
  organisersResource,
  scheduleItemsResource,
  sponsorsResource,
  sponsorLevelsResource,
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
  EventsCreateOptions,
  EventsUpdateOptions,
  StaticEventsFindAllOptions,
  StaticEventsFindOptions,
  StaticEventsCreateOptions,
  StaticEventsUpdateOptions,
  EventCreateData,
  EventUpdateData,
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
import type {
  PagesFindAllOptions,
  PagesFindOptions,
  PagesCreateOptions,
  PagesUpdateOptions,
  StaticPagesFindAllOptions,
  StaticPagesFindOptions,
  StaticPagesCreateOptions,
  StaticPagesUpdateOptions,
  PageCreateData,
  PageUpdateData,
} from './schemas/page.js'
import type {
  Block,
  BlocksFindAllOptions,
  BlocksFindOptions,
  BlocksCreateOptions,
  BlocksUpdateOptions,
  StaticBlocksFindAllOptions,
  StaticBlocksFindOptions,
  StaticBlocksCreateOptions,
  StaticBlocksUpdateOptions,
  BlockCreateData,
  BlockUpdateData,
} from './schemas/block.js'
import type {
  FormsFindAllOptions,
  FormsFindOptions,
  StaticFormsFindAllOptions,
  StaticFormsFindOptions,
} from './schemas/form.js'
import type {
  FormFieldsFindAllOptions,
  FormFieldsFindOptions,
  FormFieldsCreateOptions,
  FormFieldsUpdateOptions,
  StaticFormFieldsFindAllOptions,
  StaticFormFieldsFindOptions,
  StaticFormFieldsCreateOptions,
  StaticFormFieldsUpdateOptions,
  FormFieldCreateData,
  FormFieldUpdateData,
} from './schemas/form-field.js'
import type {
  ImagesFindAllOptions,
  ImagesFindOptions,
  ImagesCreateOptions,
  ImagesUpdateOptions,
  StaticImagesFindAllOptions,
  StaticImagesFindOptions,
  StaticImagesCreateOptions,
  StaticImagesUpdateOptions,
  ImageCreateData,
  ImageUpdateData,
} from './schemas/image.js'
import type {
  SpeakersFindOptions,
  SpeakersCreateOptions,
  SpeakersUpdateOptions,
  StaticSpeakersFindOptions,
  StaticSpeakersCreateOptions,
  StaticSpeakersUpdateOptions,
  SpeakerCreateData,
  SpeakerUpdateData,
} from './schemas/speaker.js'
import type {
  OrganisersFindOptions,
  OrganisersCreateOptions,
  OrganisersUpdateOptions,
  StaticOrganisersFindOptions,
  StaticOrganisersCreateOptions,
  StaticOrganisersUpdateOptions,
  OrganiserCreateData,
  OrganiserUpdateData,
} from './schemas/organiser.js'
import type {
  ScheduleItemsFindOptions,
  ScheduleItemsCreateOptions,
  ScheduleItemsUpdateOptions,
  StaticScheduleItemsFindOptions,
  StaticScheduleItemsCreateOptions,
  StaticScheduleItemsUpdateOptions,
  ScheduleItemCreateData,
  ScheduleItemUpdateData,
} from './schemas/schedule-item.js'
import type {
  SponsorsFindOptions,
  SponsorsCreateOptions,
  SponsorsUpdateOptions,
  StaticSponsorsFindOptions,
  StaticSponsorsCreateOptions,
  StaticSponsorsUpdateOptions,
  SponsorCreateData,
  SponsorUpdateData,
} from './schemas/sponsor.js'
import type {
  SponsorLevelsFindOptions,
  SponsorLevelsCreateOptions,
  SponsorLevelsUpdateOptions,
  StaticSponsorLevelsFindOptions,
  StaticSponsorLevelsCreateOptions,
  StaticSponsorLevelsUpdateOptions,
  SponsorLevelCreateData,
  SponsorLevelUpdateData,
} from './schemas/sponsor-level.js'

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
    create: (json: EventCreateData, options: EventsCreateOptions = {}) => {
      return eventsResource.create(json, options, this.adapter)
    },
    update: (id: string | number, json: EventUpdateData, options: EventsUpdateOptions = {}) => {
      return eventsResource.update(id, json, options, this.adapter)
    },
  }
  static events = {
    findAll: (options: StaticEventsFindAllOptions) => {
      return eventsResource.findAll(options, adapter(options))
    },
    find: (id: string | number, options: StaticEventsFindOptions) => {
      return eventsResource.find(id, options, adapter(options))
    },
    create: (json: EventCreateData, options: StaticEventsCreateOptions) => {
      return eventsResource.create(json, options, adapter(options))
    },
    update: (id: string | number, json: EventUpdateData, options: StaticEventsUpdateOptions) => {
      return eventsResource.update(id, json, options, adapter(options))
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

  pages = {
    findAll: (options: PagesFindAllOptions = {}) => {
      return pagesResource.findAll(options, this.adapter)
    },
    find: (id: string | number, options: PagesFindOptions = {}) => {
      return pagesResource.find(id, options, this.adapter)
    },
    create: (json: PageCreateData, options: PagesCreateOptions = {}) => {
      return pagesResource.create(json, options, this.adapter)
    },
    update: (id: string | number, json: PageUpdateData, options: PagesUpdateOptions = {}) => {
      return pagesResource.update(id, json, options, this.adapter)
    },
    delete: (id: string | number, options: PagesFindOptions = {}) => {
      return pagesResource.delete(id, options, this.adapter)
    },
  }
  static pages = {
    findAll: (options: StaticPagesFindAllOptions) => {
      return pagesResource.findAll(options, adapter(options))
    },
    find: (id: string | number, options: StaticPagesFindOptions) => {
      return pagesResource.find(id, options, adapter(options))
    },
    create: (json: PageCreateData, options: StaticPagesCreateOptions) => {
      return pagesResource.create(json, options, adapter(options))
    },
    update: (id: string | number, json: PageUpdateData, options: StaticPagesUpdateOptions) => {
      return pagesResource.update(id, json, options, adapter(options))
    },
    delete: (id: string | number, options: StaticPagesFindOptions) => {
      return pagesResource.delete(id, options, adapter(options))
    },
  }

  blocks = {
    findAll: (options: BlocksFindAllOptions = {}): Promise<Block[]> => {
      return blocksResource.findAll(options, this.adapter)
    },
    find: (id: string | number, options: BlocksFindOptions = {}): Promise<Block> => {
      return blocksResource.find(id, options, this.adapter)
    },
    create: (json: BlockCreateData, options: BlocksCreateOptions = {}): Promise<Block> => {
      return blocksResource.create(json, options, this.adapter)
    },
    update: (
      id: string | number,
      json: BlockUpdateData,
      options: BlocksUpdateOptions = {},
    ): Promise<Block> => {
      return blocksResource.update(id, json, options, this.adapter)
    },
    delete: (id: string | number, options: BlocksFindOptions = {}): Promise<void> => {
      return blocksResource.delete(id, options, this.adapter)
    },
  }
  static blocks = {
    findAll: (options: StaticBlocksFindAllOptions): Promise<Block[]> => {
      return blocksResource.findAll(options, adapter(options))
    },
    find: (id: string | number, options: StaticBlocksFindOptions): Promise<Block> => {
      return blocksResource.find(id, options, adapter(options))
    },
    create: (json: BlockCreateData, options: StaticBlocksCreateOptions): Promise<Block> => {
      return blocksResource.create(json, options, adapter(options))
    },
    update: (
      id: string | number,
      json: BlockUpdateData,
      options: StaticBlocksUpdateOptions,
    ): Promise<Block> => {
      return blocksResource.update(id, json, options, adapter(options))
    },
    delete: (id: string | number, options: StaticBlocksFindOptions): Promise<void> => {
      return blocksResource.delete(id, options, adapter(options))
    },
  }

  images = {
    findAll: (options: ImagesFindAllOptions = {}) => {
      return imagesResource.findAll(options, this.adapter)
    },
    find: (id: string | number, options: ImagesFindOptions = {}) => {
      return imagesResource.find(id, options, this.adapter)
    },
    create: (json: ImageCreateData, options: ImagesCreateOptions = {}) => {
      return imagesResource.create(json, options, this.adapter)
    },
    update: (id: string | number, json: ImageUpdateData, options: ImagesUpdateOptions = {}) => {
      return imagesResource.update(id, json, options, this.adapter)
    },
    delete: (id: string | number, options: ImagesFindOptions = {}) => {
      return imagesResource.delete(id, options, this.adapter)
    },
  }
  static images = {
    findAll: (options: StaticImagesFindAllOptions) => {
      return imagesResource.findAll(options, adapter(options))
    },
    find: (id: string | number, options: StaticImagesFindOptions) => {
      return imagesResource.find(id, options, adapter(options))
    },
    create: (json: ImageCreateData, options: StaticImagesCreateOptions) => {
      return imagesResource.create(json, options, adapter(options))
    },
    update: (id: string | number, json: ImageUpdateData, options: StaticImagesUpdateOptions) => {
      return imagesResource.update(id, json, options, adapter(options))
    },
    delete: (id: string | number, options: StaticImagesFindOptions) => {
      return imagesResource.delete(id, options, adapter(options))
    },
  }

  forms = {
    findAll: (options: FormsFindAllOptions) => {
      return formsResource.findAll(options, this.adapter)
    },
    find: (id: string | number, options: FormsFindOptions = {}) => {
      return formsResource.find(id, options, this.adapter)
    },
  }
  static forms = {
    findAll: (options: StaticFormsFindAllOptions) => {
      return formsResource.findAll(options, adapter(options))
    },
    find: (id: string | number, options: StaticFormsFindOptions) => {
      return formsResource.find(id, options, adapter(options))
    },
  }

  formFields = {
    findAll: (options: FormFieldsFindAllOptions) => {
      return formFieldsResource.findAll(options, this.adapter)
    },
    find: (id: string | number, options: FormFieldsFindOptions = {}) => {
      return formFieldsResource.find(id, options, this.adapter)
    },
    create: (json: FormFieldCreateData, options: FormFieldsCreateOptions = {}) => {
      return formFieldsResource.create(json, options, this.adapter)
    },
    update: (id: string | number, json: FormFieldUpdateData, options: FormFieldsUpdateOptions = {}) => {
      return formFieldsResource.update(id, json, options, this.adapter)
    },
    delete: (id: string | number, options: FormFieldsFindOptions = {}) => {
      return formFieldsResource.delete(id, options, this.adapter)
    },
  }
  static formFields = {
    findAll: (options: StaticFormFieldsFindAllOptions) => {
      return formFieldsResource.findAll(options, adapter(options))
    },
    find: (id: string | number, options: StaticFormFieldsFindOptions) => {
      return formFieldsResource.find(id, options, adapter(options))
    },
    create: (json: FormFieldCreateData, options: StaticFormFieldsCreateOptions) => {
      return formFieldsResource.create(json, options, adapter(options))
    },
    update: (id: string | number, json: FormFieldUpdateData, options: StaticFormFieldsUpdateOptions) => {
      return formFieldsResource.update(id, json, options, adapter(options))
    },
    delete: (id: string | number, options: StaticFormFieldsFindOptions) => {
      return formFieldsResource.delete(id, options, adapter(options))
    },
  }

  speakers = {
    find: (id: string | number, options: SpeakersFindOptions = {}) => {
      return speakersResource.find(id, options, this.adapter)
    },
    create: (json: SpeakerCreateData, options: SpeakersCreateOptions = {}) => {
      return speakersResource.create(json, options, this.adapter)
    },
    update: (id: string | number, json: SpeakerUpdateData, options: SpeakersUpdateOptions = {}) => {
      return speakersResource.update(id, json, options, this.adapter)
    },
    delete: (id: string | number, options: SpeakersFindOptions = {}) => {
      return speakersResource.delete(id, options, this.adapter)
    },
  }
  static speakers = {
    find: (id: string | number, options: StaticSpeakersFindOptions) => {
      return speakersResource.find(id, options, adapter(options))
    },
    create: (json: SpeakerCreateData, options: StaticSpeakersCreateOptions) => {
      return speakersResource.create(json, options, adapter(options))
    },
    update: (id: string | number, json: SpeakerUpdateData, options: StaticSpeakersUpdateOptions) => {
      return speakersResource.update(id, json, options, adapter(options))
    },
    delete: (id: string | number, options: StaticSpeakersFindOptions) => {
      return speakersResource.delete(id, options, adapter(options))
    },
  }

  organisers = {
    find: (id: string | number, options: OrganisersFindOptions = {}) => {
      return organisersResource.find(id, options, this.adapter)
    },
    create: (json: OrganiserCreateData, options: OrganisersCreateOptions = {}) => {
      return organisersResource.create(json, options, this.adapter)
    },
    update: (id: string | number, json: OrganiserUpdateData, options: OrganisersUpdateOptions = {}) => {
      return organisersResource.update(id, json, options, this.adapter)
    },
    delete: (id: string | number, options: OrganisersFindOptions = {}) => {
      return organisersResource.delete(id, options, this.adapter)
    },
  }
  static organisers = {
    find: (id: string | number, options: StaticOrganisersFindOptions) => {
      return organisersResource.find(id, options, adapter(options))
    },
    create: (json: OrganiserCreateData, options: StaticOrganisersCreateOptions) => {
      return organisersResource.create(json, options, adapter(options))
    },
    update: (id: string | number, json: OrganiserUpdateData, options: StaticOrganisersUpdateOptions) => {
      return organisersResource.update(id, json, options, adapter(options))
    },
    delete: (id: string | number, options: StaticOrganisersFindOptions) => {
      return organisersResource.delete(id, options, adapter(options))
    },
  }

  scheduleItems = {
    find: (id: string | number, options: ScheduleItemsFindOptions = {}) => {
      return scheduleItemsResource.find(id, options, this.adapter)
    },
    create: (json: ScheduleItemCreateData, options: ScheduleItemsCreateOptions = {}) => {
      return scheduleItemsResource.create(json, options, this.adapter)
    },
    update: (id: string | number, json: ScheduleItemUpdateData, options: ScheduleItemsUpdateOptions = {}) => {
      return scheduleItemsResource.update(id, json, options, this.adapter)
    },
    delete: (id: string | number, options: ScheduleItemsFindOptions = {}) => {
      return scheduleItemsResource.delete(id, options, this.adapter)
    },
  }
  static scheduleItems = {
    find: (id: string | number, options: StaticScheduleItemsFindOptions) => {
      return scheduleItemsResource.find(id, options, adapter(options))
    },
    create: (json: ScheduleItemCreateData, options: StaticScheduleItemsCreateOptions) => {
      return scheduleItemsResource.create(json, options, adapter(options))
    },
    update: (
      id: string | number,
      json: ScheduleItemUpdateData,
      options: StaticScheduleItemsUpdateOptions,
    ) => {
      return scheduleItemsResource.update(id, json, options, adapter(options))
    },
    delete: (id: string | number, options: StaticScheduleItemsFindOptions) => {
      return scheduleItemsResource.delete(id, options, adapter(options))
    },
  }

  sponsors = {
    find: (id: string | number, options: SponsorsFindOptions = {}) => {
      return sponsorsResource.find(id, options, this.adapter)
    },
    create: (json: SponsorCreateData, options: SponsorsCreateOptions = {}) => {
      return sponsorsResource.create(json, options, this.adapter)
    },
    update: (id: string | number, json: SponsorUpdateData, options: SponsorsUpdateOptions = {}) => {
      return sponsorsResource.update(id, json, options, this.adapter)
    },
    delete: (id: string | number, options: SponsorsFindOptions = {}) => {
      return sponsorsResource.delete(id, options, this.adapter)
    },
  }
  static sponsors = {
    find: (id: string | number, options: StaticSponsorsFindOptions) => {
      return sponsorsResource.find(id, options, adapter(options))
    },
    create: (json: SponsorCreateData, options: StaticSponsorsCreateOptions) => {
      return sponsorsResource.create(json, options, adapter(options))
    },
    update: (id: string | number, json: SponsorUpdateData, options: StaticSponsorsUpdateOptions) => {
      return sponsorsResource.update(id, json, options, adapter(options))
    },
    delete: (id: string | number, options: StaticSponsorsFindOptions) => {
      return sponsorsResource.delete(id, options, adapter(options))
    },
  }

  sponsorLevels = {
    find: (id: string | number, options: SponsorLevelsFindOptions = {}) => {
      return sponsorLevelsResource.find(id, options, this.adapter)
    },
    create: (json: SponsorLevelCreateData, options: SponsorLevelsCreateOptions = {}) => {
      return sponsorLevelsResource.create(json, options, this.adapter)
    },
    update: (id: string | number, json: SponsorLevelUpdateData, options: SponsorLevelsUpdateOptions = {}) => {
      return sponsorLevelsResource.update(id, json, options, this.adapter)
    },
    delete: (id: string | number, options: SponsorLevelsFindOptions = {}) => {
      return sponsorLevelsResource.delete(id, options, this.adapter)
    },
  }
  static sponsorLevels = {
    find: (id: string | number, options: StaticSponsorLevelsFindOptions) => {
      return sponsorLevelsResource.find(id, options, adapter(options))
    },
    create: (json: SponsorLevelCreateData, options: StaticSponsorLevelsCreateOptions) => {
      return sponsorLevelsResource.create(json, options, adapter(options))
    },
    update: (
      id: string | number,
      json: SponsorLevelUpdateData,
      options: StaticSponsorLevelsUpdateOptions,
    ) => {
      return sponsorLevelsResource.update(id, json, options, adapter(options))
    },
    delete: (id: string | number, options: StaticSponsorLevelsFindOptions) => {
      return sponsorLevelsResource.delete(id, options, adapter(options))
    },
  }
}

export default Confetti
