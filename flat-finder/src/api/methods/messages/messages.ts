import { DocumentData, addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";

// send message
export async function sendMessage(senderId: string, content: string, receptorId: string) {
    try {
        const messageRef = collection(db, 'messages');
        await addDoc(messageRef, {
            senderId,
            content,
            receptorId,
            timestamp: serverTimestamp()
        });
    } catch (error) {
        console.error(error);
    }
}

// get message
export async function getMessage(uid: string) {
    try {
        const q = query(collection(db, 'messages'), where('receptorId', '==', uid));
        const querySnapshot = await getDocs(q);
        
        const messages: DocumentData[] = [];
        querySnapshot.forEach((doc) => {
            messages.push({ ...doc.data()});
        });
        
        return messages;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


// Get owner flats id
export async function getUserIdForFlat(flatId: string): Promise<string | null> {
    try {
        const flatRef = doc(db, 'flats', flatId);
        const flatDoc = await getDoc(flatRef);

        if (flatDoc.exists()) {
            const flatData = flatDoc.data();
            const userId = flatData.userId;
            return userId;
        } else {
            console.error('Flat not found');
            return null;
        }
    } catch (error) {
        console.error('Error getting user ID for flat:', error);
        return null;
    }
}
