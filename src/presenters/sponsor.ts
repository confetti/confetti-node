import { PresenterOptions, SponsorPresenter } from '../types/presenters.js'
import { Sponsor } from '../types/models.js'

type SponsorData = Omit<Sponsor, 'sponsorLevelId' | 'imageId'> & {
  sponsorLevelId?: number
  imageId?: number
  sponsorLevel?: { id: number }
  image?: { id: number }
}

export default function ({ presenters, Presenter }: PresenterOptions): SponsorPresenter {
  class SponsorPresenterClass extends Presenter {
    static type = 'sponsor' as const
    static plural = 'sponsors' as const

    attributes(sponsor: SponsorData): Record<string, unknown> {
      if (sponsor.sponsorLevelId != null) {
        sponsor.sponsorLevel = { id: sponsor.sponsorLevelId }
        delete sponsor.sponsorLevelId
      }
      if (sponsor.imageId != null) {
        sponsor.image = { id: sponsor.imageId }
        delete sponsor.imageId
      }
      return super.attributes?.(sponsor) ?? sponsor
    }

    relationships() {
      return {
        sponsorLevel: presenters.SponsorLevelPresenter,
        image: presenters.ImagePresenter,
      }
    }
  }

  return SponsorPresenterClass
}
