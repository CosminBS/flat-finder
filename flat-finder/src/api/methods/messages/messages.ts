import { Timestamp, addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";


// send message
export async function sendMessage(senderId: string, content: string, receptorId: string){
    try{
        const messageRef = collection(db, 'messages');
        await addDoc(messageRef, {
            senderId,
            content,
            receptorId,
            timestamp: serverTimestamp()
        })
    } catch(error){
        console.error(error)
    }
}

// get message
export async function getMessage(senderId: string, receptorId: string) {
    try {
        const messageRef = collection(db, "messages");
        const q = query(messageRef, where("senderId", "==", senderId), where("receptorId", "==", receptorId));
        const querySnapshot = await getDocs(q);
        
        const messages: any[] = [];
        querySnapshot.forEach((doc) => {
            const messageData = {
                content: doc.data().content,
                timestamp: doc.data().timestamp.toDate() 
            };
            messages.push(messageData);
        });
        
        return messages;
    } catch(error) {
        console.error(error);
    }
}



export async function fetchMessage(senderId: string, receptorId: string): Promise<any[]> {
    try {
        const queryRef = query(
            collection(db, 'messages'),
            where("senderId", "==", senderId),
            where("receptorId", "==", receptorId)
        );
        const querySnapshot = await getDocs(queryRef);

        const messages: any[] = [];
        querySnapshot.forEach((doc) => {
            messages.push({
                content: doc.data().content,
                timestamp: doc.data().timestamp.toDate() 
            });
        });

        return messages;

    } catch (error) {
        console.error(error);
        return []; 
    }
}