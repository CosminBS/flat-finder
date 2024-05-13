import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import { UserDataContext } from "../../providers/userData.context"
import { useToast } from "../../contexts/ToastContext"
import { getFlats } from "../../api/methods/addFlats/addFlats"
import Footer from "../../components/Footer/Footer"

const ViewFlat = () => {
    
    const { uid } = useParams()
    const { userDetails, flats, setFlats, setLoading } = useContext(UserDataContext);
    const { toastSuccess, toastError } = useToast()
    const [selectedFlat, setSelectedFlat] = useState({})

    useEffect(() => {
        const fetchFlats = async() => {
            try{
                setLoading(true)
                const allFlats = await getFlats()
                setFlats(allFlats)
            }catch(error){
                throw new Error('Error fetching flats')
            }finally{
                setLoading(false)
            }
        }

        fetchFlats()
    },[])

    useEffect(() => {
        if(userDetails && flats.length > 0){
            const flat = flats.find((flat) => flat.uid === uid)
            setSelectedFlat(flat)
        }
    },[userDetails, flats, uid])

    return (
    <div className="pl-[5rem] bg-[#ECECEB] h-full flex flex-col justify-between">
        {selectedFlat && (
            <div className="flex px-3 py-7 flex-col lg:gap-3 items-center">
                <div className="bg-gray-400 w-full h-[300px] bg-cover bg-center rounded-tl-md rounded-tr-md lg:w-[500px] lg:h-[500px] lg:rounded-md lg:shadow-md " style={{backgroundImage: `url(${selectedFlat.imageURL})`}}></div>
                <div className="w-full bg-white shadow-lg px-3 py-4 gap-5 flex flex-col sm:grid sm:grid-cols-2 sm:items-center lg:flex lg:flex-col lg:items-start  lg:rounded-md">
                    <span className="flex gap-2 items-center "><p className="text-[17px] font-semibold">City:</p> <p>{selectedFlat.city}</p></span>
                    <span className="flex gap-2 items-center"><p className="text-[17px] font-semibold">Street Name:</p> <p>{selectedFlat.streetName}</p></span>
                    
                    <span className="flex gap-2 items-center"><p className="text-[17px] font-semibold">Street Number:</p> <p>{selectedFlat.streetNumber}</p></span>

                    <span className="flex gap-2 items-center"><p className="text-[17px] font-semibold">Area Size:</p> <p>{selectedFlat.areaSize}</p></span>

                    <span className="flex gap-2 items-center"><p className="text-[17px] font-semibold">Has AC:</p> <p>{selectedFlat.hasAC}</p></span>
                    
                    <span className="flex gap-2 items-center"><p className="text-[17px] font-semibold">Year Built:</p> <p>{selectedFlat.yearBuilt}</p></span>

                    <span className="flex gap-2 items-center"><p className="text-[17px] font-semibold">Rent Price:</p> <p>{selectedFlat.rentPrice}</p></span>

                    <span className="flex gap-2 items-center"><p className="text-[17px] font-semibold">Available until:</p> <p>{selectedFlat.endDate}</p></span>
                </div>
                <div className="py-3 px-3 gap-3 flex flex-col w-full items-start">
                    <span className="flex gap-2 items-center"><p className="text-[17px] font-semibold">Posted By:</p> <p>{selectedFlat.firstName} {selectedFlat.lastName}</p></span>
                    <span className="flex gap-2 items-center"><p className="text-[17px] font-semibold">Email:</p> <p>{selectedFlat.email}</p></span>
                    <button className="py-2 px-3 rounded-sm bg-[#116A7B] text-white text-sm md:w-[150px] shadow-md hover:bg-[#274f5c]">Send a message</button>
                </div>
            </div>
        )}
        <Footer/>
    </div>
  )
}

export default ViewFlat