import React from 'react'

// Componentes
import Alert from '../../components/Alert'
import Menu from '../../components/Menu'
import Header from '../../components/Header'
import Ok from '../../components/Icons/Ok'

import styles from './styles.module.css'

const Shopping = () => {
    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */

    /* -------------------------------------------------------------------- */
    /* --------------------------- RENDERIZADO ---------------------------- */
    /* -------------------------------------------------------------------- */
    return (
        <div className={styles.wrapper}>
            <Header />
            <section className={styles.container}>
                <Menu />
                <main className={styles.body}>
                    <h1 className={styles.title}>Lista de la compra 1</h1>
                    <form className={styles.form}>
                        <select className={styles.select}>
                            <option>Cereales</option>
                            <option>Leche</option>
                            <option>Agua</option>
                            <option>Yogures</option>
                        </select>
                        <input type='number' className={styles.quantity} />
                        <button type='submit' className={styles.submit}>
                            <Ok />
                        </button>
                    </form>
                    <div className={styles.table}>
                        <div className={styles.row}>
                            <div className={styles.cell}>Huevos</div>
                            <div className={styles.cell}>5</div>
                            <div className={styles.cell}>Ok</div>
                            <div className={styles.cell}>Borrar</div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.cell}>Zumo</div>
                            <div className={styles.cell}>2</div>
                            <div className={styles.cell}>Ok</div>
                            <div className={styles.cell}>Borrar</div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.cell}>Pan</div>
                            <div className={styles.cell}>1</div>
                            <div className={styles.cell}>Ok</div>
                            <div className={styles.cell}>Borrar</div>
                        </div>
                    </div>
                </main>
            </section>
        </div>
    )
}

export default Shopping
