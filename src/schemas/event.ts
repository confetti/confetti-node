import { z } from 'zod'
import {
  baseFindAllOptionsSchema,
  baseOptionsSchema,
  findBaseOptionsSchema,
  staticBaseFindAllOptionsSchema,
  staticBaseFindOptionsSchema,
} from './resource-options.js'

export const EventSchema = z.object({
  id: z.number().meta({
      label: 'ID',
      description: 'Identifier of the event.',
    }),
  name: z.string().meta({
      label: 'Name',
      description: 'Event name',
    }),
  startDate: z.date().meta({
      label: 'Start Date',
    }),
  endDate: z.date().meta({
      label: 'End Date',
    }),
  timeZone: z.string().meta({
      label: 'Time Zone',
    }),
  slug: z.string().meta({
      label: 'Slug',
    }),
  status: z.string().meta({
      label: 'Status',
    }),
  featureLevel: z.string().meta({
      label: 'Feature Level',
    }),
  signupType: z.string().meta({
      label: 'Signup Type',
    }),
  signupStartAt: z.date().meta({
      label: 'Signup Start At',
    }),
  signupEndAt: z.date().meta({
      label: 'Signup End At',
    }),
  website: z.string().meta({
      label: 'Website',
    }),
  email: z.string().meta({
      label: 'Email',
    }),
  rsvpLimit: z.number().meta({
      label: 'Rsvp Limit',
    }),
  rsvpLeft: z.number().meta({
      label: 'Rsvp Left',
    }),
  waitlisted: z.number().meta({
      label: 'Waitlisted',
    }),
  hasPassed: z.boolean().meta({
      label: 'Has Passed',
    }),
  createdAt: z.date().meta({
      label: 'Created At',
    }),
  updatedAt: z.date().meta({
      label: 'Updated At',
    }),
  workspaceId: z.number().meta({
      label: 'Workspace Id',
    }),
  shareTitle: z.string().meta({
      label: 'ShareTitle',
    }),
  shareDescription: z.string().meta({
      label: 'Share description',
    }),
  summary: z.string().meta({
      label: 'Summary',
    }),
  timeFormat: z.string().meta({
      label: 'Time format',
    }),
  locale: z.string().meta({
      label: 'Locale',
    }),
  primaryColor: z.string().meta({
      label: 'Primary color',
      description: 'Main brand color (hex). Used for buttons, links, and accent elements. Must contrast against contrastColor (background).',
    }),
  contrastColor: z.string().meta({
      label: 'Contrast color',
      description: 'Background color (hex). Used for page backgrounds and button text. Must contrast against primaryColor.',
    }),
  signupColor: z.string().meta({
    label: 'Signup color',
    description: 'CTA/button color used on signup and payment forms (hex). Must contrast against white (#FFFFFF). Defaults to primaryColor.',
  }),
  textColor: z.string().meta({
    label: 'Text color',
    description: 'Default body text color (hex). Must contrast against contrastColor (background).',
  }),
  secondaryContrastColor: z.string().meta({
    label: 'Secondary contrast color',
    description: 'Secondary background color (hex). Used for alternate sections. Must contrast against primaryColor.',
  }),
  hasAdvancedColors: z.boolean().meta({
    label: 'Has advanced colors',
    description: 'When false, only primaryColor is used and other colors are auto-derived. When true, all colors are set independently.',
  }),
  fontNormal: z.string().meta({ label: 'Body font' }),
  fontNormalCategory: z.string().meta({ label: 'Body font category' }),
  fontNormalVariant: z.string().meta({ label: 'Body font variant' }),
  fontHeading: z.string().meta({ label: 'Heading font' }),
  fontHeadingCategory: z.string().meta({ label: 'Heading font category' }),
  fontHeadingVariant: z.string().meta({ label: 'Heading font variant' }),
  buttonBorderRadius: z.number().meta({ label: 'Button border radius' }),
  waitlist: z.string().meta({
      label: 'Has a waitlist',
    }),
  enableExtraGuests: z.boolean().meta({
      label: 'Are people allowed to bring guests',
    }),
  maxExtraGuests: z.number().meta({
      label: 'How many extra guests',
    }),
  location: z.looseObject({}).meta({
      label: 'Location',
    }),
})

