import { z } from 'zod'
import {
  baseFindAllOptionsSchema,
  staticBaseFindAllOptionsSchema,
  baseOptionsSchema,
  findBaseOptionsSchema,
  staticBaseFindOptionsSchema,
} from './resource-options.js'

export const WebhookSchema = z.object({
  id: z.number().describe(
    JSON.stringify({
      label: 'ID',
      description: 'Identifier of the webhook.',
    }),
  ),
  type: z.string().describe(
    JSON.stringify({
      label: 'Type',
    }),
  ),
  url: z.string().describe(
    JSON.stringify({
      label: 'URL',
    }),
  ),
  provider: z.string().describe(
    JSON.stringify({
      label: 'Provider',
    }),
  ),
  status: z.string().describe(
    JSON.stringify({
      label: 'Status',
    }),
  ),
  createdAt: z.date().describe(
    JSON.stringify({
      label: 'Created At',
    }),
  ),
  updatedAt: z.date().describe(
    JSON.stringify({
      label: 'Updated At',
    }),
  ),
  workspaceId: z.number().describe(
    JSON.stringify({
      label: 'Workspace Id',
    }),
  ),
  eventId: z
    .number()
    .nullable()
    .describe(
      JSON.stringify({
        label: 'Event Id',
      }),
    ),
})

export const WebhookCreateSchema = z.object({
  type: z.string().describe(
    JSON.stringify({
      label: 'Type',
    }),
  ),
  url: z.string().describe(
    JSON.stringify({
      label: 'URL',
    }),
  ),
  provider: z
    .string()
    .optional()
    .describe(
      JSON.stringify({
        label: 'Provider',
      }),
    ),
  status: z
    .enum(['active', 'inactive'])
    .optional()
    .describe(
      JSON.stringify({
        label: 'Status',
      }),
    ),
  workspaceId: z
    .number()
    .optional()
    .describe(
      JSON.stringify({
        label: 'Workspace Id',
      }),
    ),
  eventId: z
    .number()
    .nullable()
    .optional()
    .describe(
      JSON.stringify({
        label: 'Event Id',
      }),
    ),
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
