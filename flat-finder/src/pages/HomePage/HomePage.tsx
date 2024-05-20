import Greetings from "../../components/Greetings/Greetings"
import {  useEffect } from "react";
import { useNavigate } from "react-router";
import PublicFlats from "../PublicFlats/PublicFlats";
import Footer from "../../components/Footer/Footer";

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