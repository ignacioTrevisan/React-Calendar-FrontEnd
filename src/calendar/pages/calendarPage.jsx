import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { localizer, getMessagesEs } from '../../helpers'
import { useState } from 'react'
import { UseUiStore, UseCalendarStore } from '../../hooks/'
import { FabAddNew, CalendarModal, CalendarEvent, Navbar } from '../components'
import { FabDelete } from '../components/fabDelete'
import { UseAuthStore } from '../../hooks/useAuthStore'



export const CalendarPage = () => {

    const [lastView] = useState(localStorage.getItem('lastView') || 'week')
    const { events, activeEvent } = UseCalendarStore();
    const { user } = UseAuthStore();
    const { openDateModal } = UseUiStore();
    const { setActiveEvent } = UseCalendarStore();
    const eventStyleGetter = (event, start, end, isSelected) => {

        const isMyEvent = (user.uid === event.user._id || user.uid === event.user.uid)
        const style = {
            backgroundColor: isMyEvent ? '#347CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }
        return {
            style
        }
    }





    const onDobleClick = (event) => {
        openDateModal();
        setActiveEvent(event);
    }
    const onSelect = (event) => {
        setActiveEvent(event);
    }
    const onViewChanged = (event) => {
        localStorage.setItem('lastView', event);
    }
    return (
        <>
            <Navbar />
            <Calendar
                culture='es'
                defaultView={lastView}
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px)' }}
                messages={getMessagesEs()}
                eventPropGetter={eventStyleGetter}
                components={{ event: CalendarEvent }}
                onDoubleClickEvent={onDobleClick}
                onSelectEvent={onSelect}
                onView={onViewChanged}

            />

            <CalendarModal />
            <FabAddNew />
            {
                (activeEvent)
                    ?
                    <FabDelete />
                    : <>
                    </>
            }


        </>
    )
}
