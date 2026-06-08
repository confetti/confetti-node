import { z } from 'zod'
import { findBaseOptionsSchema, staticBaseFindOptionsSchema } from './resource-options.js'

export const FormSchema = z.object({
  id: z.number().meta({
    label: 'ID',
    description: 'Identifier of the form.',
  }),
  name: z.string().meta({
    label: 'Name',
    description: 'Form name.',
  }),
  type: z.enum(['signup', 'feedback', 'addon']).meta({
    label: 'Type',
    description: 'The type of form.',
  }),
  default: z.boolean().meta({
    label: 'Default',
    description: 'Whether this is the default form.',
  }),
  settings: z.looseObject({}).meta({
    label: 'Settings',
  }),
})

export const formsFindOptionsSchema = findBaseOptionsSchema.extend({})

export const staticFormsFindOptionsSchema = staticBaseFindOptionsSchema.extend({})

export type Form = z.infer<typeof FormSchema>
export type FormsFindOptions = z.infer<typeof formsFindOptionsSchema>
export type StaticFormsFindOptions = z.infer<typeof staticFormsFindOptionsSchema>
