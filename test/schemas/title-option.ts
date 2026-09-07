import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { TitleOptionSchema } from '../../src/schemas/title-option.js'

describe('TitleOptionSchema', () => {
  it('accepts the title-less default option used by the API', () => {
    assert.deepEqual(TitleOptionSchema.parse({ greeting: 'Hello', isDefault: true }), {
      greeting: 'Hello',
      isDefault: true,
    })
  })

  it('preserves stable option ids', () => {
    assert.deepEqual(TitleOptionSchema.parse({ id: 'dr', title: 'Dr', greeting: 'Dear' }), {
      id: 'dr',
      title: 'Dr',
      greeting: 'Dear',
    })
  })

  it('still requires a title for non-default options', () => {
    assert.equal(TitleOptionSchema.safeParse({ greeting: 'Dear' }).success, false)
  })
})
