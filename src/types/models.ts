// Model types for Confetti API - Generated from Zod schemas

import type { Category } from '../schemas/category.js'
import type { Contact, ContactCreate } from '../schemas/contact.js'
import type { Event, EventCreate, EventUpdate } from '../schemas/event.js'
import type { Ticket, TicketCreate } from '../schemas/ticket.js'
import type { Payment } from '../schemas/payment.js'
import type { Webhook, WebhookCreate } from '../schemas/webhook.js'
import type { Workspace } from '../schemas/workspace.js'
import type { TicketBatch } from '../schemas/ticket-batch.js'
import type { Block, BlockCreate, BlockUpdate } from '../schemas/block.js'
import type { Image, ImageCreate, ImageUpdate } from '../schemas/image.js'
import type { Page, PageCreate, PageUpdate } from '../schemas/page.js'
import type { ScheduleItem } from '../schemas/schedule-item.js'
import type { Speaker } from '../schemas/speaker.js'
import type { Organiser } from '../schemas/organiser.js'
import type { Addon } from '../schemas/addon.js'

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
  Speaker,
  Organiser,
  Addon,
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
