import { z } from 'zod'
import {
  baseFindAllOptionsSchema,
  findBaseOptionsSchema,
  staticBaseFindAllOptionsSchema,
  staticBaseFindOptionsSchema,
} from './resource-options.js'

export const CategorySchema = z.object({
  id: z.number().meta({
    label: 'ID',
    description: 'Identifier of the category.',
  }),
  name: z.string().meta({
    label: 'Name',
    description: 'Category name.',
  }),
  createdAt: z.date().meta({
    label: 'Created At',
  }),
  updatedAt: z.date().meta({
    label: 'Updated At',
  }),
  organisationId: z.number().meta({
    label: 'Organisation Id',
  }),
})

const categoriesFindAllSchema = {
  filter: z.never().optional(),
  sort: z.never().optional(),
  include: z.never().optional(),
}

export const categoriesFindAllOptionsSchema = baseFindAllOptionsSchema.extend(categoriesFindAllSchema)
export const categoriesFindOptionsSchema = findBaseOptionsSchema.extend({})

export const staticCategoriesFindAllOptionsSchema = staticBaseFindAllOptionsSchema.extend(categoriesFindAllSchema)
export const staticCategoriesFindOptionsSchema = staticBaseFindOptionsSchema.extend({})

export type Category = z.infer<typeof CategorySchema>
export type CategoriesFindAllOptions = z.infer<typeof categoriesFindAllOptionsSchema>
export type CategoriesFindOptions = z.infer<typeof categoriesFindOptionsSchema>
export type StaticCategoriesFindAllOptions = z.infer<typeof staticCategoriesFindAllOptionsSchema>
export type StaticCategoriesFindOptions = z.infer<typeof staticCategoriesFindOptionsSchema>
