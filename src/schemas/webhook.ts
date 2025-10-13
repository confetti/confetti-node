import { z } from 'zod'
import { baseFindAllResourceOptionsSchema, staticBaseFindAllResourceOptionsSchema } from './resource-options.js'

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

export const webhooksResourceOptionsSchema = baseFindAllResourceOptionsSchema.extend({
  filter: z
    .object({
      eventId: z.union([z.string(), z.number()]).optional(),
    })
    .optional(),
  sort: z.never().optional(),
  include: z.never().optional(),
})

export const webhooksFindOptionsSchema = baseFindAllResourceOptionsSchema.extend({})

export const staticWebhooksResourceOptionsSchema = staticBaseFindAllResourceOptionsSchema.extend({
  filter: z
    .object({
      eventId: z.union([z.string(), z.number()]).optional(),
    })
    .optional(),
  sort: z.never().optional(),
  include: z.never().optional(),
})

export const staticWebhooksFindOptionsSchema = staticBaseFindAllResourceOptionsSchema.extend({})

export const staticWebhooksCreateOptionsSchema = staticBaseFindAllResourceOptionsSchema.extend({})

export type Webhook = z.infer<typeof WebhookSchema>
export type WebhookCreate = z.infer<typeof WebhookCreateSchema>
