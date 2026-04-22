import { PresenterOptions, ScheduleItemPresenter } from '../types/presenters.js'
import { ScheduleItem } from '../types/models.js'

type ScheduleItemData = Omit<ScheduleItem, 'eventId'> & {
  eventId?: number
  event?: { id: number }
}

export default function ({ presenters, Presenter }: PresenterOptions): ScheduleItemPresenter {
  class ScheduleItemPresenterClass extends Presenter {
    static type = 'scheduleItem' as const
    static plural = 'scheduleItems' as const

    attributes(scheduleItem: ScheduleItemData): Record<string, unknown> {
      if (scheduleItem.eventId != null) {
        scheduleItem.event = { id: scheduleItem.eventId }
        delete scheduleItem.eventId
      }
      return super.attributes?.(scheduleItem) ?? scheduleItem
    }

    relationships() {
      return {
        event: presenters.EventPresenter,
      }
    }
  }

  return ScheduleItemPresenterClass
}
