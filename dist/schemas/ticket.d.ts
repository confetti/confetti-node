import { z } from 'zod';
export declare const TicketSchema: z.ZodObject<{
    id: z.ZodNumber;
    persons: z.ZodNumber;
    hashid: z.ZodString;
    description: z.ZodString;
    price: z.ZodNumber;
    currency: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    phone: z.ZodString;
    company: z.ZodString;
    token: z.ZodString;
    status: z.ZodString;
    emailStatus: z.ZodString;
    checkinAt: z.ZodOptional<z.ZodDate>;
    waitlistAt: z.ZodOptional<z.ZodDate>;
    startDate: z.ZodDate;
    endDate: z.ZodDate;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    organisationId: z.ZodNumber;
}, z.core.$strip>;
export declare const TicketCreateSchema: z.ZodObject<{
    eventId: z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>;
    ticketBatchId: z.ZodOptional<z.ZodNumber>;
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    email: z.ZodString;
    status: z.ZodEnum<{
        attending: "attending";
        invited: "invited";
    }>;
    company: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    comment: z.ZodOptional<z.ZodString>;
    sendEmailConfirmation: z.ZodBoolean;
}, z.core.$strip>;
export declare const ticketsResourceOptionsSchema: z.ZodObject<{
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
        eventId: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
        search: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        checkedIn: z.ZodOptional<z.ZodBoolean>;
        status: z.ZodOptional<z.ZodArray<z.ZodEnum<{
            attending: "attending";
            invited: "invited";
            waitlist: "waitlist";
            declined: "declined";
            consumed: "consumed";
            "deletion-requested": "deletion-requested";
        }>>>;
    }, z.core.$strip>>;
    sort: z.ZodOptional<z.ZodEnum<{
        createdAt: "createdAt";
        description: "description";
        name: "name";
        email: "email";
        status: "status";
        hashid: "hashid";
        checkinAt: "checkinAt";
    }>>;
    include: z.ZodOptional<z.ZodNever>;
}, z.core.$strip>;
export declare const ticketsFindOptionsSchema: z.ZodObject<{
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
export declare const staticTicketsResourceOptionsSchema: z.ZodObject<{
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
        eventId: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
        search: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        checkedIn: z.ZodOptional<z.ZodBoolean>;
        status: z.ZodOptional<z.ZodArray<z.ZodEnum<{
            attending: "attending";
            invited: "invited";
            waitlist: "waitlist";
            declined: "declined";
            consumed: "consumed";
            "deletion-requested": "deletion-requested";
        }>>>;
    }, z.core.$strip>>;
    sort: z.ZodOptional<z.ZodEnum<{
        createdAt: "createdAt";
        description: "description";
        name: "name";
        email: "email";
        status: "status";
        hashid: "hashid";
        checkinAt: "checkinAt";
    }>>;
    include: z.ZodOptional<z.ZodNever>;
}, z.core.$strip>;
export declare const staticTicketsFindOptionsSchema: z.ZodObject<{
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
export declare const staticTicketsCreateOptionsSchema: z.ZodObject<{
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
export type Ticket = z.infer<typeof TicketSchema>;
export type TicketCreate = z.infer<typeof TicketCreateSchema>;
//# sourceMappingURL=ticket.d.ts.map