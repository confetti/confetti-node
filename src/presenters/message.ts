import { PresenterOptions, MessagePresenter } from '../types/presenters.js'
import { Message } from '../types/models.js'

type MessageData = Omit<Message, 'eventId' | 'workspaceId' | 'imageId'> & {
  eventId?: number | null
  workspaceId?: number | null
  imageId?: number | null
  event?: { id: number }
  workspace?: { id: number }
  image?: { id: number }
}

export default function ({ presenters, Presenter }: PresenterOptions): MessagePresenter {
  class MessagePresenterClass extends Presenter {
    static type = 'message' as const
    static plural = 'messages' as const

    attributes(message: MessageData): Record<string, unknown> {
      if (message.eventId != null) {
        message.event = { id: message.eventId }
        delete message.eventId
      }
      if (message.workspaceId != null) {
        message.workspace = { id: message.workspaceId }
        delete message.workspaceId
      }
      if (message.imageId != null) {
        message.image = { id: message.imageId }
        delete message.imageId
      }
      return super.attributes?.(message) ?? message
    }

    relationships() {
      return {
        event: presenters.EventPresenter,
        workspace: presenters.WorkspacePresenter,
        image: presenters.ImagePresenter,
      }
    }
  }

  return MessagePresenterClass
}
