import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

// Componentes

import './styles.css'

const Menu = () => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [showMenu, setShowMenu] = useState(false)

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const handleClickMenu = () => {
        setShowMenu(!showMenu)
    }

    return (
        <nav className={`nav ${showMenu ? 'nav--show' : ''}`}>
            <div className='toggle-menu' onClick={handleClickMenu}>
                <i className='fas fa-bars toggle-menu__icon'></i>
            </div>
            <ul className={`main-menu ${showMenu ? 'main-menu--show' : ''}`}>
                <li className='main-menu__item'>
                    <NavLink
                        className='nav-link'
                        to='/shopping-list'
                        exact
                        activeClassName='active'
                    >
                        <i className='fas fa-shopping-cart main-menu__icon'></i>
                        <span>Lista de la Compra</span>
                    </NavLink>
                </li>
                <li name='shopping-lists' className='main-menu__item'>
                    <NavLink
                        className='nav-link'
                        to='/shopping-lists'
                        activeClassName='active'
                    >
                        <i className='fas fa-list-ol main-menu__icon'></i>
                        <span>Listas Creadas</span>
                    </NavLink>
                </li>

                <li name='stock' className='main-menu__item'>
                    <NavLink
                        className='nav-link'
                        to='/stock'
                        activeClassName='active'
                    >
                        <i className='fas fa-apple-alt main-menu__icon'></i>
                        <span>Existencias</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Menu
