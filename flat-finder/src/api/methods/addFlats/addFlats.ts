import { db, storage } from "../../firebase/firebase.config";
import { setDoc, doc, getDocs, collection, DocumentData } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid"
import { newFlatForm } from "../../../interfaces/interface";
import { getDownloadURL, ref } from "firebase/storage";
import { User } from '../../../interfaces/interface'


export async function addFlat(flat: newFlatForm & { image: string }, user: User) {

    try {
        const uid = uuidv4()

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
        })
        console.log('Flats added to db')
    } catch(error){
        console.error('Error adding flats', error);
        throw error;
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
        throw error
    }
}


export async function getImageUrl(imageFile: string) {
    try {
        const storageRef = ref(storage, `${imageFile}`)
        return await getDownloadURL(storageRef);
    } catch(error){
        console.error(error)
        throw error
    }
}
