// Model types for Confetti API - Generated from Zod schemas

import type {
  Category,
  Contact,
  ContactCreate,
  Event,
  Ticket,
  TicketCreate,
  Payment,
  Webhook,
  WebhookCreate,
  Workspace,
  TicketBatch,
  Block,
  Image,
  Page,
} from '../models/index.js'

// Re-export all model types
export type {
  Category,
  Contact,
  ContactCreate,
  Event,
  Ticket,
  TicketCreate,
  Payment,
  Webhook,
  WebhookCreate,
  Workspace,
  TicketBatch,
  Block,
  Image,
  Page,
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
