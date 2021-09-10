import React, { useContext, useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'

// Componentes
import MainLayout from 'components/MainLayout'
import TableCell from 'components/TableCell'
import Alert from 'components/Alert'

// Servicios
import {
    fetchShoppingLists,
    createNewList,
    deleteList,
    updateList,
    fetchShoppingList,
    createListItem,
    deleteItemList,
} from '../../firebase/client'

import { composeListName } from 'util'

// Contexto
import { AppContext } from 'context/AppContext'

import './styles.css'

const ShoppingLists = () => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const {
        user,
        shoppingLists,
        setShoppingLists,
        setShoppingList,
    } = useContext(AppContext)
    const { id: userId } = user
    const [updatedData, setUpdatedData] = useState({})
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    const [transactionDone, setTransactionDone] = useState(false)
    const nameRef = useRef()
    const history = useHistory()
    const [inputData, setInputData] = useState({
        name: composeListName(),
    })
    const { name } = inputData

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const fetchNewValue = cellData => {
        setUpdatedData({
            ...updatedData,
            [cellData.name]: cellData.value,
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()

        if (!name || name.trim() === '') {
            setErrorMessage('Introduce un nombre para la lista')
            return
        }

        const newList = {
            ...inputData,
            userId,
        }

        try {
            const documentReference = await createNewList(newList) // Para obtener el id del documento creado
            const updatedList = await fetchShoppingLists(userId)
            setShoppingLists(updatedList)

            setShoppingList({
                ...newList,
                id: documentReference.id,
            })
            history.push('/shopping-list')
        } catch (error) {
            setSuccessMessage('')
            setErrorMessage('Error al crear la lista')
            console.log(error)
        }
    }

    const handleChange = e => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSave = async currentList => {
        const updatedList = {
            id: currentList.id,
        }

        updatedList.name =
            updatedData && updatedData.name
                ? updatedData.name
                : currentProduct.name

        try {
            await updateList(updatedList)
            const listOfLists = await fetchShoppingLists(userId)

            setShoppingLists(listOfLists)
            setErrorMessage('')
            setSuccessMessage('Lista actualizada')
        } catch (error) {
            setSuccessMessage('')
            setErrorMessage('Error al modificar la lista')
            console.log(error)
        }
    }

    const handleDelete = async list => {
        try {
            // Primero eliminamos todos sus elementos
            const currentList = await fetchShoppingList(list.id)

            currentList.forEach(async product => {
                await deleteItemList(product.id)
            })

            // Finalmente eliminamos la lista
            await deleteList(list.id)

            const newList = await fetchShoppingLists(userId)
            setShoppingLists(newList)

            setErrorMessage('')
            setSuccessMessage(`Lista ${list.name} eliminada`)
        } catch (error) {
            setErrorMessage('Error al eliminar la lista')
            setSuccessMessage('')
            console.log(error)
        }
    }

    const handleDuplicate = async currentList => {
        const newList = {
            userId,
            name: `${currentList.name}__copia`,
        }

        try {
            const documentReference = await createNewList(newList)
            const list = await fetchShoppingList(currentList.id)

            list.forEach(async product => {
                const duplicatedProduct = {
                    listId: documentReference.id,
                    name: product.name,
                    quantity: 0,
                }
                await createListItem(duplicatedProduct)
            })
            setTransactionDone(true)
        } catch (error) {
            setSuccessMessage('')
            setErrorMessage('Error al duplicar la lista')
            console.log('error', error)
        }
    }

    const handleGoList = list => {
        setShoppingList(list)
        history.push('/shopping-list')
    }

    /* -------------------------------------------------------------------- */
    /* ---------------------------- USE EFFECTS --------------------------- */
    /* -------------------------------------------------------------------- */
    useEffect(() => {
        nameRef.current.select()
    }, [])

    useEffect(async () => {
        if (!transactionDone) return

        try {
            const newList = await fetchShoppingLists(userId)
            setShoppingLists(newList)
        } catch (error) {
            console.log(error)
        }
    }, [transactionDone])

    return (
        <MainLayout>
            <div className='input-box'>
                <h1 className='input-box__title'>Crear nueva lista</h1>
                <form className='input-box__form' onSubmit={handleSubmit}>
                    <input
                        type='text'
                        className='input shopping-lists__input'
                        name='name'
                        value={name}
                        ref={nameRef}
                        placeholder='Nombre de la lista'
                        autoFocus
                        onChange={handleChange}
                    />
                    <div className='message-container'>
                        {errorMessage && (
                            <Alert type='error' message={errorMessage} />
                        )}
                    </div>
                    <button type='submit' className='btn form__btn'>
                        Aceptar
                    </button>
                </form>
            </div>
            {shoppingLists && shoppingLists.length > 0 && (
                <div className='table-container'>
                    <div className='message-container'>
                        {successMessage && (
                            <Alert type='success' message={successMessage} />
                        )}
                    </div>
                    <table className='table'>
                        <tbody>
                            {shoppingLists.map(list => (
                                <tr key={list.id} className='table__tr'>
                                    <td className='table__icon-cell'>
                                        <i
                                            className='fas fa-arrow-circle-left fa-lg table__go'
                                            onClick={() => handleGoList(list)}
                                        ></i>
                                    </td>
                                    <td className='table__td'>
                                        <TableCell
                                            initialValue={{
                                                name: 'name',
                                                value: list.name,
                                            }}
                                            fetchNewValue={fetchNewValue}
                                        />
                                    </td>
                                    <td className='table__icon-cell'>
                                        <i
                                            className='fas fa-save fa-lg table__edit'
                                            onClick={() => handleSave(list)}
                                        ></i>
                                    </td>
                                    <td className='table__icon-cell'>
                                        <i
                                            className='fas fa-trash-alt fa-lg table__del'
                                            onClick={() => handleDelete(list)}
                                        ></i>
                                    </td>
                                    <td className='table__icon-cell'>
                                        <i
                                            className='far fa-copy fa-lg'
                                            onClick={() =>
                                                handleDuplicate(list)
                                            }
                                        ></i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </MainLayout>
    )
}

export default ShoppingLists
