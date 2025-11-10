import { z } from 'zod'
import {
  baseFindAllOptionsSchema,
  findBaseOptionsSchema,
  staticBaseFindAllOptionsSchema,
  staticBaseFindOptionsSchema,
} from './resource-options.js'

export const WorkspaceSchema = z.object({
  id: z.number().describe(
    JSON.stringify({
      label: 'ID',
      description: 'Identifier of the workspace.',
    }),
  ),
  name: z.string().describe(
    JSON.stringify({
      label: 'Name',
      description: 'Workspace name.',
    }),
  ),
  timeZone: z.string().describe(
    JSON.stringify({
      label: 'Time Zone',
    }),
  ),
  slug: z.string().describe(
    JSON.stringify({
      label: 'Slug',
    }),
  ),
  featureLevel: z.string().describe(
    JSON.stringify({
      label: 'Feature Level',
    }),
  ),
  website: z.string().describe(
    JSON.stringify({
      label: 'Website',
    }),
  ),
  email: z.string().describe(
    JSON.stringify({
      label: 'Email',
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
