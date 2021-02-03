import React, { useEffect, useState, useRef } from 'react'

// Servicios
import { createNewList } from '../../firebase/client'

// Componentes
import Alert from '../../components/Alert'
import Menu from '../../components/Menu'
import Header from '../../components/Header'

import styles from './styles.module.css'

const NewList = () => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const today = new Date()
    const nameRef = useRef()
    const [errorMessage, setErrorMessage] = useState(null)
    const [isValid, setValid] = useState(false)

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
            setErrorMessage('Introduzca un nombre para la lista')
        }

        try {
            createNewList({ name })
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
            <div className={styles.wrapper}>
                <Header />
                <section className={styles.container}>
                    <Menu />
                    <main className={styles.body}>
                        <h1 className={styles.title}>
                            Nueva lista de la compra
                        </h1>
                        <form onSubmit={handleSubmit}>
                            <input
                                className={styles.name}
                                type='text'
                                name='name'
                                value={name}
                                ref={nameRef}
                                placeholder='Introduce el nombre de la lista'
                                onChange={handleChange}
                            />
                            {errorMessage && (
                                <div className={styles.errorMessage}>
                                    <Alert message={errorMessage} />
                                </div>
                            )}
                            <button
                                className={
                                    isValid
                                        ? styles.submitButton
                                        : styles.disabledButton
                                }
                                type='submit'
                                disabled={!isValid}
                            >
                                Guardar
                            </button>
                        </form>
                    </main>
                </section>
            </div>
        </>
    )
}

export default NewList
