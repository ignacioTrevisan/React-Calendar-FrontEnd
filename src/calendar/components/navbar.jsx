import React from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '../../store/auth/authSlice';
import { UseAuthStore } from '../../hooks/useAuthStore';
import { UseCalendarStore } from '../../hooks';

export const Navbar = () => {

    const { user, startlogOut } = UseAuthStore();
    const { startCleanNotes } = UseCalendarStore();

    const onLogout = () => {
        startCleanNotes();
        startlogOut();
    }

    return (
        <div className='navbar navbar-dark bg-dark mb-4 px-4'>
            <span className='navbar-brand'>
                <i className='fas fa-calendar-alt'></i>
                &nbsp; {user.name}

            </span>
            <button className='btn btn-outline-danger' onClick={onLogout}>
                <i className='fas fa-sign-out-alt'></i>
                &nbsp;
                <span>Salir</span>
            </button>
        </div>
    )
}
