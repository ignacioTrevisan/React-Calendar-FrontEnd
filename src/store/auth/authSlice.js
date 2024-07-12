import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authenticated', //'authenticated','not-authenticated'    
        user: {},
        errorMessage: undefined
    },
    reducers: {
        checking: (state, /* action */) => {
            state.status = 'checking';
            state.user = {};
            state.errorMessage = undefined;
        },
        logIn: (state, { payload }) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = undefined;
        },
        logOut: (state, { payload }) => {

            state.status = 'not-authenticated';
            state.user = {};
            state.errorMessage = payload
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined;
        }
    }
});


// Action creators are generated for each case reducer function
export const { checking, logIn, logOut, clearErrorMessage } = authSlice.actions;