import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";

export async function addToFavorites(userId: string, flatId: string) {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        favorites: arrayUnion({ flatId })
      });
    } catch (error) {
      console.error('Error adding flat to favorites: ', error);
      throw new Error('Failed to add flat to favorites.');
    }
  }

  export async function removeFromFavorites(userId: string, flatId: string) {
    try {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, {
            favorites: arrayRemove({ flatId: flatId })
        });
    } catch (error) {
        console.error('Error removing flat from favorites: ', error);
        throw new Error('Failed to remove flat from favorites.');
    }
}
