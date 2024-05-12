import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { User } from "../../interfaces/interface";
import { PencilIcon, CheckIcon  } from "@heroicons/react/24/outline";
import { fetchUser } from "../../api/methods/auth/users";
import { UserDataContext } from "../../providers/userData.context";
import { useToast } from "../../contexts/ToastContext";


const Profile = () => {

  const [edit, setEdit] = useState(false)
  const [editUser, setEditUser] = useState({})


  const {register, handleSubmit, formState:{errors}, watch} = useForm();
  const { userDetails, setUserDetails } = useContext(UserDataContext)
  const { toastSuccess, toastError } = useToast()

  const password = useRef({});
  password.current = watch('password', '')

  const onSubmit = async(data: User) => {

  }

  const handleClick = () => {
    setEdit(!edit)
  }


  return (
    <div className="pl-[6rem] w-full h-screen flex flex-col py-11 px-4 items-center">
      <div className="w-full sm:w-[500px] flex flex-col gap-4 items-center">
        <div className="w-full flex justify-center items-center">
            <h1 className="font-medium text-[#116A7B] text-2xl uppercase">Profile</h1>
        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit(onSubmit)} className="w-full grid grid-cols-1 gap-2 md:grid-cols-2">

        </form>

      </div>
    </div>
  )
}

export default Profile