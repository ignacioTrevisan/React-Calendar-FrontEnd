import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../auth'
import { CalendarPage } from '../calendar'
import { UseAuthStore } from '../hooks/useAuthStore'
import { useEffect } from 'react'

export const AppRouter = () => {


    const { status, checkAuthToken } = UseAuthStore()
    useEffect(() => {
        checkAuthToken();
    }, [])

    if (status === 'checking') {
        return (<h3>Cargando...</h3>)
    }

    return (
        <Routes>
            {
                (status === 'not-authenticated')
                    ?
                    <>
                        <Route path='/auth/*' element={<LoginPage />} />
                        <Route path='/*' element={<Navigate to={'/auth/login'} />} />
                    </>
                    :
                    <>
                        <Route path='/' element={<CalendarPage />} />
                        <Route path='/*' element={<Navigate to={'/'} />} />
                    </>
            }


        </Routes>
    )
}
