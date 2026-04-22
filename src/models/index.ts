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
import organiser from './organiser.js'
import addon from './addon.js'
import form from './form.js'
import formField from './form-field.js'
import sponsor from './sponsor.js'
import sponsorLevel from './sponsor-level.js'

export type { Category } from '../schemas/category.js'
export type { Contact, ContactCreate } from '../schemas/contact.js'
export type { Event, EventCreate, EventUpdate } from '../schemas/event.js'
export type { Ticket, TicketCreate, TicketUpdate } from '../schemas/ticket.js'
export type { Payment } from '../schemas/payment.js'
export type { Webhook, WebhookCreate } from '../schemas/webhook.js'
export type { Workspace } from '../schemas/workspace.js'
export type { TicketBatch } from '../schemas/ticket-batch.js'
export type { Block, BlockCreate, BlockUpdate } from '../schemas/block.js'
export type { Image, ImageCreate, ImageUpdate } from '../schemas/image.js'
export type { Page, PageCreate, PageUpdate } from '../schemas/page.js'
export type { ScheduleItem, ScheduleItemCreate, ScheduleItemUpdate } from '../schemas/schedule-item.js'
export type { Speaker, SpeakerCreate, SpeakerUpdate } from '../schemas/speaker.js'
export type { Organiser, OrganiserCreate, OrganiserUpdate } from '../schemas/organiser.js'
export type { Addon, AddonCreate } from '../schemas/addon.js'
export type { Form } from '../schemas/form.js'
export type { FormField } from '../schemas/form-field.js'
export type { Sponsor, SponsorCreate, SponsorUpdate } from '../schemas/sponsor.js'
export type { SponsorLevel, SponsorLevelCreate, SponsorLevelUpdate } from '../schemas/sponsor-level.js'

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
  organiser: organiser(),
  addon: addon(),
  form: form(),
  formField: formField(),
  sponsor: sponsor(),
  sponsorLevel: sponsorLevel(),
}
