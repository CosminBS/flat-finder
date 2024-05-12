import { useForm } from "react-hook-form"
import { CheckIcon }  from "@heroicons/react/24/outline"
import { newFlatForm } from "../../interfaces/interface";
import { addFlat } from "../../api/methods/addFlats/addFlats";
import { uploadImage } from "../../api/methods/uploadImage/uploadImage";
import { useState } from "react";
import { getImageUrl } from "../../api/methods/addFlats/addFlats";
import { useNavigate } from "react-router";
import { useToast } from "../../contexts/ToastContext";
import { useSpinner } from "../../contexts/SpinnerConext";
import { UserDataContext } from "../../providers/userData.context";
import { useContext } from "react";

const NewFlat = () => {

    const { userDetails } = useContext(UserDataContext);
    const { toastError, toastSuccess } = useToast()
    const { register, handleSubmit, formState:{errors} } = useForm();
    const { setLoading } = useSpinner()

    const [imageURL, setImageURL] = useState('')

    const onSubmit = async (data: newFlatForm) => {
        try {
            setLoading(true)
            let flatData = { ...data, email: userDetails.email, firstName: userDetails.firstName, lastName: userDetails.lastName }; 

            if (data.image[0]) {
                const imagePath = await uploadImage(data.image[0]); 
                const imageUrl = await getImageUrl(imagePath); 
                setImageURL(imageUrl); 
                flatData = { ...flatData, image: imageUrl };
            }
    
            const flatAdded = await addFlat(flatData);
            if(flatAdded){
                toastSuccess('Flat successfully added')
                setLoading(false)
            }
        } catch(error: any){
            toastError(error.message)
            setLoading(false)
        } 
    }

    const errorMessage = 'All fields are mandatory'

  return (
    <div className="bg-[#ececeb] pl-[6rem] flex flex-col pr-3 py-6 gap-5 z-0">
        <div className="w-full flex text-center items-center justify-center text-[1.4rem] font-semibold text-[#322744] gap-1">
            <span>Add</span> 
            <span className="text-[1.8rem] text-[#116A7B]">New</span>
            <span>Flat.</span>
        </div>
        <form className="w-full flex flex-col gap-2 bg-white px-3 rounded-xl shadow-md" onSubmit={handleSubmit(onSubmit)}>
         <div className="w-full flex flex-col py-11 gap-3 justify-center items-center">

            {/* image */}
            <div className="flex flex-col gap-2 w-full sm:w-[500px] md:w-[600px]">
                <label htmlFor="image">Select image</label>
                <input type="file" id="image" {...register('image')} />
            </div>

            {/* city */}
            <div className="flex flex-col gap-2 w-full sm:w-[500px] md:w-[600px]">
                <label htmlFor="city">City:</label>
                <input type="text" id="city" placeholder="e.g. Brasov" {...register('city', {required: {value: true, message: errorMessage}})} className="pl-1 py-3 border-[2px] border-black rounded-md focus:outline-none focus:border-[#116A7B]" />
                <p className="h-10 text-red-600 text-sm">{errors.city && errors.city.message as string}</p>
            </div>

            {/* Street Name */}
            <div className="flex flex-col gap-2 w-full sm:w-[500px] md:w-[600px]">
                <label htmlFor="streetName">Street Name:</label>
                <input type="text" id="streetName" placeholder="e.g. Principala" {...register('streetName', {required: {value: true, message: errorMessage}})} className="pl-1 py-3 border-[2px] border-black rounded-md focus:outline-none focus:border-[#116A7B]" />
                <p className="h-10 text-red-600 text-sm">{errors.streetName && errors.streetName.message as string}</p>
            </div>

            {/* Stree Number */}
            <div className="flex flex-col gap-2 w-full sm:w-[500px] md:w-[600px]">
                <label htmlFor="streetNumber">Street Number:</label>
                <input type="number" id="streetNumber" placeholder="e.g. 201" {...register('streetNumber', {required: {value: true, message: errorMessage}})} className="pl-1 py-3 border-[2px] border-black rounded-md focus:outline-none focus:border-[#116A7B]"/>
                <p className="h-10 text-red-600 text-sm">{errors.streetNumber && errors.streetNumber.message as string}</p>
            </div>

            {/* Area Size */}
            <div className="flex flex-col gap-2 w-full sm:w-[500px] md:w-[600px]">
                <label htmlFor="areaSize">Area Size:</label>
                <input type="number" id="areaSize" placeholder="e.g. 64 mp" {...register('areaSize', {required: {value: true, message: errorMessage}})} className="pl-1 py-3 border-[2px] border-black rounded-md focus:outline-none focus:border-[#116A7B]"/>
                <p className="h-10 text-red-600 text-sm">{errors.streetNumber && errors.streetNumber.message as string}</p>
            </div>

            {/* Has AC */}
            <div className="flex flex-col gap-2 w-full sm:w-[500px] md:w-[600px]">
                <label htmlFor="hasAC">Has AC:</label>
                <select id="hasAC" {...register('hasAC', {required: {value: true, message: errorMessage}})} className="pl-1 py-3 border-[2px] border-black rounded-md focus:outline-none focus:border-[#116A7B]">
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
                <p className="h-10 text-red-600 text-sm"></p>
            </div>

            {/* Built Year */}
            <div className="flex flex-col gap-2 w-full sm:w-[500px] md:w-[600px]">
                <label htmlFor="yearBuilt">Construction Year:</label>
                <input type="number" id="yearBuilt" placeholder="e.g. 1998" {...register('yearBuilt', {required: {value: true, message: errorMessage}})} className="pl-1 py-3 border-[2px] border-black rounded-md focus:outline-none focus:border-[#116A7B]"/>
                <p className="h-10 text-red-600 text-sm">{errors.yearBuilt && errors.yearBuilt.message as string}</p>
            </div>

            {/* Rent Price */}
            <div className="flex flex-col gap-2 w-full sm:w-[500px] md:w-[600px]">
                <label htmlFor="rentPrice">Rent Price:</label>
                <input type="number" id="rentPrice" placeholder="e.g. 500$" {...register('rentPrice', {required: {value: true, message: errorMessage}})} className="pl-1 py-3 border-[2px] border-black rounded-md focus:outline-none focus:border-[#116A7B]"/>
                <p className="h-10 text-red-600 text-sm">{errors.rentPrice && errors.rentPrice.message as string}</p>
            </div>

            {/* Available Date */}
            <div className="flex flex-col gap-2 w-full sm:w-[500px] md:w-[600px]">
                <label htmlFor="availableDate">Avialable Date</label>
                <input type="date" id="availableDate" {...register('startDate', {required: {value: true, message: errorMessage}})} className="pl-1 py-3 border-[2px] border-black rounded-md focus:outline-none focus:border-[#116A7B]"/>
                <input type="date" id="availableDate" {...register('endDate', {required: {value: true, message: errorMessage}})} className="pl-1 py-3 border-[2px] border-black rounded-md focus:outline-none focus:border-[#116A7B]"/>
                <p className="h-10 text-red-600 text-sm">{errors.startDate && errors.startDate.message as string || errors.endDate && errors.endDate.message as string}</p>
            </div>

            <div className="w-full flex justify-center items-center">
                <button type="submit" className="px-3 py-2 bg-[#116A7B] flex w-full sm:w-[225px] text-white items-center justify-center gap-2 rounded-md hover:bg-[#274f5c] hover:shadow-md">
                <CheckIcon className="stroke-white stroke-[0.75] min-w-8 w-8" />     
                Save
                </button>
            </div>
         </div>
        </form>
    </div>
  )
}

export default NewFlat