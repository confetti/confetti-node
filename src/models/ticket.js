const transformAttributes = require('../utils/transform-attributes')

module.exports = function ({ samples }) {
  const attributes = [
    {
      key: 'id',
      label: 'ID',
      description: 'Identifier of the ticket.',
      type: 'number',
    },
    { key: 'persons', label: 'Persons', type: 'number' },
    { key: 'hashid', label: 'Hashid', type: 'string' },
    { key: 'description', label: 'Description', type: 'string' },
    { key: 'price', label: 'Price', type: 'number' },
    { key: 'currency', label: 'Currency', type: 'string' },
    { key: 'firstName', label: 'First name', type: 'string' },
    { key: 'lastName', label: 'Last name', type: 'string' },
    { key: 'name', label: 'Name', type: 'string' },
    { key: 'email', label: 'Email', type: 'string' },
    { key: 'phone', label: 'Phone', type: 'string' },
    { key: 'token', label: 'Token', type: 'string' },
    { key: 'status', label: 'Status', type: 'string' },
    { key: 'emailStatus', label: 'Email Status', type: 'string' },
    { key: 'checkinAt', label: 'Checkin At', type: 'date' },
    { key: 'waitlistAt', label: 'Waitlist At', type: 'date' },
    { key: 'startDate', label: 'Start Date', type: 'date' },
    { key: 'endDate', label: 'End Date', type: 'date' },
    { key: 'values', label: 'Values', type: 'object' },
    { key: 'comment', label: 'Comment', type: 'string' },
    { key: 'guests', label: 'Guests', type: 'number' },
    { key: 'termsAcceptedAt', label: 'Terms Accepted At', type: 'date' },
    {
      key: 'deletionRequestedAt',
      label: 'Deletion Requested At',
      type: 'date',
    },
    { key: 'createdAt', label: 'Created At', type: 'date' },
    { key: 'updatedAt', label: 'Updated At', type: 'date' },
    { key: 'ticketBatchId', label: 'Ticket Batch Id', type: 'number' },
    { key: 'paymentId', label: 'Payment Id', type: 'number' },
    { key: 'eventId', label: 'Event Id', type: 'number' },
    { key: 'contactId', label: 'Contact Id', type: 'number' },
  ]

  const createAttributes = {
    firstName: {},
    lastName: {},
    email: { required: true },
    phone: {
      placeholder: '+46 12 345 67 89',
      helpText: 'Mobile phone number with country code.',
    },
    comment: {},
    status: { required: true },
  }

  const operations = {
    create: {
      attributes: transformAttributes(attributes, createAttributes),
      meta: {
        sendEmailConfirmation: {
          type: 'boolean',
          label: 'Send email confirmation',
          required: true,
        },
      },
      relationships: [
        {
          key: 'event',
          label: 'Event',
          model: 'event',
          required: true,
        },
        {
          key: 'ticketBatch',
          label: 'Event',
          model: 'event',
        },
      ],
    },
  }

  return {
    key: 'ticket',
    endpoint: 'tickets',
    name: 'Ticket',
    sample: samples.ticket,
    attributes,
    sorting: [
      'name',
      'createdAt',
      'description',
      'hashid',
      'email',
      'status',
      'checkinAt',
    ],
    filters: {
      eventId: {
        type: 'number',
        required: true,
        default: '',
      },
      search: {
        type: 'string',
        default: '',
      },
      description: {
        type: 'string',
        default: '',
      },
      checkedIn: {
        type: 'boolean',
        default: '',
      },
      status: {
        type: 'array',
        default: [
          'attending',
          'waitlist',
          'declined',
          'invited',
          'consumed',
          'deletion-requested',
        ],
        values: [
          {
            key: 'attending',
            value: 'attending',
            label: 'Attending',
            type: 'string',
          },
          {
            key: 'waitlist',
            value: 'waitlist',
            label: 'Waitlist',
            type: 'string',
          },
          {
            key: 'declined',
            value: 'declined',
            label: 'Decline',
            type: 'string',
          },
          {
            key: 'invited',
            value: 'invited',
            label: 'Invited',
            type: 'string',
          },
          {
            key: 'consumed',
            value: 'consumed',
            label: 'Consumed',
            type: 'string',
          },
          {
            key: 'deletionRequested',
            value: 'deletion-requested',
            label: 'Deletion requested',
            type: 'string',
          },
        ],
      },
    },
    operations,
    webhooks: [
      {
        type: 'ticket.attending',
        label: 'Attending',
        description: 'Triggers when someone attendes a event.',
        important: true,
      },
      {
        type: 'ticket.declined',
        label: 'Declined',
        description: 'Triggers when someone declines.',
        important: true,
      },
      {
        type: 'ticket.invited',
        label: 'Invited',
        description: 'Triggers when someone is invited.',
      },
      {
        type: 'ticket.waitlist',
        label: 'Waitlisted',
        description: 'Triggers when someone is waitlisted.',
      },
      {
        type: 'ticket.updated',
        label: 'Updated',
        description: 'Triggers when a ticket is updated.',
      },
      {
        type: 'ticket.deleted',
        label: 'Deleted',
        description: 'Triggers when a ticket is deleted.',
      },
      {
        type: 'ticket.unsubscribed',
        label: 'Unsubscribed',
        description: 'Triggers when someone is unsubscribed from emails.',
      },
      {
        type: 'ticket.deletion-requested',
        label: 'Deletion requested',
        description:
          'Triggers when someone requests to get deleted from an event.',
      },
    ],
  }
}
