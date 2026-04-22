import { z } from 'zod'
import {
  baseFindAllOptionsSchema,
  findBaseOptionsSchema,
  staticBaseFindAllOptionsSchema,
  staticBaseFindOptionsSchema,
} from './resource-options.js'

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

const formsFindAllSchema = {
  filter: z.object({
    eventId: z.number(),
  }),
  sort: z.never().optional(),
  include: z
    .array(
      z.enum(['formFields']).meta({
        label: 'Include Relations',
        description: 'Include related data',
        values: [
          {
            label: 'Form Fields',
            description: 'Form fields belonging to this form',
            type: 'string',
            key: 'formFields',
            value: 'formFields',
          },
        ],
      }),
    )
    .optional(),
}

export const formsFindAllOptionsSchema = baseFindAllOptionsSchema.extend(formsFindAllSchema)
export const formsFindOptionsSchema = findBaseOptionsSchema.extend({})

export const staticFormsFindAllOptionsSchema = staticBaseFindAllOptionsSchema.extend(formsFindAllSchema)
export const staticFormsFindOptionsSchema = staticBaseFindOptionsSchema.extend({})

export type Form = z.infer<typeof FormSchema>
export type FormsFindAllOptions = z.infer<typeof formsFindAllOptionsSchema>
export type FormsFindOptions = z.infer<typeof formsFindOptionsSchema>
export type StaticFormsFindAllOptions = z.infer<typeof staticFormsFindAllOptionsSchema>
export type StaticFormsFindOptions = z.infer<typeof staticFormsFindOptionsSchema>
