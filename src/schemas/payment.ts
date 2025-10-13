import { z } from 'zod'
import { baseFindAllResourceOptionsSchema, staticBaseFindAllResourceOptionsSchema } from './resource-options.js'

export const PaymentSchema = z.object({
  id: z.number().describe(
    JSON.stringify({
      label: 'ID',
      description: 'Identifier of the payment.',
    }),
  ),
  name: z.string().describe(
    JSON.stringify({
      label: 'Name',
    }),
  ),
  email: z.string().describe(
    JSON.stringify({
      label: 'Email',
    }),
  ),
  company: z.string().describe(
    JSON.stringify({
      label: 'Company',
    }),
  ),
  amount: z.number().describe(
    JSON.stringify({
      label: 'Amount',
    }),
  ),
  vat: z.number().describe(
    JSON.stringify({
      label: 'VAT',
    }),
  ),
  vatPercentage: z.number().describe(
    JSON.stringify({
      label: 'Vat %',
    }),
  ),
  token: z.string().describe(
    JSON.stringify({
      label: 'Token',
    }),
  ),
  currency: z.string().describe(
    JSON.stringify({
      label: 'Currency',
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
  organisationId: z.number().describe(
    JSON.stringify({
      label: 'Organisation Id',
    }),
  ),
})

export const paymentsResourceOptionsSchema = baseFindAllResourceOptionsSchema.extend({
  filter: z
    .object({
      eventId: z.union([z.string(), z.number()]),
      status: z
        .array(z.enum(['paid', 'refunded', 'pending-invoice', 'sent-invoice', 'paid-invoice', 'cancelled-invoice']))
        .optional(),
    })
    .optional(),
  sort: z.never().optional(),
  include: z.never().optional(),
})

export const paymentsFindOptionsSchema = baseFindAllResourceOptionsSchema.extend({})

export const staticPaymentsResourceOptionsSchema = staticBaseFindAllResourceOptionsSchema.extend({
  filter: z
    .object({
      eventId: z.union([z.string(), z.number()]),
      status: z
        .array(
          z.enum(['paid', 'refunded', 'pending-invoice', 'sent-invoice', 'paid-invoice', 'cancelled-invoice']).describe(
            JSON.stringify({
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
          ),
        )
        .optional(),
    })
    .optional(),
  sort: z.never().optional(),
  include: z.never().optional(),
})

export const staticPaymentsFindOptionsSchema = staticBaseFindAllResourceOptionsSchema.extend({})

export type Payment = z.infer<typeof PaymentSchema>
