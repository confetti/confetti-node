import { z } from 'zod'
import {
  baseFindAllOptionsSchema,
  baseOptionsSchema,
  findBaseOptionsSchema,
  staticBaseFindAllOptionsSchema,
  staticBaseFindOptionsSchema,
} from './resource-options.js'

export const ImageSchema = z.object({
  id: z.number().meta({
    label: 'ID',
    description: 'Identifier of the image.',
  }),
  type: z.string().meta({
    label: 'Type',
  }),
  order: z.number().optional().meta({
    label: 'Order',
  }),
  original: z.string().meta({
    label: 'Original',
  }),
  url30: z.string().meta({
    label: 'Url30',
  }),
  url50: z.string().meta({
    label: 'Url50',
  }),
  url75: z.string().meta({
    label: 'Url75',
  }),
  url100: z.string().meta({
    label: 'Url100',
  }),
  url300: z.string().meta({
    label: 'Url300',
  }),
  url500: z.string().meta({
    label: 'Url500',
  }),
  url500x500: z.string().meta({
    label: 'Url500x500',
  }),
  url1000: z.string().meta({
    label: 'Url1000',
  }),
  url2000: z.string().meta({
    label: 'Url2000',
  }),
  urlMax2000: z.string().meta({
    label: 'UrlMax2000',
  }),
  title: z.string().meta({
    label: 'Title',
  }),
  description: z.string().meta({
    label: 'Description',
  }),
  link: z.string().meta({
    label: 'Link',
  }),
  alt: z.string().meta({
    label: 'Alt text',
  }),
})

const imageTextFields = {
  title: z.string().optional().meta({ label: 'Title' }),
  description: z.string().max(255).optional().meta({ label: 'Description' }),
  link: z
    .string()
    .optional()
    .meta({ label: 'Link', description: 'URL the image links to, where the block shows links.' }),
  alt: z.string().optional().meta({ label: 'Alt text', description: 'Alternative text for screen readers.' }),
}

export const ImageCreateSchema = z.object({
  type: z.string().meta({ label: 'Image Type' }),
  provider: z.string().optional().meta({ label: 'Provider', description: 'Image provider, e.g. "s3".' }),
  public_id: z.string().optional().meta({ label: 'Public Id', description: 'Provider-specific image key.' }),
  url: z.string().optional().meta({ label: 'Url' }),
  base64: z.string().optional().meta({ label: 'Base64' }),
  ...imageTextFields,
  order: z.number().optional().meta({ label: 'Order' }),
  width: z.number().optional().meta({ label: 'Width' }),
  height: z.number().optional().meta({ label: 'Height' }),
  content: z.looseObject({}).optional().meta({
    label: 'Content',
    description:
      'Provider metadata, e.g. color and blurHash for static images. Set title, description, link and alt with their own fields.',
  }),
  blockId: z.number().optional().meta({ label: 'Block Id' }),
  themeId: z.number().optional().meta({ label: 'Theme Id' }),
  eventId: z.number().optional().meta({ label: 'Event Id' }),
  workspaceId: z.number().optional().meta({ label: 'Workspace Id' }),
})

// The image file, type and owner are fixed once created; replace an image by deleting it and creating a new one.
export const ImageUpdateSchema = z.object({
  ...imageTextFields,
  order: z.number().optional().meta({ label: 'Order' }),
  width: z.number().optional().meta({ label: 'Width' }),
  height: z.number().optional().meta({ label: 'Height' }),
})

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
export type ImageCreateData = ImageCreate
export type ImageUpdate = z.infer<typeof ImageUpdateSchema>
export type ImageUpdateData = ImageUpdate
export type ImagesFindAllOptions = z.infer<typeof imagesFindAllOptionsSchema>
export type ImagesFindOptions = z.infer<typeof imagesFindOptionsSchema>
export type ImagesCreateOptions = z.infer<typeof baseOptionsSchema>
export type ImagesUpdateOptions = z.infer<typeof baseOptionsSchema>
export type StaticImagesFindAllOptions = z.infer<typeof staticImagesFindAllOptionsSchema>
export type StaticImagesFindOptions = z.infer<typeof staticImagesFindOptionsSchema>
export type StaticImagesCreateOptions = z.infer<typeof staticImagesCreateOptionsSchema>
export type StaticImagesUpdateOptions = z.infer<typeof staticImagesUpdateOptionsSchema>
