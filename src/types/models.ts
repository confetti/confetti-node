// Model types for Confetti API - Generated from Zod schemas

import type { Category } from '../schemas/category.js'
import type { Contact, ContactCreate } from '../schemas/contact.js'
import type { Event, EventCreate, EventUpdate } from '../schemas/event.js'
import type { Ticket, TicketCreate, TicketUpdate } from '../schemas/ticket.js'
import type { Payment } from '../schemas/payment.js'
import type { Webhook, WebhookCreate } from '../schemas/webhook.js'
import type { Workspace } from '../schemas/workspace.js'
import type { TicketBatch } from '../schemas/ticket-batch.js'
import type { Block, BlockCreate, BlockUpdate } from '../schemas/block.js'
import type { Image, ImageCreate, ImageUpdate } from '../schemas/image.js'
import type { Page, PageCreate, PageUpdate } from '../schemas/page.js'
import type { ScheduleItem, ScheduleItemCreate, ScheduleItemUpdate } from '../schemas/schedule-item.js'
import type { Speaker, SpeakerCreate, SpeakerUpdate } from '../schemas/speaker.js'
import type { Organiser, OrganiserCreate, OrganiserUpdate } from '../schemas/organiser.js'
import type { Addon } from '../schemas/addon.js'
import type { Form } from '../schemas/form.js'
import type { FormField } from '../schemas/form-field.js'
import type { Sponsor, SponsorCreate, SponsorUpdate } from '../schemas/sponsor.js'
import type { SponsorLevel, SponsorLevelCreate, SponsorLevelUpdate } from '../schemas/sponsor-level.js'

// Re-export all model types
export type {
  Category,
  Contact,
  ContactCreate,
  Event,
  EventCreate,
  EventUpdate,
  Ticket,
  TicketCreate,
  TicketUpdate,
  Payment,
  Webhook,
  WebhookCreate,
  Workspace,
  TicketBatch,
  Block,
  BlockCreate,
  BlockUpdate,
  Image,
  ImageCreate,
  ImageUpdate,
  Page,
  PageCreate,
  PageUpdate,
  ScheduleItem,
  ScheduleItemCreate,
  ScheduleItemUpdate,
  Speaker,
  SpeakerCreate,
  SpeakerUpdate,
  Organiser,
  OrganiserCreate,
  OrganiserUpdate,
  Addon,
  Form,
  FormField,
  Sponsor,
  SponsorCreate,
  SponsorUpdate,
  SponsorLevel,
  SponsorLevelCreate,
  SponsorLevelUpdate,
}

// Union type for all models
export type ConfettiModel =
  | Category
  | Contact
  | Event
  | Ticket
  | Payment
  | Webhook
  | Workspace
  | TicketBatch
  | Block
  | Image
  | Page
  | ScheduleItem
  | Speaker
  | Organiser
  | Addon
  | Form
  | FormField
  | Sponsor
  | SponsorLevel
