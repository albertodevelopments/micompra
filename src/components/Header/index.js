import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

// Contexto
import { AppContext } from 'context/AppContext'

// Servicios
import { signOut } from '../../firebase/client'

import './styles.css'

const Header = () => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    //const { user, clearContext } = useContext(AppContext)
    const { clearContext } = useContext(AppContext)
    //const { name } = user

    const user = {}
    const name = 'Alberto Rodríguez'
    const history = useHistory()

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const handleLogOut = () => {
        clearContext()
        signOut()
        history.push('/login')
    }

    return (
        <header className='header'>
            <h1 className='title'>Hola, {user && name}</h1>
            <i
                className='fa fa-sign-out logout'
                aria-hidden='true'
                onClick={handleLogOut}
            ></i>
        </header>
    )
}

export default Header