// Core + copy fields a client can send when creating/updating an event.
// Excludes feature-level, financial, settings and password/otp fields.
export const EventCreateSchema = z.object({
  name: z.string().meta({ label: 'Name' }),
  startDate: z
    .union([z.date(), z.string()])
    .meta({ label: 'Start Date' }),
  endDate: z
    .union([z.date(), z.string()])
    .optional()
    .meta({ label: 'End Date' }),
  status: z.string().optional().meta({ label: 'Status' }),
  signupType: z
    .enum(['rsvp', 'tickets'])
    .optional()
    .meta({ label: 'Signup Type' }),
  signupStartAt: z
    .union([z.date(), z.string()])
    .optional()
    .meta({ label: 'Signup Start At' }),
  signupEndAt: z
    .union([z.date(), z.string()])
    .optional()
    .meta({ label: 'Signup End At' }),
  rsvpLimit: z.number().optional().meta({ label: 'Rsvp Limit' }),
  email: z.string().email().optional().meta({ label: 'Email' }),
  website: z.string().url().optional().meta({ label: 'Website' }),
  timeZone: z.string().optional().meta({ label: 'Time Zone' }),
  continuous: z.boolean().optional().meta({ label: 'Continuous' }),
  slug: z.string().optional().meta({ label: 'Slug' }),
  // copy fields (branding/customisation)
  primaryColor: z.string().optional().meta({
    label: 'Primary color',
    description: 'Main brand color (hex). Used for buttons, links, and accent elements. Must contrast against contrastColor (background).',
  }),
  contrastColor: z.string().optional().meta({
    label: 'Contrast color',
    description: 'Background color (hex). Used for page backgrounds and button text. Must contrast against primaryColor.',
  }),
  signupColor: z.string().optional().meta({
    label: 'Signup color',
    description: 'CTA/button color used on signup and payment forms (hex). Must contrast against white (#FFFFFF). Defaults to primaryColor.',
  }),
  textColor: z.string().optional().meta({
    label: 'Text color',
    description: 'Default body text color (hex). Must contrast against contrastColor (background).',
  }),
  secondaryContrastColor: z.string().optional().meta({
    label: 'Secondary contrast color',
    description: 'Secondary background color (hex). Used for alternate sections. Must contrast against primaryColor.',
  }),
  hasAdvancedColors: z.boolean().optional().meta({
    label: 'Has advanced colors',
    description: 'When false, only primaryColor is used and other colors are auto-derived. When true, all colors are set independently.',
  }),
  fontNormal: z.string().optional().meta({
    label: 'Body font',
    description: 'Google Fonts font family for body text (e.g. "Inter").',
  }),
  fontNormalCategory: z.string().optional().meta({
    label: 'Body font category',
    description: 'CSS font category: sans-serif, serif, or monospace.',
  }),
  fontNormalVariant: z.string().optional().meta({
    label: 'Body font variant',
    description: 'Font variant/weight (e.g. "400", "600").',
  }),
  fontHeading: z.string().optional().meta({
    label: 'Heading font',
    description: 'Google Fonts font family for headings (e.g. "Playfair Display").',
  }),
  fontHeadingCategory: z.string().optional().meta({
    label: 'Heading font category',
    description: 'CSS font category: sans-serif, serif, or monospace.',
  }),
  fontHeadingVariant: z.string().optional().meta({
    label: 'Heading font variant',
    description: 'Font weight and style (e.g. "700", "600italic").',
  }),
  buttonBorderRadius: z.number().optional().meta({
    label: 'Button border radius',
    description: 'Button corner radius in pixels (e.g. 4 for square, 35 for rounded).',
  }),
  shareTitle: z.string().optional().meta({ label: 'Share title' }),
  shareDescription: z.string().optional().meta({ label: 'Share description' }),
  summary: z.string().optional().meta({ label: 'Summary' }),
  smsSenderName: z.string().optional().meta({ label: 'SMS sender name' }),
  ticketsPerPurchase: z
    .number()
    .optional()
    .meta({ label: 'Tickets per purchase' }),
  locationName: z.string().optional().meta({ label: 'Location name' }),
  locationPlace: z
    .object({
      formatted_address: z.string().meta({ description: 'Full formatted address string (e.g. "Torkel Knutssonsgatan 2, 118 25 Stockholm, Sweden").' }),
      geometry: z
        .object({
          location: z.object({
            lat: z.number().meta({ description: 'Latitude.' }),
            lng: z.number().meta({ description: 'Longitude.' }),
          }),
        })
        .optional()
        .meta({ description: 'Coordinates for map centering. When provided with linkToPosition=true, the map links directly to these coordinates.' }),
      address_components: z
        .array(
          z.object({
            long_name: z.string(),
            short_name: z.string(),
            types: z.array(z.string()),
          }),
        )
        .optional()
        .meta({ description: 'Structured address parts (Google Places format). Used to extract city, country, postal code.' }),
      linkToPosition: z.boolean().optional().meta({ description: 'When true, the map link uses lat/lng coordinates instead of the formatted address.' }),
      adr_address: z.string().optional().meta({ description: 'HTML-formatted address (microformat adr). Used for display when available.' }),
    })
    .optional()
    .meta({ label: 'Location place', description: 'Location/venue details for maps. At minimum, set formatted_address for the map to work.' }),
  workspaceId: z
    .number()
    .optional()
    .meta({ label: 'Workspace Id' }),
})

// All fields are optional on update; you only patch what changed.
export const EventUpdateSchema = EventCreateSchema.partial()

const eventsFindAllSchema = {
  filter: z
    .object({
      signupType: z
        .enum(['rsvp', 'tickets'])
        .meta({
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
          })
        .optional(),
      type: z
        .enum(['future', 'past'])
        .meta({
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
          })
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
          'forms',
          'forms.formFields',
        ])
        .meta({
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
              {
                label: 'Forms',
                description: 'Event forms',
                type: 'string',
                key: 'forms',
                value: 'forms',
              },
              {
                label: 'Forms Form Fields',
                description: 'Form fields belonging to event forms',
                type: 'string',
                key: 'forms.formFields',
                value: 'forms.formFields',
              },
            ],
          }),
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
