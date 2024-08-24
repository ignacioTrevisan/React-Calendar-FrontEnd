import { activateEvent, calendarSlice, clearNotes, onAddNewEvent, onDeleteEvent, onEditEvent, onLoadEvents } from "../../../src/store"
import { calendarWithActiveEventState, calendarWithEventsState, events, initialState } from "../../fixture/calendarState";

describe('Pruebas en calendarSlices', () => {
    test('Debe regresar el estado inicial', () => {
        const state = calendarSlice.getInitialState();
        expect(state).toEqual(initialState);
    })
    test('Debe cargar los eventos correctamente ', () => {
        let state = calendarSlice.getInitialState();
        state = calendarSlice.reducer(state, onLoadEvents(events))
        expect(state).toEqual(calendarWithEventsState);
    })
    test('Debe activar un evento correctamente ', () => {
        let state = calendarSlice.reducer(calendarWithEventsState, activateEvent(events[0]))
        expect(state).toEqual(calendarWithActiveEventState)
    })
    test('Debe agregar un evento correctamente ', () => {
        const newEvent = {
            id: '3',
            start: new Date('2022-11-09 13:00:00'),
            end: new Date('2022-11-09 15:00:00'),
            title: 'Cumpleaños de Nacho',
            notes: 'Alguna nota de Nacho'
        };
        let state = calendarSlice.reducer(calendarWithEventsState, onLoadEvents(events))
        if (state.events.some(event => event.id === newEvent.id)) {
            throw new Error("La prueba no es posible ya que el ultimo elemento corresponde al sujeto de prueba");
        }
        state = calendarSlice.reducer(state, onAddNewEvent(newEvent))
        expect(state.events[state.events.length - 1]).toEqual(newEvent)

    })

    test('Debe actualizar un evento correctamente ', () => {
        const newEvent = {
            id: '2',
            start: new Date('2022-11-09 13:00:00'),
            end: new Date('2022-11-09 15:00:00'),
            title: 'Cumpleaños de Nacho',
            notes: 'Alguna nota de Nacho'
        };
        let state = calendarSlice.reducer(calendarWithEventsState, onEditEvent(newEvent))
        const eventoEditado = state.events.find((e) => e.id === newEvent.id);

        expect(eventoEditado).toEqual(newEvent)
    })


    test('Debe eliminar un evento correctamente ', () => {
        let state = calendarSlice.reducer(calendarWithEventsState, activateEvent(events[0]))
        const eventoBorrado = state.activeEvent;
        state = calendarSlice.reducer(state, onDeleteEvent());
        const result = state.events.find(element => element === eventoBorrado);
        expect(result).toBe(undefined);
        expect(state.events.length).toBe(calendarWithEventsState.events.length - 1);

    })

    test('Debe eliminar un evento correctamente ', () => {
        let state = calendarSlice.reducer(calendarWithEventsState, activateEvent(events[0]))
        state = calendarSlice.reducer(state, onDeleteEvent());

        expect(state).not.toContain(events[0]);
        expect(state.events.length).toBe(calendarWithEventsState.events.length - 1);

    })

    test('Debe limpiar todas las notas correctamente', () => {
        let state = calendarSlice.reducer(calendarWithEventsState, clearNotes());
        expect(state.events).toEqual([])
    })

    test('Debe cargar todos los eventos', () => {
        let state = calendarSlice.reducer(initialState, onLoadEvents(events));
        expect(state.events).toEqual(events)
        expect(state.isLoadingEvents).toBeFalsy();
    })
})