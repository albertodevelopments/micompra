import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import firebaseConfig from './config'

app.initializeApp(firebaseConfig)
const db = app.firestore()

export const createNewList = async list => {
    const newList = await db.collection('lists').add(list)
    console.log(newList)
    //return await fetchListOfTasks(task.userId)
}

export const signUpByEmail = async inputData => {
    const { name, email, password } = inputData

    const newUser = await app
        .auth()
        .createUserWithEmailAndPassword(email, password)

    return await newUser.user.updateProfile({
        displayName: name,
    })
}

export const signInByEmail = async inputData => {
    const { email, password } = inputData
    return await app.auth().signInWithEmailAndPassword(email, password)
}
