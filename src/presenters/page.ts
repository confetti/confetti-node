import { PresenterOptions, PagePresenter } from '../types/presenters.js'
import { Page } from '../types/models.js'

type PageInput = Page & {
  eventId?: number
  workspaceId?: number
}

type PageOutput = Page & {
  event?: { id: number }
  workspace?: { id: number }
}

export default function ({ presenters, Presenter }: PresenterOptions): PagePresenter {
  class PagePresenterClass extends Presenter {
    static type = 'page' as const
    static plural = 'pages' as const

    attributes(page: PageInput): PageOutput {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/consistent-type-assertions
      const data = page as any
      if (data.eventId) {
        data.event = { id: data.eventId }
        delete data.eventId
      }
      if (data.workspaceId) {
        data.workspace = { id: data.workspaceId }
        delete data.workspaceId
      }
      const s = super.attributes?.(data) || data
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      return s as PageOutput
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
