import { z } from 'zod'
import {
  baseFindAllOptionsSchema,
  findBaseOptionsSchema,
  staticBaseFindAllOptionsSchema,
  staticBaseFindOptionsSchema,
} from './resource-options.js'

export const TicketBatchSchema = z.object({
  id: z.number().meta({
    label: 'ID',
  }),
  left: z.number().meta({
    label: 'Left',
  }),
  status: z.string().meta({
    label: 'Status',
  }),
  name: z.string().meta({
    label: 'Name',
  }),
  order: z.number().meta({
    label: 'Order',
  }),
  description: z.string().meta({
    label: 'Description',
  }),
  promoCode: z.string().meta({
    label: 'Promo code',
  }),
  releasedAt: z.date().meta({
    label: 'Released at',
  }),
  closedAt: z.date().meta({
    label: 'Closed at',
  }),
  price: z.string().meta({
    label: 'Price',
  }),
  useCustomVat: z.boolean().meta({
    label: 'Use custom VAT',
  }),
  vatPercentage: z.number().meta({
    label: 'VAT percentage',
  }),
  limit: z.number().meta({
    label: 'Limit',
  }),
  sold: z.number().meta({
    label: 'Sold',
  }),
  reserved: z.number().meta({
    label: 'Reserved',
  }),
  settings: z.looseObject({}).meta({
    label: 'Settings',
  }),
  startDate: z.date().meta({
    label: 'Start date',
  }),
  endDate: z.date().meta({
    label: 'End date',
  }),
  createdAt: z.date().meta({
    label: 'Created at',
  }),
  updatedAt: z.date().meta({
    label: 'Updated at',
  }),
  eventId: z.number().meta({
    label: 'Event Id',
  }),
  linkedTicketBatchId: z.number().meta({
    label: 'Linked ticket batch Id',
  }),
  formId: z.number().meta({
    label: 'Form Id',
  }),
  payoutId: z.number().meta({
    label: 'Payout Id',
  }),
})

export const TicketBatchCreateSchema = z.object({
  eventId: z.coerce.number().meta({
    label: 'Event Id',
  }),
  name: z.string().meta({
    label: 'Name',
  }),
  price: z.union([z.string(), z.number()]).meta({
    label: 'Price',
  }),
  limit: z.coerce.number().meta({
    label: 'Limit',
  }),
  order: z.coerce.number().optional().meta({
    label: 'Order',
  }),
  description: z.string().optional().meta({
    label: 'Description',
  }),
  promoCode: z.string().optional().meta({
    label: 'Promo code',
    helpText: 'Must not contain spaces or commas.',
  }),
  releasedAt: z.union([z.date(), z.string()]).optional().meta({
    label: 'Released at',
  }),
  closedAt: z.union([z.date(), z.string()]).optional().meta({
    label: 'Closed at',
  }),
  startDate: z.union([z.date(), z.string()]).optional().meta({
    label: 'Start date',
  }),
  endDate: z.union([z.date(), z.string()]).optional().meta({
    label: 'End date',
  }),
  useCustomVat: z.boolean().optional().meta({
    label: 'Use custom VAT',
  }),
  vatPercentage: z.coerce.number().optional().meta({
    label: 'VAT percentage',
  }),
  settings: z.looseObject({}).optional().meta({
    label: 'Settings',
  }),
  formId: z.coerce.number().optional().meta({
    label: 'Form Id',
  }),
})

export const TicketBatchUpdateSchema = TicketBatchCreateSchema.omit({ eventId: true }).partial()

const ticketBatchesFindAllSchema = {
  filter: z.object({
    eventId: z.coerce.number(),
  }),
  sort: z.never().optional(),
  include: z
    .array(
      z.enum(['form']).meta({
        label: 'Include Relations',
        description: 'Include related data',
        values: [
          {
            label: 'Form',
            description: 'Signup form for this ticket batch',
            type: 'string',
            key: 'form',
            value: 'form',
          },
        ],
      }),
    )
    .optional(),
}

export const ticketBatchesFindAllOptionsSchema = baseFindAllOptionsSchema.extend(ticketBatchesFindAllSchema)
export const ticketBatchesFindOptionsSchema = findBaseOptionsSchema.extend({})

export const staticTicketBatchesFindAllOptionsSchema = staticBaseFindAllOptionsSchema.extend(ticketBatchesFindAllSchema)
export const staticTicketBatchesFindOptionsSchema = staticBaseFindOptionsSchema.extend({})

export type TicketBatch = z.infer<typeof TicketBatchSchema>
export type TicketBatchCreateData = z.infer<typeof TicketBatchCreateSchema>
export type TicketBatchUpdateData = z.infer<typeof TicketBatchUpdateSchema>
export type TicketBatchesFindAllOptions = z.infer<typeof ticketBatchesFindAllOptionsSchema>
export type TicketBatchesFindOptions = z.infer<typeof ticketBatchesFindOptionsSchema>
export type StaticTicketBatchesFindAllOptions = z.infer<typeof staticTicketBatchesFindAllOptionsSchema>
export type StaticTicketBatchesFindOptions = z.infer<typeof staticTicketBatchesFindOptionsSchema>
