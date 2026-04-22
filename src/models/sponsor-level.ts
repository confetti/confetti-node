import loadSamples from '../utils/load-samples.js'
import { schemaToAttributes, schemaToCreateAttributes } from '../utils/schema-to-attributes.js'
import { SponsorLevelSchema, SponsorLevelCreateSchema, SponsorLevelUpdateSchema } from '../schemas/sponsor-level.js'
import { ModelDefinition } from '../types/model.js'

export default function SponsorLevelModel(): ModelDefinition {
  return {
    key: 'sponsorLevel',
    endpoint: 'sponsorLevels',
    path: 'sponsor-levels',
    name: 'Sponsor Level',
    sample: loadSamples('sponsorLevel'),
    sorting: [],
    filters: {},
    includes: [],
    operations: {
      read: {
        schema: SponsorLevelSchema,
        attributes: schemaToAttributes(SponsorLevelSchema),
      },
      create: {
        schema: SponsorLevelCreateSchema,
        attributes: schemaToCreateAttributes(SponsorLevelCreateSchema),
      },
      update: {
        schema: SponsorLevelUpdateSchema,
        attributes: schemaToCreateAttributes(SponsorLevelUpdateSchema),
      },
    },
    relationships: [{ field: 'eventId', relationship: 'event', type: 'belongsTo' }],
    webhooks: [],
  }
}
