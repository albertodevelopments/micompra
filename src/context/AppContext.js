import React, { createContext, useState } from 'react'

export const AppContext = createContext()

const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [shoppingLists, setShoppingLists] = useState(null)
    const [shoppingList, setShoppingList] = useState(null)

    const clearContext = () => {
        setUser(null)
        setShoppingList(null)
        setShoppingLists(null)
    }

    return (
        <AppContext.Provider
            value={{
                user,
                shoppingLists,
                shoppingList,
                setUser,
                setShoppingLists,
                setShoppingList,
                clearContext,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider
