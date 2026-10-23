import { describe, test } from 'node:test'
import assert from 'node:assert'
import { FormFieldCreateSchema, FormFieldUpdateSchema } from '../../src/schemas/form-field.js'

describe('FormFieldCreateSchema settings', () => {
  test('should accept hidden and required', () => {
    const result = FormFieldCreateSchema.parse({
      title: 'Table',
      field: 'text',
      formId: 1,
      settings: { hidden: true, required: false },
    })

    assert.deepStrictEqual(result.settings, { hidden: true, required: false })
  })

  test('should keep other settings keys', () => {
    const result = FormFieldUpdateSchema.parse({ settings: { maxLength: 100 } })

    assert.deepStrictEqual(result.settings, { maxLength: 100 })
  })

  test('should reject a non-boolean hidden', () => {
    assert.throws(() => FormFieldUpdateSchema.parse({ settings: { hidden: 'yes' } }))
  })
})
