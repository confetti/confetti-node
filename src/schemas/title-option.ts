import { z } from 'zod'

export const TitleModeSchema = z.enum(['default', 'custom', 'off']).meta({
  label: 'Title mode',
  values: ['default', 'custom', 'off'],
})

export const TitleOptionSchema = z.object({
  title: z.string().nullable().meta({
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

export type TitleMode = z.infer<typeof TitleModeSchema>
export type TitleOption = z.infer<typeof TitleOptionSchema>
