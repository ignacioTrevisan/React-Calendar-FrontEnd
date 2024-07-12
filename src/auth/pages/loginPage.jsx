import React, { useEffect } from 'react'
import './loginPage.css'
import { IconButton } from '@mui/material'
import { Facebook, GitHub, Google } from '@mui/icons-material'
import { useForm } from '../../hooks/useForm'
import { UseAuthStore } from '../../hooks/useAuthStore'
import Swal from 'sweetalert2'


const initialFormLogin = {
    email: '',
    password: '',
}
const initialFormRegister = {
    emailRegister: '',
    name: '',
    passwordRegister: '',
    passwordRegisterRepeat: ''
}
export const LoginPage = () => {

    const { email, password, onInputChange: onLoginInputChange, formState: formStateLogin } = useForm(initialFormLogin, {});

    const { emailRegister, passwordRegister, passwordRegisterRepeat, onInputChange: onRegisterInputChange, name, formState: formStateRegister } = useForm(initialFormRegister, {});

    const { startLogin, errorMessage, startSignUp } = UseAuthStore();
    const submitLogin = (event) => {
        event.preventDefault();
        startLogin({ email, password });

    }


    useEffect(() => {
        if (errorMessage !== undefined) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: errorMessage,
            });
        }
    }, [errorMessage])

    const submitRegister = (event) => {
        event.preventDefault(formStateRegister);
        if (passwordRegister !== passwordRegisterRepeat) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: 'Las contraseñas no coinciden',

            });
        } else {

            startSignUp({ name, email: emailRegister, password: passwordRegister })
        }
    }


    return (
        <div className="containerLogin">
            <div className="left">
                <div className="title-left">
                    <h1>Login</h1>
                </div>
                <div className="container-form">
                    <form onSubmit={submitLogin}>
                        <input type="text" value={email} name='email' onChange={onLoginInputChange} placeholder="email" />
                        <input type="password" value={password} name='password' onChange={onLoginInputChange} placeholder="contraseña" />
                        <div className="button-form">
                            <button type="submit" id="login">Iniciar sesión</button>
                        </div>
                        <div className="icon-form">
                            <IconButton><Google /></IconButton>
                            <IconButton><GitHub /></IconButton>
                            <IconButton><Facebook /></IconButton>
                        </div>
                    </form>
                </div>
            </div>
            <div className="right">
                <div className="title-left">
                    <h1>Register</h1>
                </div>
                <div className="container-form-register">
                    <form onSubmit={submitRegister}>
                        <div className="inputs">

                            <input type="text" value={name} name='name' onChange={onRegisterInputChange} placeholder="Nombre de usuario" />
                            <input type="text" value={emailRegister} name='emailRegister' onChange={onRegisterInputChange} placeholder="Email" />
                            <input type="password" value={passwordRegister} name='passwordRegister' onChange={onRegisterInputChange} placeholder="Contraseña" />
                            <input type="password" value={passwordRegisterRepeat} name='passwordRegisterRepeat' onChange={onRegisterInputChange} placeholder="Repita lacontraseña" />
                            <div className="button-form">
                                <button type="submit" id='registrar'>Crear cuenta</button>
                            </div>
                            <div className="icon-form">
                                <IconButton><Google /></IconButton>
                                <IconButton><GitHub /></IconButton>
                                <IconButton><Facebook /></IconButton>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}
