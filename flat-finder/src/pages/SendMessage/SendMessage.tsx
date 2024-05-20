import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useParams } from "react-router"
import { fetchUser } from "../../api/methods/auth/users"
import { fetchMessage, getMessage, sendMessage } from "../../api/methods/messages/messages"
import { UserDataContext } from "../../providers/userData.context"

const SendMessage = () => {

    const { register, handleSubmit, formState:{}, reset } = useForm()
    const { uid } = useParams()
    const { userDetails } = useContext<any>(UserDataContext)

    const [receptor, setReceptor] = useState<any>({})
    const [message, setMessage] = useState<string[]>([])

    const onSumbit = async(data: any) =>{
        try{
            const newMessage = {
                content: data.senderMessage,
                timestamp: new Date().toISOString()
            }
            await sendMessage(userDetails.uid, newMessage, uid)
            setMessage(prevMessage => [...prevMessage, newMessage])
            reset()
        }catch(error){
            console.error(error)
        }
    }

    useEffect(() => {
        const fetchData = async (uid: string) => {
            try {
                const receptorData = await fetchUser(uid);
                setReceptor(receptorData);
            } catch(error) {
                console.error(error);
            }
        };

        fetchData(uid);
    }, [uid, userDetails]);

    



  return (
    <div className="pl-[5rem] flex w-full flex-col h-screen justify-between py-3">

        <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-2 border-b-2 border-gray-300 py-3">
            <h1 className="text-md font-semibold">Send a message to:</h1> <p>{receptor.firstName} {receptor.lastName}</p>
        </div>

        <div className="px-3 h-full py-2 overflow-auto flex flex-col justify-end items-end bg-[#ECECEB] gap-2">
            {message.map((message: any, index) => (
                <div key={index} className="flex flex-col items-end justify-start w-full">
                    <span className="px-2 py-1 rounded-md shadow-xl bg-[#116A7B] text-white">
                        {message.content}
                    </span>
                    <span className="text-gray-500 text-sm">{new Date(message.timestamp).toLocaleString()}</span>
                </div>
            ))} 
        </div>

        <form onSubmit={handleSubmit(onSumbit)}>
            <div className="w-full flex justify-between px-3 items-center border-t-2 border-gray-300">
                <input type="text" placeholder="Write your message..." className="py-5 w-full outline-none" {...register('senderMessage', {required: {value: true}})}/>
                <button type="submit" className="w-[120px] py-2 px-3 rounded-sm bg-[#116A7B] text-white text-sm  shadow-md hover:bg-[#274f5c]">Send</button>
            </div>
        </form>

    </div>
  )
}

export default SendMessage

