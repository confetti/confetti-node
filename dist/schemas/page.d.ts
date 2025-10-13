import { z } from 'zod';
export declare const PageSchema: z.ZodObject<{
    id: z.ZodNumber;
    title: z.ZodString;
    slug: z.ZodString;
    content: z.ZodString;
    status: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    organisationId: z.ZodNumber;
}, z.core.$strip>;
export type Page = z.infer<typeof PageSchema>;
//# sourceMappingURL=page.d.ts.map