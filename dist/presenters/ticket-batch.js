export default function ({ Presenter }) {
    class TicketBatchPresenterClass extends Presenter {
    }
    TicketBatchPresenterClass.type = 'ticketBatch';
    TicketBatchPresenterClass.plural = 'ticketBatches';
    return TicketBatchPresenterClass;
}
