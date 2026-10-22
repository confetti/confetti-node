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
  'message-button',
] as const

const blockStatuses = ['published', 'preview', 'deleted', 'hidden'] as const

const blockContentDescription = [
  'Block content object. ONLY use fields listed for the specific type — unknown fields are silently stripped.',
  '',
  'Shared fields (all types): name, cssClassName, theme (primary|inverted|secondary|custom), style (spacing object with spacing/spacingTop/spacingBottom each: small|medium|large|custom), blockStyleSettings (colors/fonts/css/effects), includeTickets (bool), filterTicketBatches (number[]), url.',
  '',
  'Type-specific fields:',
  '- text: html, textLayout (text-only|image-left|image-right|image-top|image-background|custom), showSocial, showRsvpButton, ctaText, ctaUrl',
  '- header: title, headerStyle (text|logo|none), logoSize, coverStyle (fullscreen|poster|compact), shadowStyle (gradient|grid|none), shadowOpacity, headerTextColor, ctaText, ctaUrl',
  '- gallery: title, html, galleryLayout (standard|grid|info|custom)',
  '- video: videoEmbedId, videoEmbedType (youtube|vimeo|vimeo-event|facebook|twitch), videoEmbedVimeoChat, videoLayout (block|block-large|theater)',
  '- speakers: title, speakersLayout (standard|grid|full|preview|custom), speakersShowSelected, speakersSettings ({id, order, show, isAnnounced?}[]), focusOn (speaker|talk), speakersPagePath, schedulePagePath',
  '- schedule: title, speakersPagePath',
  '- organisers: title, organisersLayout (standard|minimal)',
  '- location: html, showMap, showRsvpButton',
  '- countdown: title, countdownType (custom|event-start-date), countdownTo (ISO date string)',
  '- mailinglist: title, showPublicCategories, categoriesTitle',
  '- live: liveStreamId, liveStreamMode (block|theater)',
  '- custom: html',
  '- organisation-events: title, organisationEventsLayout (standard|grid-layout), organisationEventsSelection (all|upcoming|past)',
  '- message-text: html (required)',
  '- message-button: title (button text, required), url (required). Not ctaText/ctaUrl.',
  '- message-image: shared fields only. Attach the picture with create_image (blockId and workspaceId); without an image the block is removed when the message is saved in the dashboard.',
  '- sponsors, menu-organisation, link: shared fields only',
  '',
  'When updating, provide the complete content object — partial content replaces the entire content.',
].join('\n')

const requiredMessageBlockContent: Partial<Record<(typeof blockTypes)[number], string[]>> = {
  'message-text': ['html'],
  'message-button': ['title', 'url'],
}

// The API drops content fields a block type doesn't know, so a message block with the wrong
// fields would be saved empty instead of failing.
function checkMessageBlockContent(
  block: { type?: (typeof blockTypes)[number]; content?: Record<string, unknown> },
  ctx: z.RefinementCtx,
): void {
  const required = block.type ? requiredMessageBlockContent[block.type] : undefined
  if (!required || block.content === undefined) return
  for (const key of required) {
    const value = block.content[key]
    if (typeof value !== 'string' || value.trim() === '') {
      ctx.addIssue({
        code: 'custom',
        path: ['content', key],
        message: `${block.type} blocks need content.${key} (fields: ${required.join(', ')})`,
      })
    }
  }
}

export const BlockCreateSchema = z
  .object({
    type: z
      .enum(blockTypes)
      .meta({ label: 'Block Type', description: 'The type of block. Determines which content fields are valid.' }),
    status: z.enum(blockStatuses).meta({ label: 'Status', description: 'Block visibility status.' }),
    slug: z.string().optional().meta({ label: 'Slug' }),
    order: z.number().optional().meta({ label: 'Order' }),
    content: z.looseObject({}).optional().meta({ label: 'Content', description: blockContentDescription }),
    blockStyleId: z.number().optional().meta({ label: 'Block Style Id' }),
    pageId: z.number().optional().meta({ label: 'Page Id' }),
    messageId: z.number().optional().meta({
      label: 'Message Id',
      description:
        'Workspace message the block belongs to, shown below the body in order. Use the message-text, message-image and message-button types and set workspaceId too. Event messages do not support blocks.',
    }),
    eventId: z.number().optional().meta({ label: 'Event Id' }),
    workspaceId: z.number().optional().meta({ label: 'Workspace Id' }),
    categoryIds: z.array(z.number()).optional().meta({ label: 'Categories' }),
  })
  .superRefine(checkMessageBlockContent)

export const BlockUpdateSchema = z
  .object({
    type: z
      .enum(blockTypes)
      .optional()
      .meta({ label: 'Block Type', description: 'The type of block. Determines which content fields are valid.' }),
    status: z.enum(blockStatuses).optional().meta({ label: 'Status', description: 'Block visibility status.' }),
    slug: z.string().optional().meta({ label: 'Slug' }),
    order: z.number().optional().meta({ label: 'Order' }),
    content: z.looseObject({}).optional().meta({ label: 'Content', description: blockContentDescription }),
    blockStyleId: z.number().optional().meta({ label: 'Block Style Id' }),
    pageId: z.number().optional().meta({ label: 'Page Id' }),
    messageId: z.number().optional().meta({
      label: 'Message Id',
      description:
        'Workspace message the block belongs to, shown below the body in order. Use the message-text, message-image and message-button types and set workspaceId too. Event messages do not support blocks.',
    }),
    eventId: z.number().optional().meta({ label: 'Event Id' }),
    workspaceId: z.number().optional().meta({ label: 'Workspace Id' }),
    categoryIds: z.array(z.number()).optional().meta({ label: 'Categories' }),
  })
  .superRefine(checkMessageBlockContent)

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
