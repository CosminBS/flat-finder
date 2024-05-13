import { useContext } from "react"
import { UserDataContext } from "../../providers/userData.context"

const DeleteAccount = () => {


  const { userDetails, setUserDetails } = useContext(UserDataContext)




  return (
    <div className="w-full flex justify-center items-center flex-col h-screen gap-3">
      <p className="flex gap-3">First name: {userDetails.firstName}</p>
      <p className="flex gap-3">Last name: {userDetails.lastName}</p>
      <button >STERGE</button>
    </div>
  )
}

export default DeleteAccount