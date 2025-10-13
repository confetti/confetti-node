export default function ({ Presenter }) {
    class EventPresenterClass extends Presenter {
    }
    EventPresenterClass.type = 'event';
    EventPresenterClass.plural = 'events';
    return EventPresenterClass;
}
