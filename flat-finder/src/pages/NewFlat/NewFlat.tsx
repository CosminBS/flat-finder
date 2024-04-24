
import { useForm } from "react-hook-form"
import { CheckIcon }  from "@heroicons/react/24/outline"

interface newFlatForm {
    city: string 
    streetName: string
    streetNumber: number
    areaSize: number
    hasAC: boolean
    yearBuilt: number
    rentPrice: number
    availableDate: Date
}

const NewFlat = () => {

    const {register, handleSubmit, formState:{errors}} = useForm();

    const onSubmit = (data: newFlatForm) => {
        console.log(data)
    }

    const errorMessage = 'All fields are mandatory'

  return (
    <div className="bg-[#ececeb] pl-[6rem] flex flex-col pr-3 py-6 gap-5">
        <div className="w-full flex text-center items-center justify-center text-[1.4rem] font-semibold text-[#322744] gap-1">
            <span>Add</span> 
            <span className="text-[1.8rem] text-[#116A7B]">New</span>
            <span>Flat.</span>
        </div>
        <form className="w-full flex flex-col gap-2 bg-white px-3 rounded-xl shadow-md" onSubmit={handleSubmit(onSubmit)}>
         <div className="w-full flex flex-col py-11 gap-3 justify-center items-center">

            {/* city */}
            <div className="flex flex-col gap-2 w-full sm:w-[500px] md:w-[600px]">
                <label htmlFor="city">City:</label>
                <input type="text" id="city" placeholder="e.g. Brasov" {...register('city', {required: {value: true, message: errorMessage}})} className="pl-1 py-3 border-[2px] border-black rounded-md focus:outline-none focus:border-[#116A7B]" />
                <p className="h-10 text-red-600 text-sm">{errors.city && errors.city.message}</p>
            </div>

            {/* Street Name */}
            <div className="flex flex-col gap-2 w-full sm:w-[500px] md:w-[600px]">
                <label htmlFor="streetName">Street Name:</label>
                <input type="text" id="streetName" placeholder="e.g. Principala" {...register('streetName', {required: {value: true, message: errorMessage}})} className="pl-1 py-3 border-[2px] border-black rounded-md focus:outline-none focus:border-[#116A7B]" />
                <p className="h-10 text-red-600 text-sm">{errors.streetName && errors.streetName.message}</p>
            </div>

            {/* Stree Number */}
            <div className="flex flex-col gap-2 w-full sm:w-[500px] md:w-[600px]">
                <label htmlFor="streetNumber">Street Number:</label>
                <input type="number" id="streetNumber" placeholder="e.g. 201" {...register('streetNumber', {required: {value: true, message: errorMessage}})} className="pl-1 py-3 border-[2px] border-black rounded-md focus:outline-none focus:border-[#116A7B]"/>
                <p className="h-10 text-red-600 text-sm">{errors.streetNumber && errors.streetNumber.message}</p>
            </div>

            {/* Area Size */}
            <div className="flex flex-col gap-2 w-full sm:w-[500px] md:w-[600px]">
                <label htmlFor="areaSize">Area Size:</label>
                <input type="number" id="areaSize" placeholder="e.g. 64 mp" {...register('areaSize', {required: {value: true, message: errorMessage}})} className="pl-1 py-3 border-[2px] border-black rounded-md focus:outline-none focus:border-[#116A7B]"/>
                <p className="h-10 text-red-600 text-sm">{errors.streetNumber && errors.streetNumber.message}</p>
            </div>

            {/* Has AC */}
            <div className="flex flex-col gap-2 w-full sm:w-[500px] md:w-[600px]">
                <label htmlFor="hasAC">Has AC:</label>
                <select id="hasAC" {...register('hasAc', {required: {value: true, message: errorMessage}})} className="pl-1 py-3 border-[2px] border-black rounded-md focus:outline-none focus:border-[#116A7B]">
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
                <p className="h-10 text-red-600 text-sm"></p>
            </div>

            {/* Built Year */}
            <div className="flex flex-col gap-2 w-full sm:w-[500px] md:w-[600px]">
                <label htmlFor="yearBuilt">Construction Year:</label>
                <input type="number" id="yearBuilt" placeholder="e.g. 1998" {...register('yearBuilt', {required: {value: true, message: errorMessage}})} className="pl-1 py-3 border-[2px] border-black rounded-md focus:outline-none focus:border-[#116A7B]"/>
                <p className="h-10 text-red-600 text-sm">{errors.yearBuilt && errors.yearBuilt.message}</p>
            </div>

            {/* Rent Price */}
            <div className="flex flex-col gap-2 w-full sm:w-[500px] md:w-[600px]">
                <label htmlFor="rentPrice">Rent Price:</label>
                <input type="number" id="rentPrice" placeholder="e.g. 500$" {...register('rentPrice', {required: {value: true, message: errorMessage}})} className="pl-1 py-3 border-[2px] border-black rounded-md focus:outline-none focus:border-[#116A7B]"/>
                <p className="h-10 text-red-600 text-sm">{errors.rentPrice && errors.rentPrice.message}</p>
            </div>

            {/* Available Date */}
            <div className="flex flex-col gap-2 w-full sm:w-[500px] md:w-[600px]">
                <label htmlFor="availableDate">Avialable Date</label>
                <input type="date" id="availableDate" {...register('startDate', {required: {value: true, message: errorMessage}})} className="pl-1 py-3 border-[2px] border-black rounded-md focus:outline-none focus:border-[#116A7B]"/>
                <input type="date" id="availableDate" {...register('endDate', {required: {value: true, message: errorMessage}})} className="pl-1 py-3 border-[2px] border-black rounded-md focus:outline-none focus:border-[#116A7B]"/>
                <p className="h-10 text-red-600 text-sm">{errors.startDate && errors.startDate.message || errors.endDate && errors.endDate.message}</p>
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