import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { User } from '../../../interfaces/interface'
import { auth, db } from '../../firebase/firebase.config'


// Register user
export async function registerUser(user: User){
    try{
        const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password as string)
        await createUserInDb({uid:userCredential.user.uid, email:user.email, firstName:user.firstName, lastName:user.lastName, dateOfBirth:user.dateOfBirth})
        
    } catch (error){
        console.error(error)
    }
}

// Login user
export async function loginUser(user: User){
    
    const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password as string)

    return fetchUser(userCredential.user.uid)
}

// Create users db
async function createUserInDb(user: User){
    try {
        await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            dateOfBirth: user.dateOfBirth
        })
        console.log('User Registered')
    } catch (error) {
        console.error(error)
    }
}

// fetch users
export async function fetchUser( uid:string ) {
    try{
        const docRef = doc(db, 'users', uid)
        const docSnap = await getDoc(docRef)

        if(docSnap){
            console.log('User logged in')

            const data = docSnap.data()
            localStorage.setItem('loggedUser', JSON.stringify(data.uid as string))
            return docSnap.data()
        } else {
            console.log('User doesn\'t exist')
        }
    } catch (error){
        console.error(error)
    }
}