import axios from 'axios';
import { GetEnvVariables } from '../helpers/getEnvVariables';


const { VITE_API_URL } = GetEnvVariables();

export const CalendarApi = axios.create({
    baseURL: VITE_API_URL
});

CalendarApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
})

//TODO: Configurar interceptores