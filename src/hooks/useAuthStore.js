import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CalendarApi } from '../api/calendarApi';
import { checking, clearErrorMessage, logIn, logOut } from '../store/auth/authSlice';
import { signInWithFacebook, signInWithGithub, signInWithGoogle } from '../firebase/providers';

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

    const startLogInWithGoogle = async () => {
        dispatch(checking());
        const result = await signInWithGoogle();
        if (result.ok) {
            const { data } = await CalendarApi.post('/auth/google', { uidProvider: result.uid, email: result.email, name: result.displayName });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(logIn({ name: data.name, token: data.token, uid: data.uid }))
        } else {
            dispatch(logOut(result.errorMessage));
        }


    }

    const startLogInWithFacebook = async () => {
        dispatch(checking());
        const result = await signInWithFacebook();
        if (result.ok) {
            const { data } = await CalendarApi.post('/auth/google', { googleId: result.uid, email: result.email, name: result.displayName });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(logIn({ name: data.name, token: data.token, uid: data.uid }))
        } else {
            dispatch(logOut(result.errorMessage));
        }


    }


    const startLogInWithGithub = async () => {
        dispatch(checking());
        const result = await signInWithGithub();
        console.log(result)
        if (result.ok) {
            const { data } = await CalendarApi.post('/auth/google', { googleId: result.uid, email: result.email, name: result.displayName });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(logIn({ name: data.name, token: data.token, uid: data.uid }))
        } else {
            dispatch(logOut(result.errorMessage));
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
        startlogOut,
        startLogInWithGoogle,
        startLogInWithFacebook,
        startLogInWithGithub
    }
}
