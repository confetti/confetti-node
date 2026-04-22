import loadSamples from '../utils/load-samples.js'
import { schemaToAttributes, schemaToCreateAttributes } from '../utils/schema-to-attributes.js'
import { SponsorSchema, SponsorCreateSchema, SponsorUpdateSchema } from '../schemas/sponsor.js'
import { ModelDefinition } from '../types/model.js'

export default function SponsorModel(): ModelDefinition {
  return {
    key: 'sponsor',
    endpoint: 'sponsors',
    path: 'sponsors',
    name: 'Sponsor',
    sample: loadSamples('sponsor'),
    sorting: [],
    filters: {},
    includes: [],
    operations: {
      read: {
        schema: SponsorSchema,
        attributes: schemaToAttributes(SponsorSchema),
      },
      create: {
        schema: SponsorCreateSchema,
        attributes: schemaToCreateAttributes(SponsorCreateSchema),
      },
      update: {
        schema: SponsorUpdateSchema,
        attributes: schemaToCreateAttributes(SponsorUpdateSchema),
      },
    },
    relationships: [
      { field: 'sponsorLevelId', relationship: 'sponsorLevel', type: 'belongsTo' },
      { field: 'imageId', relationship: 'image', type: 'belongsTo' },
    ],
    webhooks: [],
  }
}
