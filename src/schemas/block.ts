import { z } from 'zod'
import {
  baseFindAllOptionsSchema,
  baseOptionsSchema,
  findBaseOptionsSchema,
  staticBaseFindAllOptionsSchema,
  staticBaseFindOptionsSchema,
} from './resource-options.js'

export const BlockSchema = z.object({
  id: z.number().meta({
    label: 'ID',
  }),
  type: z.string().meta({
    label: 'Type',
  }),
  content: z.json().meta({
    label: 'Content',
  }),
  order: z.number().meta({
    label: 'Order',
  }),
  status: z.string().meta({
    label: 'Status',
  }),
  blockLinkId: z.number().nullable().meta({
    label: 'Linked block',
  }),
})

const blockTypes = [
  'text',
  'header',
  'gallery',
  'video',
  'speakers',
  'schedule',
  'sponsors',
  'organisers',
  'location',
  'countdown',
  'mailinglist',
  'live',
  'custom',
  'organisation-events',
  'menu-organisation',
  'link',
  'message-text',
  'message-image',
] as const

const blockStatuses = ['published', 'preview', 'deleted', 'hidden'] as const

// The API validates content per block type and strips fields that don't apply to it.
const forTypes = (types: readonly string[], description = ''): string =>
  types[0] === 'all' ? description : `${description ? `${description} ` : ''}Types: ${types.join(', ')}.`

const colorThemes = ['primary', 'inverted', 'secondary', 'custom'] as const
const spacings = ['small', 'medium', 'large', 'custom'] as const

const spacingStyleSchema = z
  .looseObject({
    spacing: z.enum(spacings).optional(),
    spacingTop: z.enum(spacings).optional(),
    spacingTopSmall: z.number().optional(),
    spacingTopMedium: z.number().optional(),
    spacingTopLarge: z.number().optional(),
    spacingBottom: z.enum(spacings).optional(),
    spacingBottomSmall: z.number().optional(),
    spacingBottomMedium: z.number().optional(),
    spacingBottomLarge: z.number().optional(),
  })
  .optional()
  .meta({
    description: forTypes(['all'], 'Pixel values apply when the spacing is custom.'),
  })

const blockStyleSettingsSchema = z
  .looseObject({
    customCss: z.string().optional().meta({
      description:
        'Scoped to this block. Last resort: prefer theme and spacing. Can break the page and is hard for organisers to undo; keep it small and tell the user.',
    }),
  })
  .optional()

const speakersSettingSchema = z.object({
  id: z.number().meta({ description: 'Speaker ID.' }),
  order: z.number(),
  show: z.boolean(),
  isAnnounced: z.boolean().optional(),
})

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

// Content read from the API has null for unset fields. Dropping them lets it be sent back unchanged while the
// schema only advertises one type per field, which is what tool schemas can express portably.
function withoutNulls(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(withoutNulls)
  if (!isPlainObject(value)) return value
  return Object.fromEntries(
    Object.entries(value)
      .filter(([, entry]) => entry !== null)
      .map(([key, entry]) => [key, withoutNulls(entry)]),
  )
}

