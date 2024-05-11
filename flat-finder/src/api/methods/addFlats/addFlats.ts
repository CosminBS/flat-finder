import { db, storage } from "../../firebase/firebase.config";
import { setDoc, doc, getDocs, collection, DocumentData } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid"
import { newFlatForm } from "../../../interfaces/interface";
import { getDownloadURL, ref } from "firebase/storage";
import { User } from '../../../interfaces/interface'
import { fetchUser } from "../auth/users";


export async function addFlat(flat: newFlatForm & { image: string }): Promise <boolean>{


    try {
        const uid = uuidv4()

        const user = await fetchUserFromLocalStorage()

        if(!user){
            throw new Error('User not found')
        }

        await setDoc(doc(db, "flats", uid), {
            uid: uid,
            image: flat.image,
            city: flat.city, 
            streetName: flat.streetName,
            streetNumber: flat.streetNumber,
            areaSize: flat.areaSize,
            hasAC: flat.hasAC,
            yearBuilt: flat.yearBuilt,
            rentPrice: flat.rentPrice,
            startDate: flat.startDate,
            endDate: flat.endDate,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        })
        return true
    } catch(error){
        console.error(error)
        throw new Error("Error adding flat");
        return false
    }

}


export async function getFlats() {
    try {
        const arr: DocumentData[] = []

        const data = await getDocs(collection(db, 'flats'));
    
        for (const doc of data.docs) {
            const flat = doc.data()
            const imageURL = await getImageUrl(`${flat.image}`);
            arr.push({...flat, imageURL})
        }
    
        return arr;
    } catch(error){
        console.error(error)
        throw new Error(error as string)
    }
}


export async function getImageUrl(imageFile: string) {
    try {
        const storageRef = ref(storage, `${imageFile}`)
        return await getDownloadURL(storageRef);
    } catch(error){
        console.error(error)
        throw new Error(error as string)
    }
}

export async function fetchUserFromLocalStorage(): Promise<User | null> {
    try {
        const userDataString = localStorage.getItem('loggedUser');
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            return userData as User;
        } else {
            return null;
        }
    } catch (error) {
        throw new Error('Error fetching user data from local storage');
    }
}