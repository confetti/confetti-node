module.exports = function ({ presenters, Presenter }) {
  class EventPresenter extends Presenter {}
  EventPresenter.prototype.type = 'event'
  EventPresenter.prototype.plural = 'events'
  return EventPresenter
}
