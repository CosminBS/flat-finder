import Greetings from "../../components/Greetings/Greetings"
import Filters from "../../components/Filters/Filters";
import Sort from "../../components/Sort/Sort";

const HomePage = () => {

  return (
    <div className="bg-[#ececeb] pl-[6rem] flex flex-col gap-4 pr-3 py-4 ">
        <Greetings />
      <div className="w-full text-center items-center justify-center text-[1.4rem] font-semibold text-[#322744]">
        <h1>Find homes rent and check house prices</h1>
      </div>

      {/* Sort */}
      <div className="w-full flex justify-center">
        <div className="bg-white px-3 rounded-2xl py-4 shadow-md w-full sm:w-[720px]">
          <Sort/>
        </div>
      </div> 

      {/* Filters */}
      <div className="w-full flex justify-center">
        <div className="bg-white px-3 rounded-2xl py-4 shadow-md w-full sm:w-[720px]">
            <Filters/>
        </div>
      </div>

      

    </div>
  )
}

export default HomePage