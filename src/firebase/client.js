import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import firebaseConfig from './config'

app.initializeApp(firebaseConfig)
const db = app.firestore()

export const signUpByEmail = async inputData => {
    const { name, email, password } = inputData

    const newUser = await app
        .auth()
        .createUserWithEmailAndPassword(email, password)

    await newUser.user.updateProfile({
        displayName: name,
    })

    return newUser
}

export const signInByEmail = async inputData => {
    const { email, password } = inputData
    return await app.auth().signInWithEmailAndPassword(email, password)
}

const mapUserFromGoogleAuth = googleUser => {
    if (!googleUser) return null

    const { user } = googleUser
    const { uid, displayName } = user
    const appUser = {
        uid,
        name: displayName,
    }
    return appUser
}

export const signInWithGoogle = async () => {
    const googleProvider = new app.auth.GoogleAuthProvider()
    const user = await app.auth().signInWithPopup(googleProvider)

    return mapUserFromGoogleAuth(user)
}

export const signOut = async () => {
    return await app.auth().signOut()
}

export const createNewList = async list => {
    return await db.collection('lists').add(list)
}

export const fetchShoppingLists = async userId => {
    const listsSnapshot = await db
        .collection('lists')
        .where('userId', '==', userId)
        .orderBy('name', 'asc')
        .get()
    return await listsSnapshot.docs.map(doc => {
        const data = doc.data()
        const id = doc.id

        return {
            id,
            ...data,
        }
    })
}

export const deleteList = async listId => {
    await db.collection('lists').doc(listId).delete()
}

export const updateList = async list => {
    await db.collection('lists').doc(list.id).update(list)
}

export const fetchShoppingList = async listId => {
    const listSnapshot = await db
        .collection('list')
        .where('listId', '==', listId)
        .orderBy('name', 'asc')
        .get()
    return await listSnapshot.docs.map(doc => {
        const data = doc.data()
        const id = doc.id

        return {
            id,
            ...data,
        }
    })
}

export const createListItem = async itemList => {
    await db.collection('list').add(itemList)
    return await fetchShoppingList(itemList.listId)
}

export const deleteItemList = async itemId => {
    await db.collection('list').doc(itemId).delete()
}

export const updateListItem = async item => {
    await db.collection('list').doc(item.id).update(item)
}

export const fetchStock = async userId => {
    console.log('userId', userId)
    const listSnapshot = await db
        .collection('stock')
        .where('userId', '==', userId)
        .orderBy('name', 'asc')
        .get()
    return await listSnapshot.docs.map(doc => {
        const data = doc.data()
        const id = doc.id

        return {
            id,
            ...data,
        }
    })
}

export const createStockProduct = async stockProduct => {
    await db.collection('stock').add(stockProduct)
    return await fetchStock(stockProduct.userId)
}

export const deleteStockProduct = async productId => {
    await db.collection('stock').doc(productId).delete()
}

export const updateStockProduct = async product => {
    await db.collection('stock').doc(product.id).update(product)
}
