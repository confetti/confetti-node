import { z } from 'zod'
import {
  baseFindAllOptionsSchema,
  baseOptionsSchema,
  findBaseOptionsSchema,
  staticBaseFindAllOptionsSchema,
  staticBaseFindOptionsSchema,
} from './resource-options.js'

export const EventSchema = z.object({
  id: z.number().describe(
    JSON.stringify({
      label: 'ID',
      description: 'Identifier of the event.',
    }),
  ),
  name: z.string().describe(
    JSON.stringify({
      label: 'Name',
      description: 'Event name',
    }),
  ),
  startDate: z.date().describe(
    JSON.stringify({
      label: 'Start Date',
    }),
  ),
  endDate: z.date().describe(
    JSON.stringify({
      label: 'End Date',
    }),
  ),
  timeZone: z.string().describe(
    JSON.stringify({
      label: 'Time Zone',
    }),
  ),
  slug: z.string().describe(
    JSON.stringify({
      label: 'Slug',
    }),
  ),
  status: z.string().describe(
    JSON.stringify({
      label: 'Status',
    }),
  ),
  featureLevel: z.string().describe(
    JSON.stringify({
      label: 'Feature Level',
    }),
  ),
  signupType: z.string().describe(
    JSON.stringify({
      label: 'Signup Type',
    }),
  ),
  signupStartAt: z.date().describe(
    JSON.stringify({
      label: 'Signup Start At',
    }),
  ),
  signupEndAt: z.date().describe(
    JSON.stringify({
      label: 'Signup End At',
    }),
  ),
  website: z.string().describe(
    JSON.stringify({
      label: 'Website',
    }),
  ),
  email: z.string().describe(
    JSON.stringify({
      label: 'Email',
    }),
  ),
  rsvpLimit: z.number().describe(
    JSON.stringify({
      label: 'Rsvp Limit',
    }),
  ),
  rsvpLeft: z.number().describe(
    JSON.stringify({
      label: 'Rsvp Left',
    }),
  ),
  waitlisted: z.number().describe(
    JSON.stringify({
      label: 'Waitlisted',
    }),
  ),
  hasPassed: z.boolean().describe(
    JSON.stringify({
      label: 'Has Passed',
    }),
  ),
  createdAt: z.date().describe(
    JSON.stringify({
      label: 'Created At',
    }),
  ),
  updatedAt: z.date().describe(
    JSON.stringify({
      label: 'Updated At',
    }),
  ),
  workspaceId: z.number().describe(
    JSON.stringify({
      label: 'Workspace Id',
    }),
  ),
  shareTitle: z.string().describe(
    JSON.stringify({
      label: 'ShareTitle',
    }),
  ),
  shareDescription: z.string().describe(
    JSON.stringify({
      label: 'Share description',
    }),
  ),
  summary: z.string().describe(
    JSON.stringify({
      label: 'Summary',
    }),
  ),
  timeFormat: z.string().describe(
    JSON.stringify({
      label: 'Time format',
    }),
  ),
  locale: z.string().describe(
    JSON.stringify({
      label: 'Locale',
    }),
  ),
  primaryColor: z.string().describe(
    JSON.stringify({
      label: 'Primary color',
    }),
  ),
  contrastColor: z.string().describe(
    JSON.stringify({
      label: 'Contrast color',
    }),
  ),
  waitlist: z.string().describe(
    JSON.stringify({
      label: 'Has a waitlist',
    }),
  ),
  enableExtraGuests: z.boolean().describe(
    JSON.stringify({
      label: 'Are people allowed to bring guests',
    }),
  ),
  maxExtraGuests: z.number().describe(
    JSON.stringify({
      label: 'How many extra guests',
    }),
  ),
  location: z.looseObject({}).describe(
    JSON.stringify({
      label: 'Location',
    }),
  ),
})

// Core + copy fields a client can send when creating/updating an event.
// Excludes feature-level, financial, settings and password/otp fields.
export const EventCreateSchema = z.object({
  name: z.string().describe(JSON.stringify({ label: 'Name' })),
  startDate: z
    .union([z.date(), z.string()])
    .describe(JSON.stringify({ label: 'Start Date' })),
  endDate: z
    .union([z.date(), z.string()])
    .optional()
    .describe(JSON.stringify({ label: 'End Date' })),
  status: z.string().optional().describe(JSON.stringify({ label: 'Status' })),
  signupType: z
    .enum(['rsvp', 'tickets'])
    .optional()
    .describe(JSON.stringify({ label: 'Signup Type' })),
  signupStartAt: z
    .union([z.date(), z.string()])
    .optional()
    .describe(JSON.stringify({ label: 'Signup Start At' })),
  signupEndAt: z
    .union([z.date(), z.string()])
    .optional()
    .describe(JSON.stringify({ label: 'Signup End At' })),
  rsvpLimit: z.number().optional().describe(JSON.stringify({ label: 'Rsvp Limit' })),
  email: z.string().optional().describe(JSON.stringify({ label: 'Email' })),
  website: z.string().optional().describe(JSON.stringify({ label: 'Website' })),
  timeZone: z.string().optional().describe(JSON.stringify({ label: 'Time Zone' })),
  continuous: z.boolean().optional().describe(JSON.stringify({ label: 'Continuous' })),
  slug: z.string().optional().describe(JSON.stringify({ label: 'Slug' })),
  // copy fields (branding/customisation)
  primaryColor: z.string().optional().describe(JSON.stringify({ label: 'Primary color' })),
  contrastColor: z.string().optional().describe(JSON.stringify({ label: 'Contrast color' })),
  shareTitle: z.string().optional().describe(JSON.stringify({ label: 'Share title' })),
  shareDescription: z.string().optional().describe(JSON.stringify({ label: 'Share description' })),
  summary: z.string().optional().describe(JSON.stringify({ label: 'Summary' })),
  smsSenderName: z.string().optional().describe(JSON.stringify({ label: 'SMS sender name' })),
  ticketsPerPurchase: z
    .number()
    .optional()
    .describe(JSON.stringify({ label: 'Tickets per purchase' })),
  locationName: z.string().optional().describe(JSON.stringify({ label: 'Location name' })),
  workspaceId: z
    .number()
    .optional()
    .describe(JSON.stringify({ label: 'Workspace Id' })),
})

// All fields are optional on update; you only patch what changed.
export const EventUpdateSchema = EventCreateSchema.partial()

const eventsFindAllSchema = {
  filter: z
    .object({
      signupType: z
        .enum(['rsvp', 'tickets'])
        .describe(
          JSON.stringify({
            label: 'Signup Type',
            description: 'Filter events by signup type',
            values: [
              {
                label: 'RSVP',
                description: 'Events with signup type RSVP',
                type: 'string',
                key: 'rsvp',
                value: 'rsvp',
              },
              {
                label: 'Tickets',
                description: 'Events with signup type tickets',
                type: 'string',
                key: 'tickets',
                value: 'tickets',
              },
            ],
          }),
        )
        .optional(),
      type: z
        .enum(['future', 'past'])
        .describe(
          JSON.stringify({
            label: 'Event Type',
            description: 'Filter events by time',
            values: [
              {
                label: 'Future',
                description: 'Upcoming events',
                type: 'string',
                key: 'future',
                value: 'future',
              },
              {
                label: 'Past',
                description: 'Completed events',
                type: 'string',
                key: 'past',
                value: 'past',
              },
            ],
          }),
        )
        .optional(),
    })
    .optional(),
  sort: z.never().optional(),
  include: z
    .array(
      z
        .enum([
          'categories',
          'pages',
          'pages.blocks',
          'pages.blocks.images',
          'schedule-items',
          'speakers',
          'speakers.image',
          'organisers',
          'organisers.image',
        ])
        .describe(
          JSON.stringify({
            label: 'Include Relations',
            description: 'Include related data',
            values: [
              {
                label: 'Categories',
                description: 'Event categories',
                type: 'string',
                key: 'categories',
                value: 'categories',
              },
              {
                label: 'Pages',
                description: 'Event pages',
                type: 'string',
                key: 'pages',
                value: 'pages',
              },
              {
                label: 'Pages Blocks',
                description: 'Page content blocks',
                type: 'string',
                key: 'pages.blocks',
                value: 'pages.blocks',
              },
              {
                label: 'Pages Blocks Images',
                description: 'Block images',
                type: 'string',
                key: 'pages.blocks.images',
                value: 'pages.blocks.images',
              },
              {
                label: 'Schedule Items',
                description: 'Event schedule items',
                type: 'string',
                key: 'schedule-items',
                value: 'schedule-items',
              },
              {
                label: 'Speakers',
                description: 'Event speakers',
                type: 'string',
                key: 'speakers',
                value: 'speakers',
              },
              {
                label: 'Speakers Image',
                description: 'Speakers image',
                type: 'string',
                key: 'speakers.image',
                value: 'speakers.image',
              },
              {
                label: 'Organisers',
                description: 'Event organisers',
                type: 'string',
                key: 'organisers',
                value: 'organisers',
              },
              {
                label: 'Organisers Image',
                description: 'Organisers image',
                type: 'string',
                key: 'organisers.image',
                value: 'organisers.image',
              },
            ],
          }),
        ),
    )
    .optional(),
}

export const eventsFindAllOptionsSchema = baseFindAllOptionsSchema.extend(eventsFindAllSchema)
export const eventsFindOptionsSchema = findBaseOptionsSchema.extend({})

export const staticEventsFindAllOptionsSchema = staticBaseFindAllOptionsSchema.extend(eventsFindAllSchema)
export const staticEventsFindOptionsSchema = staticBaseFindOptionsSchema.extend({})
export const staticEventsCreateOptionsSchema = staticBaseFindAllOptionsSchema.extend({})
export const staticEventsUpdateOptionsSchema = staticBaseFindAllOptionsSchema.extend({})

export type Event = z.infer<typeof EventSchema>
export type EventCreate = z.infer<typeof EventCreateSchema>
export type EventCreateData = z.infer<typeof EventCreateSchema>
export type EventUpdate = z.infer<typeof EventUpdateSchema>
export type EventUpdateData = z.infer<typeof EventUpdateSchema>
export type EventsFindAllOptions = z.infer<typeof eventsFindAllOptionsSchema>
export type EventsFindOptions = z.infer<typeof eventsFindOptionsSchema>
export type EventsCreateOptions = z.infer<typeof baseOptionsSchema>
export type EventsUpdateOptions = z.infer<typeof baseOptionsSchema>
export type StaticEventsFindAllOptions = z.infer<typeof staticEventsFindAllOptionsSchema>
export type StaticEventsFindOptions = z.infer<typeof staticEventsFindOptionsSchema>
export type StaticEventsCreateOptions = z.infer<typeof staticEventsCreateOptionsSchema>
export type StaticEventsUpdateOptions = z.infer<typeof staticEventsUpdateOptionsSchema>
