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
  id: z.number().describe(
    JSON.stringify({
      label: 'ID',
      description: 'Identifier of the speaker.',
    }),
  ),
  isAnnounced: z.boolean().describe(
    JSON.stringify({
      label: 'Announced',
    }),
  ),
  isHidden: z.boolean().describe(
    JSON.stringify({
      label: 'Hidden',
    }),
  ),
  firstName: z.string().describe(
    JSON.stringify({
      label: 'First name',
    }),
  ),
  lastName: z.string().describe(
    JSON.stringify({
      label: 'Last name',
    }),
  ),
  order: z.number().describe(
    JSON.stringify({
      label: 'Order',
    }),
  ),
  occupation: z.string().describe(
    JSON.stringify({
      label: 'Occupation',
    }),
  ),
  bio: z.string().describe(
    JSON.stringify({
      label: 'Bio',
      description: 'HTML biography of the speaker',
    }),
  ),
  status: z.string().describe(
    JSON.stringify({
      label: 'Status',
    }),
  ),
  settings: SpeakerSettingsSchema.describe(
    JSON.stringify({
      label: 'Settings',
      description: 'Speaker settings including social media',
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

export const SpeakerCreateSchema = z.object({
  firstName: z.string().describe(JSON.stringify({ label: 'First name' })),
  eventId: z.number().describe(JSON.stringify({ label: 'Event Id' })),
  lastName: z.string().optional().describe(JSON.stringify({ label: 'Last name' })),
  order: z.number().optional().describe(JSON.stringify({ label: 'Order' })),
  occupation: z.string().optional().describe(JSON.stringify({ label: 'Occupation' })),
  bio: z.string().optional().describe(JSON.stringify({ label: 'Bio' })),
  status: z.enum(['announced', 'hidden']).optional().describe(JSON.stringify({ label: 'Status' })),
  settings: SpeakerSettingsSchema.optional().describe(JSON.stringify({ label: 'Settings' })),
  imageId: z.number().optional().describe(JSON.stringify({ label: 'Image Id' })),
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
