import { z } from 'zod'
import {
  baseFindAllOptionsSchema,
  baseOptionsSchema,
  findBaseOptionsSchema,
  staticBaseFindAllOptionsSchema,
  staticBaseFindOptionsSchema,
} from './resource-options.js'

const messageTypes = ['email', 'sms'] as const
const messageStatuses = ['draft', 'scheduled', 'send-now', 'sent'] as const
const standardEmailTypes = ['rsvp-welcome', 'ticket', 'addon', 'receipt', 'invite', 'decline', 'thank-you'] as const

const pageReference = z.union([z.number(), z.string()]).nullable().optional()

export const MessageGroupsSchema = z
  .looseObject({
    sendBasedOn: z.enum(['status', 'ticketBatch', 'checkIn', 'addonBatch']).nullable().optional().meta({
      label: 'Send based on',
      description: 'How recipients are picked. Status, ticket batches, check-in or add-ons cannot be combined.',
    }),
    attending: z.boolean().nullable().optional().meta({ label: 'Attending' }),
    waitlist: z.boolean().nullable().optional().meta({ label: 'Waitlist' }),
    invited: z.boolean().nullable().optional().meta({ label: 'Invited' }),
    declined: z.boolean().nullable().optional().meta({ label: 'Declined' }),
    checkedIn: z.boolean().nullable().optional().meta({ label: 'Checked in' }),
    onlyNotCheckedIn: z.boolean().nullable().optional().meta({ label: 'Only not checked in' }),
    ticketBatches: z.array(z.number()).nullable().optional().meta({ label: 'Ticket batch IDs' }),
    addonBatches: z.array(z.number()).nullable().optional().meta({ label: 'Add-on batch IDs' }),
    values: z
      .record(z.string(), z.union([z.string(), z.array(z.string())]))
      .nullable()
      .optional()
      .meta({
        label: 'Form answers',
        description: 'Only attendees with these form answers, keyed by form field name.',
      }),
  })
  .meta({ label: 'Recipients', description: 'Which attendees of the event receive the message.' })

export const MessageContentSchema = z
  .looseObject({
    subject: z.string().nullable().optional().meta({ label: 'Subject', description: 'Email subject line.' }),
    headline: z.string().nullable().optional().meta({ label: 'Headline', description: 'Heading above the body.' }),
    message: z.string().nullable().optional().meta({
      label: 'Body',
      description:
        'Email body as HTML (p, h2, h3, strong, em, a, ul, ol, li, br). Variables: {{firstName}}, {{lastName}}, {{name}}, {{email}}, {{event.name}}, {{organisation.name}}.',
    }),
    smsBody: z.string().nullable().optional().meta({
      label: 'SMS text',
      description: 'Plain text for SMS messages. {{ticketLink}} inserts a link to the ticket.',
    }),
    name: z.string().nullable().optional().meta({ label: 'Name', description: 'Internal name of the message.' }),
    reason: z.string().nullable().optional().meta({
      label: 'Reason',
      description: 'Footer text explaining why the recipient gets the email.',
    }),
    buttonEventEnabled: z.boolean().nullable().optional().meta({ label: 'Show event button' }),
    buttonEventText: z.string().nullable().optional().meta({ label: 'Event button text' }),
    buttonEventPageId: pageReference.meta({
      label: 'Event button page',
      description: 'Page the event button links to.',
    }),
    buttonTicketEnabled: z.boolean().nullable().optional().meta({ label: 'Show ticket button' }),
    buttonTicketText: z.string().nullable().optional().meta({ label: 'Ticket button text' }),
    buttonTicketPage: pageReference.meta({
      label: 'Ticket button page',
      description: "Where the ticket button goes: 'form' for the registration form, or a page ID.",
    }),
    locationAndCalendarEnabled: z.boolean().nullable().optional().meta({ label: 'Show location and calendar' }),
    showQRCode: z
      .boolean()
      .nullable()
      .optional()
      .meta({ label: 'Show QR code', description: 'Attending and waitlist only.' }),
    embeddedForm: pageReference.meta({ label: 'Embedded form', description: 'ID of a form to embed in the email.' }),
    standardOverload: z.enum(standardEmailTypes).nullable().optional().meta({
      label: 'Replaces standard email',
      description:
        'With isTemplate, which automatic email this message replaces. ticket and addon need groups.ticketBatches or groups.addonBatches.',
    }),
    groups: MessageGroupsSchema.nullable().optional(),
    eventIds: z.array(z.number()).nullable().optional().meta({
      label: 'Event IDs',
      description: 'Workspace messages: contacts who attended these events.',
    }),
    categoriesIds: z.array(z.number()).nullable().optional().meta({
      label: 'Category IDs',
      description: 'Workspace messages: contacts in these categories.',
    }),
    operator: z.enum(['and', 'or']).nullable().optional().meta({
      label: 'Operator',
      description: 'Workspace messages: combine eventIds and categoriesIds with and/or.',
    }),
  })
  .meta({ label: 'Content' })

