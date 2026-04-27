import { PresenterOptions, ContactPresenter } from '../types/presenters.js'
import { Contact } from '../types/models.js'

type ContactData = Contact & {
  workspaceId?: number
  categoryIds?: number[]
  workspace?: { id: number }
  categories?: { id: number }[]
}

export default function ({ presenters, Presenter }: PresenterOptions): ContactPresenter {
  class ContactPresenterClass extends Presenter {
    static type = 'contact' as const
    static plural = 'contacts' as const

    attributes(contact: ContactData): Record<string, unknown> {
      if (contact.workspaceId != null) {
        contact.workspace = { id: contact.workspaceId }
        delete contact.workspaceId
      }
      if (contact.categoryIds?.length) {
        contact.categories = contact.categoryIds.map((id) => ({ id }))
        delete contact.categoryIds
      }
      return super.attributes?.(contact) ?? contact
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
