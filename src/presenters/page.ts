import { PresenterOptions, PagePresenter } from '../types/presenters.js'
import { Page } from '../types/models.js'

type PageData = Page & {
  eventId?: number
  workspaceId?: number
  event?: { id: number }
  workspace?: { id: number }
}

export default function ({ presenters, Presenter }: PresenterOptions): PagePresenter {
  class PagePresenterClass extends Presenter {
    static type = 'page' as const
    static plural = 'pages' as const

    attributes(page: PageData): Record<string, unknown> {
      if (page.eventId != null) {
        page.event = { id: page.eventId }
        delete page.eventId
      }
      if (page.workspaceId != null) {
        page.workspace = { id: page.workspaceId }
        delete page.workspaceId
      }
      return super.attributes?.(page) ?? page
    }

    relationships() {
      return {
        event: presenters.EventPresenter,
        workspace: presenters.WorkspacePresenter,
      }
    }
  }

  return PagePresenterClass
}
