export default {
  data: {
    id: '3105',
    type: 'message',
    attributes: {
      type: 'email',
      status: 'draft',
      isTemplate: false,
      content: {
        subject: 'See you tomorrow, {{firstName}}!',
        headline: 'Final details',
        message: '<p>Doors open at 17:00. Bring your ticket.</p>',
        groups: { sendBasedOn: 'status', attending: true },
      },
      scheduledAt: null,
      sentAt: null,
      eventId: 44709,
      workspaceId: null,
      imageId: null,
      createdAt: '2026-10-01T09:00:00.000Z',
      updatedAt: '2026-10-02T09:00:00.000Z',
    },
  },
}
