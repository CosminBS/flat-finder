import { useContext, useEffect, useState } from "react"
import { UserDataContext } from "../../providers/userData.context"
import { deleteFlat, getFlats } from "../../api/methods/addFlats/addFlats"
import { Link } from "react-router-dom"
import { TrashIcon, PencilIcon  } from "@heroicons/react/24/outline";
import { useToast } from "../../contexts/ToastContext";


const MyFlats = () => {

  const { userDetails, setLoading, flats, setFlats  } = useContext(UserDataContext);
  const { toastSuccess, toastError } = useToast()
  const [userFlats, setUserFlats] = useState([])

  useEffect(() => {
    const fetchFlats = async () => {
      try{
        if(userFlats.length < 0){
          setLoading(true)
        }else {
          setLoading(false) 
        }
        const allFlats = await getFlats();
        setFlats(allFlats);
      }catch(error){
        throw new Error('Error fatching flats')
      }finally{
        setLoading(false)
      }
    };

    fetchFlats();
  }, []);

  useEffect(() => {
    if (userDetails && userDetails.email && flats.length > 0) {
      const filteredFlats = flats.filter((flat: any) => flat.email === userDetails.email);
      setUserFlats(filteredFlats);
    }
  }, [userDetails, flats]);

  const handleDeleteFlat = async(uid: string) => {
    try{
      setLoading(true)
      await deleteFlat(uid)
      const updatedFlats = await getFlats();
      setFlats(updatedFlats)
    } catch(error){
      toastError('Erorr deleting flat. Please try again later.')
      throw new Error
    } finally{
      setLoading(false)
      toastSuccess('Success deleting flat.')
    }
  }

  return (
    userFlats.length > 0 ? (<div className="w-full h-full pl-[5.1rem] flex flex-col py-5 items-center justify-center">
    <div className="w-full flex flex-col items-center justify-center gap-5">
        <h1 className="font-medium text-[#116A7B] text-2xl uppercase">My Flats</h1>
        <div className="overflow-x-auto w-full">
      <table className="table-auto min-w-full divide-y divide-gray-200">
        <thead className="">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Street Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Street Number</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area Size</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Has AC</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year Built</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rent Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {userFlats.map((flat, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{flat.city}</td>
              <td className="px-6 py-4 whitespace-nowrap">{flat.streetName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{flat.streetNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap">{flat.areaSize}</td>
              <td className="px-6 py-4 whitespace-nowrap">{flat.hasAC ? "Yes" : "No"}</td>
              <td className="px-6 py-4 whitespace-nowrap">{flat.yearBuilt}</td>
              <td className="px-6 py-4 whitespace-nowrap">{flat.rentPrice}</td>
              <td className="px-6 py-4 whitespace-nowrap">{flat.startDate}</td>
              <td className="px-6 py-4 whitespace-nowrap">{flat.endDate}</td>
              <td className="px-6 py-4 whitespace-nowrap flex justify-center gap-3">
                <Link to={`/edit-flat/${flat.uid}`} ><PencilIcon className="h-6 w-6 text-[#116A7B] hover:text-[#7adbee]" /></Link>
                <button onClick={() => handleDeleteFlat(flat.uid)}><TrashIcon className="h-6 w-6 text-red-600 hover:text-red-300" /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
</div>) : (<div className="w-full h-[100vh] pl-[5.1rem] flex flex-col py-5 items-center justify-center"><h1>No flat yet.</h1></div>)
  )
}

export default MyFlats