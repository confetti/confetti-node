import loadSamples from '../utils/load-samples.js'
import { schemaToAttributes, schemaToCreateAttributes } from '../utils/schema-to-attributes.js'
import { SpeakerSchema, SpeakerCreateSchema, SpeakerUpdateSchema } from '../schemas/speaker.js'
import { ModelDefinition } from '../types/model.js'

export default function SpeakerModel(): ModelDefinition {
  return {
    key: 'speaker',
    endpoint: 'speakers',
    path: 'speakers',
    name: 'Speaker',
    sample: loadSamples('speaker'),
    sorting: [],
    filters: {},
    includes: [],
    operations: {
      read: {
        schema: SpeakerSchema,
        attributes: schemaToAttributes(SpeakerSchema),
      },
      create: {
        schema: SpeakerCreateSchema,
        attributes: schemaToCreateAttributes(SpeakerCreateSchema),
      },
      update: {
        schema: SpeakerUpdateSchema,
        attributes: schemaToCreateAttributes(SpeakerUpdateSchema),
      },
    },
    relationships: [
      { field: 'eventId', relationship: 'event', type: 'belongsTo' },
      { field: 'imageId', relationship: 'image', type: 'belongsTo' },
    ],
    webhooks: [],
  }
}
