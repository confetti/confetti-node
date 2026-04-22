import { number, z } from 'zod'

export const AddonSchema = z.object({
  id: z.number().meta({
      label: 'ID',
      description: 'Identifier of the addon.',
    }),
  description: z.string().meta({
      label: 'Description',
    }),
  status: z.string().meta({
      label: 'Status',
      description: 'Status of the addon. attending, declined, cancelled or refunded',
    }),
  hashid: z.string().meta({
      label: 'Hashid',
    }),
  startDate: z.date().meta({
      label: 'Start Date',
    }),
  endDate: z.date().meta({
      label: 'End date',
    }),
  checkinAt: z.date().meta({
      label: 'Checkin at',
    }),
  price: number().meta({
      label: 'Price',
    }),
  vat: number().meta({
      label: 'VAT',
    }),
  originalPrice: number().meta({
      label: 'Original Price',
    }),
  originalVat: number().meta({
      label: 'Original VAT',
    }),
  discount: number().meta({
      label: 'Discount',
    }),
  vatPercentage: number().meta({
      label: 'VAT %',
    }),
  currency: z.string().meta({
      label: 'Currency',
    }),
  values: z.looseObject({}).meta({
      label: 'Values',
    }),
  createdAt: z.date().meta({
      label: 'Created at',
    }),
  updatedAt: z.date().meta({
      label: 'Updated at',
    }),
  ticketId: z.number().meta({
      label: 'Ticket Id',
    }),
  paymentId: z.number().meta({
      label: 'Payment Id',
    }),
  eventId: z.number().meta({
      label: 'Event Id',
    }),
  addonBatchId: z.number().meta({
      label: 'Addon Batch Id',
    }),
})

export const AddonCreateSchema = z.object({
  ticketId: z.number().meta({ label: 'Ticket Id' }),
  addonBatchId: z.number().meta({ label: 'Addon Batch Id' }),
  values: z.looseObject({}).optional().meta({ label: 'Values' }),
  checkinAt: z.string().optional().meta({ label: 'Checkin At' }),
})

export type Addon = z.infer<typeof AddonSchema>
export type AddonCreate = z.infer<typeof AddonCreateSchema>
