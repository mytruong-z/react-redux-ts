import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUserEvent, UserEvent, updateUserEvent } from '../../redux/user-events';

interface Props {
    event: UserEvent
}

const EventItem: React.FC<Props> = ({ event }) => {
    const dispatch = useDispatch();
    const [editable, setEditable] = useState(false);
    const handleDeleteClick = () => {
        dispatch(deleteUserEvent(event.id))
    };
    const handleTitleClick = () => {
        setEditable(true);
    }
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (editable) {
            inputRef.current?.focus();
        }
    }, [editable]);

    const [title, setTitle] = useState(event.title);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }
    const handleBlur = () => {
        setEditable(false);
        dispatch(updateUserEvent({
            ...event, 
            title
        }))
    }

    return (
        <div className="calendar-events">
            <div className="calendar-event">
                <div className="calendar-event-info">
                    <div className="calendar-event-time">10:00 - 12:00</div>
                    <div className="calendar-event-title">
                        {
                        editable ? 
                            <input type="text" ref={inputRef} onChange={handleChange} onBlur={handleBlur} value={title} /> 
                            : 
                            <span onClick={handleTitleClick}>{event.title}</span>
                        }
                    </div>
                </div>
                <button onClick={handleDeleteClick} className="calendar-event-delete-button">&times;</button>
            </div>
        </div>
    )
}
export default EventItem;