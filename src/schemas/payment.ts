import { z } from 'zod'
import {
  baseFindAllOptionsSchema,
  findBaseOptionsSchema,
  staticBaseFindAllOptionsSchema,
  staticBaseFindOptionsSchema,
} from './resource-options.js'
import { decimalStringSchema } from '../utils/zod.js'

export const PaymentSchema = z.object({
  id: z.number().meta({
    label: 'ID',
    description: 'Identifier of the payment.',
  }),
  name: z.string().meta({
    label: 'Name',
  }),
  email: z.string().meta({
    label: 'Email',
  }),
  company: z.string().meta({
    label: 'Company',
  }),
  amount: z.number().meta({
    label: 'Amount',
  }),
  vat: z.number().meta({
    label: 'VAT',
  }),
  vatPercentage: z.number().meta({
    label: 'Vat %',
  }),
  commission: decimalStringSchema().meta({
    label: 'Commission',
  }),
  commissionVat: decimalStringSchema().meta({
    label: 'Commission VAT',
  }),
  customer: z.looseObject({}).meta({
    label: 'Customer',
  }),
  token: z.string().meta({
    label: 'Token',
  }),
  currency: z.string().meta({
    label: 'Currency',
  }),
  status: z.string().meta({
    label: 'Status',
  }),
  paidAt: z.date().meta({
    label: 'Paid At',
  }),
})

const paymentsFindAllSchema = {
  filter: z.object({
    eventId: z.coerce.number(),
    status: z
      .array(
        z.enum(['paid', 'refunded', 'pending-invoice', 'sent-invoice', 'paid-invoice', 'cancelled-invoice']).meta({
          label: 'Payment Status',
          description: 'Filter payments by status',
          values: [
            {
              label: 'Paid',
              description: 'Successfully paid payments',
              type: 'string',
              key: 'paid',
              value: 'paid',
            },
            {
              label: 'Refunded',
              description: 'Refunded payments',
              type: 'string',
              key: 'refunded',
              value: 'refunded',
            },
            {
              label: 'Pending Invoice',
              description: 'Payments with pending invoices',
              type: 'string',
              key: 'pending-invoice',
              value: 'pending-invoice',
            },
            {
              label: 'Sent Invoice',
              description: 'Payments with sent invoices',
              type: 'string',
              key: 'sent-invoice',
              value: 'sent-invoice',
            },
            {
              label: 'Paid Invoice',
              description: 'Payments with paid invoices',
              type: 'string',
              key: 'paid-invoice',
              value: 'paid-invoice',
            },
            {
              label: 'Cancelled Invoice',
              description: 'Payments with cancelled invoices',
              type: 'string',
              key: 'cancelled-invoice',
              value: 'cancelled-invoice',
            },
          ],
        }),
      )
      .optional(),
  }),
  sort: z.never().optional(),
  include: z.never().optional(),
}

export const paymentsFindAllOptionsSchema = baseFindAllOptionsSchema.extend(paymentsFindAllSchema)
export const paymentsFindOptionsSchema = findBaseOptionsSchema.extend({})

export const staticPaymentsFindAllOptionsSchema = staticBaseFindAllOptionsSchema.extend(paymentsFindAllSchema)
export const staticPaymentsFindOptionsSchema = staticBaseFindOptionsSchema.extend({})

export type Payment = z.infer<typeof PaymentSchema>
export type PaymentsFindAllOptions = z.infer<typeof paymentsFindAllOptionsSchema>
export type PaymentsFindOptions = z.infer<typeof paymentsFindOptionsSchema>
export type StaticPaymentsFindAllOptions = z.infer<typeof staticPaymentsFindAllOptionsSchema>
export type StaticPaymentsFindOptions = z.infer<typeof staticPaymentsFindOptionsSchema>
