import { createSlice } from '@reduxjs/toolkit';

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvents: true,
        events: [],
        activeEvent: null
    },
    reducers: {
        activateEvent: (state, action) => {
            state.activeEvent = action.payload;
        },
        onAddNewEvent: (state, action) => {
            state.events.push(action.payload);
        },
        onEditEvent: (state, action) => {
            state.events = state.events.map(event => {
                if (event.id === action.payload.id) {
                    return action.payload
                }
                return event;
            })
        },
        onDeleteEvent: (state) => {
            state.events = state.events.filter(elemento => elemento.id !== state.activeEvent.id);
            state.activeEvent = null;
        },
        onLoadEvents: (state, { payload = [] }) => {

            state.isLoadingEvents = false;
            payload.forEach(event => {

                const exist = state.events.some(DBEvent => DBEvent.id === event.id);
                if (!exist) state.events.push(event);
            });
        },
        clearNotes: (state) => {
            state.isLoadingEvents = false;
            state.events = [];
            state.activeEvent = null;
        }
    }
});


// Action creators are generated for each case reducer function
export const { increment, activateEvent, onAddNewEvent, onEditEvent, onDeleteEvent, onLoadEvents, clearNotes } = calendarSlice.actions;