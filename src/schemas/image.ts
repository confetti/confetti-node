import { z } from 'zod'
import {
  baseFindAllOptionsSchema,
  baseOptionsSchema,
  findBaseOptionsSchema,
  staticBaseFindAllOptionsSchema,
  staticBaseFindOptionsSchema,
} from './resource-options.js'

export const ImageSchema = z.object({
  id: z.number().describe(
    JSON.stringify({
      label: 'ID',
      description: 'Identifier of the image.',
    }),
  ),
  type: z.string().describe(
    JSON.stringify({
      label: 'Type',
    }),
  ),
  order: z.string().describe(
    JSON.stringify({
      label: 'Order',
    }),
  ),
  original: z.string().describe(
    JSON.stringify({
      label: 'Original',
    }),
  ),
  url30: z.string().describe(
    JSON.stringify({
      label: 'Url30',
    }),
  ),
  url50: z.string().describe(
    JSON.stringify({
      label: 'Url50',
    }),
  ),
  url75: z.string().describe(
    JSON.stringify({
      label: 'Url75',
    }),
  ),
  url100: z.string().describe(
    JSON.stringify({
      label: 'Url100',
    }),
  ),
  url300: z.string().describe(
    JSON.stringify({
      label: 'Url300',
    }),
  ),
  url500: z.string().describe(
    JSON.stringify({
      label: 'Url500',
    }),
  ),
  url500x500: z.string().describe(
    JSON.stringify({
      label: 'Url500x500',
    }),
  ),
  url1000: z.string().describe(
    JSON.stringify({
      label: 'Url1000',
    }),
  ),
  url2000: z.string().describe(
    JSON.stringify({
      label: 'Url2000',
    }),
  ),
  urlMax2000: z.string().describe(
    JSON.stringify({
      label: 'UrlMax2000',
    }),
  ),
  title: z.string().describe(
    JSON.stringify({
      label: 'Title',
    }),
  ),
  description: z.string().describe(
    JSON.stringify({
      label: 'Description',
    }),
  ),
  link: z.string().describe(
    JSON.stringify({
      label: 'Link',
    }),
  ),
})

// Image uses `imageType` instead of `type` to avoid colliding with the
// JSON:API resource type. Provider is fixed to S3 (default), and the asset
// can be supplied via `url` or `base64`.
export const ImageCreateSchema = z.object({
  imageType: z.string().describe(JSON.stringify({ label: 'Image Type' })),
  url: z.string().optional().describe(JSON.stringify({ label: 'Url' })),
  base64: z.string().optional().describe(JSON.stringify({ label: 'Base64' })),
  description: z.string().optional().describe(JSON.stringify({ label: 'Description' })),
  title: z.string().optional().describe(JSON.stringify({ label: 'Title' })),
  link: z.string().optional().describe(JSON.stringify({ label: 'Link' })),
  order: z.number().optional().describe(JSON.stringify({ label: 'Order' })),
  width: z.number().optional().describe(JSON.stringify({ label: 'Width' })),
  height: z.number().optional().describe(JSON.stringify({ label: 'Height' })),
  content: z.looseObject({}).optional().describe(JSON.stringify({ label: 'Content' })),
  blockId: z.number().optional().describe(JSON.stringify({ label: 'Block Id' })),
  blockStyleId: z.number().optional().describe(JSON.stringify({ label: 'Block Style Id' })),
  themeId: z.number().optional().describe(JSON.stringify({ label: 'Theme Id' })),
  eventId: z.number().optional().describe(JSON.stringify({ label: 'Event Id' })),
  workspaceId: z.number().optional().describe(JSON.stringify({ label: 'Workspace Id' })),
})

export const ImageUpdateSchema = ImageCreateSchema.partial()

const imagesFindAllSchema = {
  filter: z
    .object({
      blockId: z.number().optional(),
      eventId: z.number().optional(),
    })
    .optional(),
  sort: z.never().optional(),
  include: z.never().optional(),
}

export const imagesFindAllOptionsSchema = baseFindAllOptionsSchema.extend(imagesFindAllSchema)
export const imagesFindOptionsSchema = findBaseOptionsSchema.extend({})

export const staticImagesFindAllOptionsSchema = staticBaseFindAllOptionsSchema.extend(imagesFindAllSchema)
export const staticImagesFindOptionsSchema = staticBaseFindOptionsSchema.extend({})
export const staticImagesCreateOptionsSchema = staticBaseFindAllOptionsSchema.extend({})
export const staticImagesUpdateOptionsSchema = staticBaseFindAllOptionsSchema.extend({})

export type Image = z.infer<typeof ImageSchema>
export type ImageCreate = z.infer<typeof ImageCreateSchema>
export type ImageCreateData = z.infer<typeof ImageCreateSchema>
export type ImageUpdate = z.infer<typeof ImageUpdateSchema>
export type ImageUpdateData = z.infer<typeof ImageUpdateSchema>
export type ImagesFindAllOptions = z.infer<typeof imagesFindAllOptionsSchema>
export type ImagesFindOptions = z.infer<typeof imagesFindOptionsSchema>
export type ImagesCreateOptions = z.infer<typeof baseOptionsSchema>
export type ImagesUpdateOptions = z.infer<typeof baseOptionsSchema>
export type StaticImagesFindAllOptions = z.infer<typeof staticImagesFindAllOptionsSchema>
export type StaticImagesFindOptions = z.infer<typeof staticImagesFindOptionsSchema>
export type StaticImagesCreateOptions = z.infer<typeof staticImagesCreateOptionsSchema>
export type StaticImagesUpdateOptions = z.infer<typeof staticImagesUpdateOptionsSchema>
