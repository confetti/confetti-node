export default function ({ presenters, Presenter }) {
    class TicketPresenterClass extends Presenter {
        attributes(ticket) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const ticketData = ticket;
            if (ticketData.eventId) {
                ticketData.event = {
                    id: ticketData.eventId,
                };
                delete ticketData.eventId;
            }
            if (ticketData.ticketBatchId) {
                ticketData.ticketBatch = {
                    id: ticketData.ticketBatchId,
                };
                delete ticketData.ticketBatchId;
            }
            if (ticketData.sendEmailConfirmation !== undefined) {
                ticketData.meta = {
                    sendEmailConfirmation: ticketData.sendEmailConfirmation,
                };
            }
            delete ticketData.sendEmailConfirmation;
            const s = super.attributes?.(ticketData) || ticketData;
            return s;
        }
        relationships() {
            return {
                event: presenters.EventPresenter,
                ticketBatch: presenters.TicketBatchPresenter,
            };
        }
    }
    TicketPresenterClass.type = 'ticket';
    TicketPresenterClass.plural = 'tickets';
    return TicketPresenterClass;
}
