import React from 'react'

// Dependencias
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// Componentes
import Login from 'pages/Login'
import NewAccount from 'pages/newAccount'
import NewList from 'pages/newList'
import ShoppingList from 'pages/shoppingList'
import ShoppingLists from 'pages/shoppingLists'
import Stock from 'pages/Stock'

// Contexto
import AppProvider from '../context/AppContext'

const MainApp = () => {
    return (
        <AppProvider>
            <Router>
                <Switch>
                    <Route exact path='/'>
                        <Login />
                    </Route>
                    <Route exact path='/new-account'>
                        <NewAccount />
                    </Route>
                    <Route exact path='/login'>
                        <Login />
                    </Route>
                    <Route exact path='/shopping-list'>
                        <ShoppingList />
                    </Route>
                    <Route exact path='/shopping-lists'>
                        <ShoppingLists />
                    </Route>
                    <Route exact path='/stock'>
                        <Stock />
                    </Route>
                </Switch>
            </Router>
        </AppProvider>
    )
}

export default MainApp
