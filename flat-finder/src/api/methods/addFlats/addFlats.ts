import { db, storage } from "../../firebase/firebase.config";
import { setDoc, doc, getDocs, collection, deleteDoc, updateDoc, query, where, orderBy } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid"
import { newFlatForm } from "../../../interfaces/interface";
import { getDownloadURL, ref } from "firebase/storage";
import { uploadImage } from "../uploadImage/uploadImage";

// Add flat
export async function addFlat(userId: string, flat: newFlatForm & { image: string }): Promise <boolean>{

    try {
        const uid = uuidv4()

        await setDoc(doc(db, "flats", uid), {
            uid: uid,
            userId: userId,
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
        console.error(error)
        throw new Error("Error adding flat");
    }

}


//  Get flats
export async function getFlats(filters: any = {}, sort: any = {}) {
    try {
        const flatsCollection = collection(db, "flats");

        let q = query(flatsCollection);

        if (filters.city) {
            q = query(q, where("city", "==", filters.city));
        }

        if (filters.minPrice) {
            q = query(q, where("rentPrice", ">=", Number(filters.minPrice)));
        }

        if (filters.maxPrice) {
            q = query(q, where("rentPrice", "<=", Number(filters.maxPrice)));
        }

        if (filters.minArea) {
            q = query(q, where("areaSize", ">=", Number(filters.minArea)));
        }

        if (filters.maxArea) {
            q = query(q, where("areaSize", "<=", Number(filters.maxArea)));
        }

        if (sort.criteria) {
            q = query(q, orderBy(sort.criteria, sort.order === "Ascending" ? "asc" : "desc"));
        }

        const data = await getDocs(q);
        const arr = [];

        for (const doc of data.docs) {
            const flat = doc.data();
            const imageURL = await getImageUrl(`${flat.image}`);
            arr.push({ ...flat, imageURL });
        }

        return arr;
    } catch(error) {
        console.error(error);
        throw new Error(error as string);
    }
}

// Get image Url
export async function getImageUrl(imageFile: string) {
    try {
        const storageRef = ref(storage, `${imageFile}`)
        return await getDownloadURL(storageRef);
    } catch(error){
        console.error(error)
        throw new Error(error as string)
    }
}

// Delete flat
export async function deleteFlat(uid: string): Promise<boolean>{
    try{
        const flatRef = doc(db, "flats", uid)
        await deleteDoc(flatRef)
        return true
    }catch(error){
        throw new Error('Error deleting flat')
    }
}


// Update flat data
export async function updateFlatData(uid: string, newData: Partial<newFlatForm>): Promise<boolean> {
    try{
        const flatRef = doc(db, 'flats', uid);

        const updatedData: any = { ...newData };
    
        if (newData.image && newData.image instanceof FileList) {
          const file = newData.image[0];
          if (file) {
            const imagePath = await uploadImage(file);
    
            updatedData.imageURL = imagePath;
    
            delete updatedData.image;
          }
        }
    
        Object.keys(updatedData).forEach(key => {
          if (updatedData[key] instanceof FileList) {
            delete updatedData[key];
          }
        });
    
        await updateDoc(flatRef, updatedData);
    
        return true
    }catch(error){
        console.error(error)
        throw new Error('Error updating flat. Please try again later.')
    }
}

