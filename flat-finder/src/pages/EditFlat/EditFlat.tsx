import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { UserDataContext } from "../../providers/userData.context"
import { useParams } from "react-router"
import { getFlats, updateFlatData } from "../../api/methods/addFlats/addFlats"
import { useToast } from "../../contexts/ToastContext"

const EditFlat = () => {

  const {register, handleSubmit, formState:{errors}} = useForm()
  const { toastError, toastSuccess } = useToast()
  const { setFlats, userDetails, flats, setLoading } = useContext(UserDataContext)
  const { uid } = useParams()

  const [editFlat, setEditFlat] = useState({})
  const [isEditClicked, setIsEditClicked] = useState(false) 


  useEffect(() => {
    const fetchFlats = async() => {
      try{
        setLoading(true)
        const allFlats = await getFlats()
        setFlats(allFlats)
      }catch(error){
        console.log(error)
      }finally{
        setLoading(false)
      }
    }

    fetchFlats()
  },[])

  useEffect(() => {
    if(userDetails && flats.length > 0){
      const flat = flats.find((flat: any) => flat.uid === uid)
      setEditFlat(flat)
    }
  },[userDetails, flats, uid])

  const onSubmit = async (data: any) => {
    try {

      setLoading(true)

      if (!uid) {
        throw new Error('UID is undefined');
      }

      const updatedData = { ...editFlat };

      Object.keys(data).forEach((key) => {
        if (data[key] !== undefined && data[key] !== "") {
          updatedData[key] = data[key];
        }
      });

      const success = await updateFlatData(uid, updatedData);

      if (success) {
        toastSuccess('Your flat was updated.');
        setFlats((prevFlats) =>
          prevFlats.map((flat) =>
            flat.uid === uid ? { ...flat, ...updatedData } : flat
          )
        );
      }
      setIsEditClicked(!isEditClicked)

    } catch (error: any) {
      console.error(error);
      toastError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleClick = () => {
    setIsEditClicked(!isEditClicked)
  }

  return (
    <div className="w-full flex justify-center items-center py-10 flex-col pl-[5rem]">

        <div className="w-full flex justify-center items-center">
            <h1 className="font-medium text-[#116A7B] text-2xl uppercase">Edit flat</h1>
        </div>

        <form className="w-full flex flex-col gap-2 px-5" onSubmit={handleSubmit(onSubmit)}>
         <div className="w-full flex flex-col py-11 gap-8 justify-center items-center">

            {/* image */}
            {isEditClicked ? 
            (<div className="flex flex-col gap-2 w-full sm:w-[500px] md:w-[600px]">
                <label htmlFor="image">Select image</label>
                <input type="file" id="image" {...register('image')} />
            </div>) : (
              <div className="bg-gray-400 w-full h-[300px] bg-cover bg-center rounded-tl-md rounded-tr-md lg:w-[500px] lg:h-[500px] lg:rounded-md lg:shadow-md" style={{backgroundImage: `url(${editFlat.imageURL})`}} />
            )}
            
            {/* city */}
            {isEditClicked ? (<div className="flex flex-col gap-2 w-full sm:w-[500px] md:w-[600px]">
                <label htmlFor="city">City:</label>
                <input type="text" id="city" placeholder={editFlat.city} {...register('city')} className="pl-1 py-3 border-[2px] border-black rounded-md focus:outline-none focus:border-[#116A7B]" />
            </div>) : (<div className="w-full items-center gap-3 sm:w-[500px] md:w-[600px] flex"><h5 className="font-semibold text-xl">City:</h5><p>{editFlat.city}</p></div>)}


            {/* Street Name */}
            {isEditClicked ? (<div className="flex flex-col gap-2 w-full sm:w-[500px] md:w-[600px]">
                <label htmlFor="streetName">Street Name:</label>
                <input type="text" id="streetName" placeholder={editFlat.streetName} {...register('streetName')} className="pl-1 py-3 border-[2px] border-black rounded-md focus:outline-none focus:border-[#116A7B]" />
            </div>) : (<div className="w-full items-center gap-3 sm:w-[500px] md:w-[600px] flex"><h5 className="font-semibold text-xl">Street Name:</h5><p>{editFlat.streetName}</p></div>)}

            {/* Stree Number */}
            {isEditClicked ? (<div className="flex flex-col gap-2 w-full sm:w-[500px] md:w-[600px]">
                <label htmlFor="streetNumber">Street Number:</label>
                <input type="number" id="streetNumber" placeholder={editFlat.streetNumber} {...register('streetNumber')} className="pl-1 py-3 border-[2px] border-black rounded-md focus:outline-none focus:border-[#116A7B]"/>
            </div>) : (<div className="w-full items-center gap-3 sm:w-[500px] md:w-[600px] flex"><h5 className="font-semibold text-xl">Street Number:</h5><p>{editFlat.streetNumber}</p></div>)}

            {/* Area Size */}
            {isEditClicked ? (<div className="flex flex-col gap-2 w-full sm:w-[500px] md:w-[600px]">
                <label htmlFor="areaSize">Area Size:</label>
                <input type="number" id="areaSize" placeholder={editFlat.areaSize} {...register('areaSize')} className="pl-1 py-3 border-[2px] border-black rounded-md focus:outline-none focus:border-[#116A7B]"/>
            </div>) : (<div className="w-full items-center gap-3 sm:w-[500px] md:w-[600px] flex"><h5 className="font-semibold text-xl">Area Size:</h5><p>{editFlat.areaSize}</p></div>)}

            {/* Has AC */}
            {isEditClicked ? (<div className="flex flex-col gap-2 w-full sm:w-[500px] md:w-[600px]">
                <label htmlFor="hasAC">Has AC:</label>
                <select id="hasAC" {...register('hasAC')} className="pl-1 py-3 border-[2px] border-black rounded-md focus:outline-none focus:border-[#116A7B]">
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>) : (<div className="w-full items-center gap-3 sm:w-[500px] md:w-[600px] flex"><h5 className="font-semibold text-xl">Has AC:</h5><p>{editFlat.hasAC}</p></div>)}

            {/* Built Year */}
            {isEditClicked ? (<div className="flex flex-col gap-2 w-full sm:w-[500px] md:w-[600px]">
                <label htmlFor="yearBuilt">Construction Year:</label>
                <input type="number" id="yearBuilt" placeholder={editFlat.yearBuilt} {...register('yearBuilt')} className="pl-1 py-3 border-[2px] border-black rounded-md focus:outline-none focus:border-[#116A7B]"/>
            </div>) : (<div className="w-full items-center gap-3 sm:w-[500px] md:w-[600px] flex"><h5 className="font-semibold text-xl">Construction Year:</h5><p>{editFlat.yearBuilt}</p></div>)}

            {/* Rent Price */}
            {isEditClicked ? (<div className="flex flex-col gap-2 w-full sm:w-[500px] md:w-[600px]">
                <label htmlFor="rentPrice">Rent Price:</label>
                <input type="number" id="rentPrice" placeholder={editFlat.rentPrice} {...register('rentPrice')} className="pl-1 py-3 border-[2px] border-black rounded-md focus:outline-none focus:border-[#116A7B]"/>
            </div>) : (<div className="w-full items-center gap-3 sm:w-[500px] md:w-[600px] flex"><h5 className="font-semibold text-xl">Rent Price:</h5><p>{editFlat.rentPrice}</p></div>)}

            {/* Available Date */}
            {isEditClicked ? (<div className="flex flex-col gap-2 w-full sm:w-[500px] md:w-[600px]">
                <label htmlFor="availableDate">Avialable Date</label>
                <input type="date" id="availableDate" {...register('startDate')} className="pl-1 py-3 border-[2px] border-black rounded-md focus:outline-none focus:border-[#116A7B]"/>
                <input type="date" id="availableDate" {...register('endDate')} className="pl-1 py-3 border-[2px] border-black rounded-md focus:outline-none focus:border-[#116A7B]"/>
            </div>) : (<div className="w-full items-center gap-3 sm:w-[500px] md:w-[600px] flex"><h5 className="font-semibold text-xl">Avialable Date:</h5><p>{editFlat.endDate}</p></div>)}

            <div className="w-full flex justify-center items-center">
                { isEditClicked && <button type="submit" className="px-3 py-2 bg-[#116A7B] flex w-full sm:w-[225px] text-white items-center justify-center gap-2 rounded-md hover:bg-[#274f5c] hover:shadow-md">
                Update flat
                </button>}
            </div>
         </div>
        </form>
        { !isEditClicked && <button className="px-3 py-2 bg-[#116A7B] w-[60%] flex sm:w-[225px] text-white items-center justify-center gap-2 rounded-md hover:bg-[#274f5c] hover:shadow-md" onClick={() => handleClick()}>Edit</button>}
    </div>
  )
}

export default EditFlat