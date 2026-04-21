import { z } from 'zod'
import {
  baseFindAllOptionsSchema,
  findBaseOptionsSchema,
  staticBaseFindAllOptionsSchema,
  staticBaseFindOptionsSchema,
} from './resource-options.js'

export const FormFieldSchema = z.object({
  id: z.number().describe(
    JSON.stringify({
      label: 'ID',
      description: 'Identifier of the form field.',
    }),
  ),
  name: z.string().describe(
    JSON.stringify({
      label: 'Name',
      description: 'Machine-readable field name (used as key in ticket.values).',
    }),
  ),
  title: z.string().describe(
    JSON.stringify({
      label: 'Title',
      description: 'Human-readable field label.',
    }),
  ),
  description: z.string().nullable().describe(
    JSON.stringify({
      label: 'Description',
      description: 'Optional help text for the field.',
    }),
  ),
  field: z
    .enum(['text', 'textarea', 'radio', 'checkbox', 'select', 'country', 'rating', 'section', 'company', 'title'])
    .describe(
      JSON.stringify({
        label: 'Field Type',
        description: 'The input type of the field.',
      }),
    ),
  order: z.number().describe(
    JSON.stringify({
      label: 'Order',
      description: 'Display order within the form.',
    }),
  ),
  status: z.enum(['created', 'locked', 'deleted']).describe(
    JSON.stringify({
      label: 'Status',
    }),
  ),
  sectionId: z.number().nullable().describe(
    JSON.stringify({
      label: 'Section Id',
      description: 'Parent section field ID, if nested.',
    }),
  ),
  settings: z.looseObject({}).describe(
    JSON.stringify({
      label: 'Settings',
    }),
  ),
})

const formFieldsFindAllSchema = {
  filter: z.object({
    formId: z.number(),
  }),
  sort: z.never().optional(),
  include: z
    .array(
      z
        .enum(['section', 'fields'])
        .describe(
          JSON.stringify({
            label: 'Include Relations',
            description: 'Include related data',
            values: [
              {
                label: 'Section',
                description: 'Parent section field',
                type: 'string',
                key: 'section',
                value: 'section',
              },
              {
                label: 'Fields',
                description: 'Child fields within this section',
                type: 'string',
                key: 'fields',
                value: 'fields',
              },
            ],
          }),
        ),
    )
    .optional(),
}

export const formFieldsFindAllOptionsSchema = baseFindAllOptionsSchema.extend(formFieldsFindAllSchema)
export const formFieldsFindOptionsSchema = findBaseOptionsSchema.extend({})

export const staticFormFieldsFindAllOptionsSchema = staticBaseFindAllOptionsSchema.extend(formFieldsFindAllSchema)
export const staticFormFieldsFindOptionsSchema = staticBaseFindOptionsSchema.extend({})

export type FormField = z.infer<typeof FormFieldSchema>
export type FormFieldsFindAllOptions = z.infer<typeof formFieldsFindAllOptionsSchema>
export type FormFieldsFindOptions = z.infer<typeof formFieldsFindOptionsSchema>
export type StaticFormFieldsFindAllOptions = z.infer<typeof staticFormFieldsFindAllOptionsSchema>
export type StaticFormFieldsFindOptions = z.infer<typeof staticFormFieldsFindOptionsSchema>
