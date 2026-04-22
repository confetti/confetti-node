import loadSamples from '../utils/load-samples.js'
import { schemaToAttributes, schemaToCreateAttributes } from '../utils/schema-to-attributes.js'
import {
  ScheduleItemSchema,
  ScheduleItemCreateSchema,
  ScheduleItemUpdateSchema,
} from '../schemas/schedule-item.js'
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
      create: {
        schema: ScheduleItemCreateSchema,
        attributes: schemaToCreateAttributes(ScheduleItemCreateSchema),
      },
      update: {
        schema: ScheduleItemUpdateSchema,
        attributes: schemaToCreateAttributes(ScheduleItemUpdateSchema),
      },
    },
    webhooks: [],
  }
}
