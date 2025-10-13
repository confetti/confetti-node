import { PresenterOptions, TicketBatchPresenter } from '../types/presenters.js'

export default function ({ Presenter }: PresenterOptions): TicketBatchPresenter {
  class TicketBatchPresenterClass extends Presenter {}

  TicketBatchPresenterClass.type = 'ticketBatch'
  TicketBatchPresenterClass.plural = 'ticketBatches'

  return TicketBatchPresenterClass as unknown as TicketBatchPresenter
}
