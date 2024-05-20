import { useContext, useEffect, useState } from "react"
import { UserDataContext } from "../../providers/userData.context"
import { getFlats } from "../../api/methods/addFlats/addFlats"
import { useToast } from "../../contexts/ToastContext"
import { motion } from "framer-motion"
import { HeartIcon, EnvelopeIcon, UserIcon  } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"
import { removeFromFavorites } from "../../api/methods/addToFavorites/addToFavorites"
import { newFlatForm } from "../../interfaces/interface"

const Favorites = () => {

  const {userDetails, setLoading, setUserDetails } = useContext<any>(UserDataContext)
  const { toastError, toastSuccess } = useToast()
  const [favorites, setFavorites] = useState(false)

  const [fav, setFav] = useState([])

  useEffect(() => {
    const fetchFav = async () => {
      try {
        setLoading(true);
        const success: any = await getFlats();
        const favFlats: any[] = [];
        const favoriteFlatIds = userDetails.favorites.map((favorite: any) => favorite.flatId);
        
        success.forEach((flat: any) => {
          if (favoriteFlatIds.includes(flat.uid)) {
            favFlats.push(flat);
          }
        });
        
        setFav(favFlats);
      } catch (error: any) {
        toastError(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchFav();
  }, [userDetails]);


  const removeFav = async (userId: string, flatId: string) => {
    try {
        setLoading(true);
        await removeFromFavorites(userId, flatId);
        const updatedFav = fav.filter((e: newFlatForm) => e.uid !== flatId); 
        setFav(updatedFav);

        const updatedUserDetails = {
          ...userDetails, favorites: userDetails.favorites.filter((favorites: any) => favorites.flatId !== flatId)
        }

        setUserDetails(updatedUserDetails)

        toastSuccess('Flat removed from favorites.');
    } catch (error: any) {
        console.error(error);
        toastError(error);
    } finally {
        setLoading(false);
    }
};


  return (
    <div className="pl-[5rem] flex flex-col py-11">
      <div className="flex flex-col gap-6 font-poppins px-7">

        {fav.map((e: newFlatForm, index) => (
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
                        <p className="hidden xs:flex text-[12px]">Remove from favorites</p>
                            <motion.button
                                onClick={() => removeFav(userDetails.uid, e.uid)}
                                whileHover={{ rotateY: 180, transition: { type: "spring", damping: 15, duration: 0.5 } }}
                                className="min-w-7 w-7 h-7 flex justify-center items-center rounded-[4px] hover:bg-[#cfe1e4]"
                            >
                            <HeartIcon className='stroke-red-500 stroke-[0.75] min-w-6 w-6' />
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
    </div>
  )
}

export default Favorites