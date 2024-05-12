import Greetings from "../../components/Greetings/Greetings"
import Filters from "../../components/Filters/Filters";
import Sort from "../../components/Sort/Sort";
import {  useEffect } from "react";
import { useNavigate } from "react-router";
import PublicFlats from "../PublicFlats/PublicFlats";
import Footer from "../../components/Footer/Footer";

const HomeCheckAd = () => {
  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-center pt-5 bg-[#CDC2AE] rounded-lg gap-6">
    <div className="px-5 flex flex-col gap-5 items-start py-3">
        <h1 className="text-[1.5rem] text-[#322744] font-semibold">Know the facts about a property</h1>
        <p className=" text-[#322744]">Uncover nearby planning applications, flood risk, environmental impact, local crime rates, and much more.</p>
        <button className="py-3 px-3 border-[2px] border-[#322744] text-[#322744] rounded-sm hover:text-[#fff] hover:bg-[#322744]">Get a Home Check</button>
    </div>
    <div className="bg-cover bg-center h-full w-full">
      {/* <img src="../../src/assets/mobile.png" alt="" className="w-[410px] h-full"/> */}
    </div>
  </div>
  )
}

const HomePage = () => {

  const navigate = useNavigate()

  useEffect(() => {
    if(!JSON.parse(localStorage.getItem('loggedUser') as string)){
      navigate('/login')
    }
  }, [])

  return (
    <div>
        <div>
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

              <HomeCheckAd/>

              <PublicFlats/>
      
          </div>
        </div>

        {/* Footer */}
        <div>
          <Footer/>
        </div>
    </div>
    
  )
}

export default HomePage