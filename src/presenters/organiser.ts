import { PresenterOptions, OrganiserPresenter } from '../types/presenters.js'
import { Organiser } from '../types/models.js'

type OrganiserData = Omit<Organiser, 'eventId' | 'imageId'> & {
  eventId?: number
  imageId?: number
  event?: { id: number }
  image?: { id: number }
}

export default function ({ presenters, Presenter }: PresenterOptions): OrganiserPresenter {
  class OrganiserPresenterClass extends Presenter {
    static type = 'organiser' as const
    static plural = 'organisers' as const

    attributes(organiser: OrganiserData): Record<string, unknown> {
      if (organiser.eventId != null) {
        organiser.event = { id: organiser.eventId }
        delete organiser.eventId
      }
      if (organiser.imageId != null) {
        organiser.image = { id: organiser.imageId }
        delete organiser.imageId
      }
      return super.attributes?.(organiser) ?? organiser
    }

    relationships() {
      return {
        event: presenters.EventPresenter,
        image: presenters.ImagePresenter,
      }
    }
  }

  return OrganiserPresenterClass
}
