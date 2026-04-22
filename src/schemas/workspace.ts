import { z } from 'zod'
import {
  baseFindAllOptionsSchema,
  findBaseOptionsSchema,
  staticBaseFindAllOptionsSchema,
  staticBaseFindOptionsSchema,
} from './resource-options.js'

export const WorkspaceSchema = z.object({
  id: z.number().meta({
      label: 'ID',
      description: 'Identifier of the workspace.',
    }),
  name: z.string().meta({
      label: 'Name',
      description: 'Workspace name.',
    }),
  timeZone: z.string().meta({
      label: 'Time Zone',
    }),
  slug: z.string().meta({
      label: 'Slug',
    }),
  featureLevel: z.string().meta({
      label: 'Feature Level',
    }),
  website: z.string().meta({
      label: 'Website',
    }),
  email: z.string().meta({
      label: 'Email',
    }),
  createdAt: z.date().meta({
      label: 'Created At',
    }),
  updatedAt: z.date().meta({
      label: 'Updated At',
    }),
  shareTitle: z.string().meta({
      label: 'ShareTitle',
    }),
  shareDescription: z.string().meta({
      label: 'Share description',
    }),
  summary: z.string().meta({
      label: 'Summary',
    }),
  primaryColor: z.string().meta({
      label: 'Primary color',
    }),
})

const workspacesFindAllSchema = {
  filter: z.never().optional(),
  sort: z.never().optional(),
  include: z.never().optional(),
}

export const workspacesFindAllOptionsSchema = baseFindAllOptionsSchema.extend(workspacesFindAllSchema)
export const workspacesFindOptionsSchema = findBaseOptionsSchema.extend({})

export const staticWorkspacesFindAllOptionsSchema = staticBaseFindAllOptionsSchema.extend(workspacesFindAllSchema)
export const staticWorkspacesFindOptionsSchema = staticBaseFindOptionsSchema.extend({})

export type Workspace = z.infer<typeof WorkspaceSchema>
export type WorkspacesFindAllOptions = z.infer<typeof workspacesFindAllOptionsSchema>
export type WorkspacesFindOptions = z.infer<typeof workspacesFindOptionsSchema>
export type StaticWorkspacesFindAllOptions = z.infer<typeof staticWorkspacesFindAllOptionsSchema>
export type StaticWorkspacesFindOptions = z.infer<typeof staticWorkspacesFindOptionsSchema>
