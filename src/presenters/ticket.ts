import { PresenterOptions, TicketPresenter } from '../types/presenters.js'
import { Ticket } from '../types/models.js'

type TicketInput = Ticket & {
  eventId?: number
  ticketBatchId?: number
  sendEmailConfirmation?: boolean
}

type TicketOutput = Ticket & {
  event?: { id: number }
  ticketBatch?: { id: number }
  meta?: { sendEmailConfirmation: boolean }
}

export default function ({ presenters, Presenter }: PresenterOptions): TicketPresenter {
  class TicketPresenterClass extends Presenter {
    static type = 'ticket' as const
    static plural = 'tickets' as const

    attributes(ticket: TicketInput): TicketOutput {
      const {
        eventId,
        ticketBatchId,
        sendEmailConfirmation,
        ...rest
      } = ticket
      const baseResult = super.attributes?.(rest) || rest
      return {
        ...baseResult,
        ...(eventId && { event: { id: eventId } }),
        ...(ticketBatchId && { ticketBatch: { id: ticketBatchId } }),
        ...(sendEmailConfirmation !== undefined && {
          meta: { sendEmailConfirmation },
        }),
      } satisfies TicketOutput
    }

    relationships() {
      return {
        event: presenters.EventPresenter,
        ticketBatch: presenters.TicketBatchPresenter,
      }
    }
  }

  return TicketPresenterClass
}
