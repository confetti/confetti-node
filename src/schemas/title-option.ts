import { z } from 'zod'

export const TitleModeSchema = z.enum(['default', 'custom', 'off']).meta({
  label: 'Title mode',
  values: ['default', 'custom', 'off'],
})

export const TitleOptionSchema = z
  .object({
    id: z.string().optional().meta({
      label: 'ID',
      description: 'Stable identifier used to preserve an option across edits.',
    }),
    title: z.string().nullable().optional().meta({
      label: 'Title',
      description: 'Formal title shown to attendees, such as Mr, Ms, Mx, or Dr. Null represents no title.',
    }),
    greeting: z.string().meta({
      label: 'Greeting',
      description: 'Localized greeting used in email and SMS templates for this title.',
    }),
    isDefault: z.boolean().optional().meta({
      label: 'Default',
      description: 'Whether this title option is selected by default.',
    }),
    isHidden: z.boolean().optional().meta({
      label: 'Hidden',
      description: 'Whether this title option is hidden from new selections while preserved for existing tickets.',
    }),
  })
  .refine((option) => option.isDefault || (typeof option.title === 'string' && option.title.trim().length > 0), {
    message: 'Must be a non-empty string.',
    path: ['title'],
  })

export type TitleMode = z.infer<typeof TitleModeSchema>
export type TitleOption = z.infer<typeof TitleOptionSchema>
