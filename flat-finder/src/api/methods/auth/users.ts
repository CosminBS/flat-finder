import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, updatePassword } from 'firebase/auth'
import { collection, doc, getDoc, getDocs, query, setDoc, where, deleteDoc, updateDoc, } from 'firebase/firestore'
import { User } from '../../../interfaces/interface'
import {  auth, db } from '../../firebase/firebase.config'


// Register user
export async function registerUser(user: User): Promise<boolean> {
    try {
        const emailExists = await checkEmail(user.email)
        if (emailExists) {
            throw new Error('Email already in use')
        }
        const favorites = user.favorites ? user.favorites : []

        const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password as string)

        await createUserInDb({
            uid:userCredential.user.uid, 
            email:user.email, 
            firstName:user.firstName, 
            lastName:user.lastName, 
            dateOfBirth:user.dateOfBirth, 
            role:'regular', 
            favorites: favorites
        })

        return true
    } catch (error) {
        console.error('Error during user registration:', error)
        throw new Error('Email addres already taken. Please try again.')
    }
}

// Login user
export async function loginUser(user: User){
    
    try{
        const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password as string)
        const loggedInUser =  fetchUser(userCredential.user.uid)
        return loggedInUser
    } catch(error:any){
        if (error.code === 'auth/wrong-password') {
            throw new Error('Invalid email or password. Please try again.'); 
        } else if (error.code === 'auth/user-not-found') {
            throw new Error('No user found with this email. Please check your email and try again.'); 
        }else if(error.code === 'auth/invalid-credential'){
            throw new Error('Invalid email address or password. Please try again later.'); 
        } else {
            console.error(error)
            throw new Error('An error occurred during login. Please try again later.'); 
        }
    }

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
        console.error(error)
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

// update profile data
export async function updateProfileData(uid: string, newData: Partial<User>): Promise<boolean> {
    try{
        const userRef = doc(db, 'users', uid)
        await updateDoc(userRef, {...newData})

        return true
    } catch(error){
        throw new Error('Error updating user data. Please try again.')
    }
}

// delete account
export async function deleteAccount(){
    try {
        const user = auth.currentUser;
        if (user) {
            const uid = user.uid
            const userDocRef = doc(db, 'users', uid)
            await deleteDoc(userDocRef)
            await user.delete();
        } else {
            console.error('No user is currently logged in.');
        }

    } catch (error) {
        console.error('Error deleting user:', error);
    }
}

// reset password
export async function resetPassword(email: string): Promise<boolean>{
    try{
        await sendPasswordResetEmail(auth, email);
        return true
    }catch(error){
        throw new Error('Error sending reset password email. Please try again later.')
    }
}


// grant admin
export async function grantAdminRole(uid: string, newData: Partial<User>): Promise<boolean>{
    try{

        const userRef = doc(db, 'users', uid);
        await updateDoc(userRef, {...newData}) 

        return true
    }catch(error){
        console.error(error)
        throw new Error('Something went wrong. Please try again later.')
    }
}