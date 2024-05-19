import { storage } from "../../firebase/firebase.config";
import { ref, updateMetadata, uploadBytes} from "@firebase/storage";

export async function uploadImage(imageFile: File){
    try {
        const storageRef = ref(storage, `images/${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        const imagePath = `images/${imageFile.name}`;
        return imagePath;
    } catch(error){
        console.error("Error uploading image:", error);
        throw new Error(error as string)
    }
}

// Actualizare imagine
export async function uploadAndUpdateImage (uid: string, image: File){
    try {
      if (!image) {
        return;
      }

      const storageRef = ref(storage, `images/${uid}`);
      await uploadBytes(storageRef, image);

      const newMetadata = {
        cacheControl: 'public,max-age=300',
        contentType: image.type,
      };

      await updateMetadata(storageRef, newMetadata);
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error(error as string);
    }
  };