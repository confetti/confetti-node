import loadSamples from '../utils/load-samples.js'
import { schemaToAttributes } from '../utils/schema-to-attributes.js'
import { EventSchema } from '../schemas/event.js'
import { ModelDefinition } from '../types/model.js'
import {
  extractFiltersFromSchema,
  extractSortingFromSchema,
  extractIncludesFromSchema,
} from '../utils/resource-options-to-model.js'
import { eventsResourceOptionsSchema } from '../schemas/event.js'

export default function EventModel(): ModelDefinition {
  return {
    key: 'event',
    endpoint: 'events',
    path: 'events',
    name: 'Event',
    sample: loadSamples('event'),
    sorting: extractSortingFromSchema(eventsResourceOptionsSchema),
    filters: extractFiltersFromSchema(eventsResourceOptionsSchema),
    includes: extractIncludesFromSchema(eventsResourceOptionsSchema),
    operations: {
      read: {
        schema: EventSchema,
        attributes: schemaToAttributes(EventSchema),
      },
    },
    webhooks: [
      {
        type: 'event.created',
        label: 'Created',
        description: 'Triggers when an event is created.',
        important: true,
      },
      {
        type: 'event.updated',
        label: 'Updated',
        description: 'Triggers when an event is updated.',
        important: true,
      },
    ],
  }
}
