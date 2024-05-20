import { HeartIcon, EnvelopeIcon, UserIcon  } from "@heroicons/react/24/outline"
import { motion } from 'framer-motion'
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { UserDataContext } from "../../providers/userData.context"
import { getFlats } from "../../api/methods/addFlats/addFlats"
import { addToFavorites } from "../../api/methods/addToFavorites/addToFavorites"
import { newFlatForm } from "../../interfaces/interface"
import { useToast } from "../../contexts/ToastContext"
import Filters from "../../components/Filters/Filters"
import Sort from "../../components/Sort/Sort"

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


const PublicFlats = () => {

    const {flats, setFlats, setLoading, userDetails, setUserDetails} = useContext<any>(UserDataContext)
    const { toastError, toastSuccess } = useToast()
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState({})

    const handleClick = async (flatId: string) => {
        if (!flatId) {
            console.error('Invalid flatId:', flatId);
            return;
        }
    
        try {
            setLoading(true);
            await addToFavorites(userDetails.uid, flatId);

            const updatedUserDetails = {
                ...userDetails, favorites: [...userDetails.favorites, { flatId }]
            }

            setUserDetails(updatedUserDetails)

            toastSuccess('Flat added to favorites.')
        } catch (error: any) {
            console.error('Error adding to favorites:', error);
            toastError(error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const fetchFlats = async () => {
            try{
                setLoading(true)
                const allFlats = await getFlats(filters, sort)
                setFlats(allFlats)
            }catch(error: any){
                throw new Error('Error fetching flats')
            }finally{
                setLoading(false)
            }
        }

        fetchFlats()
    },[filters, sort, setFlats, setLoading])

  return (
    <div className="flex flex-col gap-6 font-poppins">
        {/* Filters */}
        <div className="w-full flex justify-center">
            <div className="bg-white px-3 rounded-2xl py-4 shadow-md w-full sm:w-[720px]">
                <Filters setFilters={setFilters}/>
            </div>
        </div>

        {/* Sort */}
        <div className="w-full flex justify-center">
            <div className="bg-white px-3 rounded-2xl py-4 shadow-md w-full sm:w-[720px]">
                <Sort setSort={setSort} />
            </div>
        </div> 

        <HomeCheckAd/>

        {flats.map((e: newFlatForm, index: any) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-3 rounded-lg border-[1px] border-[#bcb2b2]">
                <div className="h-[150px] xs:h-[250px] md:h-full">
                    <div className="bg-cover bg-center h-full w-full rounded-t-lg md:rounded-none md:rounded-l-lg" style={{backgroundImage: `url(${e.imageURL})`}}></div>
                </div>
                <div className="py-3 px-3 flex flex-col justify-around">

                    <div className="flex items-center justify-between w-full">
                        <div>
                            <h1 className="font-semibold text-[1.4rem]">{e.rentPrice} $</h1>
                        </div>
                        <div className="flex justify-center items-center gap-2">
                            <motion.button
                                onClick={() => handleClick(e.uid)}
                                whileHover={{ rotateY: 180, transition: { type: "spring", damping: 15, duration: 0.5 } }}
                                className="min-w-7 w-7 h-7 flex justify-center items-center rounded-[4px] hover:bg-[#cfe1e4]"
                            >
                            <HeartIcon className='stroke-red-500 stroke-[0.75] min-w-6 w-6'/>
                            </motion.button>
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <h4 className="text-[21px] font-bold uppercase text-[#116A7B]">{e.name}</h4>

                        <Link to={`/view-flat/${e.uid}`}>

                        <div className="flex flex-col gap-3 items-start border-b-[1px] border-[#bcb2b2] py-3  cursor-pointer" >

                            <span className="flex gap-1 flex-col xs:flex-row">
                                <p className="font-semibold">City:</p>
                                <p>{e.city}</p>
                            </span>
                            <span className="flex gap-1 flex-col xs:flex-row">
                                <p className="font-semibold">Street Name:</p>
                                <p>{e.streetName}</p>
                            </span>
                            <span className="flex gap-1 flex-col xs:flex-row">
                                <p className="font-semibold">Street Number:</p>
                                <p>{e.streetNumber}</p>
                            </span>
                            <span className="flex gap-1 flex-col xs:flex-row">
                                <p className="font-semibold">Areea Size:</p>
                                <p>{e.areaSize}</p>
                            </span>
                            <span className="flex gap-1 flex-col xs:flex-row">
                                <p className="font-semibold">AC:</p>
                                <p>{e.hasAC}</p>
                            </span>
                            <span className="flex gap-1 flex-col xs:flex-row">
                                <p className="font-semibold">Built Year:</p>
                                <p>{e.yearBuilt}</p>
                            </span>
                            <span className="flex gap-1 flex-col xs:flex-row">
                                <p className="font-semibold">Date Available:</p>
                                <p>{e.endDate}</p>
                            </span>

                        </div>
                        </Link>

                        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                            <span className="flex gap-1 flex-col xs:flex-row cursor-pointer"><UserIcon className="stroke-[#5f8087] stroke-[0.75] min-w-6 w-6" /> <p className="hover:text-[#116A7B]">{e.firstName} {e.lastName}</p></span>
                            <span className="flex gap-1 flex-col xs:flex-row cursor-pointer"><EnvelopeIcon className="stroke-[#5f8087] stroke-[0.75] min-w-6 w-6" /> <p className="hover:text-[#116A7B]">{e.email}</p></span>
                        </div>
                    </div>

                </div>
            </div>
        ))}
    </div>
  )
}

export default PublicFlats