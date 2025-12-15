import { describe, test } from 'node:test'
import assert from 'node:assert'
import transformAttributes from '../../src/utils/transform-attributes'

describe('transformAttributes()', () => {
  test('should pick attributes using configuration object ', () => {
    const attributes = [
      { key: 'firstName', label: 'First name', type: 'string' },
      { key: 'lastName', label: 'Last name', type: 'string' },
      { key: 'name', label: 'Name', type: 'string' },
      { key: 'email', label: 'Email', type: 'string' },
      { key: 'phone', label: 'Phone', type: 'string' },
      { key: 'token', label: 'Token', type: 'string' },
      { key: 'status', label: 'Status', type: 'string' },
    ]

    const config = { firstName: {}, lastName: {} }

    assert.deepStrictEqual(transformAttributes(attributes, config), [
      { key: 'firstName', label: 'First name', type: 'string' },
      { key: 'lastName', label: 'Last name', type: 'string' },
    ])
  })
  test('should add additional properties from config object', () => {
    const attributes = [
      { key: 'firstName', label: 'First name', type: 'string' },
      { key: 'lastName', label: 'Last name', type: 'string' },
      { key: 'name', label: 'Name', type: 'string' },
      { key: 'email', label: 'Email', type: 'string' },
      { key: 'phone', label: 'Phone', type: 'string' },
      { key: 'token', label: 'Token', type: 'string' },
      { key: 'status', label: 'Status', type: 'string' },
    ]

    const config = {
      firstName: { required: true },
      lastName: { required: true, default: 'Test' },
    }

    assert.deepStrictEqual(transformAttributes(attributes, config), [
      {
        key: 'firstName',
        label: 'First name',
        type: 'string',
        required: true,
      },
      {
        key: 'lastName',
        label: 'Last name',
        type: 'string',
        required: true,
        default: 'Test',
      },
    ])
  })
  test('should add key from config object if missing in array', () => {
    const attributes = [
      { key: 'firstName', label: 'First name', type: 'string' },
      { key: 'lastName', label: 'Last name', type: 'string' },
      { key: 'name', label: 'Name', type: 'string' },
      { key: 'email', label: 'Email', type: 'string' },
      { key: 'phone', label: 'Phone', type: 'string' },
      { key: 'token', label: 'Token', type: 'string' },
      { key: 'status', label: 'Status', type: 'string' },
    ]

    const config = {
      firstName: { required: true },
      someCreateField: { label: 'Some create field', type: 'string' },
    }

    assert.deepStrictEqual(transformAttributes(attributes, config), [
      {
        key: 'firstName',
        label: 'First name',
        type: 'string',
        required: true,
      },
      {
        key: 'someCreateField',
        label: 'Some create field',
        type: 'string',
      },
    ])
  })
})
