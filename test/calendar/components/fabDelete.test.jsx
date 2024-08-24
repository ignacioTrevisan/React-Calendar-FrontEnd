import { fireEvent, render, screen } from '@testing-library/react'
import { FabDelete } from '../../../src/calendar/components/fabDelete'
import { UseCalendarStore } from '../../../src/hooks/useCalendarStore'


jest.mock('../../../src/hooks/useCalendarStore');

describe('Pruebas en FabDelete', () => {
    const mockStartDeletingEvent = jest.fn();
    beforeEach(() => jest.clearAllMocks());

    test('Debe montarse el componente incialmente', () => {

        UseCalendarStore.mockReturnValue({
            hasEventSelected: false
        })

        render(<FabDelete />)
        const btn = screen.getByLabelText('btn-delete');
        expect(btn.classList).toContain('btn');
        expect(btn.classList).toContain('btn-danger');
        expect(btn.style.display).toEqual('none');




    })

    test('Debe mostrar el boton si hasEventSelected es true', () => {

        UseCalendarStore.mockReturnValue({
            hasEventSelected: true
        })

        render(<FabDelete />)
        const btn = screen.getByLabelText('btn-delete');
        expect(btn.classList).toContain('btn');
        expect(btn.classList).toContain('btn-danger');
        expect(btn.style.display).toEqual('');




    })

    test('Debe disparar startDeletingEvent al hacer click en el boton', () => {

        UseCalendarStore.mockReturnValue({
            hasEventSelected: true,
            startDeletingEvent: mockStartDeletingEvent
        })

        render(<FabDelete />)
        const btn = screen.getByLabelText('btn-delete');
        fireEvent.click(btn);
        expect(mockStartDeletingEvent).toHaveBeenCalled();
    })
})