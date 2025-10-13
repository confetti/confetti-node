import loadSamples from '../utils/load-samples.js'
import { schemaToAttributes } from '../utils/schema-to-attributes.js'
import { WorkspaceSchema } from '../schemas/workspace.js'
import { ModelDefinition } from '../types/model.js'
import {
  extractFiltersFromSchema,
  extractSortingFromSchema,
  extractIncludesFromSchema,
} from '../utils/resource-options-to-model.js'
import { workspacesResourceOptionsSchema } from '../schemas/workspace.js'

export default function WorkspaceModel(): ModelDefinition {
  return {
    key: 'workspace',
    endpoint: 'workspaces',
    path: 'workspaces',
    name: 'Workspace',
    sample: loadSamples('workspace'),
    sorting: extractSortingFromSchema(workspacesResourceOptionsSchema),
    filters: extractFiltersFromSchema(workspacesResourceOptionsSchema),
    includes: extractIncludesFromSchema(workspacesResourceOptionsSchema),
    operations: {
      read: {
        schema: WorkspaceSchema,
        attributes: schemaToAttributes(WorkspaceSchema),
      },
    },
    webhooks: [],
  }
}
