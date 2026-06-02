import { z } from 'zod'
import {
  baseFindAllOptionsSchema,
  staticBaseFindAllOptionsSchema,
  baseOptionsSchema,
  staticBaseFindOptionsSchema,
  findBaseOptionsSchema,
} from './resource-options.js'

export const TicketSchema = z.object({
  id: z.number().meta({
    label: 'ID',
    description: 'Identifier of the ticket.',
  }),
  persons: z.number().meta({
    label: 'Persons',
  }),
  hashid: z.string().meta({
    label: 'Hashid',
  }),
  description: z.string().meta({
    label: 'Description',
  }),
  price: z.number().meta({
    label: 'Price',
  }),
  currency: z.string().meta({
    label: 'Currency',
  }),
  firstName: z.string().meta({
    label: 'First name',
  }),
  lastName: z.string().meta({
    label: 'Last name',
  }),
  name: z.string().meta({
    label: 'Name',
  }),
  email: z.string().meta({
    label: 'Email',
  }),
  phone: z.string().meta({
    label: 'Phone',
  }),
  company: z.string().meta({
    label: 'Company',
  }),
  token: z.string().meta({
    label: 'Token',
  }),
  status: z.string().meta({
    label: 'Status',
  }),
  emailStatus: z.string().meta({
    label: 'Email Status',
  }),
  checkinAt: z.date().meta({
    label: 'Checkin At',
  }),
  waitlistAt: z.date().meta({
    label: 'Waitlist At',
  }),
  startDate: z.date().meta({
    label: 'Start Date',
  }),
  endDate: z.date().meta({
    label: 'End Date',
  }),
  values: z.looseObject({}).meta({
    label: 'Values',
    description:
      'Raw form field answers as a flat object keyed by field name (e.g. {"dietary-needs": "Vegan"}). Contains only answers — use ?include=formattedValues to get titles and field metadata alongside each answer.',
  }),
  comment: z.string().meta({
    label: 'Comment',
    description: 'Internal note visible only to workspace teammates in Confetti. Not shown to attendees.',
  }),
  guests: z.number().meta({
    label: 'Guests',
  }),
  termsAcceptedAt: z.date().meta({
    label: 'Terms Accepted At',
  }),
  deletionRequestedAt: z.date().meta({
    label: 'Deletion Requested At',
  }),
  createdAt: z.date().meta({
    label: 'Created At',
  }),
  updatedAt: z.date().meta({
    label: 'Updated At',
  }),
  ticketBatchId: z.number().meta({
    label: 'Ticket Batch Id',
  }),
  paymentId: z.number().meta({
    label: 'Payment Id',
  }),
  eventId: z.number().meta({
    label: 'Event Id',
  }),
  contactId: z.number().meta({
    label: 'Contact Id',
  }),
  formattedValues: z.array(z.looseObject({})).optional().meta({
    label: 'Formatted Values',
    description:
      'Form field answers with question titles and field IDs. Each entry has formFieldId, title (the question), and value (the answer). Only present when ?include=formattedValues is requested. Use this instead of raw values when you need to display or interpret form responses.',
  }),
})

// A guest ticket attached to a parent ticket. Guests are child tickets, written inline as
// an array on the parent's create/update payload (mirrors the admin API's data.guestTickets).
// Omit `id` to add a new guest; include the existing guest's `id` to edit it. Removing a
// guest is done by deleting that guest's ticket, not by omitting it from the array.
export const GuestTicketInputSchema = z.object({
  id: z.coerce.number().optional().meta({
    label: 'Guest Ticket Id',
    helpText: 'Id of an existing guest ticket to edit. Omit to add a new guest.',
  }),
  firstName: z.string().optional().meta({ label: 'First name' }),
  lastName: z.string().optional().meta({ label: 'Last name' }),
  email: z.string().email().optional().meta({ label: 'Email' }),
  phone: z.string().optional().meta({ label: 'Phone' }),
  company: z.string().optional().meta({ label: 'Company' }),
  values: z.looseObject({}).optional().meta({ label: 'Values' }),
})

