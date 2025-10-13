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
    attributes(webhook: WebhookInput): WebhookOutput {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const webhookData = webhook as any
      if (webhookData.eventId) {
        webhookData.event = {
          id: webhookData.eventId,
        }
        delete webhookData.eventId
      }
      if (webhookData.workspaceId) {
        webhookData.workspace = {
          id: webhookData.workspaceId,
        }
        delete webhookData.workspaceId
      }
      const s = super.attributes?.(webhookData) || webhookData
      return s as unknown as WebhookOutput
    }

    relationships() {
      return {
        event: presenters.EventPresenter,
        workspace: presenters.WorkspacePresenter,
      }
    }
  }

  WebhookPresenterClass.type = 'webhook'
  WebhookPresenterClass.plural = 'webhooks'

  return WebhookPresenterClass as unknown as WebhookPresenter
}
