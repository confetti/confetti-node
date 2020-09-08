module.exports = function ({ samples }) {
  return {
    key: 'event',
    endpoint: 'events',
    name: 'Event',
    sample: samples.event,
    attributes: [
      {
        key: 'id',
        label: 'ID',
        description: 'Identifier of the event.',
        type: 'number',
      },
      {
        key: 'name',
        label: 'Name',
        description: 'Event name',
        type: 'string',
      },
      { key: 'startDate', label: 'Start Date', type: 'date' },
      { key: 'endDate', label: 'End Date', type: 'date' },
      { key: 'timeZone', label: 'Time Zone', type: 'string' },
      { key: 'slug', label: 'Slug', type: 'string' },
      { key: 'status', label: 'Status', type: 'string' },
      { key: 'featureLevel', label: 'Feature Level', type: 'string' },
      { key: 'signupType', label: 'Signup Type', type: 'string' },
      { key: 'signupStartAt', label: 'Signup Start At', type: 'date' },
      { key: 'signupEndAt', label: 'Signup End At', type: 'date' },
      { key: 'website', label: 'Website', type: 'string' },
      { key: 'email', label: 'Email', type: 'string' },
      { key: 'rsvpLimit', label: 'Rsvp Limit', type: 'number' },
      { key: 'rsvpLeft', label: 'Rsvp Left', type: 'number' },
      { key: 'waitlisted', label: 'Waitlisted', type: 'number' },
      { key: 'hasPassed', label: 'Has Passed', type: 'boolean' },
      { key: 'createdAt', label: 'Created At', type: 'date' },
      { key: 'updatedAt', label: 'Updated At', type: 'date' },
      { key: 'workspaceId', label: 'Workspace Id', type: 'number' },

      { key: 'shareTitle', label: 'ShareTitle', type: 'string' },
      { key: 'shareDescription', label: 'Share description', type: 'string' },
      { key: 'summary', label: 'Summary', type: 'string' },
      { key: 'timeFormat', label: 'Time format', type: 'string' },
      { key: 'locale', label: 'Locale', type: 'string' },
      { key: 'primaryColor', label: 'Primary color', type: 'string' },
      { key: 'colors', label: 'Colors', type: 'string' },
      { key: 'waitlist', label: 'Has a waitlist', type: 'string' },
    ],
    filters: {
      signupType: {
        type: 'enum',
        default: '',
        values: [
          {
            label: 'RSVP',
            description: 'Events with signup type RSVP',
            type: 'string',
            key: 'rsvp',
          },
          {
            label: 'Tickets',
            description: 'Events with signup type tickets',
            type: 'string',
            key: 'tickets',
          },
        ],
      },
      type: {
        type: 'enum',
        default: '',
        values: [
          {
            label: 'Future',
            description: "Get events that haven't taken place yet",
            type: 'string',
            key: 'future',
          },
          {
            label: 'Past',
            description: 'Get events that has happend in the past',
            type: 'string',
            key: 'past',
          },
        ],
      },
    },
    webhooks: [
      {
        type: 'event.updated',
        label: 'Updated',
        description: 'Triggers when an event is updated.',
      },
      {
        type: 'event.created',
        label: 'Created',
        description: 'Triggers when an event is created.',
      },
    ],
  }
}
