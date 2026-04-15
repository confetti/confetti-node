import { PresenterOptions, BlockPresenter } from '../types/presenters.js'
import { Block } from '../types/models.js'

type BlockInput = Block & {
  blockType?: string
  pageId?: number
  eventId?: number
  workspaceId?: number
  categoryIds?: number[]
}

type BlockOutput = Block & {
  page?: { id: number }
  event?: { id: number }
  workspace?: { id: number }
  categories?: { id: number }[]
}

export default function ({ presenters, Presenter }: PresenterOptions): BlockPresenter {
  class BlockPresenterClass extends Presenter {
    static type = 'block' as const
    static plural = 'blocks' as const

    attributes(block: BlockInput): BlockOutput {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/consistent-type-assertions
      const data = block as any
      // The public API exposes the block kind as `blockType` (because `type`
      // collides with the JSON:API resource type). The admin API expects it
      // back under `type`.
      if (data.blockType !== undefined) {
        data.type = data.blockType
        delete data.blockType
      }
      if (data.pageId) {
        data.page = { id: data.pageId }
        delete data.pageId
      }
      if (data.eventId) {
        data.event = { id: data.eventId }
        delete data.eventId
      }
      if (data.workspaceId) {
        data.workspace = { id: data.workspaceId }
        delete data.workspaceId
      }
      if (data.categoryIds?.length) {
        data.categories = data.categoryIds.map((id: number) => ({ id }))
        delete data.categoryIds
      }
      const s = super.attributes?.(data) || data
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      return s as BlockOutput
    }

    relationships() {
      return {
        page: presenters.PagePresenter,
        event: presenters.EventPresenter,
        workspace: presenters.WorkspacePresenter,
        images: presenters.ImagePresenter,
        categories: presenters.CategoryPresenter,
      }
    }
  }

  return BlockPresenterClass
}
