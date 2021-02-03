import React from 'react'

// Componentes
import NewIcon from '../Icons/New'
import ListIcon from '../Icons/List'
import FoodIcon from '../Icons/Food'
import TemplateIcon from '../Icons/Template'

import styles from './styles.module.css'

const Menu = () => {
    return (
        <aside className={styles.container}>
            <ul>
                <li className={styles.menuItem}>
                    <NewIcon />
                    <span className={styles.itemCaption}>Nueva Lista</span>
                </li>
                <li className={styles.menuItem}>
                    <ListIcon />
                    <span className={styles.itemCaption}>Listas Creadas</span>
                </li>
                <li className={styles.menuItem}>
                    <FoodIcon />
                    <span className={styles.itemCaption}>Despensa</span>
                </li>
                <li className={styles.menuItem}>
                    <TemplateIcon />
                    <span className={styles.itemCaption}>Plantillas</span>
                </li>
            </ul>
        </aside>
    )
}

export default Menu
