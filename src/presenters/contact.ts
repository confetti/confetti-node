import { PresenterOptions, ContactPresenter } from '../types/presenters.js'
import { Contact } from '../types/models.js'

type ContactInput = Contact & {
  workspaceId?: number
  categoryIds?: number[]
}

type ContactOutput = Contact & {
  workspace?: { id: number }
  categories?: { id: number }[]
}

export default function ({ presenters, Presenter }: PresenterOptions): ContactPresenter {
  class ContactPresenterClass extends Presenter {
    static type = 'contact' as const
    static plural = 'contacts' as const

    attributes(contact: ContactInput): ContactOutput {
      const { workspaceId, categoryIds, ...rest } = contact
      const baseResult = super.attributes?.(rest) || rest
      return {
        ...baseResult,
        ...(workspaceId && { workspace: { id: workspaceId } }),
        ...(categoryIds?.length && {
          categories: categoryIds.map((id) => ({ id })),
        }),
      } satisfies ContactOutput
    }

    relationships() {
      return {
        workspace: presenters.WorkspacePresenter,
        categories: presenters.CategoryPresenter,
      }
    }
  }

  return ContactPresenterClass
}
