import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CalendarApi } from '../api/calendarApi';
import { checking, clearErrorMessage, logIn, logOut } from '../store/auth/authSlice';

export const UseAuthStore = () => {
    const { status, user, errorMessage } = useSelector(state => state.auth)
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        dispatch(checking());
        try {
            const { data } = await CalendarApi.post('/auth', { email, password });
            if (data.ok) {
                dispatch(logIn({ name: data.name, token: data.token, uid: data.uid }))
                localStorage.setItem('token', data.token);
                localStorage.setItem('token-init-date', new Date().getTime());

            }
        } catch (error) {
            dispatch(logOut('Credenciales incorrectas'))
            console.log(error.response.data)
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const startSignUp = async ({ name, email, password }) => {

        dispatch(checking());
        try {
            const { data } = await CalendarApi.post('/auth/new', { name, email, password });

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(logIn({ name: data.name, token: data.token, uid: data.uid }))

        } catch (error) {

            dispatch(logOut(error.response.data?.msg || error.response.data.errors || ''))
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const { data } = await CalendarApi.get('/auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(logIn({ name: data.name, token: data.token, uid: data.uid }))
        } catch (error) {
            console.log(error)
            localStorage.clear();
            dispatch(logOut(error.response.data?.msg || error.response.data.errors || ''))
        }
    }
    const startlogOut = () => {
        localStorage.clear();
        dispatch(logOut())
    }

    return {
        status,
        user,
        errorMessage,
        startLogin,
        startSignUp,
        checkAuthToken,
        startlogOut
    }
}
