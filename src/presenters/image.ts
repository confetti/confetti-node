import { PresenterOptions, ImagePresenter } from '../types/presenters.js'
import { Image } from '../types/models.js'

type ImageInput = Image & {
  imageType?: string
  blockId?: number
  eventId?: number
  workspaceId?: number
}

type ImageOutput = Image & {
  block?: { id: number }
  event?: { id: number }
  workspace?: { id: number }
}

export default function ({ presenters, Presenter }: PresenterOptions): ImagePresenter {
  class ImagePresenterClass extends Presenter {
    static type = 'image' as const
    static plural = 'images' as const

    attributes(image: ImageInput): ImageOutput {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/consistent-type-assertions
      const data = image as any
      // The public API exposes the image kind as `imageType` (because `type`
      // collides with the JSON:API resource type). Rename it back for the
      // admin API.
      if (data.imageType !== undefined) {
        data.type = data.imageType
        delete data.imageType
      }
      if (data.blockId) {
        data.block = { id: data.blockId }
        delete data.blockId
      }
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
      return s as ImageOutput
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
