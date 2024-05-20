import { useContext, useEffect, useState } from "react"
import { fetchUsers } from "../../api/methods/auth/users"
import { Link } from "react-router-dom"
import { UserDataContext } from "../../providers/userData.context"
import { User } from "../../interfaces/interface"
import { ArrowsUpDownIcon, ArrowUpIcon, ArrowDownIcon, } from "@heroicons/react/24/outline";


const AllUsers = () => {

  const [allUsers, setAllUsers] = useState([])
  const [sortedUsers, setSortedUsers] = useState<User[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: string } | null>(null);

  const { setLoading } = useContext<any>(UserDataContext)

  useEffect(() => {
    const fetchAllUsers = async() => {
      try{
        setLoading(true)
        const users: any = await fetchUsers()
        setAllUsers(users)
        setSortedUsers(users); 
      }catch(error){
        throw new Error('Error fetching users')
      }finally{
        setLoading(false)
      }
    }

    fetchAllUsers()

  },[])

  useEffect(() => {
    if (sortConfig !== null) {
      const sortedArray = [...allUsers].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
      setSortedUsers(sortedArray);
    }
  }, [sortConfig, allUsers]);

  const requestSort = (key: string) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: string) => {
    if (!sortConfig) {
      return <ArrowsUpDownIcon className="h-4 w-4 inline-block" />;
    }
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') {
        return <ArrowUpIcon className="h-4 w-4 inline-block" />;
      }
      return <ArrowDownIcon className="h-4 w-4 inline-block" />;
    }
    return <ArrowsUpDownIcon className="h-4 w-4 inline-block" />;
  };

  return (
<div className="w-full h-full pl-[5.1rem] flex flex-col py-5 items-center justify-center">
    <div className="w-full flex flex-col items-center justify-center gap-5">
        <h1 className="font-medium text-[#116A7B] text-2xl uppercase">All Users</h1>
        <div className="overflow-x-auto w-full">
      <table className="table-auto min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">    <button type="button" onClick={() => requestSort('email')}>Email {getSortIcon('email')}</button>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <button type="button" onClick={() => requestSort('firstName')}>First Name {getSortIcon('firstName')}</button>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <button type="button" onClick={() => requestSort('lastName')}>Last Name {getSortIcon('lastName')}</button>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <button type="button" onClick={() => requestSort('dateOfBirth')}>Birth date {getSortIcon('dateOfBirth')}</button>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <button type="button" onClick={() => requestSort('role')}>Admin {getSortIcon('role')}</button>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedUsers.map((user: User, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.firstName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.lastName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.dateOfBirth}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.role === 'admin' ? ('Yes'): ('NO')}</td>
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