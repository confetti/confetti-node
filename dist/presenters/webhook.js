export default function ({ presenters, Presenter }) {
    class WebhookPresenterClass extends Presenter {
        attributes(webhook) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const webhookData = webhook;
            if (webhookData.eventId) {
                webhookData.event = {
                    id: webhookData.eventId,
                };
                delete webhookData.eventId;
            }
            if (webhookData.workspaceId) {
                webhookData.workspace = {
                    id: webhookData.workspaceId,
                };
                delete webhookData.workspaceId;
            }
            const s = super.attributes?.(webhookData) || webhookData;
            return s;
        }
        relationships() {
            return {
                event: presenters.EventPresenter,
                workspace: presenters.WorkspacePresenter,
            };
        }
    }
    WebhookPresenterClass.type = 'webhook';
    WebhookPresenterClass.plural = 'webhooks';
    return WebhookPresenterClass;
}
