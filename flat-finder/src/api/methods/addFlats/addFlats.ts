import { db, storage } from "../../firebase/firebase.config";
import { setDoc, doc, getDocs, collection, DocumentData, deleteDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid"
import { newFlatForm } from "../../../interfaces/interface";
import { getDownloadURL, ref } from "firebase/storage";

export async function addFlat(flat: newFlatForm & { image: string }): Promise <boolean>{


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
            email: flat.email,
            firstName: flat.firstName,
            lastName: flat.lastName,
        })
        return true
    } catch(error){
        console.error()
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


export async function deleteFlat(uid: string): Promise<boolean>{
    try{
        const flatRef = doc(db, "flats", uid)

        await deleteDoc(flatRef)

        return true

    }catch(error){
        throw new Error('Error deleting flat')
    }
}