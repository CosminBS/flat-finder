import { storage } from "../../firebase/firebase.config";
import { ref, uploadBytes} from "@firebase/storage";

export async function uploadImage(imageFile: File){
    try {
        const storageRef = ref(storage, `images/${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        const imagePath = `images/${imageFile.name}`;
        return imagePath;
    } catch(error){
        console.error("Error uploading image:", error);
        throw error
    }
}