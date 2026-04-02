import yayson from 'yayson'
import { Presenters, PresentersMap } from '../types/presenters.js'
import webhookPresenter from './webhook.js'
import eventPresenter from './event.js'
import workspacePresenter from './workspace.js'
import contactPresenter from './contact.js'
import ticketPresenter from './ticket.js'
import categoryPresenter from './category.js'
import ticketBatchPresenter from './ticket-batch.js'
import paymentPresenter from './payment.js'
import addonPresenter from './addon.js'

const { Presenter } = yayson()
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const presenters: PresentersMap = {} as PresentersMap

const WebhookPresenter = webhookPresenter({ presenters, Presenter })
const EventPresenter = eventPresenter({ presenters, Presenter })
const WorkspacePresenter = workspacePresenter({
  presenters,
  Presenter,
})
const ContactPresenter = contactPresenter({ presenters, Presenter })
const TicketPresenter = ticketPresenter({ presenters, Presenter })
const CategoryPresenter = categoryPresenter({
  presenters,
  Presenter,
})
const TicketBatchPresenter = ticketBatchPresenter({
  presenters,
  Presenter,
})
const PaymentPresenter = paymentPresenter({
  presenters,
  Presenter,
})

const AddonPresenter = addonPresenter({
  presenters,
  Presenter,
})

presenters.WebhookPresenter = WebhookPresenter
presenters.EventPresenter = EventPresenter
presenters.WorkspacePresenter = WorkspacePresenter
presenters.ContactPresenter = ContactPresenter
presenters.TicketPresenter = TicketPresenter
presenters.CategoryPresenter = CategoryPresenter
presenters.TicketBatchPresenter = TicketBatchPresenter
presenters.PaymentPresenter = PaymentPresenter
presenters.AddonPresenter = AddonPresenter

const presentersCollection: Presenters = {
  webhooks: WebhookPresenter,
  events: EventPresenter,
  workspaces: WorkspacePresenter,
  contacts: ContactPresenter,
  tickets: TicketPresenter,
  ticketBatches: TicketBatchPresenter,
  categories: CategoryPresenter,
  payments: PaymentPresenter,
  addons: AddonPresenter,
}

export default presentersCollection
