import { z } from 'zod'

export const PreviewTokenSchema = z.object({
  id: z.string().meta({
    label: 'ID',
    description: 'UUID identifier of the preview token.',
  }),
  token: z.string().meta({
    label: 'Token',
    description: 'JWT preview token. Append to the preview URL as a query parameter.',
  }),
  previewUrl: z.string().meta({
    label: 'Preview URL',
    description: 'Full URL to preview the event or workspace.',
  }),
})

export const PreviewTokenCreateSchema = z.union([
  z.object({
    event: z.number().int().positive().meta({
      label: 'Event',
      description: 'Event ID to create a preview token for.',
    }),
  }),
  z.object({
    organisation: z.number().int().positive().meta({
      label: 'Organisation',
      description: 'Organisation ID to create a preview token for.',
    }),
  }),
])

export type PreviewToken = z.infer<typeof PreviewTokenSchema>
export type PreviewTokenCreate = z.infer<typeof PreviewTokenCreateSchema>
