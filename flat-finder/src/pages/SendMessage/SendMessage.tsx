import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { getMessage, sendMessage } from "../../api/methods/messages/messages";
import { UserDataContext } from "../../providers/userData.context";
import { getFlats } from "../../api/methods/addFlats/addFlats";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../../api/firebase/firebase.config";

const SendMessage = () => {
    const { register, handleSubmit, reset } = useForm();
    const { uid } = useParams();
    const { userDetails, flats, setFlats} = useContext<any>(UserDataContext);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [receptor, setReceptor] = useState({});
    const [messages, setMessages] = useState<{ content: string, timestamp: string }[]>([]);

    const onSubmit = async (data: any) => {
        try {
            if (userDetails && userDetails.uid === receptor.uid) {
                console.log('Nu poți trimite mesaje către tine însuți.');
                return false;
            }
            
            const newMessage = {
                content: data.senderMessage,
                timestamp: new Date().toISOString(),
                senderId: userDetails.uid,
                receptorId: uid,
            };

            await sendMessage(userDetails.uid, newMessage, uid);
            reset();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchFlats = async() => {
            try {
                const allFlats = await getFlats();
                setFlats(allFlats);
            } catch (error) {
                throw new Error('Error fetching flats');
            }
        };

        fetchFlats();
    }, [setFlats]);

    useEffect(() => {
        if(userDetails && flats.length > 0) {
            const flat = flats.find((flat: any) => flat.uid === uid);
            setReceptor(flat);
        }
    }, [userDetails, flats, uid]);

    useEffect(() => {
        const q = query(
            collection(db, 'messages'),
            where('receptorId', '==', uid),
            orderBy('timestamp', 'asc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setMessages(msgs);
        });

        return () => unsubscribe();
    }, [uid]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);



    return (
        <div className="pl-[5rem] flex w-full flex-col h-screen justify-between py-3">
            <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-2 border-b-2 border-gray-300 py-3">
                <h1 className="text-md font-semibold">Send a message to:</h1> <p>{receptor.firstName} {receptor.lastName}</p>
            </div>
            <div className="px-3 h-full py-2 overflow-auto flex flex-col justify-end items-end bg-[#ECECEB] gap-2">
                {messages.map((message: any, index) => (
                    <div key={index} className="flex flex-col items-end justify-start w-full">
                        <span className="px-2 py-1 rounded-md shadow-xl bg-[#116A7B] text-white">
                            {message.content.content}
                        </span>
                        <span className="text-gray-500 text-sm">{new Date(message.content.timestamp).toLocaleString()}</span>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full flex justify-between px-3 items-center border-t-2 border-gray-300">
                    <input type="text" placeholder="Write your message..." className="py-5 w-full outline-none" {...register('senderMessage', { required: true })} />
                    <button type="submit" className="w-[120px] py-2 px-3 rounded-sm bg-[#116A7B] text-white text-sm  shadow-md hover:bg-[#274f5c]">Send</button>
                </div>
            </form>
        </div>
    );
};

export default SendMessage;
