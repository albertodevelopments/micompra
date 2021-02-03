import React from 'react'

// Dependencias
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// Componentes
import Login from '../pages/Login'
import NewAccount from '../pages/newAccount'
import NewList from '../pages/newList'
import Shopping from '../pages/shopping'
import ShoppingList from '../pages/shoppingList'

const MainApp = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/new-account'>
                    <NewAccount />
                </Route>
                <Route exact path='/login'>
                    <Login />
                </Route>
                <Route exact path='/new-list'>
                    <NewList />
                </Route>
                <Route exact path='/shopping'>
                    <Shopping />
                </Route>
                <Route exact path='/shopping-list'>
                    <ShoppingList />
                </Route>
            </Switch>
        </Router>
    )
}

export default MainApp
