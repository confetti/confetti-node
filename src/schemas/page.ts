import { z } from 'zod'
import {
  baseFindAllOptionsSchema,
  baseOptionsSchema,
  findBaseOptionsSchema,
  staticBaseFindAllOptionsSchema,
  staticBaseFindOptionsSchema,
} from './resource-options.js'

export const PageSchema = z.object({
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
  slug: z.string().describe(
    JSON.stringify({
      label: 'Slug',
    }),
  ),
  order: z.number().describe(
    JSON.stringify({
      label: 'Order',
    }),
  ),
  settings: z.looseObject({}).describe(
    JSON.stringify({
      label: 'Settings',
    }),
  ),
})

export const PageCreateSchema = z.object({
  name: z.string().describe(JSON.stringify({ label: 'Name' })),
  slug: z.string().optional().describe(JSON.stringify({ label: 'Slug' })),
  status: z.string().optional().describe(JSON.stringify({ label: 'Status' })),
  order: z.number().optional().describe(JSON.stringify({ label: 'Order' })),
  settings: z.looseObject({}).optional().describe(JSON.stringify({ label: 'Settings' })),
  prefillBlocks: z
    .boolean()
    .optional()
    .describe(JSON.stringify({ label: 'Prefill Blocks' })),
  eventId: z.number().optional().describe(JSON.stringify({ label: 'Event Id' })),
  workspaceId: z.number().optional().describe(JSON.stringify({ label: 'Workspace Id' })),
})

export const PageUpdateSchema = PageCreateSchema.partial()

const pagesFindAllSchema = {
  filter: z
    .object({
      eventId: z.number().optional(),
    })
    .optional(),
  sort: z.never().optional(),
  include: z
    .array(z.enum(['blocks', 'blocks.images']))
    .optional(),
}

export const pagesFindAllOptionsSchema = baseFindAllOptionsSchema.extend(pagesFindAllSchema)
export const pagesFindOptionsSchema = findBaseOptionsSchema.extend({})

export const staticPagesFindAllOptionsSchema = staticBaseFindAllOptionsSchema.extend(pagesFindAllSchema)
export const staticPagesFindOptionsSchema = staticBaseFindOptionsSchema.extend({})
export const staticPagesCreateOptionsSchema = staticBaseFindAllOptionsSchema.extend({})
export const staticPagesUpdateOptionsSchema = staticBaseFindAllOptionsSchema.extend({})

export type Page = z.infer<typeof PageSchema>
export type PageCreate = z.infer<typeof PageCreateSchema>
export type PageCreateData = z.infer<typeof PageCreateSchema>
export type PageUpdate = z.infer<typeof PageUpdateSchema>
export type PageUpdateData = z.infer<typeof PageUpdateSchema>
export type PagesFindAllOptions = z.infer<typeof pagesFindAllOptionsSchema>
export type PagesFindOptions = z.infer<typeof pagesFindOptionsSchema>
export type PagesCreateOptions = z.infer<typeof baseOptionsSchema>
export type PagesUpdateOptions = z.infer<typeof baseOptionsSchema>
export type StaticPagesFindAllOptions = z.infer<typeof staticPagesFindAllOptionsSchema>
export type StaticPagesFindOptions = z.infer<typeof staticPagesFindOptionsSchema>
export type StaticPagesCreateOptions = z.infer<typeof staticPagesCreateOptionsSchema>
export type StaticPagesUpdateOptions = z.infer<typeof staticPagesUpdateOptionsSchema>
