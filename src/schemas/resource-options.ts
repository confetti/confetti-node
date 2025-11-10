import { z } from 'zod'

export const baseOptionsSchema = z.object({
  raw: z.boolean().optional(),
  apiKey: z.string().optional(),
  apiHost: z.string().optional(),
  apiProtocol: z.string().optional(),
})

export const findBaseOptionsSchema = baseOptionsSchema.extend({
  include: z.array(z.string()).optional(),
})

export const pageOptionsSchema = z.object({
  number: z.number().optional(),
  size: z.number().optional(),
  offset: z.number().optional(),
  limit: z.number().optional(),
})

export const baseFindAllOptionsSchema = findBaseOptionsSchema.extend({
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
export const staticBaseOptionsSchema = z.object({
  raw: z.boolean().optional(),
  apiKey: z.string(),
  apiHost: z.string().optional(),
  apiProtocol: z.string().optional(),
})

export const staticBaseFindOptionsSchema = staticBaseOptionsSchema.extend({
  include: z.array(z.string()).optional(),
})

export const staticBaseFindAllOptionsSchema = staticBaseFindOptionsSchema.extend({
  filter: z
    .record(
      z.string(),
      z.union([z.string(), z.number(), z.boolean(), z.array(z.string()), z.array(z.number()), z.date()]),
    )
    .optional(),
  sort: z.string().optional(),
  page: pageOptionsSchema.optional(),
})

export type FindBaseResourceOptions = z.infer<typeof findBaseOptionsSchema>
export type BaseFindAllResourceOptions = z.infer<typeof baseFindAllOptionsSchema>
export type StaticBaseResourceOptions = z.infer<typeof staticBaseOptionsSchema>
export type StaticFindBaseResourceOptions = z.infer<typeof staticBaseFindOptionsSchema>
export type StaticBaseFindAllResourceOptions = z.infer<typeof staticBaseFindAllOptionsSchema>
