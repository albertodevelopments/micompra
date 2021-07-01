import React, { useState, useEffect } from 'react'

import './styles.css'

const TableCell = ({ initialValue, fetchNewValue, classList = '' }) => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [cellData, setCellData] = useState(initialValue)

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const handleChange = e => {
        setCellData({
            name: e.target.name,
            value: e.target.value,
        })
        fetchNewValue({
            name: e.target.name,
            value: e.target.value,
        })
    }

    /* -------------------------------------------------------------------- */
    /* ---------------------------- USE EFFECTS --------------------------- */
    /* -------------------------------------------------------------------- */
    useEffect(() => {
        setCellData(initialValue)
    }, [])

    return (
        <input
            name={cellData.name}
            value={cellData.value}
            onChange={handleChange}
            className={`cell-input ${classList}`}
        />
    )
}

export default TableCell
