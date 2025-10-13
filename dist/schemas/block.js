import { z } from 'zod';
export const BlockSchema = z.object({
    id: z.number().describe(JSON.stringify({
        label: 'ID',
    })),
    type: z.string().describe(JSON.stringify({
        label: 'Type',
    })),
    content: z.json().describe(JSON.stringify({
        label: 'Content',
    })),
    order: z.number().describe(JSON.stringify({
        label: 'Order',
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
