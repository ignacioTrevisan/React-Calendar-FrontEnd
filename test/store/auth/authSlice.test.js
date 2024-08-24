import { authSlice, checking, clearErrorMessage, logIn, logOut } from "../../../src/store"
import { initialState, logged, unLogged } from "../../fixture/authStates";
import { TestUser } from "../../fixture/testUser";

describe('Pruebas en el authSlcie', () => {

    test('Debe cargar el estado inicial', () => {
        const state = authSlice.getInitialState();
        expect(state).toEqual(initialState);
    })

    test('Debe cargar logearse correctamente', () => {
        let state = authSlice.getInitialState();
        state = authSlice.reducer(state, logIn(TestUser))
        expect(state).toEqual({
            status: 'authenticated',
            user: TestUser,
            errorMessage: undefined
        });
        state = authSlice.reducer(state, logOut())
        expect(state).toEqual(unLogged);
    })
    test('Debe cargar deslogearse correctamente', () => {
        let state = authSlice.reducer(logged, logOut)
        expect(state).toEqual(unLogged);
    })

    test('Debe cargar deslogearse correctamente con un errorMessage', () => {
        let state = authSlice.reducer(logged, logOut('Contraseña incorrecta'))
        expect(state).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: 'Contraseña incorrecta',
        });
    })
    test('Debe borrar el errorMessage', () => {
        let state = authSlice.reducer(logged, logOut('Contraseña incorrecta'))
        state = authSlice.reducer(state, clearErrorMessage())
        expect(state).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: undefined,
        });
    })
    test("Debe cambiar el estado a 'Checking' ", () => {
        let state = authSlice.reducer(logged, logOut('Contraseña incorrecta'))
        state = authSlice.reducer(state, checking())
        expect(state).toEqual({
            status: 'checking',
            user: {},
            errorMessage: undefined,
        });
    })
})