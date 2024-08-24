import { configureStore } from "@reduxjs/toolkit";
import { calendarWithActiveEventState, calendarWithEventsState, events, initialState as initialStateCalendar } from "../fixture/calendarState";
import { UseCalendarStore } from "../../src/hooks/useCalendarStore";
import { authSlice, calendarSlice } from "../../src/store";
import { act, renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { CalendarApi } from "../../src/api/calendarApi";
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { logged } from "../fixture/authStates";



// const mockOnLoadEvents = jest.fn();


// jest.mock('../../src/store/calendar/calendarSlice', () => ({
//     ...jest.requireActual('../../src/store/calendar/calendarSlice'),
//     onLoadEvents: (events) => { return () => mockOnLoadEvents(events) }
// }));

// jest.mock('react-redux', () => ({
//     ...jest.requireActual('react-redux'),
//     useDispatch: () => (fn) => fn()
// }))

jest.mock('../../src/api/CalendarApi');

describe('Pruebas al useCalendarStore', () => {


    beforeEach(() =>
        jest.clearAllMocks())


    const getMockStore = (initialStateCalendar = {}, initialStateAuth = {}) => {
        return configureStore({
            reducer: {
                calendar: calendarSlice.reducer,
                auth: authSlice.reducer,

            },
            preloadedState: {
                calendar: {
                    ...initialStateCalendar
                },
                auth: {
                    ...initialStateAuth
                }
            }, middleware: getDefaultMiddleware =>
                getDefaultMiddleware({
                    serializableCheck: false,
                }),

        });
    }

    test('Debe devolver los valores por defecto', () => {
        const mockStore = getMockStore(initialStateCalendar);

        const { result } = renderHook(() => UseCalendarStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        expect(result.current).toEqual({
            events: [],
            activeEvent: null,
            isLoadingEvents: true,
            setActiveEvent: expect.any(Function),
            startSavingEvent: expect.any(Function),
            startDeletingEvent: expect.any(Function),
            startLoadingEvents: expect.any(Function),
            startCleanNotes: expect.any(Function),
            hasEventSelected: expect.any(Function),
        });
    });

    test('Debe cargar los eventos', async () => {
        const mockStore = getMockStore(initialStateCalendar);
        const spy = jest.spyOn(CalendarApi, 'get').mockReturnValue({
            data: {
                msg: events
            }
        })
        const { result } = renderHook(() => UseCalendarStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });
        await act(async () => {
            await result.current.startLoadingEvents();
        })
        expect(result.current.events).toEqual(events);
    });


    test('Debe activar un evento', async () => {
        const mockStore = getMockStore(calendarWithEventsState);

        const { result } = renderHook(() => UseCalendarStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });
        await act(async () => {
            result.current.setActiveEvent(events[0]);
        })
        expect(result.current.activeEvent).toEqual(events[0])
    });

    test('Debe confirmar si hay evento seleccionado correctamente', async () => {
        const mockStoreConEventoActivado = getMockStore(calendarWithActiveEventState);
        const mockStoreSinEventoActivado = getMockStore(initialStateCalendar);


        const activado = renderHook(() => UseCalendarStore(), {
            wrapper: ({ children }) => <Provider store={mockStoreConEventoActivado}>{children}</Provider>
        });
        expect(activado.result.current.hasEventSelected()).toBeTruthy();


        const desactivado = renderHook(() => UseCalendarStore(), {
            wrapper: ({ children }) => <Provider store={mockStoreSinEventoActivado}>{children}</Provider>
        });
        expect(desactivado.result.current.hasEventSelected()).toBeFalsy();


    });


    test('Debe editar un evento correctamente', async () => {

        const mockStore = getMockStore(calendarWithEventsState, logged);
        const eventoModificado = {
            ...events[0], title: 'Titulo modificado', user: logged.user
        }
        const spy = jest.spyOn(CalendarApi, 'put').mockReturnValue({
            data: {
                evento: {
                    id: events[0].id
                }
            }
        })
        const { result } = renderHook(() => UseCalendarStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });
        await act(async () => {
            result.current.startSavingEvent(eventoModificado);
        })

        expect(result.current.events[0]).toEqual(eventoModificado)
    });

    test('Debe guardar un evento correctamente', async () => {

        const mockStore = getMockStore(calendarWithEventsState, logged);
        const eventoCreado = {
            start: new Date('2024-05-01 13:00:00'),
            end: new Date('2024-05-01 15:00:00'),
            title: 'Cumpleaños de Nacho',
            notes: 'Alguna nota',
        }
        const spy = jest.spyOn(CalendarApi, 'post').mockReturnValue({
            data: {
                evento: {
                    id: '213681263871235'
                }
            }
        })
        const { result } = renderHook(() => UseCalendarStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });
        await act(async () => {
            result.current.startSavingEvent(eventoCreado);
        })

        expect(result.current.events.length).toEqual(events.length + 1)

    });



    test('Debe borrar un evento correctamente', async () => {

        const mockStore = getMockStore(calendarWithActiveEventState, logged);

        const spy = jest.spyOn(CalendarApi, 'delete').mockReturnValue({})
        const { result } = renderHook(() => UseCalendarStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });
        await act(async () => {
            result.current.startDeletingEvent();
        })
        expect(result.current.events.length).toEqual(events.length - 1)
        expect(result.current.activeEvent).toBeNull();
    });


    test('Debe limpiar todas las notas', async () => {

        const mockStore = getMockStore(calendarWithActiveEventState, logged);


        const { result } = renderHook(() => UseCalendarStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });
        await act(async () => {
            result.current.startCleanNotes();
        })
        expect(result.current.events.length).toEqual(0)

    });


});
