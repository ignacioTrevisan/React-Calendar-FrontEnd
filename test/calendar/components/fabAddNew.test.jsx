import { fireEvent, screen } from "@testing-library/dom";
import { FabAddNew } from "../../../src/calendar/components/fabAddNew";
import { UseCalendarStore, UseUiStore } from "../../../src/hooks"
import { render } from "@testing-library/react";



jest.mock('../../../src/hooks/useCalendarStore');
jest.mock('../../../src/hooks/useUiStore');

describe('Pruebas en FabAddNew', () => {

    const mockOpenDateModal = jest.fn();
    const mockSetActiveEvent = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('Debe montarse el componente incialmente', () => {

        UseCalendarStore.mockReturnValue({
            setActiveEvent: mockSetActiveEvent
        })
        UseUiStore.mockReturnValue({
            openDateModal: mockOpenDateModal
        })

        render(<FabAddNew />)
        const btn = screen.getByLabelText('fabNew');
        fireEvent.click(btn);
        expect(mockOpenDateModal).toHaveBeenCalled();
        expect(mockSetActiveEvent).toHaveBeenCalled();

    })

})