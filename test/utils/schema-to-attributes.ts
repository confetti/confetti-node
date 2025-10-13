import { expect } from 'chai'
import { z } from 'zod'
import {
  schemaToAttributes,
  schemaToBaseAttributes,
  schemaToCreateAttributes,
} from '../../src/utils/schema-to-attributes.js'

describe('schemaToAttributes()', () => {
  describe('Base attributes (default behavior)', () => {
    it('should generate attributes from a basic schema without metadata', () => {
      const schema = z.object({
        id: z.number(),
        name: z.string(),
        isActive: z.boolean(),
        createdAt: z.date(),
      })

      const attributes = schemaToBaseAttributes(schema)

      expect(attributes).to.have.length(4)
      expect(attributes[0]).to.deep.equal({
        key: 'id',
        label: 'Id',
        type: 'number',
      })
      expect(attributes[1]).to.deep.equal({
        key: 'name',
        label: 'Name',
        type: 'string',
      })
      expect(attributes[2]).to.deep.equal({
        key: 'isActive',
        label: 'Is Active',
        type: 'boolean',
      })
      expect(attributes[3]).to.deep.equal({
        key: 'createdAt',
        label: 'Created At',
        type: 'date',
      })
    })

    it('should extract custom labels from metadata', () => {
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

      expect(attributes).to.have.length(3)
      expect(attributes[0]).to.deep.equal({
        key: 'id',
        label: 'ID',
        type: 'number',
      })
      expect(attributes[1]).to.deep.equal({
        key: 'firstName',
        label: 'First Name',
        type: 'string',
      })
      expect(attributes[2]).to.deep.equal({
        key: 'email',
        label: 'Email Address',
        type: 'string',
      })
    })

    it('should extract descriptions from metadata', () => {
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

      expect(attributes).to.have.length(3)
      expect(attributes[0]).to.deep.equal({
        key: 'id',
        label: 'ID',
        description: 'Unique identifier for the record.',
        type: 'number',
      })
      expect(attributes[1]).to.deep.equal({
        key: 'name',
        label: 'Name',
        description: 'The display name of the item.',
        type: 'string',
      })
      expect(attributes[2]).to.deep.equal({
        key: 'status',
        label: 'Status',
        type: 'string',
      })
    })

    it('should handle optional fields correctly', () => {
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

      expect(attributes).to.have.length(4)
      expect(attributes[0]).to.deep.equal({
        key: 'id',
        label: 'Id',
        type: 'number',
      })
      expect(attributes[1]).to.deep.equal({
        key: 'name',
        label: 'Name',
        type: 'string',
      })
      expect(attributes[2]).to.deep.equal({
        key: 'deletedAt',
        label: 'Deleted At',
        type: 'date',
      })
      expect(attributes[3]).to.deep.equal({
        key: 'metadata',
        label: 'Metadata',
        type: 'object',
      })
    })

    it('should handle record/object types correctly', () => {
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

      expect(attributes).to.have.length(3)
      expect(attributes[0]).to.deep.equal({
        key: 'id',
        label: 'Id',
        type: 'number',
      })
      expect(attributes[1]).to.deep.equal({
        key: 'settings',
        label: 'Settings',
        description: 'Configuration settings for the item.',
        type: 'object',
      })
      expect(attributes[2]).to.deep.equal({
        key: 'tags',
        label: 'Tags',
        type: 'object',
      })
    })

    it('should handle mixed metadata and auto-generated labels', () => {
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

      expect(attributes).to.have.length(4)
      expect(attributes[0]).to.deep.equal({
        key: 'id',
        label: 'ID',
        description: 'Unique identifier.',
        type: 'number',
      })
      expect(attributes[1]).to.deep.equal({
        key: 'name',
        label: 'Name', // Auto-generated
        type: 'string',
      })
      expect(attributes[2]).to.deep.equal({
        key: 'email',
        label: 'Email Address',
        type: 'string',
      })
      expect(attributes[3]).to.deep.equal({
        key: 'createdAt',
        label: 'Created At', // Auto-generated
        type: 'date',
      })
    })

    it('should handle empty schema', () => {
      const schema = z.object({})
      const attributes = schemaToBaseAttributes(schema)
      expect(attributes).to.have.length(0)
    })

    it('should handle complex nested optional fields', () => {
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

      expect(attributes).to.have.length(2)
      expect(attributes[0]).to.deep.equal({
        key: 'id',
        label: 'Id',
        type: 'number',
      })
      expect(attributes[1]).to.deep.equal({
        key: 'user',
        label: 'User Information',
        description: 'Optional user details.',
        type: 'string', // Nested objects are treated as strings by the current implementation
      })
    })

    it('should handle malformed JSON in description gracefully', () => {
      const schema = z.object({
        id: z.number().describe('invalid json'),
        name: z.string().describe(
          JSON.stringify({
            label: 'Name',
          }),
        ),
      })

      const attributes = schemaToBaseAttributes(schema)

      expect(attributes).to.have.length(2)
      expect(attributes[0]).to.deep.equal({
        key: 'id',
        label: 'Id', // Should fall back to auto-generated
        type: 'number',
      })
      expect(attributes[1]).to.deep.equal({
        key: 'name',
        label: 'Name',
        type: 'string',
      })
    })

    it('should handle all supported Zod types', () => {
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

      expect(attributes).to.have.length(10)

      // Check types are correctly identified
      const typeMap = attributes.reduce(
        (acc, attr) => {
          acc[attr.key] = attr.type
          return acc
        },
        {} as Record<string, string>,
      )

      expect(typeMap.stringField).to.equal('string')
      expect(typeMap.numberField).to.equal('number')
      expect(typeMap.booleanField).to.equal('boolean')
      expect(typeMap.dateField).to.equal('date')
      expect(typeMap.objectField).to.equal('object')
      expect(typeMap.optionalString).to.equal('string')
      expect(typeMap.optionalNumber).to.equal('number')
      expect(typeMap.optionalBoolean).to.equal('boolean')
      expect(typeMap.optionalDate).to.equal('date')
      expect(typeMap.optionalObject).to.equal('object')
    })
  })

  describe('Create attributes', () => {
    it('should generate create attributes from a basic schema', () => {
      const schema = z.object({
        name: z.string(),
        email: z.string(),
        age: z.number().optional(),
        isActive: z.boolean(),
      })

      const attributes = schemaToCreateAttributes(schema)

      expect(attributes).to.have.length(4)

      const nameAttr = attributes.find((attr) => attr.key === 'name')
      expect(nameAttr).to.deep.equal({
        key: 'name',
        label: 'Name',
        type: 'string',
        required: true,
      })

      const emailAttr = attributes.find((attr) => attr.key === 'email')
      expect(emailAttr).to.deep.equal({
        key: 'email',
        label: 'Email',
        type: 'string',
        required: true,
      })

      const ageAttr = attributes.find((attr) => attr.key === 'age')
      expect(ageAttr).to.deep.equal({
        key: 'age',
        label: 'Age',
        type: 'number',
        required: false,
      })

      const isActiveAttr = attributes.find((attr) => attr.key === 'isActive')
      expect(isActiveAttr).to.deep.equal({
        key: 'isActive',
        label: 'Is Active',
        type: 'boolean',
        required: true,
      })
    })

    it('should extract metadata from create schemas', () => {
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

      expect(attributes).to.have.length(3)

      const emailAttr = attributes.find((attr) => attr.key === 'email')
      expect(emailAttr).to.deep.equal({
        key: 'email',
        label: 'Email Address',
        type: 'string',
        required: true,
        helpText: 'Enter a valid email address',
      })

      const phoneAttr = attributes.find((attr) => attr.key === 'phone')
      expect(phoneAttr).to.deep.equal({
        key: 'phone',
        label: 'Phone Number',
        type: 'string',
        required: false,
        placeholder: '+1 (555) 123-4567',
        helpText: 'Include country code',
      })

      const statusAttr = attributes.find((attr) => attr.key === 'status')
      expect(statusAttr).to.deep.equal({
        key: 'status',
        label: 'Account Status',
        type: 'enum',
        required: true,
        values: ['active', 'inactive'],
      })
    })

    it('should handle enum types correctly', () => {
      const schema = z.object({
        priority: z.enum(['low', 'medium', 'high']),
        category: z.enum(['urgent', 'normal']).optional(),
      })

      const attributes = schemaToCreateAttributes(schema)

      expect(attributes).to.have.length(2)

      const priorityAttr = attributes.find((attr) => attr.key === 'priority')
      expect(priorityAttr).to.deep.equal({
        key: 'priority',
        label: 'Priority',
        type: 'enum',
        required: true,
        values: ['low', 'medium', 'high'],
      })

      const categoryAttr = attributes.find((attr) => attr.key === 'category')
      expect(categoryAttr).to.deep.equal({
        key: 'category',
        label: 'Category',
        type: 'enum',
        required: false,
        values: ['urgent', 'normal'],
      })
    })

    it('should handle array types correctly', () => {
      const schema = z.object({
        tags: z.array(z.string()),
        ids: z.array(z.number()).optional(),
      })

      const attributes = schemaToCreateAttributes(schema)

      expect(attributes).to.have.length(2)

      const tagsAttr = attributes.find((attr) => attr.key === 'tags')
      expect(tagsAttr).to.deep.equal({
        key: 'tags',
        label: 'Tags',
        type: 'array',
        required: true,
      })

      const idsAttr = attributes.find((attr) => attr.key === 'ids')
      expect(idsAttr).to.deep.equal({
        key: 'ids',
        label: 'Ids',
        type: 'array',
        required: false,
      })
    })

    it('should handle all supported Zod types for create attributes', () => {
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

      expect(attributes).to.have.length(14)

      // Check required fields
      const requiredFields = attributes.filter((attr) => attr.required)
      expect(requiredFields).to.have.length(7) // stringField, numberField, booleanField, dateField, objectField, arrayField, enumField

      // Check optional fields
      const optionalFields = attributes.filter((attr) => !attr.required)
      expect(optionalFields).to.have.length(7) // All optional* fields

      // Check types
      const typeMap = attributes.reduce(
        (acc, attr) => {
          acc[attr.key] = attr.type
          return acc
        },
        {} as Record<string, string>,
      )

      expect(typeMap.stringField).to.equal('string')
      expect(typeMap.numberField).to.equal('number')
      expect(typeMap.booleanField).to.equal('boolean')
      expect(typeMap.dateField).to.equal('date')
      expect(typeMap.objectField).to.equal('object')
      expect(typeMap.arrayField).to.equal('array')
      expect(typeMap.enumField).to.equal('enum')
      expect(typeMap.optionalString).to.equal('string')
      expect(typeMap.optionalNumber).to.equal('number')
      expect(typeMap.optionalBoolean).to.equal('boolean')
      expect(typeMap.optionalDate).to.equal('date')
      expect(typeMap.optionalObject).to.equal('object')
      expect(typeMap.optionalArray).to.equal('array')
      expect(typeMap.optionalEnum).to.equal('enum')
    })

    it('should handle empty schema', () => {
      const schema = z.object({})
      const attributes = schemaToCreateAttributes(schema)
      expect(attributes).to.have.length(0)
    })

    it('should handle malformed JSON in description gracefully', () => {
      const schema = z.object({
        name: z.string().describe('invalid json'),
        email: z.string().describe(
          JSON.stringify({
            label: 'Email Address',
          }),
        ),
      })

      const attributes = schemaToCreateAttributes(schema)

      expect(attributes).to.have.length(2)

      const nameAttr = attributes.find((attr) => attr.key === 'name')
      expect(nameAttr).to.deep.equal({
        key: 'name',
        label: 'Name', // Should fall back to auto-generated
        type: 'string',
        required: true,
      })

      const emailAttr = attributes.find((attr) => attr.key === 'email')
      expect(emailAttr).to.deep.equal({
        key: 'email',
        label: 'Email Address',
        type: 'string',
        required: true,
      })
    })

    it('should handle complex metadata with all properties', () => {
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

      expect(attributes).to.have.length(1)
      expect(attributes[0]).to.deep.equal({
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
    it('should generate base attributes by default', () => {
      const schema = z.object({
        name: z.string(),
        age: z.number().optional(),
      })

      const attributes = schemaToAttributes(schema)

      expect(attributes).to.have.length(2)
      expect(attributes[0]).to.deep.equal({
        key: 'name',
        label: 'Name',
        type: 'string',
      })
      expect(attributes[1]).to.deep.equal({
        key: 'age',
        label: 'Age',
        type: 'number',
      })
    })

    it('should generate create attributes when includeCreateFields is true', () => {
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

      expect(attributes).to.have.length(3)

      const nameAttr = attributes.find((attr) => attr.key === 'name')
      expect(nameAttr).to.deep.equal({
        key: 'name',
        label: 'Name',
        type: 'string',
        required: true,
      })

      const ageAttr = attributes.find((attr) => attr.key === 'age')
      expect(ageAttr).to.deep.equal({
        key: 'age',
        label: 'Age',
        type: 'number',
        required: false,
      })

      const statusAttr = attributes.find((attr) => attr.key === 'status')
      expect(statusAttr).to.deep.equal({
        key: 'status',
        label: 'Status',
        type: 'enum',
        required: true,
        values: ['active', 'inactive'],
        helpText: 'Current status',
      })
    })

    it('should generate attributes with required field when includeRequired is true', () => {
      const schema = z.object({
        name: z.string(),
        age: z.number().optional(),
      })

      const attributes = schemaToAttributes(schema, { includeRequired: true })

      expect(attributes).to.have.length(2)

      const nameAttr = attributes.find((attr) => attr.key === 'name')
      expect(nameAttr).to.deep.equal({
        key: 'name',
        label: 'Name',
        type: 'string',
        required: true,
      })

      const ageAttr = attributes.find((attr) => attr.key === 'age')
      expect(ageAttr).to.deep.equal({
        key: 'age',
        label: 'Age',
        type: 'number',
        required: false,
      })
    })

    it('should handle complex metadata with create fields', () => {
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

      expect(attributes).to.have.length(2)

      const emailAttr = attributes.find((attr) => attr.key === 'email')
      expect(emailAttr).to.deep.equal({
        key: 'email',
        label: 'Email Address',
        description: 'User email',
        type: 'string',
        required: true,
        placeholder: 'user@example.com',
        helpText: 'Must be a valid email',
      })

      const categoryAttr = attributes.find((attr) => attr.key === 'category')
      expect(categoryAttr).to.deep.equal({
        key: 'category',
        label: 'User Category',
        type: 'enum',
        required: false,
        values: ['Premium', 'Basic'],
      })
    })

    it('should maintain backward compatibility with existing function signatures', () => {
      const schema = z.object({
        name: z.string(),
        age: z.number().optional(),
      })

      // Test that the convenience functions still work
      const baseAttributes = schemaToBaseAttributes(schema)
      const createAttributes = schemaToCreateAttributes(schema)

      expect(baseAttributes).to.have.length(2)
      expect(createAttributes).to.have.length(2)

      // Base attributes should not have required field
      expect(baseAttributes[0]).to.not.have.property('required')

      // Create attributes should have required field
      expect(createAttributes[0]).to.have.property('required')
      expect(createAttributes[0].required).to.equal(true)
      expect(createAttributes[1].required).to.equal(false)
    })
  })
})
