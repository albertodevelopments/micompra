import React, { useEffect, useState, useRef, useContext } from 'react'

// Servicios
import { createNewList } from '../../firebase/client'

// Dependencias
import { useHistory } from 'react-router-dom'

// Componentes
import Alert from 'components/Alert'
import MainLayout from 'components/MainLayout'

// Contexto
import { AppContext } from 'context/AppContext'

import './styles.css'

const NewList = () => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const today = new Date()
    const nameRef = useRef()
    const [errorMessage, setErrorMessage] = useState(null)
    const [isValid, setValid] = useState(false)
    const history = useHistory()
    const { user } = useContext(AppContext)

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const handleChange = e => {
        setName(e.target.value)
    }

    const getDayName = day => {
        switch (day) {
            case 1:
                return 'Lunes'
            case 2:
                return 'Martes'
            case 3:
                return 'Miércoles'
            case 4:
                return 'Jueves'
            case 5:
                return 'Viernes'
            case 6:
                return 'Sábado'
            case 7:
                return 'Domingo'
            default:
                break
        }
    }

    const composeListName = () => {
        const dayName = getDayName(today.getDay())
        const day = today.getDate()
        const dayString = day >= 10 ? day.toString() : '0' + day.toString()
        const month = today.getMonth() + 1
        const monthString =
            month >= 10 ? month.toString() : '0' + month.toString()
        const year = today.getFullYear()

        return `${dayName}_${dayString}-${monthString}-${year}`
    }
    const [name, setName] = useState(composeListName())

    const handleSubmit = e => {
        e.preventDefault()

        if (!name || name.trim() === '') {
            setErrorMessage('Introduce un nombre para la lista')
        }

        try {
            const list = {
                userId: user.id,
                name,
            }
            createNewList(list)
            history.push('/shopping-lists')
        } catch (error) {
            console.log(error)
        }
    }

    /* -------------------------------------------------------------------- */
    /* ---------------------------- USE EFFECTS --------------------------- */
    /* -------------------------------------------------------------------- */
    useEffect(() => {
        nameRef.current.select()
    }, [])

    useEffect(() => {
        setValid(name !== '')
    }, [name])

    /* -------------------------------------------------------------------- */
    /* --------------------------- RENDERIZADO ---------------------------- */
    /* -------------------------------------------------------------------- */
    return (
        <>
            <MainLayout>
                <section className='new-list-container'>
                    <h1 className='new-list-title'>Nueva lista de la compra</h1>
                    <form className='new-list-form' onSubmit={handleSubmit}>
                        <input
                            className='input'
                            type='text'
                            name='name'
                            value={name}
                            ref={nameRef}
                            placeholder='Introduce el nombre de la lista'
                            onChange={handleChange}
                        />
                        {errorMessage && <Alert message={errorMessage} />}
                        <button
                            className={`btn new-list-form__btn ${
                                isValid ? '' : ' btn-disabled'
                            }`}
                            type='submit'
                            disabled={!isValid}
                        >
                            Guardar
                        </button>
                    </form>
                </section>
            </MainLayout>
        </>
    )
}

export default NewList
