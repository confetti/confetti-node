import { z } from 'zod'
import {
  baseOptionsSchema,
  findBaseOptionsSchema,
  staticBaseFindAllOptionsSchema,
  staticBaseFindOptionsSchema,
} from './resource-options.js'

export const SponsorLevelSchema = z.object({
  id: z.number().meta({
    label: 'ID',
    description: 'Identifier of the sponsor level.',
  }),
  name: z.string().meta({
    label: 'Name',
  }),
  style: z.string().meta({
    label: 'Style',
    description: 'Visual style: large, medium, or small',
  }),
  order: z.number().meta({
    label: 'Order',
  }),
  eventId: z.number().meta({
    label: 'Event Id',
  }),
  createdAt: z.date().meta({
    label: 'Created at',
  }),
  updatedAt: z.date().meta({
    label: 'Updated at',
  }),
})

export const SponsorLevelCreateSchema = z.object({
  name: z.string().meta({ label: 'Name' }),
  eventId: z.number().meta({ label: 'Event Id' }),
  style: z.enum(['large', 'medium', 'small']).optional().meta({ label: 'Style' }),
  order: z.number().optional().meta({ label: 'Order' }),
})

export const SponsorLevelUpdateSchema = SponsorLevelCreateSchema.partial()

export const sponsorLevelsFindOptionsSchema = findBaseOptionsSchema.extend({})

export const staticSponsorLevelsFindOptionsSchema = staticBaseFindOptionsSchema.extend({})
export const staticSponsorLevelsCreateOptionsSchema = staticBaseFindAllOptionsSchema.extend({})
export const staticSponsorLevelsUpdateOptionsSchema = staticBaseFindAllOptionsSchema.extend({})

export type SponsorLevel = z.infer<typeof SponsorLevelSchema>
export type SponsorLevelCreate = z.infer<typeof SponsorLevelCreateSchema>
export type SponsorLevelCreateData = z.infer<typeof SponsorLevelCreateSchema>
export type SponsorLevelUpdate = z.infer<typeof SponsorLevelUpdateSchema>
export type SponsorLevelUpdateData = z.infer<typeof SponsorLevelUpdateSchema>
export type SponsorLevelsFindOptions = z.infer<typeof sponsorLevelsFindOptionsSchema>
export type SponsorLevelsCreateOptions = z.infer<typeof baseOptionsSchema>
export type SponsorLevelsUpdateOptions = z.infer<typeof baseOptionsSchema>
export type StaticSponsorLevelsFindOptions = z.infer<typeof staticSponsorLevelsFindOptionsSchema>
export type StaticSponsorLevelsCreateOptions = z.infer<typeof staticSponsorLevelsCreateOptionsSchema>
export type StaticSponsorLevelsUpdateOptions = z.infer<typeof staticSponsorLevelsUpdateOptionsSchema>
