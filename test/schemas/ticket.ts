import { describe, test } from 'node:test'
import assert from 'node:assert'
import { TicketCreateSchema, TicketUpdateSchema, GuestTicketInputSchema } from '../../src/schemas/ticket.js'

describe('TicketUpdateSchema', () => {
  test('should accept null for every clearable field', () => {
    const result = TicketUpdateSchema.parse({
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
      company: null,
      comment: null,
      guests: null,
      values: null,
      checkinAt: null,
      ticketBatchId: null,
    })

    assert.deepStrictEqual(result, {
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
      company: null,
      comment: null,
      guests: null,
      values: null,
      checkinAt: null,
      ticketBatchId: null,
    })
  })

  test('should allow a read-modify-write round trip of a presented ticket', () => {
    // Shape the API returns for a ticket without company, comment or batch
    const ticket = {
      firstName: 'Foo',
      lastName: 'Bar',
      email: 'foo@bar.com',
      phone: null,
      company: null,
      comment: null,
      guests: null,
      values: { 'dietary-needs': 'Vegan' },
      checkinAt: null,
      ticketBatchId: null,
      status: 'attending',
    }

    const result = TicketUpdateSchema.parse({ ...ticket, company: 'The Company' })

    assert.strictEqual(result.company, 'The Company')
    assert.strictEqual(result.comment, null)
    assert.strictEqual(result.ticketBatchId, null)
  })

  test('should still reject wrong types', () => {
    assert.throws(() => TicketUpdateSchema.parse({ company: 12 }))
    assert.throws(() => TicketUpdateSchema.parse({ ticketBatchId: 'abc' }))
    assert.throws(() => TicketUpdateSchema.parse({ email: 'not-an-email' }))
    assert.throws(() => TicketUpdateSchema.parse({ status: 'consumed' }))
  })
})

describe('TicketCreateSchema', () => {
  test('should accept null for the optional fields', () => {
    const result = TicketCreateSchema.parse({
      eventId: 1,
      email: 'foo@bar.com',
      status: 'attending',
      sendEmailConfirmation: false,
      ticketBatchId: null,
      firstName: null,
      lastName: null,
      phone: null,
      company: null,
      comment: null,
      values: null,
      guests: null,
    })

    assert.strictEqual(result.ticketBatchId, null)
    assert.strictEqual(result.company, null)
    assert.strictEqual(result.guests, null)
  })

  test('should not coerce a null ticketBatchId to 0', () => {
    const result = TicketCreateSchema.parse({
      eventId: '1',
      email: 'foo@bar.com',
      status: 'attending',
      sendEmailConfirmation: false,
      ticketBatchId: null,
    })

    assert.strictEqual(result.eventId, 1)
    assert.strictEqual(result.ticketBatchId, null)
  })
})

describe('GuestTicketInputSchema', () => {
  test('should accept null for every field', () => {
    const result = GuestTicketInputSchema.parse({
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
      company: null,
      values: null,
    })

    assert.strictEqual(result.firstName, null)
    assert.strictEqual(result.email, null)
  })
})
