import { z } from 'zod';
export declare const CategorySchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    organisationId: z.ZodNumber;
}, z.core.$strip>;
export declare const categoriesResourceOptionsSchema: z.ZodObject<{
    raw: z.ZodOptional<z.ZodBoolean>;
    apiKey: z.ZodOptional<z.ZodString>;
    apiHost: z.ZodOptional<z.ZodString>;
    apiProtocol: z.ZodOptional<z.ZodString>;
    page: z.ZodOptional<z.ZodObject<{
        number: z.ZodOptional<z.ZodNumber>;
        size: z.ZodOptional<z.ZodNumber>;
        offset: z.ZodOptional<z.ZodNumber>;
        limit: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
    filter: z.ZodOptional<z.ZodNever>;
    sort: z.ZodOptional<z.ZodNever>;
    include: z.ZodOptional<z.ZodNever>;
}, z.core.$strip>;
export declare const categoriesFindOptionsSchema: z.ZodObject<{
    raw: z.ZodOptional<z.ZodBoolean>;
    apiKey: z.ZodOptional<z.ZodString>;
    apiHost: z.ZodOptional<z.ZodString>;
    apiProtocol: z.ZodOptional<z.ZodString>;
    include: z.ZodOptional<z.ZodArray<z.ZodString>>;
    filter: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString>, z.ZodArray<z.ZodNumber>, z.ZodDate]>>>;
    sort: z.ZodOptional<z.ZodString>;
    page: z.ZodOptional<z.ZodObject<{
        number: z.ZodOptional<z.ZodNumber>;
        size: z.ZodOptional<z.ZodNumber>;
        offset: z.ZodOptional<z.ZodNumber>;
        limit: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const staticCategoriesResourceOptionsSchema: z.ZodObject<{
    raw: z.ZodOptional<z.ZodBoolean>;
    apiKey: z.ZodString;
    apiHost: z.ZodOptional<z.ZodString>;
    apiProtocol: z.ZodOptional<z.ZodString>;
    page: z.ZodOptional<z.ZodObject<{
        number: z.ZodOptional<z.ZodNumber>;
        size: z.ZodOptional<z.ZodNumber>;
        offset: z.ZodOptional<z.ZodNumber>;
        limit: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
    filter: z.ZodOptional<z.ZodNever>;
    sort: z.ZodOptional<z.ZodNever>;
    include: z.ZodOptional<z.ZodNever>;
}, z.core.$strip>;
export declare const staticCategoriesFindOptionsSchema: z.ZodObject<{
    raw: z.ZodOptional<z.ZodBoolean>;
    apiKey: z.ZodString;
    apiHost: z.ZodOptional<z.ZodString>;
    apiProtocol: z.ZodOptional<z.ZodString>;
    include: z.ZodOptional<z.ZodArray<z.ZodString>>;
    filter: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString>, z.ZodArray<z.ZodNumber>, z.ZodDate]>>>;
    sort: z.ZodOptional<z.ZodString>;
    page: z.ZodOptional<z.ZodObject<{
        number: z.ZodOptional<z.ZodNumber>;
        size: z.ZodOptional<z.ZodNumber>;
        offset: z.ZodOptional<z.ZodNumber>;
        limit: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type Category = z.infer<typeof CategorySchema>;
//# sourceMappingURL=category.d.ts.map