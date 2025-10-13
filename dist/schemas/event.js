import { z } from 'zod';
import { baseFindAllResourceOptionsSchema, staticBaseFindAllResourceOptionsSchema } from './resource-options.js';
export const EventSchema = z.object({
    id: z.number().describe(JSON.stringify({
        label: 'ID',
        description: 'Identifier of the event.',
    })),
    name: z.string().describe(JSON.stringify({
        label: 'Name',
        description: 'Event name',
    })),
    startDate: z.date().describe(JSON.stringify({
        label: 'Start Date',
    })),
    endDate: z.date().describe(JSON.stringify({
        label: 'End Date',
    })),
    timeZone: z.string().describe(JSON.stringify({
        label: 'Time Zone',
    })),
    slug: z.string().describe(JSON.stringify({
        label: 'Slug',
    })),
    status: z.string().describe(JSON.stringify({
        label: 'Status',
    })),
    featureLevel: z.string().describe(JSON.stringify({
        label: 'Feature Level',
    })),
    signupType: z.string().describe(JSON.stringify({
        label: 'Signup Type',
    })),
    signupStartAt: z.date().describe(JSON.stringify({
        label: 'Signup Start At',
    })),
    signupEndAt: z.date().describe(JSON.stringify({
        label: 'Signup End At',
    })),
    website: z.string().describe(JSON.stringify({
        label: 'Website',
    })),
    email: z.string().describe(JSON.stringify({
        label: 'Email',
    })),
    createdAt: z.date().describe(JSON.stringify({
        label: 'Created At',
    })),
    updatedAt: z.date().describe(JSON.stringify({
        label: 'Updated At',
    })),
    organisationId: z.number().describe(JSON.stringify({
        label: 'Organisation Id',
    })),
});
export const eventsResourceOptionsSchema = baseFindAllResourceOptionsSchema.extend({
    filter: z
        .object({
        signupType: z
            .enum(['rsvp', 'tickets'])
            .describe(JSON.stringify({
            label: 'Signup Type',
            description: 'Filter events by signup type',
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
        }))
            .optional(),
        type: z
            .enum(['future', 'past'])
            .describe(JSON.stringify({
            label: 'Event Type',
            description: 'Filter events by time',
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
        }))
            .optional(),
    })
        .optional(),
    sort: z.never().optional(),
    include: z
        .array(z.enum(['categories', 'pages', 'pages.blocks', 'pages.blocks.images']).describe(JSON.stringify({
        label: 'Include Relations',
        description: 'Include related data',
        values: [
            {
                label: 'Categories',
                description: 'Event categories',
                type: 'string',
                key: 'categories',
                value: 'categories',
            },
            {
                label: 'Pages',
                description: 'Event pages',
                type: 'string',
                key: 'pages',
                value: 'pages',
            },
            {
                label: 'Pages Blocks',
                description: 'Page content blocks',
                type: 'string',
                key: 'pages.blocks',
                value: 'pages.blocks',
            },
            {
                label: 'Pages Blocks Images',
                description: 'Block images',
                type: 'string',
                key: 'pages.blocks.images',
                value: 'pages.blocks.images',
            },
        ],
    })))
        .optional(),
});
export const eventsFindOptionsSchema = baseFindAllResourceOptionsSchema.extend({});
export const staticEventsResourceOptionsSchema = staticBaseFindAllResourceOptionsSchema.extend({
    filter: z
        .object({
        signupType: z
            .enum(['rsvp', 'tickets'])
            .describe(JSON.stringify({
            label: 'Signup Type',
            description: 'Filter events by signup type',
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
        }))
            .optional(),
        type: z
            .enum(['future', 'past'])
            .describe(JSON.stringify({
            label: 'Event Type',
            description: 'Filter events by time',
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
        }))
            .optional(),
    })
        .optional(),
    sort: z.never().optional(),
    include: z
        .array(z.enum(['categories', 'pages', 'pages.blocks', 'pages.blocks.images']).describe(JSON.stringify({
        label: 'Include Relations',
        description: 'Include related data',
        values: [
            {
                label: 'Categories',
                description: 'Event categories',
                type: 'string',
                key: 'categories',
                value: 'categories',
            },
            {
                label: 'Pages',
                description: 'Event pages',
                type: 'string',
                key: 'pages',
                value: 'pages',
            },
            {
                label: 'Pages Blocks',
                description: 'Page content blocks',
                type: 'string',
                key: 'pages.blocks',
                value: 'pages.blocks',
            },
            {
                label: 'Pages Blocks Images',
                description: 'Block images',
                type: 'string',
                key: 'pages.blocks.images',
                value: 'pages.blocks.images',
            },
        ],
    })))
        .optional(),
});
export const staticEventsFindOptionsSchema = staticBaseFindAllResourceOptionsSchema.extend({});
