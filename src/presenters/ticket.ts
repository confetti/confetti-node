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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ticketData = ticket as any
      if (ticketData.eventId) {
        ticketData.event = {
          id: ticketData.eventId,
        }
        delete ticketData.eventId
      }
      if (ticketData.ticketBatchId) {
        ticketData.ticketBatch = {
          id: ticketData.ticketBatchId,
        }
        delete ticketData.ticketBatchId
      }

      if (ticketData.sendEmailConfirmation !== undefined) {
        ticketData.meta = {
          sendEmailConfirmation: ticketData.sendEmailConfirmation,
        }
      }
      delete ticketData.sendEmailConfirmation

      const s = super.attributes?.(ticketData) || ticketData
      return s as unknown as TicketOutput
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
