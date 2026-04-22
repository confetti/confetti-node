import { z } from 'zod'
import {
  baseFindAllOptionsSchema,
  staticBaseFindAllOptionsSchema,
  baseOptionsSchema,
  findBaseOptionsSchema,
  staticBaseFindOptionsSchema,
} from './resource-options.js'

export const WebhookSchema = z.object({
  id: z.number().meta({
      label: 'ID',
      description: 'Identifier of the webhook.',
    }),
  type: z.string().meta({
      label: 'Type',
    }),
  url: z.string().meta({
      label: 'URL',
    }),
  provider: z.string().meta({
      label: 'Provider',
    }),
  status: z.string().meta({
      label: 'Status',
    }),
  createdAt: z.date().meta({
      label: 'Created At',
    }),
  updatedAt: z.date().meta({
      label: 'Updated At',
    }),
})

export const WebhookCreateSchema = z.object({
  type: z.string().meta({
      label: 'Type',
    }),
  url: z.string().url().meta({
      label: 'URL',
    }),
  provider: z
    .string()
    .optional()
    .meta({
        label: 'Provider',
      }),
  status: z
    .enum(['active', 'inactive'])
    .optional()
    .meta({
        label: 'Status',
      }),
  workspaceId: z
    .number()
    .optional()
    .meta({
        label: 'Workspace Id',
      }),
  eventId: z
    .number()
    .nullable()
    .optional()
    .meta({
        label: 'Event Id',
      }),
})

const webhooksFindAllSchema = {
  filter: z
    .object({
      eventId: z.number().optional(),
    })
    .optional(),
  sort: z.never().optional(),
  include: z.never().optional(),
}

export const webhooksFindAllOptionsSchema = baseFindAllOptionsSchema.extend(webhooksFindAllSchema)
export const webhooksFindOptionsSchema = findBaseOptionsSchema.extend({})

export const staticWebhooksFindAllOptionsSchema = staticBaseFindAllOptionsSchema.extend(webhooksFindAllSchema)
export const staticWebhooksFindOptionsSchema = staticBaseFindOptionsSchema.extend({})

export const staticWebhooksCreateOptionsSchema = staticBaseFindAllOptionsSchema.extend({})

export type Webhook = z.infer<typeof WebhookSchema>
export type WebhookCreate = z.infer<typeof WebhookCreateSchema>
export type WebhookCreateData = z.infer<typeof WebhookCreateSchema>
export type WebhooksFindAllOptions = z.infer<typeof webhooksFindAllOptionsSchema>
export type WebhooksFindOptions = z.infer<typeof webhooksFindOptionsSchema>
export type WebhooksCreateOptions = z.infer<typeof baseOptionsSchema>
export type StaticWebhooksFindAllOptions = z.infer<typeof staticWebhooksFindAllOptionsSchema>
export type StaticWebhooksFindOptions = z.infer<typeof staticWebhooksFindOptionsSchema>
export type StaticWebhooksCreateOptions = z.infer<typeof staticWebhooksCreateOptionsSchema>
