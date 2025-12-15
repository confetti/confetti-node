import { PresenterOptions, TicketBatchPresenter } from '../types/presenters.js'

export default function ({ Presenter }: PresenterOptions): TicketBatchPresenter {
  class TicketBatchPresenterClass extends Presenter {
    static type = 'ticketBatch' as const
    static plural = 'ticketBatches' as const
  }

  return TicketBatchPresenterClass
}
