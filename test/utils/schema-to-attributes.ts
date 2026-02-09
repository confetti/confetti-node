import { describe, test } from 'node:test'
import assert from 'node:assert'
import { z } from 'zod'
import {
  schemaToAttributes,
  schemaToBaseAttributes,
  schemaToCreateAttributes,
} from '../../src/utils/schema-to-attributes.js'

describe('schemaToAttributes()', () => {
  describe('Base attributes (default behavior)', () => {
    test('should generate attributes from a basic schema without metadata', () => {
      const schema = z.object({
        id: z.number(),
        name: z.string(),
        isActive: z.boolean(),
        createdAt: z.date(),
      })

      const attributes = schemaToBaseAttributes(schema)

      assert.strictEqual(attributes.length, 4)
      assert.deepStrictEqual(attributes[0], {
        key: 'id',
        label: 'Id',
        type: 'number',
      })
      assert.deepStrictEqual(attributes[1], {
        key: 'name',
        label: 'Name',
        type: 'string',
      })
      assert.deepStrictEqual(attributes[2], {
        key: 'isActive',
        label: 'Is Active',
        type: 'boolean',
      })
      assert.deepStrictEqual(attributes[3], {
        key: 'createdAt',
        label: 'Created At',
        type: 'date',
      })
    })

    test('should extract custom labels from metadata', () => {
      const schema = z.object({
        id: z.number().describe(
          JSON.stringify({
            label: 'ID',
          }),
        ),
        firstName: z.string().describe(
          JSON.stringify({
            label: 'First Name',
          }),
        ),
        email: z.string().describe(
          JSON.stringify({
            label: 'Email Address',
          }),
        ),
      })

      const attributes = schemaToBaseAttributes(schema)

      assert.strictEqual(attributes.length, 3)
      assert.deepStrictEqual(attributes[0], {
        key: 'id',
        label: 'ID',
        type: 'number',
      })
      assert.deepStrictEqual(attributes[1], {
        key: 'firstName',
        label: 'First Name',
        type: 'string',
      })
      assert.deepStrictEqual(attributes[2], {
        key: 'email',
        label: 'Email Address',
        type: 'string',
      })
    })

    test('should extract descriptions from metadata', () => {
      const schema = z.object({
        id: z.number().describe(
          JSON.stringify({
            label: 'ID',
            description: 'Unique identifier for the record.',
          }),
        ),
        name: z.string().describe(
          JSON.stringify({
            label: 'Name',
            description: 'The display name of the item.',
          }),
        ),
        status: z.string().describe(
          JSON.stringify({
            label: 'Status',
          }),
        ),
      })

      const attributes = schemaToBaseAttributes(schema)

      assert.strictEqual(attributes.length, 3)
      assert.deepStrictEqual(attributes[0], {
        key: 'id',
        label: 'ID',
        description: 'Unique identifier for the record.',
        type: 'number',
      })
      assert.deepStrictEqual(attributes[1], {
        key: 'name',
        label: 'Name',
        description: 'The display name of the item.',
        type: 'string',
      })
      assert.deepStrictEqual(attributes[2], {
        key: 'status',
        label: 'Status',
        type: 'string',
      })
    })

    test('should handle optional fields correctly', () => {
      const schema = z.object({
        id: z.number(),
        name: z.string(),
        deletedAt: z
          .date()
          .optional()
          .describe(
            JSON.stringify({
              label: 'Deleted At',
            }),
          ),
        metadata: z.record(z.string(), z.unknown()).optional(),
      })

      const attributes = schemaToBaseAttributes(schema)

      assert.strictEqual(attributes.length, 4)
      assert.deepStrictEqual(attributes[0], {
        key: 'id',
        label: 'Id',
        type: 'number',
      })
      assert.deepStrictEqual(attributes[1], {
        key: 'name',
        label: 'Name',
        type: 'string',
      })
      assert.deepStrictEqual(attributes[2], {
        key: 'deletedAt',
        label: 'Deleted At',
        type: 'date',
      })
      assert.deepStrictEqual(attributes[3], {
        key: 'metadata',
        label: 'Metadata',
        type: 'object',
      })
    })

    test('should handle record/object types correctly', () => {
      const schema = z.object({
        id: z.number(),
        settings: z.record(z.string(), z.unknown()).describe(
          JSON.stringify({
            label: 'Settings',
            description: 'Configuration settings for the item.',
          }),
        ),
        tags: z.record(z.string(), z.string()),
      })

      const attributes = schemaToBaseAttributes(schema)

      assert.strictEqual(attributes.length, 3)
      assert.deepStrictEqual(attributes[0], {
        key: 'id',
        label: 'Id',
        type: 'number',
      })
      assert.deepStrictEqual(attributes[1], {
        key: 'settings',
        label: 'Settings',
        description: 'Configuration settings for the item.',
        type: 'object',
      })
      assert.deepStrictEqual(attributes[2], {
        key: 'tags',
        label: 'Tags',
        type: 'object',
      })
    })

    test('should handle mixed metadata and auto-generated labels', () => {
      const schema = z.object({
        id: z.number().describe(
          JSON.stringify({
            label: 'ID',
            description: 'Unique identifier.',
          }),
        ),
        name: z.string(), // No metadata - should auto-generate
        email: z.string().describe(
          JSON.stringify({
            label: 'Email Address',
          }),
        ),
        createdAt: z.date(), // No metadata - should auto-generate
      })

      const attributes = schemaToBaseAttributes(schema)

      assert.strictEqual(attributes.length, 4)
      assert.deepStrictEqual(attributes[0], {
        key: 'id',
        label: 'ID',
        description: 'Unique identifier.',
        type: 'number',
      })
      assert.deepStrictEqual(attributes[1], {
        key: 'name',
        label: 'Name', // Auto-generated
        type: 'string',
      })
      assert.deepStrictEqual(attributes[2], {
        key: 'email',
        label: 'Email Address',
        type: 'string',
      })
      assert.deepStrictEqual(attributes[3], {
        key: 'createdAt',
        label: 'Created At', // Auto-generated
        type: 'date',
      })
    })

    test('should handle empty schema', () => {
      const schema = z.object({})
      const attributes = schemaToBaseAttributes(schema)
      assert.strictEqual(attributes.length, 0)
    })

    test('should handle complex nested optional fields', () => {
      const schema = z.object({
        id: z.number(),
        user: z
          .object({
            name: z.string(),
            email: z.string(),
          })
          .optional()
          .describe(
            JSON.stringify({
              label: 'User Information',
              description: 'Optional user details.',
            }),
          ),
      })

      const attributes = schemaToBaseAttributes(schema)

      assert.strictEqual(attributes.length, 2)
      assert.deepStrictEqual(attributes[0], {
        key: 'id',
        label: 'Id',
        type: 'number',
      })
      assert.deepStrictEqual(attributes[1], {
        key: 'user',
        label: 'User Information',
        description: 'Optional user details.',
        type: 'string', // Nested objects are treated as strings by the current implementation
      })
    })

    test('should handle malformed JSON in description gracefully', () => {
      const schema = z.object({
        id: z.number().describe('invalid json'),
        name: z.string().describe(
          JSON.stringify({
            label: 'Name',
          }),
        ),
      })

      const attributes = schemaToBaseAttributes(schema)

      assert.strictEqual(attributes.length, 2)
      assert.deepStrictEqual(attributes[0], {
        key: 'id',
        label: 'Id', // Should fall back to auto-generated
        type: 'number',
      })
      assert.deepStrictEqual(attributes[1], {
        key: 'name',
        label: 'Name',
        type: 'string',
      })
    })

    test('should handle all supported Zod types', () => {
      const schema = z.object({
        stringField: z.string(),
        numberField: z.number(),
        booleanField: z.boolean(),
        dateField: z.date(),
        objectField: z.record(z.string(), z.unknown()),
        optionalString: z.string().optional(),
        optionalNumber: z.number().optional(),
        optionalBoolean: z.boolean().optional(),
        optionalDate: z.date().optional(),
        optionalObject: z.record(z.string(), z.unknown()).optional(),
      })

      const attributes = schemaToBaseAttributes(schema)

      assert.strictEqual(attributes.length, 10)

      // Check types are correctly identified
      const typeMap = attributes.reduce(
        (acc, attr) => {
          acc[attr.key] = attr.type
          return acc
        },
        {} as Record<string, string>,
      )

      assert.strictEqual(typeMap.stringField, 'string')
      assert.strictEqual(typeMap.numberField, 'number')
      assert.strictEqual(typeMap.booleanField, 'boolean')
      assert.strictEqual(typeMap.dateField, 'date')
      assert.strictEqual(typeMap.objectField, 'object')
      assert.strictEqual(typeMap.optionalString, 'string')
      assert.strictEqual(typeMap.optionalNumber, 'number')
      assert.strictEqual(typeMap.optionalBoolean, 'boolean')
      assert.strictEqual(typeMap.optionalDate, 'date')
      assert.strictEqual(typeMap.optionalObject, 'object')
    })
  })

  describe('Create attributes', () => {
    test('should generate create attributes from a basic schema', () => {
      const schema = z.object({
        name: z.string(),
        email: z.string(),
        age: z.number().optional(),
        isActive: z.boolean(),
      })

      const attributes = schemaToCreateAttributes(schema)

      assert.strictEqual(attributes.length, 4)

      const nameAttr = attributes.find((attr) => attr.key === 'name')
      assert.deepStrictEqual(nameAttr, {
        key: 'name',
        label: 'Name',
        type: 'string',
        required: true,
      })

      const emailAttr = attributes.find((attr) => attr.key === 'email')
      assert.deepStrictEqual(emailAttr, {
        key: 'email',
        label: 'Email',
        type: 'string',
        required: true,
      })

      const ageAttr = attributes.find((attr) => attr.key === 'age')
      assert.deepStrictEqual(ageAttr, {
        key: 'age',
        label: 'Age',
        type: 'number',
        required: false,
      })

      const isActiveAttr = attributes.find((attr) => attr.key === 'isActive')
      assert.deepStrictEqual(isActiveAttr, {
        key: 'isActive',
        label: 'Is Active',
        type: 'boolean',
        required: true,
      })
    })

    test('should extract metadata from create schemas', () => {
      const schema = z.object({
        email: z.string().describe(
          JSON.stringify({
            label: 'Email Address',
            helpText: 'Enter a valid email address',
          }),
        ),
        phone: z
          .string()
          .optional()
          .describe(
            JSON.stringify({
              label: 'Phone Number',
              placeholder: '+1 (555) 123-4567',
              helpText: 'Include country code',
            }),
          ),
        status: z.enum(['active', 'inactive']).describe(
          JSON.stringify({
            label: 'Account Status',
          }),
        ),
      })

      const attributes = schemaToCreateAttributes(schema)

      assert.strictEqual(attributes.length, 3)

      const emailAttr = attributes.find((attr) => attr.key === 'email')
      assert.deepStrictEqual(emailAttr, {
        key: 'email',
        label: 'Email Address',
        type: 'string',
        required: true,
        helpText: 'Enter a valid email address',
      })

      const phoneAttr = attributes.find((attr) => attr.key === 'phone')
      assert.deepStrictEqual(phoneAttr, {
        key: 'phone',
        label: 'Phone Number',
        type: 'string',
        required: false,
        placeholder: '+1 (555) 123-4567',
        helpText: 'Include country code',
      })

      const statusAttr = attributes.find((attr) => attr.key === 'status')
      assert.deepStrictEqual(statusAttr, {
        key: 'status',
        label: 'Account Status',
        type: 'enum',
        required: true,
        values: ['active', 'inactive'],
      })
    })

    test('should handle enum types correctly', () => {
      const schema = z.object({
        priority: z.enum(['low', 'medium', 'high']),
        category: z.enum(['urgent', 'normal']).optional(),
      })

      const attributes = schemaToCreateAttributes(schema)

      assert.strictEqual(attributes.length, 2)

      const priorityAttr = attributes.find((attr) => attr.key === 'priority')
      assert.deepStrictEqual(priorityAttr, {
        key: 'priority',
        label: 'Priority',
        type: 'enum',
        required: true,
        values: ['low', 'medium', 'high'],
      })

      const categoryAttr = attributes.find((attr) => attr.key === 'category')
      assert.deepStrictEqual(categoryAttr, {
        key: 'category',
        label: 'Category',
        type: 'enum',
        required: false,
        values: ['urgent', 'normal'],
      })
    })

    test('should handle array types correctly', () => {
      const schema = z.object({
        tags: z.array(z.string()),
        ids: z.array(z.number()).optional(),
      })

      const attributes = schemaToCreateAttributes(schema)

      assert.strictEqual(attributes.length, 2)

      const tagsAttr = attributes.find((attr) => attr.key === 'tags')
      assert.deepStrictEqual(tagsAttr, {
        key: 'tags',
        label: 'Tags',
        type: 'array',
        required: true,
      })

      const idsAttr = attributes.find((attr) => attr.key === 'ids')
      assert.deepStrictEqual(idsAttr, {
        key: 'ids',
        label: 'Ids',
        type: 'array',
        required: false,
      })
    })

    test('should handle all supported Zod types for create attributes', () => {
      const schema = z.object({
        stringField: z.string(),
        numberField: z.number(),
        booleanField: z.boolean(),
        dateField: z.date(),
        objectField: z.record(z.string(), z.unknown()),
        arrayField: z.array(z.string()),
        enumField: z.enum(['a', 'b', 'c']),
        optionalString: z.string().optional(),
        optionalNumber: z.number().optional(),
        optionalBoolean: z.boolean().optional(),
        optionalDate: z.date().optional(),
        optionalObject: z.record(z.string(), z.unknown()).optional(),
        optionalArray: z.array(z.string()).optional(),
        optionalEnum: z.enum(['x', 'y']).optional(),
      })

      const attributes = schemaToCreateAttributes(schema)

      assert.strictEqual(attributes.length, 14)

      // Check required fields
      const requiredFields = attributes.filter((attr) => attr.required)
      assert.strictEqual(requiredFields.length, 7) // stringField, numberField, booleanField, dateField, objectField, arrayField, enumField

      // Check optional fields
      const optionalFields = attributes.filter((attr) => !attr.required)
      assert.strictEqual(optionalFields.length, 7) // All optional* fields

      // Check types
      const typeMap = attributes.reduce(
        (acc, attr) => {
          acc[attr.key] = attr.type
          return acc
        },
        {} as Record<string, string>,
      )

      assert.strictEqual(typeMap.stringField, 'string')
      assert.strictEqual(typeMap.numberField, 'number')
      assert.strictEqual(typeMap.booleanField, 'boolean')
      assert.strictEqual(typeMap.dateField, 'date')
      assert.strictEqual(typeMap.objectField, 'object')
      assert.strictEqual(typeMap.arrayField, 'array')
      assert.strictEqual(typeMap.enumField, 'enum')
      assert.strictEqual(typeMap.optionalString, 'string')
      assert.strictEqual(typeMap.optionalNumber, 'number')
      assert.strictEqual(typeMap.optionalBoolean, 'boolean')
      assert.strictEqual(typeMap.optionalDate, 'date')
      assert.strictEqual(typeMap.optionalObject, 'object')
      assert.strictEqual(typeMap.optionalArray, 'array')
      assert.strictEqual(typeMap.optionalEnum, 'enum')
    })

    test('should handle empty schema', () => {
      const schema = z.object({})
      const attributes = schemaToCreateAttributes(schema)
      assert.strictEqual(attributes.length, 0)
    })

    test('should handle malformed JSON in description gracefully', () => {
      const schema = z.object({
        name: z.string().describe('invalid json'),
        email: z.string().describe(
          JSON.stringify({
            label: 'Email Address',
          }),
        ),
      })

      const attributes = schemaToCreateAttributes(schema)

      assert.strictEqual(attributes.length, 2)

      const nameAttr = attributes.find((attr) => attr.key === 'name')
      assert.deepStrictEqual(nameAttr, {
        key: 'name',
        label: 'Name', // Should fall back to auto-generated
        type: 'string',
        required: true,
      })

      const emailAttr = attributes.find((attr) => attr.key === 'email')
      assert.deepStrictEqual(emailAttr, {
        key: 'email',
        label: 'Email Address',
        type: 'string',
        required: true,
      })
    })

    test('should handle complex metadata with all properties', () => {
      const schema = z.object({
        field: z.string().describe(
          JSON.stringify({
            label: 'Custom Label',
            description: 'Field description',
            placeholder: 'Enter value here',
            helpText: 'This is helpful text',
            values: ['option1', 'option2'],
          }),
        ),
      })

      const attributes = schemaToCreateAttributes(schema)

      assert.strictEqual(attributes.length, 1)
      assert.deepStrictEqual(attributes[0], {
        key: 'field',
        label: 'Custom Label',
        description: 'Field description',
        type: 'string',
        required: true,
        placeholder: 'Enter value here',
        helpText: 'This is helpful text',
        values: ['option1', 'option2'],
      })
    })
  })

  describe('Unified function with options', () => {
    test('should generate base attributes by default', () => {
      const schema = z.object({
        name: z.string(),
        age: z.number().optional(),
      })

      const attributes = schemaToAttributes(schema)

      assert.strictEqual(attributes.length, 2)
      assert.deepStrictEqual(attributes[0], {
        key: 'name',
        label: 'Name',
        type: 'string',
      })
      assert.deepStrictEqual(attributes[1], {
        key: 'age',
        label: 'Age',
        type: 'number',
      })
    })

    test('should generate create attributes when includeCreateFields is true', () => {
      const schema = z.object({
        name: z.string(),
        age: z.number().optional(),
        status: z.enum(['active', 'inactive']).describe(
          JSON.stringify({
            label: 'Status',
            helpText: 'Current status',
          }),
        ),
      })

      const attributes = schemaToAttributes(schema, { includeCreateFields: true })

      assert.strictEqual(attributes.length, 3)

      const nameAttr = attributes.find((attr) => attr.key === 'name')
      assert.deepStrictEqual(nameAttr, {
        key: 'name',
        label: 'Name',
        type: 'string',
        required: true,
      })

      const ageAttr = attributes.find((attr) => attr.key === 'age')
      assert.deepStrictEqual(ageAttr, {
        key: 'age',
        label: 'Age',
        type: 'number',
        required: false,
      })

      const statusAttr = attributes.find((attr) => attr.key === 'status')
      assert.deepStrictEqual(statusAttr, {
        key: 'status',
        label: 'Status',
        type: 'enum',
        required: true,
        values: ['active', 'inactive'],
        helpText: 'Current status',
      })
    })

    test('should generate attributes with required field when includeRequired is true', () => {
      const schema = z.object({
        name: z.string(),
        age: z.number().optional(),
      })

      const attributes = schemaToAttributes(schema, { includeRequired: true })

      assert.strictEqual(attributes.length, 2)

      const nameAttr = attributes.find((attr) => attr.key === 'name')
      assert.deepStrictEqual(nameAttr, {
        key: 'name',
        label: 'Name',
        type: 'string',
        required: true,
      })

      const ageAttr = attributes.find((attr) => attr.key === 'age')
      assert.deepStrictEqual(ageAttr, {
        key: 'age',
        label: 'Age',
        type: 'number',
        required: false,
      })
    })

    test('should handle complex metadata with create fields', () => {
      const schema = z.object({
        email: z.string().describe(
          JSON.stringify({
            label: 'Email Address',
            description: 'User email',
            placeholder: 'user@example.com',
            helpText: 'Must be a valid email',
          }),
        ),
        category: z
          .enum(['premium', 'basic'])
          .optional()
          .describe(
            JSON.stringify({
              label: 'User Category',
              values: ['Premium', 'Basic'],
            }),
          ),
      })

      const attributes = schemaToAttributes(schema, { includeCreateFields: true })

      assert.strictEqual(attributes.length, 2)

      const emailAttr = attributes.find((attr) => attr.key === 'email')
      assert.deepStrictEqual(emailAttr, {
        key: 'email',
        label: 'Email Address',
        description: 'User email',
        type: 'string',
        required: true,
        placeholder: 'user@example.com',
        helpText: 'Must be a valid email',
      })

      const categoryAttr = attributes.find((attr) => attr.key === 'category')
      assert.deepStrictEqual(categoryAttr, {
        key: 'category',
        label: 'User Category',
        type: 'enum',
        required: false,
        values: ['Premium', 'Basic'],
      })
    })

    test('should maintain backward compatibility with existing function signatures', () => {
      const schema = z.object({
        name: z.string(),
        age: z.number().optional(),
      })

      // Test that the convenience functions still work
      const baseAttributes = schemaToBaseAttributes(schema)
      const createAttributes = schemaToCreateAttributes(schema)

      assert.strictEqual(baseAttributes.length, 2)
      assert.strictEqual(createAttributes.length, 2)

      // Base attributes should not have required field
      assert.ok(!('required' in baseAttributes[0]))

      // Create attributes should have required field
      assert.ok('required' in createAttributes[0])
      assert.strictEqual(createAttributes[0].required, true)
      assert.strictEqual(createAttributes[1].required, false)
    })
  })
})
