import React, { useEffect, useState } from 'react'

// Dependencias
import { useHistory } from 'react-router-dom'

// Servicios
import { signInByEmail } from '../../firebase/client'

import styles from './styles.module.css'
import Alert from '../../components/Alert'

const Login = () => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [user, setUser] = useState({
        email: '',
        password: '',
    })
    const { email, password } = user
    const [isValid, setValid] = useState(false)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorPassword, setErrorPassword] = useState(null)
    const [errorUnknown, setErrorUnknown] = useState(null)
    const history = useHistory()

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const handleSubmit = async e => {
        e.preventDefault()

        try {
            await signInByEmail(user)
            history.push('/shopping-list')
        } catch (error) {
            console.log(error)
            const { code } = error
            handleError(code)
        }
    }

    const handleError = errorCode => {
        setErrorEmail(null)
        setErrorPassword(null)
        setErrorUnknown(null)
        if (errorCode === 'auth/user-not-found') {
            setErrorEmail('Esta cuenta de correo no existe.')
        } else if (errorCode === 'auth/wrong-password') {
            setErrorPassword('Contraseña incorrecta.')
        } else {
            setErrorUnknown('Error al iniciar sesión.')
        }
    }

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    /* -------------------------------------------------------------------- */
    /* ---------------------------- USE EFFECTS --------------------------- */
    /* -------------------------------------------------------------------- */
    useEffect(() => {
        setValid(email !== '' && password !== '' && password.length >= 6)
    }, [user])

    /* -------------------------------------------------------------------- */
    /* --------------------------- RENDERIZADO ---------------------------- */
    /* -------------------------------------------------------------------- */
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Inicio de Sesión</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    className={styles.inputText}
                    type='email'
                    name='email'
                    value={email}
                    placeholder='Introduce el e-mail'
                    onChange={handleChange}
                />
                {errorEmail && (
                    <div className={styles.errorMessage}>
                        <Alert message={errorEmail} />
                    </div>
                )}
                <input
                    className={styles.inputText}
                    type='password'
                    name='password'
                    value={password}
                    placeholder='Introduce la contraseña'
                    onChange={handleChange}
                />
                {errorPassword && (
                    <div className={styles.errorMessage}>
                        <Alert message={errorPassword} />
                    </div>
                )}
                {errorUnknown && (
                    <div className={styles.errorMessage}>
                        <Alert message={errorUnknown} />
                    </div>
                )}
                <button
                    className={
                        isValid ? styles.submitButton : styles.disabledButton
                    }
                    type='submit'
                    disabled={!isValid}
                >
                    Iniciar Sesión
                </button>
            </form>
        </div>
    )
}

export default Login