export const MessageSchema = z.object({
  id: z.number().meta({ label: 'ID' }),
  type: z.enum(messageTypes).meta({ label: 'Type' }),
  status: z.enum(messageStatuses).meta({ label: 'Status' }),
  isTemplate: z.boolean().meta({ label: 'Is template' }),
  content: MessageContentSchema,
  scheduledAt: z.date().nullable().meta({ label: 'Scheduled at' }),
  sentAt: z.date().nullable().meta({ label: 'Sent at' }),
  eventId: z.number().nullable().meta({ label: 'Event Id' }),
  workspaceId: z.number().nullable().meta({ label: 'Workspace Id' }),
  imageId: z.number().nullable().meta({ label: 'Header image Id' }),
  createdAt: z.date().meta({ label: 'Created at' }),
  updatedAt: z.date().meta({ label: 'Updated at' }),
})

export const MessageCreateSchema = z.object({
  type: z.enum(messageTypes).optional().meta({ label: 'Type', description: 'email (default) or sms.' }),
  eventId: z.number().optional().meta({
    label: 'Event Id',
    description: 'Event the message belongs to. Set either eventId or workspaceId.',
  }),
  workspaceId: z.number().optional().meta({
    label: 'Workspace Id',
    description: 'Workspace the message belongs to, for messages to contacts. Set either eventId or workspaceId.',
  }),
  isTemplate: z.boolean().optional().meta({
    label: 'Is template',
    description:
      'Replace a standard email (welcome, ticket, thank-you…) with this message, chosen by content.standardOverload. It is used for the next automatic email right away.',
  }),
  imageId: z.number().nullable().optional().meta({ label: 'Header image Id' }),
  content: MessageContentSchema.optional(),
})

export const MessageUpdateSchema = MessageCreateSchema.omit({ eventId: true, workspaceId: true }).partial()

const messagesFindAllSchema = {
  filter: z.object({
    eventId: z.coerce.number().optional(),
    workspaceId: z.coerce.number().optional(),
    status: z.enum(messageStatuses).optional(),
  }),
  sort: z.never().optional(),
  include: z.never().optional(),
}

export const messagesFindAllOptionsSchema = baseFindAllOptionsSchema.extend(messagesFindAllSchema)
export const messagesFindOptionsSchema = findBaseOptionsSchema.extend({})

export const staticMessagesFindAllOptionsSchema = staticBaseFindAllOptionsSchema.extend(messagesFindAllSchema)
export const staticMessagesFindOptionsSchema = staticBaseFindOptionsSchema.extend({})
export const staticMessagesCreateOptionsSchema = staticBaseFindAllOptionsSchema.extend({})
export const staticMessagesUpdateOptionsSchema = staticBaseFindAllOptionsSchema.extend({})

export type Message = z.infer<typeof MessageSchema>
export type MessageContent = z.infer<typeof MessageContentSchema>
export type MessageCreate = z.infer<typeof MessageCreateSchema>
export type MessageCreateData = MessageCreate
export type MessageUpdate = z.infer<typeof MessageUpdateSchema>
export type MessageUpdateData = MessageUpdate
export type MessagesFindAllOptions = z.infer<typeof messagesFindAllOptionsSchema>
export type MessagesFindOptions = z.infer<typeof messagesFindOptionsSchema>
export type MessagesCreateOptions = z.infer<typeof baseOptionsSchema>
export type MessagesUpdateOptions = z.infer<typeof baseOptionsSchema>
export type StaticMessagesFindAllOptions = z.infer<typeof staticMessagesFindAllOptionsSchema>
export type StaticMessagesFindOptions = z.infer<typeof staticMessagesFindOptionsSchema>
export type StaticMessagesCreateOptions = z.infer<typeof staticMessagesCreateOptionsSchema>
export type StaticMessagesUpdateOptions = z.infer<typeof staticMessagesUpdateOptionsSchema>
