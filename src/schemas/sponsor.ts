import { z } from 'zod'
import {
  baseOptionsSchema,
  findBaseOptionsSchema,
  staticBaseFindAllOptionsSchema,
  staticBaseFindOptionsSchema,
} from './resource-options.js'

export const SponsorSchema = z.object({
  id: z.number().describe(
    JSON.stringify({
      label: 'ID',
      description: 'Identifier of the sponsor.',
    }),
  ),
  name: z.string().describe(
    JSON.stringify({
      label: 'Name',
    }),
  ),
  description: z.string().describe(
    JSON.stringify({
      label: 'Description',
    }),
  ),
  website: z.string().describe(
    JSON.stringify({
      label: 'Website',
    }),
  ),
  order: z.number().describe(
    JSON.stringify({
      label: 'Order',
    }),
  ),
  sponsorLevelId: z.number().describe(
    JSON.stringify({
      label: 'Sponsor Level Id',
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

export const SponsorCreateSchema = z.object({
  name: z.string().describe(JSON.stringify({ label: 'Name' })),
  sponsorLevelId: z.number().describe(JSON.stringify({ label: 'Sponsor Level Id' })),
  description: z.string().optional().describe(JSON.stringify({ label: 'Description' })),
  website: z.string().optional().describe(JSON.stringify({ label: 'Website' })),
  order: z.number().optional().describe(JSON.stringify({ label: 'Order' })),
  imageId: z.number().optional().describe(JSON.stringify({ label: 'Image Id' })),
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
