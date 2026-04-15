import { z } from 'zod'
import {
  baseFindAllOptionsSchema,
  baseOptionsSchema,
  findBaseOptionsSchema,
  staticBaseFindAllOptionsSchema,
  staticBaseFindOptionsSchema,
} from './resource-options.js'

export const BlockSchema = z.object({
  id: z.number().describe(
    JSON.stringify({
      label: 'ID',
    }),
  ),
  type: z.string().describe(
    JSON.stringify({
      label: 'Type',
    }),
  ),
  content: z.json().describe(
    JSON.stringify({
      label: 'Content',
    }),
  ),
  order: z.number().describe(
    JSON.stringify({
      label: 'Order',
    }),
  ),
  status: z.string().describe(
    JSON.stringify({
      label: 'Status',
    }),
  ),
})

// Block uses `blockType` instead of `type` to avoid collision with the
// JSON:API resource `type` field. The presenter renames it back when sending
// to the API.
export const BlockCreateSchema = z.object({
  blockType: z.string().describe(JSON.stringify({ label: 'Block Type' })),
  status: z.string().describe(JSON.stringify({ label: 'Status' })),
  slug: z.string().optional().describe(JSON.stringify({ label: 'Slug' })),
  order: z.number().optional().describe(JSON.stringify({ label: 'Order' })),
  content: z.looseObject({}).optional().describe(JSON.stringify({ label: 'Content' })),
  blockStyleId: z.number().optional().describe(JSON.stringify({ label: 'Block Style Id' })),
  pageId: z.number().optional().describe(JSON.stringify({ label: 'Page Id' })),
  eventId: z.number().optional().describe(JSON.stringify({ label: 'Event Id' })),
  workspaceId: z.number().optional().describe(JSON.stringify({ label: 'Workspace Id' })),
  categoryIds: z
    .array(z.number())
    .optional()
    .describe(JSON.stringify({ label: 'Categories' })),
})

export const BlockUpdateSchema = z.object({
  blockType: z.string().optional().describe(JSON.stringify({ label: 'Block Type' })),
  status: z.string().optional().describe(JSON.stringify({ label: 'Status' })),
  slug: z.string().optional().describe(JSON.stringify({ label: 'Slug' })),
  order: z.number().optional().describe(JSON.stringify({ label: 'Order' })),
  content: z.looseObject({}).optional().describe(JSON.stringify({ label: 'Content' })),
  blockStyleId: z.number().optional().describe(JSON.stringify({ label: 'Block Style Id' })),
  pageId: z.number().optional().describe(JSON.stringify({ label: 'Page Id' })),
  eventId: z.number().optional().describe(JSON.stringify({ label: 'Event Id' })),
  workspaceId: z.number().optional().describe(JSON.stringify({ label: 'Workspace Id' })),
  categoryIds: z
    .array(z.number())
    .optional()
    .describe(JSON.stringify({ label: 'Categories' })),
})

const blocksFindAllSchema = {
  filter: z
    .object({
      pageId: z.number().optional(),
      eventId: z.number().optional(),
    })
    .optional(),
  sort: z.never().optional(),
  include: z
    .array(z.enum(['images']))
    .optional(),
}

export const blocksFindAllOptionsSchema = baseFindAllOptionsSchema.extend(blocksFindAllSchema)
export const blocksFindOptionsSchema = findBaseOptionsSchema.extend({})

export const staticBlocksFindAllOptionsSchema = staticBaseFindAllOptionsSchema.extend(blocksFindAllSchema)
export const staticBlocksFindOptionsSchema = staticBaseFindOptionsSchema.extend({})
export const staticBlocksCreateOptionsSchema = staticBaseFindAllOptionsSchema.extend({})
export const staticBlocksUpdateOptionsSchema = staticBaseFindAllOptionsSchema.extend({})

export type Block = z.infer<typeof BlockSchema>
export type BlockCreate = z.infer<typeof BlockCreateSchema>
export type BlockCreateData = z.infer<typeof BlockCreateSchema>
export type BlockUpdate = z.infer<typeof BlockUpdateSchema>
export type BlockUpdateData = z.infer<typeof BlockUpdateSchema>
export type BlocksFindAllOptions = z.infer<typeof blocksFindAllOptionsSchema>
export type BlocksFindOptions = z.infer<typeof blocksFindOptionsSchema>
export type BlocksCreateOptions = z.infer<typeof baseOptionsSchema>
export type BlocksUpdateOptions = z.infer<typeof baseOptionsSchema>
export type StaticBlocksFindAllOptions = z.infer<typeof staticBlocksFindAllOptionsSchema>
export type StaticBlocksFindOptions = z.infer<typeof staticBlocksFindOptionsSchema>
export type StaticBlocksCreateOptions = z.infer<typeof staticBlocksCreateOptionsSchema>
export type StaticBlocksUpdateOptions = z.infer<typeof staticBlocksUpdateOptionsSchema>
