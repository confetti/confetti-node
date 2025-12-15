import { PresenterOptions, EventPresenter } from '../types/presenters.js'

export default function ({ Presenter }: PresenterOptions): EventPresenter {
  class EventPresenterClass extends Presenter {
    static type = 'event' as const
    static plural = 'events' as const
  }

  return EventPresenterClass
}
