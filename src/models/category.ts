import loadSamples from '../utils/load-samples.js'
import { schemaToAttributes } from '../utils/schema-to-attributes.js'
import { CategorySchema } from '../schemas/category.js'
import { ModelDefinition } from '../types/model.js'
import {
  extractFiltersFromSchema,
  extractSortingFromSchema,
  extractIncludesFromSchema,
} from '../utils/resource-options-to-model.js'
import { categoriesResourceOptionsSchema } from '../schemas/category.js'

export default function CategoryModel(): ModelDefinition {
  return {
    key: 'category',
    endpoint: 'categories',
    path: 'categories',
    name: 'Category',
    sample: loadSamples('category'),
    sorting: extractSortingFromSchema(categoriesResourceOptionsSchema),
    filters: extractFiltersFromSchema(categoriesResourceOptionsSchema),
    includes: extractIncludesFromSchema(categoriesResourceOptionsSchema),
    operations: {
      read: {
        schema: CategorySchema,
        attributes: schemaToAttributes(CategorySchema),
      },
    },
    webhooks: [],
  }
}
