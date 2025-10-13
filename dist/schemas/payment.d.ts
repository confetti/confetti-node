import { z } from 'zod';
export declare const PaymentSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    email: z.ZodString;
    company: z.ZodString;
    amount: z.ZodNumber;
    vat: z.ZodNumber;
    vatPercentage: z.ZodNumber;
    token: z.ZodString;
    currency: z.ZodString;
    status: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    organisationId: z.ZodNumber;
}, z.core.$strip>;
export declare const paymentsResourceOptionsSchema: z.ZodObject<{
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
        eventId: z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>;
        status: z.ZodOptional<z.ZodArray<z.ZodEnum<{
            paid: "paid";
            refunded: "refunded";
            "pending-invoice": "pending-invoice";
            "sent-invoice": "sent-invoice";
            "paid-invoice": "paid-invoice";
            "cancelled-invoice": "cancelled-invoice";
        }>>>;
    }, z.core.$strip>>;
    sort: z.ZodOptional<z.ZodNever>;
    include: z.ZodOptional<z.ZodNever>;
}, z.core.$strip>;
export declare const paymentsFindOptionsSchema: z.ZodObject<{
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
export declare const staticPaymentsResourceOptionsSchema: z.ZodObject<{
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
        eventId: z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>;
        status: z.ZodOptional<z.ZodArray<z.ZodEnum<{
            paid: "paid";
            refunded: "refunded";
            "pending-invoice": "pending-invoice";
            "sent-invoice": "sent-invoice";
            "paid-invoice": "paid-invoice";
            "cancelled-invoice": "cancelled-invoice";
        }>>>;
    }, z.core.$strip>>;
    sort: z.ZodOptional<z.ZodNever>;
    include: z.ZodOptional<z.ZodNever>;
}, z.core.$strip>;
export declare const staticPaymentsFindOptionsSchema: z.ZodObject<{
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
export type Payment = z.infer<typeof PaymentSchema>;
//# sourceMappingURL=payment.d.ts.map