import React, { useState, useContext } from 'react'

// Dependencias
import { useHistory, Link } from 'react-router-dom'

// Servicios
import { signUpByEmail } from '../../firebase/client'

// Componentes
import Alert from 'components/Alert'

// Contexto
import { AppContext } from 'context/AppContext'

import './styles.css'

const NewAccount = () => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const history = useHistory()
    const [inputData, setInputData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const { name, email, password, confirmPassword } = inputData
    const [error, setError] = useState(null)
    const { setUser } = useContext(AppContext)

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const handleSubmit = async e => {
        e.preventDefault()

        if (!name || name === '') {
            setError('Introduce un nombre.')
            return
        }

        if (!email || email === '') {
            setError('Introduce una cuenta de correo.')
            return
        }

        if (!password || password === '') {
            setError('Introduce una contraseña.')
            return
        }

        if (password.length < 6) {
            setError('La contraseña debe tener un mínimo de 6 caracteres.')
            return
        }

        if (!confirmPassword || confirmPassword === '') {
            setError('Introduce la confirmación de la contraseña.')
            return
        }

        if (password !== confirmPassword) {
            setError('Las contraseñas deben coincidir.')
            return
        }

        setError('')

        try {
            const response = await signUpByEmail(inputData)
            const { user } = response
            const { displayName, uid } = user

            setUser({ name: displayName, id: uid })

            history.push('/shopping-list')
        } catch (error) {
            console.log(error)
            const { code } = error
            handleError(code)
        }
    }

    const handleError = errorCode => {
        if (errorCode === 'auth/email-already-in-use') {
            setError('La cuenta de correo ya existe.')
        } else {
            setError('Error al crear la cuenta.')
        }
    }

    const handleChange = e => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value,
        })
    }

    /* -------------------------------------------------------------------- */
    /* --------------------------- RENDERIZADO ---------------------------- */
    /* -------------------------------------------------------------------- */
    return (
        <div className='new-account-container'>
            <h1 className='new-account-title'>Crear Nueva Cuenta</h1>
            <form className='new-account-form' onSubmit={handleSubmit}>
                <input
                    className='input form__input'
                    autoFocus
                    type='text'
                    name='name'
                    placeholder='Introduce un nombre'
                    onChange={handleChange}
                />
                <input
                    className='input form__input'
                    type='email'
                    name='email'
                    placeholder='Introduce una cuenta de correo.'
                    onChange={handleChange}
                />
                <input
                    className='input form__input'
                    type='password'
                    name='password'
                    placeholder='Introduce la contraseña'
                    onChange={handleChange}
                />
                <input
                    className='input form__input'
                    type='password'
                    name='confirmPassword'
                    placeholder='Confirma la contraseña'
                    onChange={handleChange}
                />
                {error && <Alert type='error' message={error} />}
                <button className='btn new-account-form__btn' type='submit'>
                    Registrarse
                </button>
                <Link to='/login' className='link'>
                    ¿Ya tienes una cuenta? ¡Inicia sesión!
                </Link>
            </form>
        </div>
    )
}

export default NewAccount
