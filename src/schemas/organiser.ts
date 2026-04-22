import { z } from 'zod'
import {
  baseOptionsSchema,
  findBaseOptionsSchema,
  staticBaseFindAllOptionsSchema,
  staticBaseFindOptionsSchema,
} from './resource-options.js'

export const OrganiserSettingsSchema = z.object({
  imageStyle: z.string().optional(),
})

export const OrganiserSchema = z.object({
  id: z.number().describe(
    JSON.stringify({
      label: 'ID',
      description: 'Identifier of the organiser.',
    }),
  ),
  description: z.string().describe(
    JSON.stringify({
      label: 'Description',
    }),
  ),
  email: z.string().describe(
    JSON.stringify({
      label: 'Email',
    }),
  ),
  name: z.string().describe(
    JSON.stringify({
      label: 'Name',
    }),
  ),
  twitter: z.string().describe(
    JSON.stringify({
      label: 'Twitter',
    }),
  ),
  instagram: z.string().describe(
    JSON.stringify({
      label: 'Instagram',
    }),
  ),
  url: z.string().describe(
    JSON.stringify({
      label: 'Website URL',
    }),
  ),
  order: z.number().describe(
    JSON.stringify({
      label: 'Order',
    }),
  ),
  settings: OrganiserSettingsSchema.describe(
    JSON.stringify({
      label: 'Settings',
    }),
  ),
  eventId: z.number().describe(
    JSON.stringify({
      label: 'Event Id',
    }),
  ),
  imageId: z.number().describe(
    JSON.stringify({
      label: 'Image Id',
    }),
  ),
  createdAt: z.date().describe(
    JSON.stringify({
      label: 'Created at',
    }),
  ),
  updatedAt: z.date().describe(
    JSON.stringify({
      label: 'Updated at',
    }),
  ),
})

export const OrganiserCreateSchema = z.object({
  name: z.string().describe(JSON.stringify({ label: 'Name' })),
  eventId: z.number().describe(JSON.stringify({ label: 'Event Id' })),
  email: z.string().optional().describe(JSON.stringify({ label: 'Email' })),
  description: z.string().optional().describe(JSON.stringify({ label: 'Description' })),
  twitter: z.string().optional().describe(JSON.stringify({ label: 'Twitter' })),
  instagram: z.string().optional().describe(JSON.stringify({ label: 'Instagram' })),
  url: z.string().optional().describe(JSON.stringify({ label: 'Website URL' })),
  order: z.number().optional().describe(JSON.stringify({ label: 'Order' })),
  settings: OrganiserSettingsSchema.optional().describe(JSON.stringify({ label: 'Settings' })),
  imageId: z.number().optional().describe(JSON.stringify({ label: 'Image Id' })),
})

export const OrganiserUpdateSchema = OrganiserCreateSchema.partial()

export const organisersFindOptionsSchema = findBaseOptionsSchema.extend({})

export const staticOrganisersFindOptionsSchema = staticBaseFindOptionsSchema.extend({})
export const staticOrganisersCreateOptionsSchema = staticBaseFindAllOptionsSchema.extend({})
export const staticOrganisersUpdateOptionsSchema = staticBaseFindAllOptionsSchema.extend({})

export type Organiser = z.infer<typeof OrganiserSchema>
export type OrganiserCreate = z.infer<typeof OrganiserCreateSchema>
export type OrganiserCreateData = z.infer<typeof OrganiserCreateSchema>
export type OrganiserUpdate = z.infer<typeof OrganiserUpdateSchema>
export type OrganiserUpdateData = z.infer<typeof OrganiserUpdateSchema>
export type OrganisersFindOptions = z.infer<typeof organisersFindOptionsSchema>
export type OrganisersCreateOptions = z.infer<typeof baseOptionsSchema>
export type OrganisersUpdateOptions = z.infer<typeof baseOptionsSchema>
export type StaticOrganisersFindOptions = z.infer<typeof staticOrganisersFindOptionsSchema>
export type StaticOrganisersCreateOptions = z.infer<typeof staticOrganisersCreateOptionsSchema>
export type StaticOrganisersUpdateOptions = z.infer<typeof staticOrganisersUpdateOptionsSchema>
