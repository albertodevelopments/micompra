import React, { useContext, useEffect, useState, useRef } from 'react'

// Componentes
import MainLayout from 'components/MainLayout'
import TableCell from 'components/TableCell'
import Alert from 'components/Alert'

// Contexto
import { AppContext } from 'context/AppContext'

// Servicios
import {
    fetchShoppingList,
    createListItem,
    deleteItemList,
    updateListItem,
} from '../../firebase/client'

import './styles.css'

const ShoppingList = () => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const { shoppingList, shoppingLists } = useContext(AppContext)
    const [currentList, setCurrentList] = useState(null)
    const [updatedData, setUpdatedData] = useState({})
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    const [currentListId, setCurrentListId] = useState(null)
    const [inputData, setInputData] = useState({
        name: '',
        quantity: 0,
    })
    const { name, quantity } = inputData
    const listRef = useRef()

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const fetchNewValue = cellData => {
        setUpdatedData({
            ...updatedData,
            [cellData.name]:
                cellData.name === 'name'
                    ? cellData.value
                    : parseInt(cellData.value),
        })
    }

    const retrieveListItems = async listId => {
        setCurrentListId(listId)
        try {
            const list = await fetchShoppingList(listId)
            if (list) {
                setCurrentList(list)
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    const handleChangeList = async e => {
        const listId = e.target.value

        retrieveListItems(listId)
    }

    const handleChangeInput = e => {
        setInputData({
            ...inputData,
            [e.target.name]:
                e.target.name === 'name'
                    ? e.target.value
                    : parseInt(e.target.value),
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()

        if (
            !currentListId ||
            !currentList ||
            currentList.name === ' --Selecciona una lista de la compra-- '
        ) {
            setSuccessMessage('')
            setErrorMessage('Selecciona una lista')
            return
        }

        if (name === ' --Selecciona un producto-- ' || name === '') {
            setSuccessMessage('')
            setErrorMessage('Introduce un producto de la lista')
            return
        }

        if (quantity === 0) {
            setSuccessMessage('')
            setErrorMessage('Introduce una cantidad')
            return
        }

        const listItem = {
            listId: currentListId,
            name,
            quantity,
        }

        try {
            await createListItem(listItem)
            const updatedlist = await fetchShoppingList(currentListId)

            setCurrentList(updatedlist)
            setErrorMessage('')
            setSuccessMessage('Producto añadido')
        } catch (error) {
            setSuccessMessage('')
            setErrorMessage('Error al introducir el producto')
            console.log(error)
        }
    }

    const handleDelete = async itemId => {
        try {
            await deleteItemList(itemId)
            const newList = await fetchShoppingList(currentListId)

            setCurrentList(newList)
            setErrorMessage('')
            setSuccessMessage(`Producto eliminado`)
        } catch (error) {
            setSuccessMessage('')
            setErrorMessage('Error al eliminar el producto')
            console.log('error', error)
        }
    }

    const handleSave = async currentItem => {
        const updatedItem = {
            id: currentItem.id,
        }

        updatedItem.name =
            updatedData && updatedData.name
                ? updatedData.name
                : currentItem.name
        updatedItem.quantity =
            updatedData && updatedData.quantity
                ? parseInt(updatedData.quantity)
                : parseInt(currentItem.quantity)

        try {
            await updateListItem(updatedItem)
            const newList = await fetchShoppingList(currentListId)

            setCurrentList(newList)
            setErrorMessage('')
            setSuccessMessage(`Lista actualizada`)
        } catch (error) {
            setSuccessMessage('')
            setErrorMessage('Error al modificar el nombre')
            console.log(error)
        }
    }

    /* -------------------------------------------------------------------- */
    /* ---------------------------- USE EFFECTS --------------------------- */
    /* -------------------------------------------------------------------- */
    useEffect(() => {
        if (!shoppingList) return

        const { id } = shoppingList

        listRef.current.value = id

        retrieveListItems(id)
    }, [shoppingList])

    return (
        <MainLayout>
            {shoppingLists && shoppingLists.length !== 0 ? (
                <>
                    <label htmlFor='list-header' className='list-header__label'>
                        Lista seleccionada:
                    </label>
                    <select
                        className='list-header__select'
                        ref={listRef}
                        id='list-header'
                        onChange={handleChangeList}
                    >
                        <option> --Selecciona una lista de la compra-- </option>
                        {shoppingLists.map(list => {
                            return (
                                <option key={list.id} value={list.id}>
                                    {list.name}
                                </option>
                            )
                        })}
                    </select>
                    <div className='input-box'>
                        <form
                            className='input-box__form'
                            onSubmit={handleSubmit}
                        >
                            <h1 className='input-box__title'>
                                Añadir Productos
                            </h1>
                            <input
                                type='text'
                                className='input shopping-list__input'
                                name='name'
                                onChange={handleChangeInput}
                            />
                            <input
                                type='number'
                                className='input shopping-list__input'
                                name='quantity'
                                onChange={handleChangeInput}
                            />
                            <div className='message-container'>
                                {errorMessage && (
                                    <Alert
                                        type='error'
                                        message={errorMessage}
                                    />
                                )}
                            </div>
                            <button type='submit' className='btn form__btn'>
                                Aceptar
                            </button>
                        </form>
                    </div>

                    {currentList && currentList.length > 0 && (
                        <div className='table-container'>
                            <div className='message-container'>
                                {successMessage && (
                                    <Alert
                                        type='success'
                                        message={successMessage}
                                    />
                                )}
                            </div>
                            <table className='table'>
                                <tbody>
                                    {currentList.map(item => (
                                        <tr key={item.id} className='table__tr'>
                                            <td className='table__td td__name'>
                                                <TableCell
                                                    initialValue={{
                                                        name: 'name',
                                                        value: item.name,
                                                    }}
                                                    fetchNewValue={
                                                        fetchNewValue
                                                    }
                                                />
                                            </td>
                                            <td className='table__td'>
                                                <TableCell
                                                    initialValue={{
                                                        name: 'quantity',
                                                        value: item.quantity,
                                                    }}
                                                    fetchNewValue={
                                                        fetchNewValue
                                                    }
                                                    classList='align-right'
                                                />
                                            </td>
                                            <td className='table__icon-cell'>
                                                <i
                                                    className='fas fa-save fa-lg table__edit'
                                                    onClick={() =>
                                                        handleSave(item)
                                                    }
                                                ></i>
                                            </td>
                                            <td className='table__icon-cell'>
                                                <i
                                                    className='fas fa-trash-alt fa-lg table__del'
                                                    onClick={() =>
                                                        handleDelete(item.id)
                                                    }
                                                ></i>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            ) : (
                <p className='message'>No hay listas de la compra creadas</p>
            )}

            {/* <div className='list-table'>
                <div className='list-table__row'>
                    <div className='list-table__cell'>Huevos</div>
                    <div className='list-table__cell'>5</div>
                    <div className='list-table__cell'>Ok</div>
                    <div className='list-table__cell'>Borrar</div>
                </div>
                <div className={styles.row}>
                    <div className='list-table__cell'>Zumo</div>
                    <div className='list-table__cell'>2</div>
                    <div className='list-table__cell'>Ok</div>
                    <div className='list-table__cell'>Borrar</div>
                </div>
                <div className={styles.row}>
                    <div className='list-table__cell'>Pan</div>
                    <div className='list-table__cell'>1</div>
                    <div className='list-table__cell'>Ok</div>
                    <div className='list-table__cell'>Borrar</div>
                </div>
            </div> */}
        </MainLayout>
    )
}

export default ShoppingList
