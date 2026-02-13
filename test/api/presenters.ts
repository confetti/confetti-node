import { describe, test } from 'node:test'
import assert from 'node:assert'
import presenters from '../../src/presenters'

const { webhooks, tickets, contacts } = presenters

describe('Presenters', () => {
  describe('Webhooks', () => {
    test('should present a webhook with relation ids', () => {
      const webhook = webhooks.render({
        type: 'ticket.attending',
        url: 'https://hooks.zapier.com/hooks/standard/1337/',
        provider: 'zapier',
        workspaceId: 57,
        eventId: 2,
      })
      assert.deepStrictEqual(webhook, {
        data: {
          type: 'webhook',
          attributes: {
            type: 'ticket.attending',
            url: 'https://hooks.zapier.com/hooks/standard/1337/',
            provider: 'zapier',
          },
          relationships: {
            event: { data: { id: '2', type: 'event' } },
            workspace: { data: { id: '57', type: 'workspace' } },
          },
        },
        included: [
          { id: '2', type: 'event', attributes: {} },
          { id: '57', type: 'workspace', attributes: {} },
        ],
      })
    })
    test('should present a webhook without eventId', () => {
      const webhook = webhooks.render({
        type: 'ticket.attending',
        url: 'https://hooks.zapier.com/hooks/standard/1337/',
        provider: 'zapier',
        workspaceId: 57,
      })
      assert.deepStrictEqual(webhook, {
        data: {
          type: 'webhook',
          attributes: {
            type: 'ticket.attending',
            url: 'https://hooks.zapier.com/hooks/standard/1337/',
            provider: 'zapier',
          },
          relationships: {
            event: { data: null },
            workspace: { data: { id: '57', type: 'workspace' } },
          },
        },
        included: [{ id: '57', type: 'workspace', attributes: {} }],
      })
    })
  })
  describe('Tickets', () => {
    test('should present a ticket with relation ids', () => {
      const ticket = tickets.render({
        firstName: 'John',
        lastname: 'Doe',
        email: 'john@doe.se',
        ticketBatchId: 57,
        eventId: 2,
        company: 'Company AB',
      })
      assert.deepStrictEqual(ticket, {
        data: {
          type: 'ticket',
          attributes: {
            firstName: 'John',
            lastname: 'Doe',
            email: 'john@doe.se',
            company: 'Company AB',
          },
          relationships: {
            event: { data: { id: '2', type: 'event' } },
            ticketBatch: { data: { id: '57', type: 'ticketBatch' } },
            addons: { data: null },
          },
        },
        included: [
          { id: '2', type: 'event', attributes: {} },
          { id: '57', type: 'ticketBatch', attributes: {} },
        ],
      })
    })
    test('should present a ticket without ticketBatchId', () => {
      const ticket = tickets.render({
        firstName: 'John',
        lastname: 'Doe',
        email: 'john@doe.se',
        eventId: 2,
      })
      assert.deepStrictEqual(ticket, {
        data: {
          type: 'ticket',
          attributes: {
            firstName: 'John',
            lastname: 'Doe',
            email: 'john@doe.se',
          },
          relationships: {
            event: { data: { id: '2', type: 'event' } },
            ticketBatch: { data: null },
            addons: { data: null },
          },
        },
        included: [{ id: '2', type: 'event', attributes: {} }],
      })
    })
    test('should present a ticket with meta info', () => {
      const ticket = tickets.render({
        firstName: 'John',
        lastname: 'Doe',
        email: 'john@doe.se',
        eventId: 2,
        sendEmailConfirmation: true,
      })
      assert.deepStrictEqual(ticket, {
        data: {
          type: 'ticket',
          attributes: {
            firstName: 'John',
            lastname: 'Doe',
            email: 'john@doe.se',
            meta: {
              sendEmailConfirmation: true,
            },
          },
          relationships: {
            event: { data: { id: '2', type: 'event' } },
            ticketBatch: { data: null },
            addons: { data: null },
          },
        },
        included: [{ id: '2', type: 'event', attributes: {} }],
      })
    })
  })
  describe('Contacts', () => {
    test('should present a contact with relation ids', () => {
      const contact = contacts.render({
        firstName: 'John',
        lastname: 'Doe',
        email: 'john@doe.se',
        workspaceId: 57,
        categoryIds: [1, 3],
        company: 'Test AB',
      })
      assert.deepStrictEqual(contact, {
        data: {
          type: 'contact',
          attributes: {
            firstName: 'John',
            lastname: 'Doe',
            email: 'john@doe.se',
            company: 'Test AB',
          },
          relationships: {
            workspace: { data: { id: '57', type: 'workspace' } },
            categories: {
              data: [
                { id: '1', type: 'category' },
                { id: '3', type: 'category' },
              ],
            },
          },
        },
        included: [
          { id: '57', type: 'workspace', attributes: {} },
          { id: '1', type: 'category', attributes: {} },
          { id: '3', type: 'category', attributes: {} },
        ],
      })
    })
  })
})
