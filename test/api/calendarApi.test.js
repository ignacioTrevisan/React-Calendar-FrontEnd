import { CalendarApi } from "../../src/api/calendarApi"

describe('Pruebas en CalendarApi', () => {
    test('Debe tener la configuracion por defecto', () => {

        const url = process.env.VITE_API_URL
        expect(CalendarApi.defaults.baseURL).toBe(url);
    })

    test('Debe enviar el x-token en todas las peticiones', async () => {
        localStorage.setItem('token', 'ABC-123');
        const resp = await CalendarApi.get('/auth', {})
        expect(resp.config.headers['x-token']).toBe(localStorage.getItem('token'))
    })



})