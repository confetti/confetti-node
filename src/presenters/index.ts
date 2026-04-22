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
import pagePresenter from './page.js'
import blockPresenter from './block.js'
import imagePresenter from './image.js'
import formPresenter from './form.js'
import formFieldPresenter from './form-field.js'
import speakerPresenter from './speaker.js'
import organiserPresenter from './organiser.js'
import scheduleItemPresenter from './schedule-item.js'
import sponsorPresenter from './sponsor.js'
import sponsorLevelPresenter from './sponsor-level.js'

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

const PagePresenter = pagePresenter({ presenters, Presenter })
const BlockPresenter = blockPresenter({ presenters, Presenter })
const ImagePresenter = imagePresenter({ presenters, Presenter })
const FormPresenter = formPresenter({ presenters, Presenter })
const FormFieldPresenter = formFieldPresenter({ presenters, Presenter })
const SpeakerPresenter = speakerPresenter({ presenters, Presenter })
const OrganiserPresenter = organiserPresenter({ presenters, Presenter })
const ScheduleItemPresenter = scheduleItemPresenter({ presenters, Presenter })
const SponsorLevelPresenter = sponsorLevelPresenter({ presenters, Presenter })
const SponsorPresenter = sponsorPresenter({ presenters, Presenter })

presenters.WebhookPresenter = WebhookPresenter
presenters.EventPresenter = EventPresenter
presenters.WorkspacePresenter = WorkspacePresenter
presenters.ContactPresenter = ContactPresenter
presenters.TicketPresenter = TicketPresenter
presenters.CategoryPresenter = CategoryPresenter
presenters.TicketBatchPresenter = TicketBatchPresenter
presenters.PaymentPresenter = PaymentPresenter
presenters.AddonPresenter = AddonPresenter
presenters.PagePresenter = PagePresenter
presenters.BlockPresenter = BlockPresenter
presenters.ImagePresenter = ImagePresenter
presenters.FormPresenter = FormPresenter
presenters.FormFieldPresenter = FormFieldPresenter
presenters.SpeakerPresenter = SpeakerPresenter
presenters.OrganiserPresenter = OrganiserPresenter
presenters.ScheduleItemPresenter = ScheduleItemPresenter
presenters.SponsorLevelPresenter = SponsorLevelPresenter
presenters.SponsorPresenter = SponsorPresenter

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
  pages: PagePresenter,
  blocks: BlockPresenter,
  images: ImagePresenter,
  forms: FormPresenter,
  formFields: FormFieldPresenter,
  speakers: SpeakerPresenter,
  organisers: OrganiserPresenter,
  scheduleItems: ScheduleItemPresenter,
  sponsors: SponsorPresenter,
  sponsorLevels: SponsorLevelPresenter,
}

export default presentersCollection
