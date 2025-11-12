import { z } from 'zod'
import {
  baseFindAllOptionsSchema,
  findBaseOptionsSchema,
  staticBaseFindAllOptionsSchema,
  staticBaseFindOptionsSchema,
} from './resource-options.js'

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

const ticketBatchesFindAllSchema = {
  filter: z.object({
    eventId: z.number(),
  }),
  sort: z.never().optional(),
  include: z.never().optional(),
}

export const ticketBatchesFindAllOptionsSchema = baseFindAllOptionsSchema.extend(ticketBatchesFindAllSchema)
export const ticketBatchesFindOptionsSchema = findBaseOptionsSchema.extend({})

export const staticTicketBatchesFindAllOptionsSchema = staticBaseFindAllOptionsSchema.extend(ticketBatchesFindAllSchema)
export const staticTicketBatchesFindOptionsSchema = staticBaseFindOptionsSchema.extend({})

export type TicketBatch = z.infer<typeof TicketBatchSchema>
export type TicketBatchesFindAllOptions = z.infer<typeof ticketBatchesFindAllOptionsSchema>
export type TicketBatchesFindOptions = z.infer<typeof ticketBatchesFindOptionsSchema>
export type StaticTicketBatchesFindAllOptions = z.infer<typeof staticTicketBatchesFindAllOptionsSchema>
export type StaticTicketBatchesFindOptions = z.infer<typeof staticTicketBatchesFindOptionsSchema>
