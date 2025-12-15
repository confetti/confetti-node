import { describe, test } from 'node:test'
import assert from 'node:assert'
import Confetti from '../../src'

describe('Initiat', () => {
  test('should initiate a Confetti api instance', () => {
    new Confetti({ apiKey: 'my-key' })
  })

  test('should fail to call due on Confetti api instance due to missing api key', async () => {
    const confetti = new Confetti()
    await assert.rejects(
      () => confetti.events.findAll(),
      (error: unknown) => {
        return error instanceof Error && error.message.includes('missing_api_key')
      },
    )
  })
})
