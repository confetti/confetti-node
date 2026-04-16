import { PresenterOptions, ImagePresenter } from '../types/presenters.js'
import { Image } from '../types/models.js'

type ImageData = Image & {
  imageType?: string
  blockId?: number
  eventId?: number
  workspaceId?: number
  block?: { id: number }
  event?: { id: number }
  workspace?: { id: number }
}

export default function ({ presenters, Presenter }: PresenterOptions): ImagePresenter {
  class ImagePresenterClass extends Presenter {
    static type = 'image' as const
    static plural = 'images' as const

    attributes(image: ImageData): Record<string, unknown> {
      // The public API exposes the image kind as `imageType` (because `type`
      // collides with the JSON:API resource type). Rename it back for the
      // admin API.
      if (image.imageType !== undefined) {
        image.type = image.imageType
        delete image.imageType
      }
      if (image.blockId != null) {
        image.block = { id: image.blockId }
        delete image.blockId
      }
      if (image.eventId != null) {
        image.event = { id: image.eventId }
        delete image.eventId
      }
      if (image.workspaceId != null) {
        image.workspace = { id: image.workspaceId }
        delete image.workspaceId
      }
      return super.attributes?.(image) ?? image
    }

    relationships() {
      return {
        block: presenters.BlockPresenter,
        event: presenters.EventPresenter,
        workspace: presenters.WorkspacePresenter,
      }
    }
  }

  return ImagePresenterClass
}
