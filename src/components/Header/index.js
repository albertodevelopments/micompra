import React from 'react'

// Componentes
import LogoutIcon from '../Icons/Logout'

import styles from './styles.module.css'

const Header = () => {
    return (
        <header className={styles.container}>
            <h1 className={styles.title}>Hola, Alberto</h1>
            <LogoutIcon className={styles.logout} />
        </header>
    )
}

export default Header
