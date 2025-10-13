import { z } from 'zod';
export declare const EventSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    startDate: z.ZodDate;
    endDate: z.ZodDate;
    timeZone: z.ZodString;
    slug: z.ZodString;
    status: z.ZodString;
    featureLevel: z.ZodString;
    signupType: z.ZodString;
    signupStartAt: z.ZodDate;
    signupEndAt: z.ZodDate;
    website: z.ZodString;
    email: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    organisationId: z.ZodNumber;
}, z.core.$strip>;
export declare const eventsResourceOptionsSchema: z.ZodObject<{
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
    filter: z.ZodOptional<z.ZodObject<{
        signupType: z.ZodOptional<z.ZodEnum<{
            rsvp: "rsvp";
            tickets: "tickets";
        }>>;
        type: z.ZodOptional<z.ZodEnum<{
            future: "future";
            past: "past";
        }>>;
    }, z.core.$strip>>;
    sort: z.ZodOptional<z.ZodNever>;
    include: z.ZodOptional<z.ZodArray<z.ZodEnum<{
        categories: "categories";
        pages: "pages";
        "pages.blocks": "pages.blocks";
        "pages.blocks.images": "pages.blocks.images";
    }>>>;
}, z.core.$strip>;
export declare const eventsFindOptionsSchema: z.ZodObject<{
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
export declare const staticEventsResourceOptionsSchema: z.ZodObject<{
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
    filter: z.ZodOptional<z.ZodObject<{
        signupType: z.ZodOptional<z.ZodEnum<{
            rsvp: "rsvp";
            tickets: "tickets";
        }>>;
        type: z.ZodOptional<z.ZodEnum<{
            future: "future";
            past: "past";
        }>>;
    }, z.core.$strip>>;
    sort: z.ZodOptional<z.ZodNever>;
    include: z.ZodOptional<z.ZodArray<z.ZodEnum<{
        categories: "categories";
        pages: "pages";
        "pages.blocks": "pages.blocks";
        "pages.blocks.images": "pages.blocks.images";
    }>>>;
}, z.core.$strip>;
export declare const staticEventsFindOptionsSchema: z.ZodObject<{
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
export type Event = z.infer<typeof EventSchema>;
//# sourceMappingURL=event.d.ts.map