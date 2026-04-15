import loadSamples from '../utils/load-samples.js'
import { schemaToAttributes, schemaToCreateAttributes } from '../utils/schema-to-attributes.js'
import { EventSchema, EventCreateSchema, EventUpdateSchema } from '../schemas/event.js'
import { ModelDefinition } from '../types/model.js'
import {
  extractFiltersFromSchema,
  extractSortingFromSchema,
  extractIncludesFromSchema,
} from '../utils/resource-options-to-model.js'
import { eventsFindAllOptionsSchema } from '../schemas/event.js'

export default function EventModel(): ModelDefinition {
  return {
    key: 'event',
    endpoint: 'events',
    path: 'events',
    name: 'Event',
    sample: loadSamples('event'),
    sorting: extractSortingFromSchema(eventsFindAllOptionsSchema),
    filters: extractFiltersFromSchema(eventsFindAllOptionsSchema),
    includes: extractIncludesFromSchema(eventsFindAllOptionsSchema),
    operations: {
      read: {
        schema: EventSchema,
        attributes: schemaToAttributes(EventSchema),
      },
      create: {
        schema: EventCreateSchema,
        attributes: schemaToCreateAttributes(EventCreateSchema),
      },
      update: {
        schema: EventUpdateSchema,
        attributes: schemaToCreateAttributes(EventUpdateSchema),
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
