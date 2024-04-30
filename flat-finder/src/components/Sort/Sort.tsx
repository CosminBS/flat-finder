import { useForm } from "react-hook-form"
import {
    MagnifyingGlassIcon,
    TrashIcon,  
} from "@heroicons/react/24/outline"
import { useEffect, useState } from "react";

const Sort = () => {

    const {register, handleSubmit} = useForm();
    const [formData, setFormData] = useState(null)

    const onSubmit = (data: any) => {
        setFormData(data)
    }

    const cleareSort = (e:any) => {
        e.preventDefault()
        setFormData(null)
    }

    useEffect(() => {
    },[formData])

    return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row">
            <label className="text-[1.3rem]">Sort flats by:</label>
            <select id="sortFlats" {...register('sortFlats')}>
                <option value="sortByCity">City</option>
                <option value="sortByPrice">Price</option>
                <option value="sortByAreaSize">Area Size</option>
            </select>
        </div>
        <div className="py-5 flex flex-col gap-3 sm:flex-row">
            <button onClick={(e) => cleareSort(e)} className="px-3 py-2 bg-red-600 flex w-full sm:w-[125px] text-white items-center justify-center gap-2 rounded-md hover:bg-red-700 hover:shadow-md">
                <TrashIcon className="stroke-white stroke-[0.75] min-w-8 w-8" />
                Clear
            </button>
            <button type="submit" className="px-3 py-2 bg-[#116A7B] flex w-full sm:w-[125px] text-white items-center justify-center gap-2 rounded-md hover:bg-[#274f5c] hover:shadow-md">
                <MagnifyingGlassIcon className="stroke-white stroke-[0.75] min-w-8 w-8" />
                Search
            </button>
        </div>
    </form>
  )
}

export default Sort