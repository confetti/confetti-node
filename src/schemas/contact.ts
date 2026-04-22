import { z } from 'zod'
import {
  baseFindAllOptionsSchema,
  staticBaseFindAllOptionsSchema,
  baseOptionsSchema,
  findBaseOptionsSchema,
  staticBaseFindOptionsSchema,
} from './resource-options.js'

export const ContactSchema = z.object({
  id: z.number().meta({
    label: 'ID',
    description: 'Identifier of the contact.',
  }),
  firstName: z.string().meta({
    label: 'First Name',
  }),
  lastName: z.string().meta({
    label: 'Last Name',
  }),
  email: z.string().meta({
    label: 'Email',
  }),
  phone: z.string().meta({
    label: 'Phone',
  }),
  token: z.string().meta({
    label: 'Token',
  }),
  status: z.string().meta({
    label: 'Status',
  }),
  comment: z.string().meta({
    label: 'Comment',
  }),
  lastSeen: z.date().meta({
    label: 'Last Seen',
  }),
  deletionRequestedAt: z.date().optional().meta({
    label: 'Deletion Requested At',
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
  company: z.string().meta({
    label: 'Company',
  }),
})

export const ContactCreateSchema = z.object({
  firstName: z.string().optional().meta({
    label: 'First Name',
  }),
  lastName: z.string().optional().meta({
    label: 'Last Name',
  }),
  email: z.string().email().meta({
    label: 'Email',
  }),
  phone: z.string().optional().meta({
    label: 'Phone',
    placeholder: '+46 12 345 67 89',
    helpText: 'Mobile phone number with country code. Example: +46701234567',
  }),
  comment: z.string().optional().meta({
    label: 'Comment',
  }),
  company: z.string().optional().meta({
    label: 'Company',
  }),
  categoryIds: z.array(z.number()).optional().meta({
    label: 'Categories',
    helpText: 'Attach categories to your contact.',
  }),
  workspaceId: z.number().meta({
    label: 'Workspace Id',
  }),
})

const contactsFindAllSchema = {
  filter: z.never().optional(),
  sort: z.never().optional(),
  include: z.never().optional(),
}

export const contactsFindAllOptionsSchema = baseFindAllOptionsSchema.extend(contactsFindAllSchema)
export const contactsFindOptionsSchema = findBaseOptionsSchema.extend({})

export const staticContactsFindAllOptionsSchema = staticBaseFindAllOptionsSchema.extend(contactsFindAllSchema)
export const staticContactsFindOptionsSchema = staticBaseFindOptionsSchema.extend({})
export const staticContactsCreateOptionsSchema = staticBaseFindAllOptionsSchema.extend({})

export type Contact = z.infer<typeof ContactSchema>
export type ContactCreate = z.infer<typeof ContactCreateSchema>
export type ContactCreateData = z.infer<typeof ContactCreateSchema>
export type ContactsFindAllOptions = z.infer<typeof contactsFindAllOptionsSchema>
export type ContactsFindOptions = z.infer<typeof contactsFindOptionsSchema>
export type ContactsCreateOptions = z.infer<typeof baseOptionsSchema>
export type StaticContactsFindAllOptions = z.infer<typeof staticContactsFindAllOptionsSchema>
export type StaticContactsFindOptions = z.infer<typeof staticContactsFindOptionsSchema>
export type StaticContactsCreateOptions = z.infer<typeof staticContactsCreateOptionsSchema>
