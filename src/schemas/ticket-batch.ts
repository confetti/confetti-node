import { z } from 'zod'
import { baseFindAllResourceOptionsSchema, staticBaseFindAllResourceOptionsSchema } from './resource-options.js'

export const TicketBatchSchema = z.object({
  id: z.number().describe(
    JSON.stringify({
      label: 'ID',
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
  price: z.number().describe(
    JSON.stringify({
      label: 'Price',
    }),
  ),
  currency: z.string().describe(
    JSON.stringify({
      label: 'Currency',
    }),
  ),
  persons: z.number().describe(
    JSON.stringify({
      label: 'Persons',
    }),
  ),
  status: z.string().describe(
    JSON.stringify({
      label: 'Status',
    }),
  ),
  startDate: z.date().describe(
    JSON.stringify({
      label: 'Start Date',
    }),
  ),
  endDate: z.date().describe(
    JSON.stringify({
      label: 'End Date',
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
  organisationId: z.number().describe(
    JSON.stringify({
      label: 'Organisation Id',
    }),
  ),
})

export const ticketBatchesResourceOptionsSchema = baseFindAllResourceOptionsSchema.extend({
  filter: z
    .object({
      eventId: z.union([z.string(), z.number()]),
    })
    .optional(),
  sort: z.never().optional(),
  include: z.never().optional(),
})

export const ticketBatchesFindOptionsSchema = baseFindAllResourceOptionsSchema.extend({})

export const staticTicketBatchesResourceOptionsSchema = staticBaseFindAllResourceOptionsSchema.extend({
  filter: z
    .object({
      eventId: z.union([z.string(), z.number()]),
    })
    .optional(),
  sort: z.never().optional(),
  include: z.never().optional(),
})

export const staticTicketBatchesFindOptionsSchema = staticBaseFindAllResourceOptionsSchema.extend({})

export type TicketBatch = z.infer<typeof TicketBatchSchema>
