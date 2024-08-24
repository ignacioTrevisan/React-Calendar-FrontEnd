import { onCloseDateModal, onOpenDateModal, uiSlice } from "../../../src/store"

describe('Pruebas en UiSlice', () => {
    test('Debe regresar el estado por defecto', () => {
        expect(uiSlice.getInitialState().isDateModalOpen).toBeFalsy();
    })

    test('Debe cambio es isDateModalOpen correctamente', () => {
        let state = uiSlice.getInitialState();
        state = uiSlice.reducer(state, onOpenDateModal())
        expect(state.isDateModalOpen).toBeTruthy();
        state = uiSlice.reducer(state, onCloseDateModal())
        expect(state.isDateModalOpen).toBeFalsy();
    })
})