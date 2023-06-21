module.exports = function ({ presenters, Presenter }) {
  class TicketBatchPresenter extends Presenter {}
  TicketBatchPresenter.prototype.type = 'ticketBatch'
  TicketBatchPresenter.prototype.plural = 'ticketBatches'
  return TicketBatchPresenter
}