const blockContentSchema = z
  .preprocess(
    withoutNulls,
    z.looseObject({
      name: z
        .string()
        .optional()
        .meta({ description: forTypes(['all'], 'Internal name.') }),
      cssClassName: z.string().optional(),
      theme: z
        .enum(colorThemes)
        .optional()
        .meta({ description: forTypes(['all'], "Color theme. Don't set custom; keep it if already set.") }),
      style: spacingStyleSchema,
      blockStyleSettings: blockStyleSettingsSchema,
      title: z
        .string()
        .optional()
        .meta({
          description: forTypes([
            'header',
            'gallery',
            'speakers',
            'schedule',
            'organisers',
            'countdown',
            'mailinglist',
            'organisation-events',
          ]),
        }),
      html: z
        .string()
        .optional()
        .meta({
          description: forTypes(
            ['text', 'gallery', 'location', 'custom', 'message-text'],
            'Text as HTML. In custom blocks, raw HTML: last resort, can break the page and is hard for organisers to undo.',
          ),
        }),
      textLayout: z
        .enum(['text-only', 'image-left', 'image-right', 'image-top', 'image-background', 'custom'])
        .optional()
        .meta({ description: forTypes(['text']) }),
      showSocial: z
        .boolean()
        .optional()
        .meta({ description: forTypes(['text']) }),
      showRsvpButton: z
        .boolean()
        .optional()
        .meta({ description: forTypes(['text', 'location']) }),
      ctaText: z
        .string()
        .optional()
        .meta({
          description: forTypes(
            ['text', 'header'],
            'Button label. Set with ctaUrl; the button needs both. Header: workspace pages only.',
          ),
        }),
      ctaUrl: z
        .string()
        .optional()
        .meta({
          description: forTypes(
            ['text', 'header'],
            'Button link. Set with ctaText; the button needs both. Header: workspace pages only.',
          ),
        }),
      headerStyle: z
        .enum(['text', 'logo', 'none'])
        .optional()
        .meta({ description: forTypes(['header']) }),
      logoSize: z
        .enum(['small', 'medium', 'large'])
        .optional()
        .meta({ description: forTypes(['header'], 'Defaults to medium.') }),
      coverStyle: z
        .enum(['fullscreen', 'poster', 'compact'])
        .optional()
        .meta({ description: forTypes(['header']) }),
      shadowStyle: z
        .enum(['gradient', 'grid', 'none'])
        .optional()
        .meta({ description: forTypes(['header']) }),
      shadowOpacity: z
        .number()
        .min(0)
        .max(1)
        .optional()
        .meta({ description: forTypes(['header'], 'From 0 to 1. Defaults to 0.5.') }),
      headerTextColor: z
        .string()
        .optional()
        .meta({ description: forTypes(['header'], 'Hex color.') }),
      galleryLayout: z
        .enum(['standard', 'grid', 'info', 'custom'])
        .optional()
        .meta({ description: forTypes(['gallery']) }),
      videoEmbedId: z
        .string()
        .optional()
        .meta({ description: forTypes(['video'], 'ID of the video at the provider.') }),
      videoEmbedType: z
        .enum(['youtube', 'vimeo', 'vimeo-event', 'facebook', 'twitch'])
        .optional()
        .meta({ description: forTypes(['video']) }),
      videoEmbedVimeoChat: z
        .boolean()
        .optional()
        .meta({ description: forTypes(['video']) }),
      videoLayout: z
        .enum(['block', 'block-large', 'theater'])
        .optional()
        .meta({ description: forTypes(['video']) }),
      speakersLayout: z
        .enum(['standard', 'grid', 'full', 'preview', 'custom'])
        .optional()
        .meta({ description: forTypes(['speakers']) }),
      speakersShowSelected: z
        .boolean()
        .optional()
        .meta({ description: forTypes(['speakers'], 'Only show speakers in speakersSettings.') }),
      speakersSettings: z
        .array(speakersSettingSchema)
        .optional()
        .meta({ description: forTypes(['speakers'], 'Speakers to show, in order.') }),
      focusOn: z
        .enum(['speaker', 'talk'])
        .optional()
        .meta({ description: forTypes(['speakers']) }),
      speakersPagePath: z
        .string()
        .optional()
        .meta({ description: forTypes(['speakers', 'schedule']) }),
      schedulePagePath: z
        .string()
        .optional()
        .meta({ description: forTypes(['speakers']) }),
      organisersLayout: z
        .enum(['standard', 'minimal'])
        .optional()
        .meta({ description: forTypes(['organisers']) }),
      showMap: z
        .boolean()
        .optional()
        .meta({ description: forTypes(['location']) }),
      mapStyle: z
        .enum([
          'streets-v4',
          'outdoor-v4',
          'landscape-v4',
          'topo-v4',
          'winter-v4',
          'aquarelle-v4',
          'backdrop-v4',
          'base-v4',
          'dataviz-v4',
          'ocean-v4',
          'openstreetmap',
          'toner-v2',
          'satellite-v4',
          'hybrid-v4',
        ])
        .optional()
        .meta({ description: forTypes(['location']) }),
      mapSize: z
        .enum(['small', 'large'])
        .optional()
        .meta({ description: forTypes(['location']) }),
      countdownType: z
        .enum(['custom', 'event-start-date'])
        .optional()
        .meta({ description: forTypes(['countdown']) }),
      countdownTo: z
        .string()
        .optional()
        .meta({ description: forTypes(['countdown'], 'ISO date, for countdownType custom.') }),
      showPublicCategories: z
        .boolean()
        .optional()
        .meta({ description: forTypes(['mailinglist']) }),
      categoriesTitle: z
        .string()
        .optional()
        .meta({ description: forTypes(['mailinglist']) }),
      liveStreamId: z
        .number()
        .optional()
        .meta({ description: forTypes(['live']) }),
      liveStreamMode: z
        .enum(['block', 'theater'])
        .optional()
        .meta({ description: forTypes(['live']) }),
      organisationEventsLayout: z
        .enum(['standard', 'grid-layout'])
        .optional()
        .meta({ description: forTypes(['organisation-events']) }),
      organisationEventsSelection: z
        .enum(['all', 'upcoming', 'past'])
        .optional()
        .meta({ description: forTypes(['organisation-events']) }),
    }),
  )
  .optional()
  .meta({
    label: 'Content',
    description:
      'Fields without Types apply to all block types. On update, send the full object; it replaces the current content.',
  })

