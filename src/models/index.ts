import block from './block.js'
import category from './category.js'
import contact from './contact.js'
import event from './event.js'
import image from './image.js'
import page from './page.js'
import payment from './payment.js'
import ticket from './ticket.js'
import webhook from './webhook.js'
import workspace from './workspace.js'
import ticketBatch from './ticket-batch.js'
import scheduleItem from './schedule-item.js'
import speaker from './speaker.js'

export type { Category } from '../schemas/category.js'
export type { Contact, ContactCreate } from '../schemas/contact.js'
export type { Event } from '../schemas/event.js'
export type { Ticket, TicketCreate } from '../schemas/ticket.js'
export type { Payment } from '../schemas/payment.js'
export type { Webhook, WebhookCreate } from '../schemas/webhook.js'
export type { Workspace } from '../schemas/workspace.js'
export type { TicketBatch } from '../schemas/ticket-batch.js'
export type { Block } from '../schemas/block.js'
export type { Image } from '../schemas/image.js'
export type { Page } from '../schemas/page.js'
export type { ScheduleItem } from '../schemas/schedule-item.js'
export type { Speaker } from '../schemas/speaker.js'

export default {
  block: block(),
  category: category(),
  contact: contact(),
  event: event(),
  image: image(),
  page: page(),
  payment: payment(),
  ticket: ticket(),
  webhook: webhook(),
  workspace: workspace(),
  ticketBatch: ticketBatch(),
  scheduleItem: scheduleItem(),
  speaker: speaker(),
}