export const TicketCreateSchema = z.object({
  eventId: z.coerce.number().meta({
    label: 'Event Id',
  }),
  ticketBatchId: z.coerce.number().optional().meta({
    label: 'Ticket Batch Id',
    helpText: 'Required for ticket events',
  }),
  firstName: z.string().optional().meta({
    label: 'First name',
  }),
  lastName: z.string().optional().meta({
    label: 'Last name',
  }),
  email: z.string().email().meta({
    label: 'Email',
  }),
  status: z
    .union([
      z.string().refine(
        (val) => {
          const values = val.split(',').map((v) => v.trim())
          return values.every((v) => v === 'attending' || v === 'invited')
        },
        { message: 'Status must be "attending", "invited", or a comma-separated list of these values' },
      ),
      z.array(z.enum(['attending', 'invited'])),
    ])
    .meta({
      label: 'Status',
      values: ['attending', 'invited'],
    }),
  phone: z.string().optional().meta({
    label: 'Phone',
    placeholder: '+46 12 345 67 89',
    helpText: 'Mobile phone number with country code. Example: +46701234567',
  }),
  company: z.string().optional().meta({
    label: 'Company',
  }),
  comment: z.string().optional().meta({
    label: 'Comment',
    description: 'Internal note visible only to workspace teammates. Not shown to attendees.',
  }),
  values: z.looseObject({}).optional().meta({
    label: 'Values',
    description:
      'Raw form field answers keyed by field name (e.g. {"dietary-needs": "Vegan"}). Agents using MCP should prefer passing formValues, which resolves field titles or IDs to field names automatically.',
  }),
  sendEmailConfirmation: z.boolean().meta({
    label: 'Send email confirmation',
    helpText: 'If set to true, an email confirmation will be sent to the attendee / invitee.',
  }),
  guestTickets: z.array(GuestTicketInputSchema).optional().meta({
    label: 'Guest Tickets',
    description:
      'Guests attached to this ticket, as an array of guest people. Each guest becomes a child ticket. Requires the event to have guest info enabled.',
  }),
})

export const TicketUpdateSchema = z.object({
  firstName: z.string().optional().meta({ label: 'First name' }),
  lastName: z.string().optional().meta({ label: 'Last name' }),
  email: z.string().email({ message: 'Email is not a valid email' }).optional().meta({ label: 'Email' }),
  status: z
    .string()
    .superRefine((val, ctx) => {
      if (!['invited', 'attending'].includes(val)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: `${val} is not included in the list` })
      }
    })
    .optional()
    .meta({
      label: 'Status',
      values: ['attending', 'invited'],
    }),
  phone: z.string().optional().meta({ label: 'Phone' }),
  company: z.string().optional().meta({ label: 'Company' }),
  comment: z.string().optional().meta({
    label: 'Comment',
    description: 'Internal note visible only to workspace teammates. Not shown to attendees.',
  }),
  guests: z.number().optional().meta({ label: 'Guests' }),
  values: z.looseObject({}).optional().meta({ label: 'Values' }),
  checkinAt: z.union([z.date(), z.string(), z.null()]).optional().meta({ label: 'Checkin At' }),
  ticketBatchId: z.number().optional().meta({ label: 'Ticket Batch Id' }),
  sendEmailConfirmation: z.boolean().optional().meta({
    label: 'Send email confirmation',
    helpText: 'If set to true, an email confirmation will be sent to the attendee.',
  }),
  guestTickets: z.array(GuestTicketInputSchema).optional().meta({
    label: 'Guest Tickets',
    description:
      'Guests attached to this ticket, as an array of guest people. Omit the id to add a guest, include the id to edit an existing one. Removing a guest is done by deleting that guest ticket. Requires the event to have guest info enabled.',
  }),
})

