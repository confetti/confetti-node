import { z } from 'zod'

export const PageSchema = z.object({
  id: z.number().describe(
    JSON.stringify({
      label: 'ID',
    }),
  ),
  title: z.string().describe(
    JSON.stringify({
      label: 'Title',
    }),
  ),
  slug: z.string().describe(
    JSON.stringify({
      label: 'Slug',
    }),
  ),
  content: z.string().describe(
    JSON.stringify({
      label: 'Content',
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

export type Page = z.infer<typeof PageSchema>
