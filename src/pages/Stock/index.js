import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

// Componentes
import MainLayout from 'components/MainLayout'
import TableCell from 'components/TableCell'
import Alert from 'components/Alert'

// Contexto
import { AppContext } from 'context/AppContext'

// Servicios
import {
    createStockProduct,
    createNewList,
    createListItem,
    fetchStock,
    deleteStockProduct,
    updateStockProduct,
    fetchShoppingLists,
} from '../../firebase/client'

import { composeListName } from 'util'

import './styles.css'

const Stock = () => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const { user, setShoppingLists, setShoppingList } = useContext(AppContext)
    const { id: userId } = user
    const [productsList, setProductsList] = useState(null)
    const [inputData, setInputData] = useState({
        name: '',
        quantity: 0,
    })
    const { name, quantity } = inputData
    const [updatedData, setUpdatedData] = useState({})
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    const history = useHistory()

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

    const handleSubmit = async e => {
        e.preventDefault()

        if (name === '') {
            setSuccessMessage('')
            setErrorMessage('Introduce un nombre del producto')
            return
        }

        if (quantity === 0) {
            setSuccessMessage('')
            setErrorMessage('Introduce una cantidad')
            return
        }

        const newProduct = {
            ...inputData,
            userId,
        }

        try {
            const updatedStock = await createStockProduct(newProduct)
            setProductsList(updatedStock)
            setErrorMessage('')
            setSuccessMessage('Producto añadido a las existencias')
        } catch (error) {
            setSuccessMessage('')
            setErrorMessage('Error al añadir el producto')
            console.log('error', error)
        }
    }

    const handleChange = e => {
        setInputData({
            ...inputData,
            [e.target.name]:
                e.target.name === 'name'
                    ? e.target.value
                    : parseInt(e.target.value),
        })
    }

    const handleSave = async currentProduct => {
        const updatedProduct = {
            id: currentProduct.id,
        }

        updatedProduct.name =
            updatedData && updatedData.name
                ? updatedData.name
                : currentProduct.name
        updatedProduct.quantity =
            updatedData && updatedData.quantity
                ? parseInt(updatedData.quantity)
                : parseInt(currentProduct.quantity)

        try {
            await updateStockProduct(updatedProduct)
            const newStock = await fetchStock(userId)

            setProductsList(newStock)
            setErrorMessage('')
            setSuccessMessage('Lista Existencias actualizada')
        } catch (error) {
            setSuccessMessage(``)
            setErrorMessage('Error al actualizar las existencias')
            console.log(error)
        }
    }

    const handleDelete = async productId => {
        try {
            await deleteStockProduct(productId)
            const newStock = await fetchStock(userId)

            setProductsList(newStock)
            setErrorMessage('')
            setSuccessMessage('Producto eliminado')
        } catch (error) {
            setSuccessMessage('')
            setErrorMessage('Error al eliminar el produto')
            console.log('error', error)
        }
    }

    const handleCreateList = async () => {
        const newList = {
            userId,
            name: `${composeListName()}__existencias`,
        }

        try {
            const documentReference = await createNewList(newList) // Creamos la lista y recuperamos su id
            newList.id = documentReference.id
            /* Nos guardamos la lista como la actual para seleccionarla por defecto 
               una vez naveguemos a la pantalla de listas de la compra
            */
            setShoppingList(newList)

            // Para cada producto de existencias creamos uno de la lista
            productsList.forEach(async stockProduct => {
                const listProduct = {
                    listId: newList.id,
                    name: stockProduct.name,
                    quantity: stockProduct.quantity,
                }
                await createListItem(listProduct)
            })
            const updatedShoppingLists = await fetchShoppingLists(userId)
            setShoppingLists(updatedShoppingLists) // Actualizamos el conjunto de listas con la nueva creada
            history.push('/shopping-lists')
        } catch (error) {
            setSuccessMessage('')
            setErrorMessage('Error al generar la nueva lista')
            console.log('error', error)
        }
    }

    /* -------------------------------------------------------------------- */
    /* ---------------------------- USE EFFECTS --------------------------- */
    /* -------------------------------------------------------------------- */
    useEffect(async () => {
        if (!userId) return

        try {
            const stock = await fetchStock(userId)
            setProductsList(stock)
        } catch (error) {
            console.log('error', error)
        }
    }, [userId])

    return (
        <MainLayout>
            <div className='input-box'>
                <h1 className='input-box__title'>Añadir Productos</h1>
                <form className='input-box__form' onSubmit={handleSubmit}>
                    <input
                        type='text'
                        className='input stock__input'
                        name='name'
                        placeholder='Nombre del producto'
                        onChange={handleChange}
                    />
                    <input
                        type='number'
                        className='input stock__input'
                        name='quantity'
                        placeholder='Cantidad actual'
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

            {productsList && productsList.length > 0 && (
                <div className='table-container'>
                    <button
                        type='button'
                        className='btn form__btn form__create-list'
                        onClick={handleCreateList}
                    >
                        Crear lista de la compra
                    </button>
                    <div className='message-container'>
                        {successMessage && (
                            <Alert type='success' message={successMessage} />
                        )}
                    </div>
                    <table className='table'>
                        <tbody>
                            {productsList &&
                                productsList.map(product => (
                                    <tr key={product.id} className='table__tr'>
                                        <td className='table__td stock-td__name'>
                                            <TableCell
                                                item={product}
                                                initialValue={{
                                                    name: 'name',
                                                    value: product.name,
                                                }}
                                                fetchNewValue={fetchNewValue}
                                            />
                                        </td>
                                        <td className='table__td stock-td__quantity'>
                                            <TableCell
                                                item={product}
                                                initialValue={{
                                                    name: 'quantity',
                                                    value: product.quantity,
                                                }}
                                                fetchNewValue={fetchNewValue}
                                                classList='align-right'
                                            />
                                        </td>
                                        <td className='table__icon-cell'>
                                            <i
                                                className='fas fa-save fa-lg table__edit'
                                                onClick={() =>
                                                    handleSave(product)
                                                }
                                            ></i>
                                        </td>
                                        <td className='table__icon-cell'>
                                            <i
                                                className='fas fa-trash-alt fa-lg table__del'
                                                onClick={() =>
                                                    handleDelete(product.id)
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

export default Stock
