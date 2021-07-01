import React from 'react'

import './styles.css'

const Alert = ({ type, message }) => {
    return (
        <span className={`message ${type === 'error' ? 'error' : 'success'}`}>
            {message}
        </span>
    )
}

export default Alert
