import React from 'react'

import styles from './styles.module.css'

const Alert = ({ message }) => {
    return <span className={styles.message}>{message}</span>
}

export default Alert
