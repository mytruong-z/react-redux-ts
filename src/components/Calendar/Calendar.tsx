import React, { useEffect } from 'react';
import './Calendar.css';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../redux/store';
import { selectRecorderState } from '../../redux/recorder';
import { selectUserEventsArray, loadUserEvents, UserEvent } from '../../redux/user-events';
import { addZero } from '../../lib/utils';
import EventItem from './EventItem';

const mapState = (state: RootState) => ({
    events: selectUserEventsArray(state)
});

const mapDispatch = {
    loadUserEvents
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux { }

const createDateKey = (date: Date) => {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    return `${year}-${addZero(month)}-${addZero(day)}`;
}

const groupEventsByDay = (events: UserEvent[]) => {
    const groups: Record<string, UserEvent[]> = {};

    const adddToGroup = (dateKey: string, event: UserEvent) => {
        if (groups[dateKey] === undefined) {
            groups[dateKey] = [];
        }
        groups[dateKey].push(event);
    }

    events.forEach(event => {
        const dateStartKey = createDateKey(new Date(event.dateStart));
        const dateEndKey = createDateKey(new Date(event.dateEnd));
        adddToGroup(dateStartKey, event);
        if (dateEndKey !== dateStartKey) {
            adddToGroup(dateEndKey, event);
        }
    });
    return groups;
};

const Calendar: React.FC<Props> = ({ events, loadUserEvents }) => {
    useEffect(() => {
        loadUserEvents();
    }, []);

    let groupedEvents: ReturnType<typeof groupEventsByDay> | undefined;
    let sortedGroupKeys: string[] | undefined;

    if(events !== undefined) {
        if (events.length) {
            groupedEvents = groupEventsByDay(events);
            sortedGroupKeys = Object.keys(groupedEvents).sort(
                (date1, date2) => +new Date(date2) - +new Date(date1)
            );
        }
    }

    return groupedEvents && sortedGroupKeys ? (
        <div className="calendar"> {
            sortedGroupKeys.map((dayKey, index) => {
                const events = groupedEvents ? groupedEvents[dayKey] : [];
                const groupDate = new Date(dayKey);
                const day = groupDate.getDate();
                const month = groupDate.toLocaleString(undefined, { month: 'long' });
                return (
                    <div key={index} className="calendar-day">
                        <div className="calendar-day-label">
                            <span>{day} {month}</span>
                        </div>
                        {events.map(event => {
                            return <EventItem key={`event_${event.id}`} event={event} />
                        })}
                    </div>
                )
            })
        }
        </div>

    ) : <p>Loading ...</p>
};
export default connector(Calendar);