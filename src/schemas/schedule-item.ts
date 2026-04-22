import { z } from 'zod'
import {
  baseOptionsSchema,
  findBaseOptionsSchema,
  staticBaseFindAllOptionsSchema,
  staticBaseFindOptionsSchema,
} from './resource-options.js'

const speakerSettingSchema = z.object({
  id: z.number(),
  hideOnSpeaker: z.boolean(),
})

export const ScheduleItemSettingsSchema = z.object({
  speakersSettings: z.array(speakerSettingSchema).optional(),
  order: z.number().optional(),
  hidden: z.boolean().optional(),
})

export const ScheduleItemSchema = z.object({
  id: z.number().meta({
      label: 'ID',
      description: 'Identifier of the schedule item.',
    }),
  title: z.string().meta({
      label: 'Title',
    }),
  location: z.string().meta({
      label: 'Location',
    }),
  start: z.date().meta({
      label: 'Start',
    }),
  description: z.string().meta({
      label: 'Description',
      description: 'HTML description of the schedule item',
    }),
  duration: z.number().meta({
      label: 'Duration',
      description: 'Duration in minutes',
    }),
  settings: ScheduleItemSettingsSchema.meta({
      label: 'Settings',
      description: 'Item settings including speakerIds and order',
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

export const ScheduleItemCreateSchema = z.object({
  title: z.string().meta({ label: 'Title' }),
  eventId: z.number().meta({ label: 'Event Id' }),
  start: z.coerce.date().optional().meta({ label: 'Start' }),
  location: z.string().optional().meta({ label: 'Location' }),
  description: z.string().optional().meta({ label: 'Description' }),
  duration: z.number().optional().meta({ label: 'Duration' }),
  settings: ScheduleItemSettingsSchema.optional().meta({ label: 'Settings' }),
})

export const ScheduleItemUpdateSchema = ScheduleItemCreateSchema.partial()

export const scheduleItemsFindOptionsSchema = findBaseOptionsSchema.extend({})

export const staticScheduleItemsFindOptionsSchema = staticBaseFindOptionsSchema.extend({})
export const staticScheduleItemsCreateOptionsSchema = staticBaseFindAllOptionsSchema.extend({})
export const staticScheduleItemsUpdateOptionsSchema = staticBaseFindAllOptionsSchema.extend({})

export type ScheduleItem = z.infer<typeof ScheduleItemSchema>
export type ScheduleItemSettings = z.infer<typeof ScheduleItemSettingsSchema>
export type ScheduleItemCreate = z.infer<typeof ScheduleItemCreateSchema>
export type ScheduleItemCreateData = z.infer<typeof ScheduleItemCreateSchema>
export type ScheduleItemUpdate = z.infer<typeof ScheduleItemUpdateSchema>
export type ScheduleItemUpdateData = z.infer<typeof ScheduleItemUpdateSchema>
export type ScheduleItemsFindOptions = z.infer<typeof scheduleItemsFindOptionsSchema>
export type ScheduleItemsCreateOptions = z.infer<typeof baseOptionsSchema>
export type ScheduleItemsUpdateOptions = z.infer<typeof baseOptionsSchema>
export type StaticScheduleItemsFindOptions = z.infer<typeof staticScheduleItemsFindOptionsSchema>
export type StaticScheduleItemsCreateOptions = z.infer<typeof staticScheduleItemsCreateOptionsSchema>
export type StaticScheduleItemsUpdateOptions = z.infer<typeof staticScheduleItemsUpdateOptionsSchema>
