import { z } from 'zod'
import {
  baseOptionsSchema,
  findBaseOptionsSchema,
  staticBaseFindAllOptionsSchema,
  staticBaseFindOptionsSchema,
} from './resource-options.js'

export const SponsorSchema = z.object({
  id: z.number().meta({
      label: 'ID',
      description: 'Identifier of the sponsor.',
    }),
  name: z.string().meta({
      label: 'Name',
    }),
  description: z.string().meta({
      label: 'Description',
    }),
  website: z.string().meta({
      label: 'Website',
    }),
  order: z.number().meta({
      label: 'Order',
    }),
  sponsorLevelId: z.number().meta({
      label: 'Sponsor Level Id',
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

export const SponsorCreateSchema = z.object({
  name: z.string().meta({ label: 'Name' }),
  sponsorLevelId: z.number().meta({ label: 'Sponsor Level Id' }),
  description: z.string().optional().meta({ label: 'Description' }),
  website: z.string().optional().meta({ label: 'Website' }),
  order: z.number().optional().meta({ label: 'Order' }),
  imageId: z.number().optional().meta({ label: 'Image Id' }),
})

export const SponsorUpdateSchema = SponsorCreateSchema.partial()

export const sponsorsFindOptionsSchema = findBaseOptionsSchema.extend({})

export const staticSponsorsFindOptionsSchema = staticBaseFindOptionsSchema.extend({})
export const staticSponsorsCreateOptionsSchema = staticBaseFindAllOptionsSchema.extend({})
export const staticSponsorsUpdateOptionsSchema = staticBaseFindAllOptionsSchema.extend({})

export type Sponsor = z.infer<typeof SponsorSchema>
export type SponsorCreate = z.infer<typeof SponsorCreateSchema>
export type SponsorCreateData = z.infer<typeof SponsorCreateSchema>
export type SponsorUpdate = z.infer<typeof SponsorUpdateSchema>
export type SponsorUpdateData = z.infer<typeof SponsorUpdateSchema>
export type SponsorsFindOptions = z.infer<typeof sponsorsFindOptionsSchema>
export type SponsorsCreateOptions = z.infer<typeof baseOptionsSchema>
export type SponsorsUpdateOptions = z.infer<typeof baseOptionsSchema>
export type StaticSponsorsFindOptions = z.infer<typeof staticSponsorsFindOptionsSchema>
export type StaticSponsorsCreateOptions = z.infer<typeof staticSponsorsCreateOptionsSchema>
export type StaticSponsorsUpdateOptions = z.infer<typeof staticSponsorsUpdateOptionsSchema>
