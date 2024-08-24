import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "../../src/store"
import { UseAuthStore } from "../../src/hooks/useAuthStore"
import { Provider } from "react-redux"
import { act, renderHook, waitFor } from "@testing-library/react"
import { TestUser } from "../fixture/testUser"
import { CalendarApi } from "../../src/api/calendarApi"
import { initialState } from "../fixture/authStates"


describe('Pruebas en useAuthStore', () => {
    beforeEach(() => {
        localStorage.clear();
    });




    const getMockStore = (initialState) => {
        return configureStore({
            reducer: {
                auth: authSlice.reducer
            }, preloadedState: {
                auth: { ...initialState }
            }
        })
    }
    test('Debe devolver los valores por defecto', () => {
        const mockStore = getMockStore({
            status: 'checking', //'authenticated','not-authenticated'    
            user: {},
            errorMessage: undefined
        }
        )
        const { result } = renderHook(() => UseAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        }
        )
        expect(result.current).toEqual({
            status: 'checking',
            user: {},
            errorMessage: undefined,
            startLogin: expect.any(Function),
            startSignUp: expect.any(Function),
            checkAuthToken: expect.any(Function),
            startlogOut: expect.any(Function),
            startLogInWithGoogle: expect.any(Function),
            startLogInWithFacebook: expect.any(Function),
            startLogInWithGithub: expect.any(Function),
        })

    })

    test('Debe logearse correctamente', async () => {
        const mockStore = getMockStore({
            status: 'not-authenticated', //'authenticated','not-authenticated'    
            user: {},
            errorMessage: undefined
        }
        )
        const { result } = renderHook(() => UseAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        }
        )
        await act(async () => {
            await result.current.startLogin({ email: TestUser.email, password: TestUser.password });
        })
        const lsToken = localStorage.getItem('token');
        const lsDate = localStorage.getItem('token-init-date');
        expect(lsDate).toEqual(expect.any(String));
        expect(lsDate).not.toBe('');
        expect(Number(lsDate)).not.toBeNaN();
        expect(Number(lsDate)).toBeGreaterThan(0);

        expect(lsToken).toEqual(expect.any(String));
        expect(lsToken).not.toBe('');
        expect(result.current).toEqual({ ...result.current, status: 'authenticated', user: { ...result.current.user, uid: TestUser.uid, name: TestUser.name } });
    })
    test('Debe fallar la authenticacion', async () => {

        const mockStore = getMockStore({
            status: 'not-authenticated', //'authenticated','not-authenticated'    
            user: {},
            errorMessage: undefined
        }
        )
        const { result } = renderHook(() => UseAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        }
        )
        await act(async () => {
            await result.current.startLogin({ email: TestUser.email, password: '1234567' });
        })
        const lsToken = localStorage.getItem('token');
        const lsDate = localStorage.getItem('token-init-date');
        expect(lsToken).toBeNull();
        expect(lsDate).toBeNull();
        expect(result.current).toEqual({ ...result.current, status: 'not-authenticated', user: {}, errorMessage: 'Credenciales incorrectas' });
        waitFor(
            () => expect(result.current.errorMessage).toBeUndefined()
        )


    })

    test('Debe registrar un nuevo usuario', async () => {



        const mockStore = getMockStore({
            status: 'not-authenticated', //'authenticated','not-authenticated'    
            user: {},
            errorMessage: undefined
        }
        )
        const { result } = renderHook(() => UseAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        }
        )

        const spy = jest.spyOn(CalendarApi, 'post').mockReturnValue({
            data: {
                ok: true,
                uid: 'algun-uid',
                token: 'algun-token',
                name: 'test-user2'
            }
        })
        await act(async () => {
            await result.current.startSignUp({ email: 'testUser2@gmail.com', password: '1234567', name: 'testUser2' });
        })
        const { errorMessage, status, user } = result.current;
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'test-user2', uid: 'algun-uid', token: 'algun-token' }
        })

        const lsToken = localStorage.getItem('token');
        const lsDate = localStorage.getItem('token-init-date');
        expect(lsToken).toEqual(expect.any(String));
        expect(lsDate).toEqual(expect.any(String));


        spy.mockRestore();

    })

    test('Debe fallar la creacion de un usuario', async () => {

        const mockStore = getMockStore({
            status: 'not-authenticated', //'authenticated','not-authenticated'    
            user: {},
            errorMessage: undefined
        }
        )
        const { result } = renderHook(() => UseAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        }
        )
        await act(async () => {
            await result.current.startSignUp({ email: TestUser.email, password: TestUser.password, name: TestUser.name });
        })
        const lsToken = localStorage.getItem('token');
        const lsDate = localStorage.getItem('token-init-date');
        expect(lsToken).toBeNull();
        expect(lsDate).toBeNull();
        expect(result.current).toEqual({ ...result.current, status: 'not-authenticated', user: {}, errorMessage: 'Un usuario existe con ese correo ' });
        waitFor(
            () => expect(result.current.errorMessage).toBeUndefined()
        );


    })

    test('CheckAuthToken debe fallar si no hay token en el localStorage', async () => {

        const mockStore = getMockStore({
            status: 'not-authenticated', //'authenticated','not-authenticated'    
            user: {},
            errorMessage: undefined
        }
        )
        const { result } = renderHook(() => UseAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        }
        )
        await act(async () => {
            await result.current.checkAuthToken();
        })
        const lsToken = localStorage.getItem('token');
        const lsDate = localStorage.getItem('token-init-date');
        expect(lsToken).toBeNull();
        expect(lsDate).toBeNull();
        expect(result.current).toEqual({ ...result.current, status: 'not-authenticated', user: {} });
        waitFor(
            () => expect(result.current.errorMessage).toBeUndefined()
        )


    })



    test('CheckAuthToken debe renovar token si tiene otro valido en el localStorage ', async () => {
        localStorage.clear();
        const { data } = await CalendarApi.post('/auth', { email: TestUser.email, password: TestUser.password });
        const primerToken = data.token;
        localStorage.setItem('token', primerToken);

        const mockStore = getMockStore({ ...initialState })


        const { result } = renderHook(() => UseAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        }
        )
        await act(async () => {
            await result.current.checkAuthToken();
        })
        expect(result.current).toEqual({ ...result.current, status: 'authenticated', user: { ...result.current.user, uid: TestUser.uid, name: TestUser.name } });

    })
    test('CheckAuthToken no debe renovar token si tiene otro expirado en el localStorage ', async () => {
        localStorage.clear();
        const tokenInvalido = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJXaHNmWG83TzJMWllLMkdPeE9tS2xmT215ZGkxIiwibmFtZSI6Ik5hY2hvIiwiaWF0IjoxNzIwODE3NTY1LCJleHAiOjE3MjA4MjQ3NjV9.FGizWRUFEN3g0mXr4gQrWXk4ERgCZvvR0h8rtcu6-1U';
        localStorage.setItem('token', tokenInvalido);

        const mockStore = getMockStore({ ...initialState })


        const { result } = renderHook(() => UseAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        }
        )
        await act(async () => {
            await result.current.checkAuthToken();
        })
        expect(result.current).toEqual({ ...result.current, status: 'not-authenticated', user: {}, errorMessage: 'token no valido' });
    })





})