import { z } from 'zod'
import { baseFindAllResourceOptionsSchema, staticBaseFindAllResourceOptionsSchema } from './resource-options.js'

export const CategorySchema = z.object({
  id: z.number().describe(
    JSON.stringify({
      label: 'ID',
      description: 'Identifier of the category.',
    }),
  ),
  name: z.string().describe(
    JSON.stringify({
      label: 'Name',
      description: 'Category name.',
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

export const categoriesResourceOptionsSchema = baseFindAllResourceOptionsSchema.extend({
  filter: z.never().optional(),
  sort: z.never().optional(),
  include: z.never().optional(),
})

export const categoriesFindOptionsSchema = baseFindAllResourceOptionsSchema.extend({})

export const staticCategoriesResourceOptionsSchema = staticBaseFindAllResourceOptionsSchema.extend({
  filter: z.never().optional(),
  sort: z.never().optional(),
  include: z.never().optional(),
})

export const staticCategoriesFindOptionsSchema = staticBaseFindAllResourceOptionsSchema.extend({})

export type Category = z.infer<typeof CategorySchema>
