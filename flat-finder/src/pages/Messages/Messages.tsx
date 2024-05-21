import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { fetchUser, fetchUsers } from "../../api/methods/auth/users";
import { getMessage, sendMessage } from "../../api/methods/messages/messages";
import { UserDataContext } from "../../providers/userData.context";

const Messages = () => {
    const { register, handleSubmit, reset } = useForm();
    const { uid } = useParams();
    const { userDetails } = useContext<any>(UserDataContext);

    const [receptor, setReceptor] = useState<any>({});
    const [messages, setMessages] = useState<{ content: string, timestamp: string }[]>([]);
    const [users, setUsers] = useState<any[]>([]);

    return (
        <div className="pl-[5rem] flex w-full flex-col h-screen justify-between py-3">
            <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-2 border-b-2 border-gray-300 py-3">
                <h1 className="text-md font-semibold">View all messages</h1> 

            </div>
        </div>
    );
};

export default Messages;