const ticketsFindAllSchema = {
  filter: z.object({
    eventId: z.coerce.number(),
    search: z.string().optional(),
    description: z.string().optional(),
    checkedIn: z.boolean().optional(),
    status: z
      .union([
        z.array(
          z.enum(['attending', 'waitlist', 'declined', 'invited', 'consumed', 'deletion-requested']).meta({
            label: 'Ticket Status',
            description: 'Filter tickets by status',
            values: [
              {
                label: 'Attending',
                description: 'Tickets for attendees',
                type: 'string',
                key: 'attending',
                value: 'attending',
              },
              {
                label: 'Waitlist',
                description: 'Tickets on waitlist',
                type: 'string',
                key: 'waitlist',
                value: 'waitlist',
              },
              {
                label: 'Declined',
                description: 'Declined tickets',
                type: 'string',
                key: 'declined',
                value: 'declined',
              },
              {
                label: 'Invited',
                description: 'Invited tickets',
                type: 'string',
                key: 'invited',
                value: 'invited',
              },
              {
                label: 'Consumed',
                description: 'Consumed tickets',
                type: 'string',
                key: 'consumed',
                value: 'consumed',
              },
              {
                label: 'Deletion Requested',
                description: 'Tickets with deletion requested',
                type: 'string',
                key: 'deletion-requested',
                value: 'deletion-requested',
              },
            ],
          }),
        ),
        z.string().refine(
          (val) => {
            const validStatuses = ['attending', 'waitlist', 'declined', 'invited', 'consumed', 'deletion-requested']
            const values = val.split(',').map((v) => v.trim())
            return values.every((v) => validStatuses.includes(v))
          },
          { message: 'Status must be a valid status or a comma-separated list of valid statuses' },
        ),
      ])
      .optional(),
  }),
  sort: z
    .enum(['name', 'createdAt', 'description', 'hashid', 'email', 'status', 'checkinAt'])
    .meta({
      label: 'Sort By',
      description: 'Sort tickets by field',
      values: [
        {
          label: 'Name',
          description: 'Sort by ticket holder name',
          type: 'string',
          key: 'name',
          value: 'name',
        },
        {
          label: 'Created At',
          description: 'Sort by creation date',
          type: 'string',
          key: 'createdAt',
          value: 'createdAt',
        },
        {
          label: 'Description',
          description: 'Sort by description',
          type: 'string',
          key: 'description',
          value: 'description',
        },
        {
          label: 'Hash ID',
          description: 'Sort by hash ID',
          type: 'string',
          key: 'hashid',
          value: 'hashid',
        },
        {
          label: 'Email',
          description: 'Sort by email address',
          type: 'string',
          key: 'email',
          value: 'email',
        },
        {
          label: 'Status',
          description: 'Sort by ticket status',
          type: 'string',
          key: 'status',
          value: 'status',
        },
        {
          label: 'Check-in At',
          description: 'Sort by check-in time',
          type: 'string',
          key: 'checkinAt',
          value: 'checkinAt',
        },
      ],
    })
    .optional(),
  include: z
    .array(
      z.enum(['addons', 'formattedValues', 'parentTicket', 'guestTickets']).meta({
        label: 'Include Relations',
        description: 'Include related data',
        values: [
          {
            label: 'Addons',
            description: 'Ticket addons',
            type: 'string',
            key: 'addons',
            value: 'addons',
          },
          {
            label: 'Formatted Values',
            description:
              'Form field answers with question titles — unlike raw values which only contain answers keyed by field name',
            type: 'string',
            key: 'formattedValues',
            value: 'formattedValues',
          },
          {
            label: 'Parent Ticket',
            description: 'The parent ticket, if this ticket is a guest of another ticket',
            type: 'string',
            key: 'parentTicket',
            value: 'parentTicket',
          },
          {
            label: 'Guest Tickets',
            description: 'The guest tickets belonging to this ticket',
            type: 'string',
            key: 'guestTickets',
            value: 'guestTickets',
          },
        ],
      }),
    )
    .optional(),
}

export const ticketsFindAllOptionsSchema = baseFindAllOptionsSchema.extend(ticketsFindAllSchema)
export const ticketsFindOptionsSchema = findBaseOptionsSchema.extend({})

export const staticTicketsFindAllOptionsSchema = staticBaseFindAllOptionsSchema.extend(ticketsFindAllSchema)
export const staticTicketsFindOptionsSchema = staticBaseFindOptionsSchema.extend({})
export const staticTicketsCreateOptionsSchema = staticBaseFindAllOptionsSchema.extend({})
export const staticTicketsUpdateOptionsSchema = staticBaseFindAllOptionsSchema.extend({})

export type Ticket = z.infer<typeof TicketSchema>
export type TicketCreate = z.infer<typeof TicketCreateSchema>
export type TicketCreateData = TicketCreate
export type TicketUpdate = z.infer<typeof TicketUpdateSchema>
export type TicketUpdateData = TicketUpdate
export type TicketsFindAllOptions = z.infer<typeof ticketsFindAllOptionsSchema>
export type TicketsFindOptions = z.infer<typeof ticketsFindOptionsSchema>
export type TicketsCreateOptions = z.infer<typeof baseOptionsSchema>
export type TicketsUpdateOptions = z.infer<typeof baseOptionsSchema>
export type StaticTicketsFindAllOptions = z.infer<typeof staticTicketsFindAllOptionsSchema>
export type StaticTicketsFindOptions = z.infer<typeof staticTicketsFindOptionsSchema>
export type StaticTicketsCreateOptions = z.infer<typeof staticTicketsCreateOptionsSchema>
export type StaticTicketsUpdateOptions = z.infer<typeof staticTicketsUpdateOptionsSchema>
