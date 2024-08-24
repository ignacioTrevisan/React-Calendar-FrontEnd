import { useDispatch, useSelector } from "react-redux"
import { activateEvent, onAddNewEvent, onDeleteEvent, onEditEvent, onLoadEvents, clearNotes } from "../store";
import { CalendarApi } from "../api/calendarApi";
import { ConvertEventsToDateEvents } from "../helpers/convertEventsToDateEvents";
import { parseISO } from "date-fns";
import Swal from "sweetalert2";

export const UseCalendarStore = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { events, activeEvent, isLoadingEvents } = useSelector(state => state.calendar);


    const setActiveEvent = (event) => {
        //testeado
        dispatch(activateEvent(event))
    }

    const hasEventSelected = () => {
        //testeado
        if (activeEvent !== null) {
            return true;
        } else {
            return false;
        }
    }
    const startSavingEvent = async (evento) => {
        //testeado
        if (!evento.id) {


            try {
                const { data } = await CalendarApi.post('/events/crear', evento);
                dispatch(onAddNewEvent({ ...evento, id: data.evento.id, user }));
            } catch (error) {
                console.log(error);
            }
        } else {
            //testeado
            try {
                const { data } = await CalendarApi.put(`/events/actualizar/${evento.id}`, { ...evento });
                dispatch(onEditEvent({ ...evento, id: data.evento.id, user: { name: user.name, uid: user.uid } }));
            } catch (error) {
                Swal.fire('Error al guardar', error)
                console.log('Error al actualizar el evento:', error);
            }
        }
    }

    const startDeletingEvent = async () => {
        //testeado
        try {
            await CalendarApi.delete(`/events/borrar/${activeEvent.id}`);
            dispatch(onDeleteEvent());
        } catch (error) {
            Swal.fire('Error al borrar', error.response.data.msg)
            console.log(error);
        }

    }

    const startLoadingEvents = async () => {
        //testeado
        try {
            const { data } = await CalendarApi.get('/events/');
            const events = ConvertEventsToDateEvents(data.msg);
            dispatch(onLoadEvents(events));
        } catch (error) {
            console.log(error);
        }
    };
    const startCleanNotes = () => {
        dispatch(clearNotes());
    }



    return {
        events, activeEvent, isLoadingEvents, setActiveEvent, startSavingEvent, startDeletingEvent, startLoadingEvents, startCleanNotes, hasEventSelected
    }
}