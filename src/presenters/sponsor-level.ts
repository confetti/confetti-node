import { PresenterOptions, SponsorLevelPresenter } from '../types/presenters.js'
import { SponsorLevel } from '../types/models.js'

type SponsorLevelData = Omit<SponsorLevel, 'eventId'> & {
  eventId?: number
  event?: { id: number }
}

export default function ({ presenters, Presenter }: PresenterOptions): SponsorLevelPresenter {
  class SponsorLevelPresenterClass extends Presenter {
    static type = 'sponsorLevel' as const
    static plural = 'sponsorLevels' as const

    attributes(sponsorLevel: SponsorLevelData): Record<string, unknown> {
      if (sponsorLevel.eventId != null) {
        sponsorLevel.event = { id: sponsorLevel.eventId }
        delete sponsorLevel.eventId
      }
      return super.attributes?.(sponsorLevel) ?? sponsorLevel
    }

    relationships() {
      return {
        event: presenters.EventPresenter,
      }
    }
  }

  return SponsorLevelPresenterClass
}