export const BlockCreateSchema = z.object({
  type: z.enum(blockTypes).meta({
    label: 'Block Type',
    description: 'Prefer standard types; custom (raw HTML) is a last resort.',
  }),
  status: z.enum(blockStatuses).meta({ label: 'Status', description: 'Block visibility status.' }),
  order: z.number().optional().meta({ label: 'Order' }),
  content: blockContentSchema,
  blockLinkId: z.number().nullish().meta({
    label: 'Linked block',
    description:
      'Types: link. ID of the block to show, from this workspace or its events (see get_event with pages.blocks). null removes the link.',
  }),
  pageId: z.number().optional().meta({ label: 'Page Id' }),
  eventId: z.number().optional().meta({ label: 'Event Id' }),
  workspaceId: z.number().optional().meta({ label: 'Workspace Id' }),
  categoryIds: z.array(z.number()).optional().meta({ label: 'Categories' }),
})

export const BlockUpdateSchema = z.object({
  type: z.enum(blockTypes).optional().meta({
    label: 'Block Type',
    description: 'Prefer standard types; custom (raw HTML) is a last resort.',
  }),
  status: z.enum(blockStatuses).optional().meta({ label: 'Status', description: 'Block visibility status.' }),
  order: z.number().optional().meta({ label: 'Order' }),
  content: blockContentSchema,
  blockLinkId: z.number().nullish().meta({
    label: 'Linked block',
    description:
      'Types: link. ID of the block to show, from this workspace or its events (see get_event with pages.blocks). null removes the link.',
  }),
  categoryIds: z.array(z.number()).optional().meta({ label: 'Categories' }),
})

const blocksFindAllSchema = {
  filter: z
    .object({
      pageId: z.number().optional(),
      eventId: z.number().optional(),
    })
    .optional(),
  sort: z.never().optional(),
  include: z.array(z.enum(['images'])).optional(),
}

export const blocksFindAllOptionsSchema = baseFindAllOptionsSchema.extend(blocksFindAllSchema)
export const blocksFindOptionsSchema = findBaseOptionsSchema.extend({})

export const staticBlocksFindAllOptionsSchema = staticBaseFindAllOptionsSchema.extend(blocksFindAllSchema)
export const staticBlocksFindOptionsSchema = staticBaseFindOptionsSchema.extend({})
export const staticBlocksCreateOptionsSchema = staticBaseFindAllOptionsSchema.extend({})
export const staticBlocksUpdateOptionsSchema = staticBaseFindAllOptionsSchema.extend({})

export type Block = z.infer<typeof BlockSchema>
export type BlockCreate = z.infer<typeof BlockCreateSchema>
export type BlockCreateData = BlockCreate
export type BlockUpdate = z.infer<typeof BlockUpdateSchema>
export type BlockUpdateData = BlockUpdate
export type BlocksFindAllOptions = z.infer<typeof blocksFindAllOptionsSchema>
export type BlocksFindOptions = z.infer<typeof blocksFindOptionsSchema>
export type BlocksCreateOptions = z.infer<typeof baseOptionsSchema>
export type BlocksUpdateOptions = z.infer<typeof baseOptionsSchema>
export type StaticBlocksFindAllOptions = z.infer<typeof staticBlocksFindAllOptionsSchema>
export type StaticBlocksFindOptions = z.infer<typeof staticBlocksFindOptionsSchema>
export type StaticBlocksCreateOptions = z.infer<typeof staticBlocksCreateOptionsSchema>
export type StaticBlocksUpdateOptions = z.infer<typeof staticBlocksUpdateOptionsSchema>
