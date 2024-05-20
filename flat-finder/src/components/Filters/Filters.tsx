import {
    MagnifyingGlassIcon,
    TrashIcon
  } from "@heroicons/react/24/outline"
import { useForm } from "react-hook-form"

 
  
const Filters = ({ setFilters }) => {

    const {register, handleSubmit, reset} = useForm()

    const onSubmit = (data: any) => {
      setFilters(data);
  };

  const clearFilters = () => {
      reset();
      setFilters({
          city: "",
          minPrice: "",
          maxPrice: "",
          minArea: "",
          maxArea: ""
      });
  };

  return (
    <form className="w-full flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
    <div className="w-full flex flex-col py-3 gap-3 sm:flex-row sm:justify-between sm:items-end">
        <div className="flex flex-col gap-2 w-full">
            <label htmlFor="city">City:</label>
            <input type="text" id="city" className="pl-2 py-3 border-[1px] border-black rounded-md focus:outline-none focus:border-[#116A7B]" placeholder="e.g. Brasov" {...register('city')} />
        </div>
    </div>
    <div className="w-full flex flex-col py-3 gap-3 sm:flex-row sm:justify-between sm:items-end">
        <div className="flex flex-col gap-2 w-full">
            <label htmlFor="minPrice">Min Price:</label>
            <input type="number" id="minPrice" className="pl-2 py-3 border-[1px] border-black rounded-md focus:outline-none focus:border-[#116A7B]" placeholder="e.g. 700" {...register('minPrice')} />
        </div>
        <div className="flex flex-col gap-2 w-full">
            <label htmlFor="maxPrice">Max Price:</label>
            <input type="number" id="maxPrice" className="pl-2 py-3 border-[1px] border-black rounded-md focus:outline-none focus:border-[#116A7B]" placeholder="e.g. 1500" {...register('maxPrice')} />
        </div>
    </div>
    <div className="w-full flex flex-col py-3 gap-3 sm:flex-row sm:justify-between sm:items-end">
        <div className="flex flex-col gap-2 w-full">
            <label htmlFor="minArea">Min Area:</label>
            <input type="number" id="minArea" className="pl-2 py-3 border-[1px] border-black rounded-md focus:outline-none focus:border-[#116A7B]" placeholder="e.g. 50" {...register('minArea')} />
        </div>
        <div className="flex flex-col gap-2 w-full">
            <label htmlFor="maxArea">Max Area:</label>
            <input type="number" id="maxArea" className="pl-2 py-3 border-[1px] border-black rounded-md focus:outline-none focus:border-[#116A7B]" placeholder="e.g. 150" {...register('maxArea')} />
        </div>
    </div>
    <div className="flex justify-between flex-col gap-3 xs:flex-row xs:gap-0 ">
        <button type="button" onClick={clearFilters} className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 hover:shadow-md flex items-center gap-2">
            <TrashIcon className="stroke-white stroke-[0.75] min-w-8 w-8" /> Clear
        </button>
        <button type="submit" className="px-3 py-2 bg-[#116A7B] text-white rounded-md hover:bg-[#274f5c] hover:shadow-md flex items-center gap-2">
            <MagnifyingGlassIcon className="stroke-white stroke-[0.75] min-w-8 w-8" /> Search
        </button>
    </div>
</form>
  )
}

export default Filters