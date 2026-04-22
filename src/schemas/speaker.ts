import { z } from 'zod'
import {
  baseOptionsSchema,
  findBaseOptionsSchema,
  staticBaseFindAllOptionsSchema,
  staticBaseFindOptionsSchema,
} from './resource-options.js'

const socialMediaButtonSchema = z.object({
  url: z.string(),
  type: z.string(),
  order: z.number(),
  title: z.string(),
})

export const SpeakerSettingsSchema = z.object({
  id: z.string().uuid(),
  socialMediaButtons: z.array(socialMediaButtonSchema).optional(),
})

export const SpeakerSchema = z.object({
  id: z.number().meta({
      label: 'ID',
      description: 'Identifier of the speaker.',
    }),
  isAnnounced: z.boolean().meta({
      label: 'Announced',
    }),
  isHidden: z.boolean().meta({
      label: 'Hidden',
    }),
  firstName: z.string().meta({
      label: 'First name',
    }),
  lastName: z.string().meta({
      label: 'Last name',
    }),
  order: z.number().meta({
      label: 'Order',
    }),
  occupation: z.string().meta({
      label: 'Occupation',
    }),
  bio: z.string().meta({
      label: 'Bio',
      description: 'HTML biography of the speaker',
    }),
  status: z.string().meta({
      label: 'Status',
    }),
  settings: SpeakerSettingsSchema.meta({
      label: 'Settings',
      description: 'Speaker settings including social media',
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

export const SpeakerCreateSchema = z.object({
  firstName: z.string().meta({ label: 'First name' }),
  eventId: z.number().meta({ label: 'Event Id' }),
  lastName: z.string().optional().meta({ label: 'Last name' }),
  order: z.number().optional().meta({ label: 'Order' }),
  occupation: z.string().optional().meta({ label: 'Occupation' }),
  bio: z.string().optional().meta({ label: 'Bio' }),
  status: z.enum(['announced', 'hidden']).optional().meta({ label: 'Status' }),
  settings: SpeakerSettingsSchema.optional().meta({ label: 'Settings' }),
  imageId: z.number().optional().meta({ label: 'Image Id' }),
})

export const SpeakerUpdateSchema = SpeakerCreateSchema.partial()

export const speakersFindOptionsSchema = findBaseOptionsSchema.extend({})

export const staticSpeakersFindOptionsSchema = staticBaseFindOptionsSchema.extend({})
export const staticSpeakersCreateOptionsSchema = staticBaseFindAllOptionsSchema.extend({})
export const staticSpeakersUpdateOptionsSchema = staticBaseFindAllOptionsSchema.extend({})

export type Speaker = z.infer<typeof SpeakerSchema>
export type SpeakerSettings = z.infer<typeof SpeakerSettingsSchema>
export type SpeakerCreate = z.infer<typeof SpeakerCreateSchema>
export type SpeakerCreateData = z.infer<typeof SpeakerCreateSchema>
export type SpeakerUpdate = z.infer<typeof SpeakerUpdateSchema>
export type SpeakerUpdateData = z.infer<typeof SpeakerUpdateSchema>
export type SpeakersFindOptions = z.infer<typeof speakersFindOptionsSchema>
export type SpeakersCreateOptions = z.infer<typeof baseOptionsSchema>
export type SpeakersUpdateOptions = z.infer<typeof baseOptionsSchema>
export type StaticSpeakersFindOptions = z.infer<typeof staticSpeakersFindOptionsSchema>
export type StaticSpeakersCreateOptions = z.infer<typeof staticSpeakersCreateOptionsSchema>
export type StaticSpeakersUpdateOptions = z.infer<typeof staticSpeakersUpdateOptionsSchema>
