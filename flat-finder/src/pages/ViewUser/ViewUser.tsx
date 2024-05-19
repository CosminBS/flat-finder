import { useContext, useEffect, useState } from "react"
import { fetchUsers, grantAdminRole } from "../../api/methods/auth/users"
import { useParams } from "react-router"
import { UserDataContext } from "../../providers/userData.context"

const ViewUser = () => {

  const { uid } = useParams()
  const [user, setUser] = useState({})

  useEffect(() => {
    const allUsers = async() => {
      const users = await fetchUsers();
      users.forEach((user) => {
        if(user.uid === uid){
          setUser(user)
        }
      }) 
    }
    allUsers()
  },[])

  const deleteUser = async(uid: string) => {
    console.log('Utilizator sters')
  }

  const grantAdmin = async(uid:string) => {

    try{
      const succes = await grantAdminRole(uid, {role: 'admin'});
      if(succes){
        setUser((prevUser) => ({...prevUser, role: 'admin'}))
      }
    }catch(error){
      console.error(error)
    }
    
  }

  return (
    <div className="w-full h-full flex items-center justify-center pl-[5rem] py-11 flex-col">
        <div className="w-full flex justify-center items-center gap-3">
              <h6 className="font-medium text-[#116A7B] text-lg uppercase">User:</h6>
              <p className="">{user.lastName} {user.firstName}</p>
        </div>
        <div className="flex flex-col gap-5 w-full sm:w-[550px] lg:w-[700px]">

          <div className="grid grid-cols-1  w-full px-5 gap-3 py-5 rounded-md bg-white">

            <span className="flex flex-col sm:flex-row sm:items-center gap-3">
              <h5 className="font-semibold text-lg">First name:</h5>
              <p >{user.firstName}</p>
            </span>

            <span className="flex flex-col sm:flex-row sm:items-center gap-3">
              <h5 className="font-semibold text-lg">Published Flats:</h5>
              <p>counter</p>
            </span>

            <span className="flex flex-col sm:items-center sm:flex-row gap-3 ">
              <h5 className="font-semibold text-lg">Last name:</h5>
              <p >{user.lastName}</p>
            </span>

            <span className="flex flex-col sm:flex-row sm:items-center gap-3">
              <h5 className="font-semibold text-lg">Email:</h5>
              <p >{user.email}</p>
            </span>

            <span className="flex flex-col sm:items-center sm:flex-row gap-3 ">
              <h5 className="font-semibold text-lg">Birth date:</h5>
              <p >{user.dateOfBirth}</p>
            </span>

            <span className="flex flex-col sm:items-center sm:flex-row gap-3 ">
              <h5 className="font-semibold text-lg">Role:</h5>
              <p >{user.role}</p>
            </span>

            <span className="flex flex-col items-start justify-start gap-3 sm:flex-row ">
              <button onClick={() => deleteUser()} className="hover:underline text-red-600">Delete user</button>
              <button onClick={() => grantAdmin()} className="hover:underline text-[#116A7B]">Grant admin</button>
            </span>

          </div>

        </div>
    </div>
  )
}

export default ViewUser