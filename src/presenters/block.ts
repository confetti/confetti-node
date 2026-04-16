import { PresenterOptions, BlockPresenter } from '../types/presenters.js'
import { Block } from '../types/models.js'

type BlockData = Block & {
  blockType?: string
  pageId?: number
  eventId?: number
  workspaceId?: number
  categoryIds?: number[]
  page?: { id: number }
  event?: { id: number }
  workspace?: { id: number }
  categories?: { id: number }[]
}

export default function ({ presenters, Presenter }: PresenterOptions): BlockPresenter {
  class BlockPresenterClass extends Presenter {
    static type = 'block' as const
    static plural = 'blocks' as const

    attributes(block: BlockData): Record<string, unknown> {
      // The public API exposes the block kind as `blockType` (because `type`
      // collides with the JSON:API resource type). The admin API expects it
      // back under `type`.
      if (block.blockType !== undefined) {
        block.type = block.blockType
        delete block.blockType
      }
      if (block.pageId != null) {
        block.page = { id: block.pageId }
        delete block.pageId
      }
      if (block.eventId != null) {
        block.event = { id: block.eventId }
        delete block.eventId
      }
      if (block.workspaceId != null) {
        block.workspace = { id: block.workspaceId }
        delete block.workspaceId
      }
      if (block.categoryIds?.length) {
        block.categories = block.categoryIds.map((id) => ({ id }))
        delete block.categoryIds
      }
      return super.attributes?.(block) ?? block
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
