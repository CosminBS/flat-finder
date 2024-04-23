import {
    MagnifyingGlassIcon,
  } from "@heroicons/react/24/outline"
import { useForm } from "react-hook-form"

 
  
const Filters = () => {

    const {register, handleSubmit} = useForm()

    const onSubmit = (data:any) => {
        console.log(data)
    }

  return (
    <form className="w-full flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>

              {/* City */}
              <div className="w-full flex flex-col py-3 gap-3 sm:flex-row sm:justify-between sm:items-end">
                  <div className="flex flex-col gap-2 w-full">
                      <label htmlFor="filterByCity">City:</label>
                      <input type="text" id="filterByCity" className="pl-1 py-3 border-[1px] border-black rounded-md focus:outline-none focus:border-[#116A7B]" placeholder="e.g. Brasov" {...register('filterByCity')}/>
                  </div>
                  <div>
                      <button type="submit" className="px-3 py-2 bg-[#116A7B] flex w-full sm:w-[125px] text-white items-center justify-center gap-2 rounded-md hover:bg-[#274f5c] hover:shadow-md">
                        <MagnifyingGlassIcon className="stroke-white stroke-[0.75] min-w-8 w-8" />
                      Search
                      </button>
                  </div>
              </div>

              {/* Price Range */}
              <div className="w-full flex flex-col py-3 gap-3 sm:flex-row sm:justify-between sm:items-end">
                  <div className="flex flex-col gap-2 w-full">
                      <label htmlFor="filterByPrice">Price:</label>
                      <input type="text" id="filterByPrice" className="pl-1 py-3 border-[1px] border-black rounded-md focus:outline-none focus:border-[#116A7B]" placeholder="e.g. 700$" {...register('filterByPrice')}/>
                  </div>
                  <div>
                      <button type="submit" className="px-3 py-2 bg-[#116A7B] flex w-full sm:w-[125px] text-white items-center justify-center gap-2 rounded-md hover:bg-[#274f5c] hover:shadow-md">
                        <MagnifyingGlassIcon className="stroke-white stroke-[0.75] min-w-8 w-8" />
                      Search
                      </button>
                  </div>
              </div>
              
              {/* Area Size */}
              <div className="w-full flex flex-col py-3 gap-3 sm:flex-row sm:justify-between sm:items-end">
                  <div className="flex flex-col gap-2 w-full">
                      <label htmlFor="filterByArea">Area Size:</label>
                      <input type="text" id="filterByArea" className="pl-1 py-3 border-[1px] border-black rounded-md focus:outline-none focus:border-[#116A7B]" placeholder="e.g. 64 mp" {...register('filterByArea')} />
                  </div>
                  <div>
                      <button type="submit" className="px-3 py-2 bg-[#116A7B] flex w-full sm:w-[125px] text-white items-center justify-center gap-2 rounded-md hover:bg-[#274f5c] hover:shadow-md">
                        <MagnifyingGlassIcon className="stroke-white stroke-[0.75] min-w-8 w-8" />
                      Search
                      </button>
                  </div>
              </div>
              
            </form>
  )
}

export default Filters