import { PresenterOptions, SpeakerPresenter } from '../types/presenters.js'
import { Speaker } from '../types/models.js'

type SpeakerData = Omit<Speaker, 'eventId' | 'imageId'> & {
  eventId?: number
  imageId?: number
  event?: { id: number }
  image?: { id: number }
}

export default function ({ presenters, Presenter }: PresenterOptions): SpeakerPresenter {
  class SpeakerPresenterClass extends Presenter {
    static type = 'speaker' as const
    static plural = 'speakers' as const

    attributes(speaker: SpeakerData): Record<string, unknown> {
      if (speaker.eventId != null) {
        speaker.event = { id: speaker.eventId }
        delete speaker.eventId
      }
      if (speaker.imageId != null) {
        speaker.image = { id: speaker.imageId }
        delete speaker.imageId
      }
      return super.attributes?.(speaker) ?? speaker
    }

    relationships() {
      return {
        event: presenters.EventPresenter,
        image: presenters.ImagePresenter,
      }
    }
  }

  return SpeakerPresenterClass
}
