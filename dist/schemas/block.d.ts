import { z } from 'zod';
export declare const BlockSchema: z.ZodObject<{
    id: z.ZodNumber;
    type: z.ZodString;
    content: z.ZodJSONSchema;
    order: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    organisationId: z.ZodNumber;
}, z.core.$strip>;
export type Block = z.infer<typeof BlockSchema>;
//# sourceMappingURL=block.d.ts.map