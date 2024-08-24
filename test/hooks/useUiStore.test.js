const { renderHook, act } = require("@testing-library/react")
const { UseUiStore } = require("../../src/hooks/useUiStore")
const { Provider } = require("react-redux")
const { store, uiSlice } = require("../../src/store")
const { configureStore } = require("@reduxjs/toolkit")


const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            ui: uiSlice.reducer
        },
        preloadedState: {
            ui: { ...initialState }
        }
    })
}
describe('Pruebas en useUiStore', () => {
    test('Debe regresar los valores por defecto', () => {
        const mockStore = getMockStore({
            isDateModalOpen: true
        })
        const { result } = renderHook(() => UseUiStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        }
        )

        expect(result.current).toEqual({
            openDateModal: expect.any(Function),
            toggleDateModal: expect.any(Function),
            closeDateModal: expect.any(Function),
            isDateModalOpen: true
        })
    }),
        test('Debe poner en true el isDateModal', () => {
            const mockStore = getMockStore({
                isDateModalOpen: false
            })
            const { result } = renderHook(() => UseUiStore(), {
                wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
            }
            )
            const { openDateModal } = result.current;
            act(() => {
                openDateModal();
            })
            expect(result.current.isDateModalOpen).toBeTruthy();
        })
    test('Debe poner en false el isDateModal', () => {
        const mockStore = getMockStore({
            isDateModalOpen: true
        })
        const { result } = renderHook(() => UseUiStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        })
        const { closeDateModal } = result.current;
        act(() => {
            closeDateModal();
        })
        expect(result.current.isDateModalOpen).toBeFalsy();
    })

    test('Debe cambiar de estado el isDateModal', () => {
        const mockStore = getMockStore({
            isDateModalOpen: false
        })
        const { result } = renderHook(() => UseUiStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        })
        act(() => {
            result.current.toggleDateModal();
        })
        expect(result.current.isDateModalOpen).toBeTruthy();
        act(() => {
            result.current.toggleDateModal();
        })
        expect(result.current.isDateModalOpen).toBeFalsy();


    })
})