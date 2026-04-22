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
  id: z.number().meta({
      label: 'ID',
      description: 'Identifier of the organiser.',
    }),
  description: z.string().meta({
      label: 'Description',
    }),
  email: z.string().meta({
      label: 'Email',
    }),
  name: z.string().meta({
      label: 'Name',
    }),
  twitter: z.string().meta({
      label: 'Twitter',
    }),
  instagram: z.string().meta({
      label: 'Instagram',
    }),
  url: z.string().meta({
      label: 'Website URL',
    }),
  order: z.number().meta({
      label: 'Order',
    }),
  settings: OrganiserSettingsSchema.meta({
      label: 'Settings',
    }),
  eventId: z.number().meta({
      label: 'Event Id',
    }),
  imageId: z.number().meta({
      label: 'Image Id',
    }),
  createdAt: z.date().meta({
      label: 'Created at',
    }),
  updatedAt: z.date().meta({
      label: 'Updated at',
    }),
})

export const OrganiserCreateSchema = z.object({
  name: z.string().meta({ label: 'Name' }),
  eventId: z.number().meta({ label: 'Event Id' }),
  email: z.string().optional().meta({ label: 'Email' }),
  description: z.string().optional().meta({ label: 'Description' }),
  twitter: z.string().optional().meta({ label: 'Twitter' }),
  instagram: z.string().optional().meta({ label: 'Instagram' }),
  url: z.string().optional().meta({ label: 'Website URL' }),
  order: z.number().optional().meta({ label: 'Order' }),
  settings: OrganiserSettingsSchema.optional().meta({ label: 'Settings' }),
  imageId: z.number().optional().meta({ label: 'Image Id' }),
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
