import { query, DocumentData, collection, where, getDocs, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";
import { FavoritesFlats } from "../../../interfaces/interface";

export async function addToFavorites(){

}



export async function getFavoritesFlats(flats: FavoritesFlats[]) {
    const arr: DocumentData[] = [];
    for (const flat of flats) {
        const q = query(collection(db, "flats"), where("id", "==", flat.flatId));
        const data = await getDocs(q);
        
        data.forEach((doc) => {
            console.log(doc.data());
            arr.push(doc.data());
        });
    }


    return arr
}
