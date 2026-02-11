import { describe, test } from 'node:test'
import assert from 'node:assert'
import { z } from 'zod'
import {
  extractFiltersFromSchema,
  extractSortingFromSchema,
  extractIncludesFromSchema,
} from '../../src/utils/resource-options-to-model.js'
import { eventsFindAllOptionsSchema } from '../../src/schemas/event.js'

describe('resource-options-to-model', () => {
  describe('extractFiltersFromSchema', () => {
    test('should extract filters from a schema with filter object', () => {
      const schema = z.object({
        filter: z.object({
          eventId: z.number(),
          search: z.string().optional(),
          checkedIn: z.boolean().optional(),
          status: z.array(z.enum(['attending', 'declined'])).optional(),
        }),
      })

      const result = extractFiltersFromSchema(schema)

      assert.deepStrictEqual(result, {
        eventId: { type: 'number', label: 'Event Id', required: true },
        search: { type: 'string', label: 'Search' },
        checkedIn: { type: 'boolean', label: 'Checked In' },
        status: {
          type: 'array',
          label: 'Status',
          options: [
            { value: 'attending', label: 'Attending' },
            { value: 'declined', label: 'Declined' },
          ],
        },
      })
    })

    test('should extract filters from optional filter fields', () => {
      const schema = z.object({
        filter: z.object({
          eventId: z.number().optional(),
          search: z.string().optional(),
        }),
      })

      const result = extractFiltersFromSchema(schema)

      assert.deepStrictEqual(result, {
        eventId: { type: 'number', label: 'Event Id' },
        search: { type: 'string', label: 'Search' },
      })
    })

    test('should handle enum fields with options', () => {
      const schema = z.object({
        filter: z.object({
          type: z.enum(['future', 'past']).optional(),
          signupType: z.enum(['rsvp', 'tickets']).optional(),
        }),
      })

      const result = extractFiltersFromSchema(schema)

      assert.deepStrictEqual(result, {
        type: {
          type: 'string',
          label: 'Type',
          options: [
            { value: 'future', label: 'Future' },
            { value: 'past', label: 'Past' },
          ],
        },
        signupType: {
          type: 'string',
          label: 'Signup Type',
          options: [
            { value: 'rsvp', label: 'Rsvp' },
            { value: 'tickets', label: 'Tickets' },
          ],
        },
      })
    })

    test('should extract enhanced enum filters from eventsResourceOptionsSchema', () => {
      const result = extractFiltersFromSchema(eventsFindAllOptionsSchema)

      assert.deepStrictEqual(result, {
        signupType: {
          type: 'enum',
          label: 'Signup Type',
          default: '',
          values: [
            {
              label: 'RSVP',
              description: 'Events with signup type RSVP',
              type: 'string',
              key: 'rsvp',
              value: 'rsvp',
            },
            {
              label: 'Tickets',
              description: 'Events with signup type tickets',
              type: 'string',
              key: 'tickets',
              value: 'tickets',
            },
          ],
        },
        type: {
          type: 'enum',
          label: 'Event Type',
          default: '',
          values: [
            {
              label: 'Future',
              description: 'Upcoming events',
              type: 'string',
              key: 'future',
              value: 'future',
            },
            {
              label: 'Past',
              description: 'Completed events',
              type: 'string',
              key: 'past',
              value: 'past',
            },
          ],
        },
      })
    })

    test('should return empty object when no filter field exists', () => {
      const schema = z.object({
        sort: z.string(),
        include: z.array(z.string()),
      })

      const result = extractFiltersFromSchema(schema)

      assert.deepStrictEqual(result, {})
    })

    test('should return empty object when filter is not an object', () => {
      const schema = z.object({
        filter: z.string(),
      })

      const result = extractFiltersFromSchema(schema)

      assert.deepStrictEqual(result, {})
    })

    test('should handle complex nested schemas', () => {
      const schema = z.object({
        filter: z.object({
          eventId: z.number(),
          status: z.array(z.enum(['paid', 'refunded', 'pending-invoice'])).optional(),
          search: z.string().optional(),
        }),
        sort: z.string(),
        include: z.array(z.string()),
      })

      const result = extractFiltersFromSchema(schema)

      assert.deepStrictEqual(result, {
        eventId: { type: 'number', label: 'Event Id', required: true },
        status: {
          type: 'array',
          label: 'Status',
          options: [
            { value: 'paid', label: 'Paid' },
            { value: 'refunded', label: 'Refunded' },
            { value: 'pending-invoice', label: 'Pending Invoice' },
          ],
        },
        search: { type: 'string', label: 'Search' },
      })
    })
  })

  describe('extractSortingFromSchema', () => {
    test('should extract sorting options from enum field', () => {
      const schema = z.object({
        sort: z.enum(['name', 'createdAt', 'email', 'status']),
      })

      const result = extractSortingFromSchema(schema)

      assert.deepStrictEqual(result, ['name', 'createdAt', 'email', 'status'])
    })

    test('should return empty array when no sort field exists', () => {
      const schema = z.object({
        filter: z.object({}),
        include: z.array(z.string()),
      })

      const result = extractSortingFromSchema(schema)

      assert.deepStrictEqual(result, [])
    })

    test('should return empty array when sort is not an enum', () => {
      const schema = z.object({
        sort: z.string(),
      })

      const result = extractSortingFromSchema(schema)

      assert.deepStrictEqual(result, [])
    })

    test('should handle optional sort fields', () => {
      const schema = z.object({
        sort: z.enum(['name', 'createdAt']).optional(),
      })

      const result = extractSortingFromSchema(schema)

      assert.deepStrictEqual(result, ['name', 'createdAt'])
    })
  })

  describe('extractIncludesFromSchema', () => {
    test('should extract includes from array of enum values', () => {
      const schema = z.object({
        include: z.array(
          z.enum(['categories', 'pages', 'pages.blocks', 'schedule-items', 'speakers', 'speakers.image']),
        ),
      })

      const result = extractIncludesFromSchema(schema)

      assert.deepStrictEqual(result, [
        'categories',
        'pages',
        'pages.blocks',
        'schedule-items',
        'speakers',
        'speakers.image',
      ])
    })

    test('should return empty array when no include field exists', () => {
      const schema = z.object({
        filter: z.object({}),
        sort: z.string(),
      })

      const result = extractIncludesFromSchema(schema)

      assert.deepStrictEqual(result, [])
    })

    test('should return empty array when include is not an array', () => {
      const schema = z.object({
        include: z.string(),
      })

      const result = extractIncludesFromSchema(schema)

      assert.deepStrictEqual(result, [])
    })

    test('should return empty array when include array elements are not enums', () => {
      const schema = z.object({
        include: z.array(z.string()),
      })

      const result = extractIncludesFromSchema(schema)

      assert.deepStrictEqual(result, [])
    })

    test('should handle optional include fields', () => {
      const schema = z.object({
        include: z.array(z.enum(['categories', 'pages'])).optional(),
      })

      const result = extractIncludesFromSchema(schema)

      assert.deepStrictEqual(result, ['categories', 'pages'])
    })
  })

  describe('integration tests with real schemas', () => {
    test('should work with eventsFindAllOptionsSchema structure', () => {
      const eventsSchema = z.object({
        filter: z
          .object({
            signupType: z.enum(['rsvp', 'tickets']).optional(),
            type: z.enum(['future', 'past']).optional(),
          })
          .optional(),
        sort: z.never().optional(),
        include: z
          .array(
            z.enum([
              'categories',
              'pages',
              'pages.blocks',
              'pages.blocks.images',
              'schedule-items',
              'speakers',
              'speakers.image',
            ]),
          )
          .optional(),
      })

      const filters = extractFiltersFromSchema(eventsSchema)
      const sorting = extractSortingFromSchema(eventsSchema)
      const includes = extractIncludesFromSchema(eventsSchema)

      assert.deepStrictEqual(filters, {
        signupType: {
          type: 'string',
          label: 'Signup Type',
          options: [
            { value: 'rsvp', label: 'Rsvp' },
            { value: 'tickets', label: 'Tickets' },
          ],
        },
        type: {
          type: 'string',
          label: 'Type',
          options: [
            { value: 'future', label: 'Future' },
            { value: 'past', label: 'Past' },
          ],
        },
      })

      assert.deepStrictEqual(sorting, [])
      assert.deepStrictEqual(includes, [
        'categories',
        'pages',
        'pages.blocks',
        'pages.blocks.images',
        'schedule-items',
        'speakers',
        'speakers.image',
      ])
    })

    test('should work with ticketsResourceOptionsSchema structure', () => {
      const ticketsSchema = z.object({
        filter: z
          .object({
            eventId: z.number().optional(),
            search: z.string().optional(),
            description: z.string().optional(),
            checkedIn: z.boolean().optional(),
            status: z
              .union([
                z.array(
                  z.enum(['attending', 'waitlist', 'declined', 'invited', 'consumed', 'deletion-requested']).describe(
                    JSON.stringify({
                      label: 'Ticket Status',
                      description: 'Filter tickets by status',
                      values: [
                        {
                          label: 'Attending',
                          description: 'Tickets for attendees',
                          type: 'string',
                          key: 'attending',
                          value: 'attending',
                        },
                        {
                          label: 'Waitlist',
                          description: 'Tickets on waitlist',
                          type: 'string',
                          key: 'waitlist',
                          value: 'waitlist',
                        },
                        {
                          label: 'Declined',
                          description: 'Declined tickets',
                          type: 'string',
                          key: 'declined',
                          value: 'declined',
                        },
                        {
                          label: 'Invited',
                          description: 'Invited tickets',
                          type: 'string',
                          key: 'invited',
                          value: 'invited',
                        },
                        {
                          label: 'Consumed',
                          description: 'Consumed tickets',
                          type: 'string',
                          key: 'consumed',
                          value: 'consumed',
                        },
                        {
                          label: 'Deletion Requested',
                          description: 'Tickets with deletion requested',
                          type: 'string',
                          key: 'deletion-requested',
                          value: 'deletion-requested',
                        },
                      ],
                    }),
                  ),
                ),
                z.string().refine(
                  (val) => {
                    const validStatuses = [
                      'attending',
                      'waitlist',
                      'declined',
                      'invited',
                      'consumed',
                      'deletion-requested',
                    ]
                    const values = val.split(',').map((v) => v.trim())
                    return values.every((v) => validStatuses.includes(v))
                  },
                  { message: 'Status must be a valid status or a comma-separated list of valid statuses' },
                ),
              ])
              .optional(),
          })
          .optional(),
        sort: z.enum(['name', 'createdAt', 'description', 'hashid', 'email', 'status', 'checkinAt']).optional(),
        include: z.array(z.enum(['addons'])).optional(),
      })

      const filters = extractFiltersFromSchema(ticketsSchema)
      const sorting = extractSortingFromSchema(ticketsSchema)
      const includes = extractIncludesFromSchema(ticketsSchema)

      assert.deepStrictEqual(filters, {
        eventId: { type: 'number', label: 'Event Id' },
        search: { type: 'string', label: 'Search' },
        description: { type: 'string', label: 'Description' },
        checkedIn: { type: 'boolean', label: 'Checked In' },
        status: {
          type: 'array',
          label: 'Status',
          values: [
            {
              key: 'attending',
              value: 'attending',
              label: 'Attending',
              type: 'string',
              description: 'Tickets for attendees',
            },
            {
              key: 'waitlist',
              value: 'waitlist',
              label: 'Waitlist',
              type: 'string',
              description: 'Tickets on waitlist',
            },
            { key: 'declined', value: 'declined', label: 'Declined', type: 'string', description: 'Declined tickets' },
            { key: 'invited', value: 'invited', label: 'Invited', type: 'string', description: 'Invited tickets' },
            { key: 'consumed', value: 'consumed', label: 'Consumed', type: 'string', description: 'Consumed tickets' },
            {
              key: 'deletion-requested',
              value: 'deletion-requested',
              label: 'Deletion Requested',
              type: 'string',
              description: 'Tickets with deletion requested',
            },
          ],
        },
      })

      assert.deepStrictEqual(sorting, ['name', 'createdAt', 'description', 'hashid', 'email', 'status', 'checkinAt'])
      assert.deepStrictEqual(includes, ['addons'])
    })

    test('should work with schemas that have no filters, sorting, or includes', () => {
      const emptySchema = z.object({
        filter: z.never().optional(),
        sort: z.never().optional(),
        include: z.never().optional(),
      })

      const filters = extractFiltersFromSchema(emptySchema)
      const sorting = extractSortingFromSchema(emptySchema)
      const includes = extractIncludesFromSchema(emptySchema)

      assert.deepStrictEqual(filters, {})
      assert.deepStrictEqual(sorting, [])
      assert.deepStrictEqual(includes, [])
    })
  })
})
