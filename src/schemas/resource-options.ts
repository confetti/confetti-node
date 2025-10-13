import { z } from 'zod'

export const baseResourceOptionsSchema = z.object({
  raw: z.boolean().optional(),
  apiKey: z.string().optional(),
  apiHost: z.string().optional(),
  apiProtocol: z.string().optional(),
})

export const findBaseResourceOptionsSchema = baseResourceOptionsSchema.extend({
  include: z.array(z.string()).optional(),
})

export const pageOptionsSchema = z.object({
  number: z.number().optional(),
  size: z.number().optional(),
  offset: z.number().optional(),
  limit: z.number().optional(),
})

export const baseFindAllResourceOptionsSchema = findBaseResourceOptionsSchema.extend({
  filter: z
    .record(
      z.string(),
      z.union([z.string(), z.number(), z.boolean(), z.array(z.string()), z.array(z.number()), z.date()]),
    )
    .optional(),
  sort: z.string().optional(),
  page: pageOptionsSchema.optional(),
})

// Static method schemas (apiKey required)
export const staticBaseResourceOptionsSchema = z.object({
  raw: z.boolean().optional(),
  apiKey: z.string(),
  apiHost: z.string().optional(),
  apiProtocol: z.string().optional(),
})

export const staticFindBaseResourceOptionsSchema = staticBaseResourceOptionsSchema.extend({
  include: z.array(z.string()).optional(),
})

export const staticBaseFindAllResourceOptionsSchema = staticFindBaseResourceOptionsSchema.extend({
  filter: z
    .record(
      z.string(),
      z.union([z.string(), z.number(), z.boolean(), z.array(z.string()), z.array(z.number()), z.date()]),
    )
    .optional(),
  sort: z.string().optional(),
  page: pageOptionsSchema.optional(),
})
