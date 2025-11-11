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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/consistent-type-assertions
      const contactData = contact as any
      if (contactData.workspaceId) {
        contactData.workspace = {
          id: contactData.workspaceId,
        }
        delete contactData.workspaceId
      }
      if (contactData.categoryIds?.length) {
        contactData.categories = contactData.categoryIds.map((id: number) => ({
          id,
        }))
        delete contactData.categoryIds
      }
      const s = super.attributes?.(contactData) || contactData
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      return s as ContactOutput
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
