import { query, DocumentData, collection, where, getDocs, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";
import { FavoritesFlats } from "../../../interfaces/interface";

export async function addToFavorites(userId: string, flatId: string) {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        favorites: arrayUnion({ flatId })
      });
      console.log('Flat added to favorites!');
    } catch (error) {
      console.error('Error adding flat to favorites: ', error);
      throw new Error('Failed to add flat to favorites.');
    }
  }


export async function getFavoritesFlats(favorites: { flatId: string }[]): Promise<DocumentData[]> {
    const arr: DocumentData[] = [];
    for (const favorite of favorites) {
      const q = query(collection(db, "flats"), where("id", "==", favorite.flatId));
      const data = await getDocs(q);
      
      data.forEach((doc) => {
        console.log(doc.data());
        arr.push(doc.data());
      });
    }
    return arr;
  }

export async function removeFromFavorites(userId: string, flatId: string): Promise<void> {
    try {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, {
            favorites: (prevFavorites: string[]) => prevFavorites.filter(id => id !== flatId)
        });
    } catch (error) {
        console.error('Error removing flat from favorites:', error);
        throw new Error('Failed to remove flat from favorites.');
    }
}