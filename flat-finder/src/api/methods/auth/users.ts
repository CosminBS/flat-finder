import { createUserWithEmailAndPassword,  signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { collection, doc, getDoc, getDocs, query, setDoc, where, deleteDoc, onSnapshot, addDoc, updateDoc, Timestamp } from 'firebase/firestore'
import { User } from '../../../interfaces/interface'
import {  auth, db } from '../../firebase/firebase.config'


// Register user
export async function registerUser(user: User): Promise<boolean> {
    try {
        const emailExists = await checkEmail(user.email)
        if (emailExists) {
            throw new Error('Email already in use')
        }

        const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password as string)
        await createUserInDb({uid:userCredential.user.uid, email:user.email, firstName:user.firstName, lastName:user.lastName, dateOfBirth:user.dateOfBirth, role:'regular', favorites: user.favorites})
        console.log(createUserInDb)
        return true
    } catch (error: any) {
        console.error('Error during user registration:', error)
        return false 
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
            dateOfBirth: user.dateOfBirth,
            role: 'regular',
            favorites: user.favorites
        })
    } catch (error) {
        throw new Error
    }
}

// fetch user
export async function fetchUser(uid: string) {
    try {
        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const { uid } = userData

            localStorage.setItem('loggedUser', JSON.stringify( uid ));

            return userData;
        } else {
            throw new Error('User doesn\'t exist');
        }
    } catch (error) {
        throw new Error('Error fetching user');
    }
}

// log out
export async function LogOutUser(){
    try {
        await signOut(auth)
    } catch(error){
        throw new Error
    }
}

// verify if email already exists
export async function checkEmail(email: string): Promise <boolean> {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email))

    const querySnapshot = await getDocs(q)

    return !querySnapshot.empty
}


// fetch all users
export async function fetchUsers(): Promise<any[]> {
    try {
        const usersCollection = collection(db, 'users');
        const querySnapshot = await getDocs(usersCollection);

        const users: any[] = [];
        querySnapshot.forEach((doc) => {
            users.push(doc.data());
        });

        return users;

    } catch (error) {
        console.error(error);
        return []; 
    }
}

// test update
export async function updateProfileData() {

}
