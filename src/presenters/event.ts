import { PresenterOptions, EventPresenter } from '../types/presenters.js'

export default function ({ Presenter }: PresenterOptions): EventPresenter {
  class EventPresenterClass extends Presenter {}

  EventPresenterClass.type = 'event'
  EventPresenterClass.plural = 'events'

  return EventPresenterClass as unknown as EventPresenter
}
