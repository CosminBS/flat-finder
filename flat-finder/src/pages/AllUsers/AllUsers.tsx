import { useContext, useEffect, useState } from "react"
import { fetchUsers } from "../../api/methods/auth/users"
import { Link, useNavigate } from "react-router-dom"
import { UserDataContext } from "../../providers/userData.context"

const AllUsers = () => {

  const [allUsers, setAllUsers] = useState([])
  const navigate = useNavigate()

  const { setLoading } = useContext(UserDataContext)

  useEffect(() => {
    const fetchAllUsers = async() => {
      try{
        setLoading(true)
        const users = await fetchUsers()
        setAllUsers(users)
      }catch(error){
        throw new Error('Error fetching users')
      }finally{
        setLoading(false)
      }
    }

    fetchAllUsers()

  },[])

  return (
<div className="w-full h-full pl-[5.1rem] flex flex-col py-5 items-center justify-center">
    <div className="w-full flex flex-col items-center justify-center gap-5">
        <h1 className="font-medium text-[#116A7B] text-2xl uppercase">All Users</h1>
        <div className="overflow-x-auto w-full">
      <table className="table-auto min-w-full divide-y divide-gray-200">
        <thead className="">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Birth date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">admin</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Published flats</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {allUsers.map((user, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.firstName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.lastName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.dateOfBirth}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.role === 'admin' ? ('Yes'): ('NO')}</td>
              <td className="px-6 py-4 whitespace-nowrap">counter</td>
              <td>
                <Link to={`/view-user/${user.uid}`} className="h-6 w-6 text-[#116A7B] hover:underline">View profile</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
</div>
  )
}

export default AllUsers