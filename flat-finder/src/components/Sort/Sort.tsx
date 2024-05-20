import { useForm } from "react-hook-form"
import {
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline"

const Sort = ({ setSort }) => {

    const {register, handleSubmit} = useForm();

    const onSubmit = (data: any) => {
        setSort({
            criteria: data.criteria,
            order: data.order
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2 sm:flex-row">
                <label htmlFor="criteria" className="text-[1.3rem]">Sort flats by:</label>
                <select id="criteria" {...register('criteria')} className="pl-2 py-3 border-[1px] border-black rounded-md focus:outline-none focus:border-[#116A7B]">
                    <option value="city">City</option>
                    <option value="rentPrice">Price</option>
                    <option value="areaSize">Area Size</option>
                </select>
                <select id="order" {...register('order')} className="pl-2 py-3 border-[1px] border-black rounded-md focus:outline-none focus:border-[#116A7B]">
                    <option value="Ascending">Ascending</option>
                    <option value="Descending">Descending</option>
                </select>
            </div>
            <button type="submit" className="px-3 py-2 bg-[#116A7B] text-white rounded-md hover:bg-[#274f5c] hover:shadow-md flex items-center gap-2">
                <MagnifyingGlassIcon className="stroke-white stroke-[0.75] min-w-8 w-8" /> Sort
            </button>
        </form>
  )
}

export default Sort