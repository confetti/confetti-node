import { z } from 'zod';
export declare const ContactSchema: z.ZodObject<{
    id: z.ZodNumber;
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodString;
    phone: z.ZodString;
    token: z.ZodString;
    status: z.ZodString;
    comment: z.ZodString;
    lastSeen: z.ZodDate;
    deletionRequestedAt: z.ZodOptional<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    organisationId: z.ZodNumber;
    company: z.ZodString;
}, z.core.$strip>;
export declare const ContactCreateSchema: z.ZodObject<{
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    email: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    comment: z.ZodOptional<z.ZodString>;
    company: z.ZodOptional<z.ZodString>;
    categoryIds: z.ZodOptional<z.ZodArray<z.ZodNumber>>;
    workspaceId: z.ZodNumber;
}, z.core.$strip>;
export declare const contactsResourceOptionsSchema: z.ZodObject<{
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
export declare const contactsFindOptionsSchema: z.ZodObject<{
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
export declare const staticContactsResourceOptionsSchema: z.ZodObject<{
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
export declare const staticContactsFindOptionsSchema: z.ZodObject<{
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
export declare const staticContactsCreateOptionsSchema: z.ZodObject<{
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
export type Contact = z.infer<typeof ContactSchema>;
export type ContactCreate = z.infer<typeof ContactCreateSchema>;
//# sourceMappingURL=contact.d.ts.map