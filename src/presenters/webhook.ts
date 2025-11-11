import { PresenterOptions, WebhookPresenter } from '../types/presenters.js'
import { Webhook } from '../types/models.js'

type WebhookInput = Webhook & {
  eventId?: number
  workspaceId?: number
}

type WebhookOutput = Webhook & {
  event?: { id: number }
  workspace?: { id: number }
}

export default function ({ presenters, Presenter }: PresenterOptions): WebhookPresenter {
  class WebhookPresenterClass extends Presenter {
    static type = 'webhook' as const
    static plural = 'webhooks' as const

    attributes(webhook: WebhookInput): WebhookOutput {
      const { eventId, workspaceId, ...rest } = webhook
      const baseResult = super.attributes?.(rest) || rest
      return {
        ...baseResult,
        ...(eventId && { event: { id: eventId } }),
        ...(workspaceId && { workspace: { id: workspaceId } }),
      } satisfies WebhookOutput
    }

    relationships() {
      return {
        event: presenters.EventPresenter,
        workspace: presenters.WorkspacePresenter,
      }
    }
  }

  return WebhookPresenterClass
}
