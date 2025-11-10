import { expect } from 'chai'
import { z } from 'zod'
import {
  extractFiltersFromSchema,
  extractSortingFromSchema,
  extractIncludesFromSchema,
} from '../../src/utils/resource-options-to-model.js'
import { eventsResourceOptionsSchema } from '../../src/schemas/event.js'

describe('resource-options-to-model', () => {
  describe('extractFiltersFromSchema', () => {
    it('should extract filters from a schema with filter object', () => {
      const schema = z.object({
        filter: z.object({
          eventId: z.number(),
          search: z.string().optional(),
          checkedIn: z.boolean().optional(),
          status: z.array(z.enum(['attending', 'declined'])).optional(),
        }),
      })

      const result = extractFiltersFromSchema(schema)

      expect(result).to.deep.equal({
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

    it('should extract filters from optional filter fields', () => {
      const schema = z.object({
        filter: z.object({
          eventId: z.number().optional(),
          search: z.string().optional(),
        }),
      })

      const result = extractFiltersFromSchema(schema)

      expect(result).to.deep.equal({
        eventId: { type: 'number', label: 'Event Id' },
        search: { type: 'string', label: 'Search' },
      })
    })

    it('should handle enum fields with options', () => {
      const schema = z.object({
        filter: z.object({
          type: z.enum(['future', 'past']).optional(),
          signupType: z.enum(['rsvp', 'tickets']).optional(),
        }),
      })

      const result = extractFiltersFromSchema(schema)

      expect(result).to.deep.equal({
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

    it('should extract enhanced enum filters from eventsResourceOptionsSchema', () => {
      const result = extractFiltersFromSchema(eventsResourceOptionsSchema)

      expect(result).to.deep.equal({
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

    it('should return empty object when no filter field exists', () => {
      const schema = z.object({
        sort: z.string(),
        include: z.array(z.string()),
      })

      const result = extractFiltersFromSchema(schema)

      expect(result).to.deep.equal({})
    })

    it('should return empty object when filter is not an object', () => {
      const schema = z.object({
        filter: z.string(),
      })

      const result = extractFiltersFromSchema(schema)

      expect(result).to.deep.equal({})
    })

    it('should handle complex nested schemas', () => {
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

      expect(result).to.deep.equal({
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
    it('should extract sorting options from enum field', () => {
      const schema = z.object({
        sort: z.enum(['name', 'createdAt', 'email', 'status']),
      })

      const result = extractSortingFromSchema(schema)

      expect(result).to.deep.equal(['name', 'createdAt', 'email', 'status'])
    })

    it('should return empty array when no sort field exists', () => {
      const schema = z.object({
        filter: z.object({}),
        include: z.array(z.string()),
      })

      const result = extractSortingFromSchema(schema)

      expect(result).to.deep.equal([])
    })

    it('should return empty array when sort is not an enum', () => {
      const schema = z.object({
        sort: z.string(),
      })

      const result = extractSortingFromSchema(schema)

      expect(result).to.deep.equal([])
    })

    it('should handle optional sort fields', () => {
      const schema = z.object({
        sort: z.enum(['name', 'createdAt']).optional(),
      })

      const result = extractSortingFromSchema(schema)

      expect(result).to.deep.equal(['name', 'createdAt'])
    })
  })

  describe('extractIncludesFromSchema', () => {
    it('should extract includes from array of enum values', () => {
      const schema = z.object({
        include: z.array(z.enum(['categories', 'pages', 'pages.blocks'])),
      })

      const result = extractIncludesFromSchema(schema)

      expect(result).to.deep.equal(['categories', 'pages', 'pages.blocks'])
    })

    it('should return empty array when no include field exists', () => {
      const schema = z.object({
        filter: z.object({}),
        sort: z.string(),
      })

      const result = extractIncludesFromSchema(schema)

      expect(result).to.deep.equal([])
    })

    it('should return empty array when include is not an array', () => {
      const schema = z.object({
        include: z.string(),
      })

      const result = extractIncludesFromSchema(schema)

      expect(result).to.deep.equal([])
    })

    it('should return empty array when include array elements are not enums', () => {
      const schema = z.object({
        include: z.array(z.string()),
      })

      const result = extractIncludesFromSchema(schema)

      expect(result).to.deep.equal([])
    })

    it('should handle optional include fields', () => {
      const schema = z.object({
        include: z.array(z.enum(['categories', 'pages'])).optional(),
      })

      const result = extractIncludesFromSchema(schema)

      expect(result).to.deep.equal(['categories', 'pages'])
    })
  })

  describe('integration tests with real schemas', () => {
    it('should work with eventsResourceOptionsSchema structure', () => {
      const eventsSchema = z.object({
        filter: z
          .object({
            signupType: z.enum(['rsvp', 'tickets']).optional(),
            type: z.enum(['future', 'past']).optional(),
          })
          .optional(),
        sort: z.never().optional(),
        include: z.array(z.enum(['categories', 'pages', 'pages.blocks', 'pages.blocks.images'])).optional(),
      })

      const filters = extractFiltersFromSchema(eventsSchema)
      const sorting = extractSortingFromSchema(eventsSchema)
      const includes = extractIncludesFromSchema(eventsSchema)

      expect(filters).to.deep.equal({
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

      expect(sorting).to.deep.equal([])
      expect(includes).to.deep.equal(['categories', 'pages', 'pages.blocks', 'pages.blocks.images'])
    })

    it('should work with ticketsResourceOptionsSchema structure', () => {
      const ticketsSchema = z.object({
        filter: z
          .object({
            eventId: z.number().optional(),
            search: z.string().optional(),
            description: z.string().optional(),
            checkedIn: z.boolean().optional(),
            status: z
              .array(z.enum(['attending', 'waitlist', 'declined', 'invited', 'consumed', 'deletion-requested']))
              .optional(),
          })
          .optional(),
        sort: z.enum(['name', 'createdAt', 'description', 'hashid', 'email', 'status', 'checkinAt']).optional(),
        include: z.never().optional(),
      })

      const filters = extractFiltersFromSchema(ticketsSchema)
      const sorting = extractSortingFromSchema(ticketsSchema)
      const includes = extractIncludesFromSchema(ticketsSchema)

      expect(filters).to.deep.equal({
        eventId: { type: 'number', label: 'Event Id' },
        search: { type: 'string', label: 'Search' },
        description: { type: 'string', label: 'Description' },
        checkedIn: { type: 'boolean', label: 'Checked In' },
        status: {
          type: 'array',
          label: 'Status',
          options: [
            { value: 'attending', label: 'Attending' },
            { value: 'waitlist', label: 'Waitlist' },
            { value: 'declined', label: 'Declined' },
            { value: 'invited', label: 'Invited' },
            { value: 'consumed', label: 'Consumed' },
            { value: 'deletion-requested', label: 'Deletion Requested' },
          ],
        },
      })

      expect(sorting).to.deep.equal(['name', 'createdAt', 'description', 'hashid', 'email', 'status', 'checkinAt'])
      expect(includes).to.deep.equal([])
    })

    it('should work with schemas that have no filters, sorting, or includes', () => {
      const emptySchema = z.object({
        filter: z.never().optional(),
        sort: z.never().optional(),
        include: z.never().optional(),
      })

      const filters = extractFiltersFromSchema(emptySchema)
      const sorting = extractSortingFromSchema(emptySchema)
      const includes = extractIncludesFromSchema(emptySchema)

      expect(filters).to.deep.equal({})
      expect(sorting).to.deep.equal([])
      expect(includes).to.deep.equal([])
    })
  })
})
