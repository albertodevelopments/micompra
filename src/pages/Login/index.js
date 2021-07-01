import React, { useEffect, useState, useContext } from 'react'

// Dependencias
import { useHistory, Link } from 'react-router-dom'

// Servicios
import {
    signInByEmail,
    fetchShoppingLists,
    signInWithGoogle,
} from '../../firebase/client'

// Componentes
import Alert from 'components/Alert'
import { GoogleLogo } from 'components/Icons'

// Contexto
import { AppContext } from 'context/AppContext'

import './styles.css'

const Login = () => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [inputData, setInputData] = useState({
        email: '',
        password: '',
    })
    const { email, password } = inputData
    const [error, setError] = useState(null)
    const history = useHistory()
    const { setUser, shoppingLists, setShoppingLists } = useContext(AppContext)

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const handleSubmit = async e => {
        e.preventDefault()

        try {
            const response = await signInByEmail(inputData)
            const { user } = response
            const { displayName, uid } = user

            setUser({ name: displayName, id: uid })

            // Guardamos las listas de la compra para que estén disponibles en toda la aplicación
            const listOfLists = await fetchShoppingLists(uid)
            setShoppingLists(listOfLists)
        } catch (error) {
            console.log(error)
            const { code } = error
            handleError(code)
        }
    }

    const handleError = errorCode => {
        setError(null)

        if (errorCode === 'auth/invalid-email') {
            setError('La cuenta de correo no es válida.')
        } else if (errorCode === 'auth/user-not-found') {
            setError('La cuenta de correo no existe.')
        } else if (errorCode === 'auth/wrong-password') {
            setError('Contraseña incorrecta.')
        } else {
            setError('Error al iniciar sesión.')
        }
    }

    const handleChange = e => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value,
        })
    }

    const handleLoginWithGoogle = async () => {
        try {
            const user = await signInWithGoogle()
            const { name, uid } = user

            setUser({ name, id: uid })

            // Guardamos las listas de la compra para que estén disponibles en toda la aplicación
            const listOfLists = await fetchShoppingLists(uid)
            setShoppingLists(listOfLists)
        } catch (error) {
            console.log('error login google', error)
        }
    }

    /* -------------------------------------------------------------------- */
    /* ---------------------------- USE EFFECTS --------------------------- */
    /* -------------------------------------------------------------------- */
    useEffect(() => {
        if (!shoppingLists) return

        history.push('/shopping-list')
    }, [shoppingLists])

    /* -------------------------------------------------------------------- */
    /* --------------------------- RENDERIZADO ---------------------------- */
    /* -------------------------------------------------------------------- */
    return (
        <div className='login-container'>
            <h1 className='login-title'>Inicio de Sesión</h1>
            <form className='login-form' onSubmit={handleSubmit}>
                <input
                    autoFocus
                    className='input form__input'
                    type='email'
                    name='email'
                    value={email}
                    placeholder='Introduce el e-mail'
                    onChange={handleChange}
                />
                <input
                    className='input form__input'
                    type='password'
                    name='password'
                    value={password}
                    placeholder='Introduce la contraseña'
                    onChange={handleChange}
                />
                {error && <Alert type='error' message={error} />}
                <div className='login-form__buttons'>
                    <button className='btn login-form__btn' type='submit'>
                        Iniciar Sesión
                    </button>
                    <button
                        className='login-form__google-btn'
                        type='button'
                        onClick={handleLoginWithGoogle}
                    >
                        <GoogleLogo /> Iniciar con Google
                    </button>
                </div>
                <Link to='/new-account' className='link'>
                    ¿No tienes cuenta? ¡Regístrate!
                </Link>
            </form>
        </div>
    )
}

export default Login
