import React, { useEffect } from 'react'
import './loginPage.css'
import { useForm } from '../../hooks/useForm'
import { UseAuthStore } from '../../hooks/useAuthStore'
import Swal from 'sweetalert2'


let Facebook, GitHub, Google, IconButton;

const loadIcons = async () => {
    if (process.env.NODE_ENV !== 'test') {
        const iconsModule = await import('@mui/icons-material');
        const muiModule = await import('@mui/material');

        Facebook = iconsModule.Facebook;
        GitHub = iconsModule.GitHub;
        Google = iconsModule.Google;
        IconButton = muiModule.IconButton;
    }
};

loadIcons();

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

    const { startLogin, errorMessage, startSignUp, startLogInWithGoogle, startLogInWithFacebook, startLogInWithGithub } = UseAuthStore();


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
    const LogInWithGoogle = () => {
        startLogInWithGoogle();
    }
    const LogInWithFacebook = () => {
        startLogInWithFacebook();
    }
    const logInWithGithub = () => {
        startLogInWithGithub();
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
                            {process.env.NODE_ENV !== 'test' && (
                                <>
                                    <IconButton onClick={LogInWithGoogle}><Google /></IconButton>
                                    <IconButton onClick={logInWithGithub}><GitHub /></IconButton>
                                    <IconButton onClick={LogInWithFacebook}><Facebook /></IconButton>
                                </>
                            )}
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
                            <input type="password" value={passwordRegisterRepeat} name='passwordRegisterRepeat' onChange={onRegisterInputChange} placeholder="Repita la contraseña" />
                            <div className="button-form">
                                <button type="submit" id='registrar'>Crear cuenta</button>
                            </div>
                            <div className="icon-form">

                                {process.env.NODE_ENV !== 'test' && (
                                    <>
                                        <IconButton onClick={LogInWithGoogle}><Google /></IconButton>
                                        <IconButton onClick={logInWithGithub}><GitHub /></IconButton>
                                        <IconButton onClick={LogInWithFacebook}><Facebook /></IconButton>
                                    </>
                                )} </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}
