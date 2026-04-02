import loadSamples from '../utils/load-samples.js'
import { schemaToAttributes } from '../utils/schema-to-attributes.js'
import { ScheduleItemSchema } from '../schemas/schedule-item.js'
import { ModelDefinition } from '../types/model.js'

export default function ScheduleItemModel(): ModelDefinition {
  return {
    key: 'scheduleItem',
    endpoint: 'scheduleItems',
    path: 'schedule-items',
    name: 'Schedule Item',
    sample: loadSamples('scheduleItem'),
    sorting: [],
    filters: {},
    includes: [],
    operations: {
      read: {
        schema: ScheduleItemSchema,
        attributes: schemaToAttributes(ScheduleItemSchema),
      },
    },
    webhooks: [],
  }
}
