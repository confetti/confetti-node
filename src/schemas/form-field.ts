import { z } from 'zod'
import {
  baseFindAllOptionsSchema,
  baseOptionsSchema,
  findBaseOptionsSchema,
  staticBaseFindAllOptionsSchema,
  staticBaseFindOptionsSchema,
} from './resource-options.js'

export const FormFieldSchema = z.object({
  id: z.number().meta({
      label: 'ID',
      description: 'Identifier of the form field.',
    }),
  name: z.string().meta({
      label: 'Name',
      description: 'Machine-readable field name (used as key in ticket.values).',
    }),
  title: z.string().meta({
      label: 'Title',
      description: 'Human-readable field label.',
    }),
  description: z.string().nullable().meta({
      label: 'Description',
      description: 'Optional help text for the field.',
    }),
  field: z
    .enum(['text', 'textarea', 'radio', 'checkbox', 'select', 'country', 'rating', 'section', 'company', 'title'])
    .meta({
        label: 'Field Type',
        description: 'The input type of the field.',
      }),
  order: z.number().meta({
      label: 'Order',
      description: 'Display order within the form.',
    }),
  status: z.enum(['created', 'locked', 'deleted']).meta({
      label: 'Status',
    }),
  sectionId: z.number().nullable().meta({
      label: 'Section Id',
      description: 'Parent section field ID, if nested.',
    }),
  settings: z.looseObject({}).meta({
      label: 'Settings',
    }),
})

export const FormFieldCreateSchema = z.object({
  name: z.string().meta({
      label: 'Name',
      description: 'Machine-readable field name (used as key in ticket.values).',
    }),
  title: z.string().meta({
      label: 'Title',
      description: 'Human-readable field label.',
    }),
  description: z.string().nullable().optional().meta({
      label: 'Description',
      description: 'Optional help text for the field.',
    }),
  field: z
    .enum(['text', 'textarea', 'radio', 'checkbox', 'select', 'country', 'rating', 'section', 'company', 'title'])
    .meta({
        label: 'Field Type',
        description: 'The input type of the field.',
      }),
  order: z.number().optional().meta({
      label: 'Order',
      description: 'Display order within the form.',
    }),
  settings: z.looseObject({}).optional().meta({
      label: 'Settings',
    }),
  formId: z.number().meta({
      label: 'Form Id',
      description: 'Form this field belongs to.',
    }),
  sectionId: z.number().nullable().optional().meta({
      label: 'Section Id',
      description: 'Parent section field ID, if nested.',
    }),
})

export const FormFieldUpdateSchema = FormFieldCreateSchema.partial().extend({
  status: z.enum(['created', 'locked']).optional().meta({
      label: 'Status',
    }),
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
        .meta({
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
    )
    .optional(),
}

export const formFieldsFindAllOptionsSchema = baseFindAllOptionsSchema.extend(formFieldsFindAllSchema)
export const formFieldsFindOptionsSchema = findBaseOptionsSchema.extend({})

export const staticFormFieldsFindAllOptionsSchema = staticBaseFindAllOptionsSchema.extend(formFieldsFindAllSchema)
export const staticFormFieldsFindOptionsSchema = staticBaseFindOptionsSchema.extend({})
export const staticFormFieldsCreateOptionsSchema = staticBaseFindAllOptionsSchema.extend({})
export const staticFormFieldsUpdateOptionsSchema = staticBaseFindAllOptionsSchema.extend({})

export type FormField = z.infer<typeof FormFieldSchema>
export type FormFieldCreate = z.infer<typeof FormFieldCreateSchema>
export type FormFieldCreateData = z.infer<typeof FormFieldCreateSchema>
export type FormFieldUpdate = z.infer<typeof FormFieldUpdateSchema>
export type FormFieldUpdateData = z.infer<typeof FormFieldUpdateSchema>
export type FormFieldsFindAllOptions = z.infer<typeof formFieldsFindAllOptionsSchema>
export type FormFieldsFindOptions = z.infer<typeof formFieldsFindOptionsSchema>
export type FormFieldsCreateOptions = z.infer<typeof baseOptionsSchema>
export type FormFieldsUpdateOptions = z.infer<typeof baseOptionsSchema>
export type StaticFormFieldsFindAllOptions = z.infer<typeof staticFormFieldsFindAllOptionsSchema>
export type StaticFormFieldsFindOptions = z.infer<typeof staticFormFieldsFindOptionsSchema>
export type StaticFormFieldsCreateOptions = z.infer<typeof staticFormFieldsCreateOptionsSchema>
export type StaticFormFieldsUpdateOptions = z.infer<typeof staticFormFieldsUpdateOptionsSchema>
