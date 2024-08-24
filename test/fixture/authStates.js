export const initialState = {
    status: 'checking', //'authenticated','not-authenticated'    
    user: {},
    errorMessage: undefined
}
export const logged = {
    status: 'authenticated',
    user: {
        uid: 'abc',
        name: 'Nacho',

    },
    errorMessage: undefined,
}

export const unLogged = {
    status: 'not-authenticated',
    user: {},
    errorMessage: undefined,
}