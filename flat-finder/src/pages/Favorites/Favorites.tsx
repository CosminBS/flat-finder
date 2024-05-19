import { useContext, useEffect, useState } from "react"
import { UserDataContext } from "../../providers/userData.context"
import { getFavoritesFlats } from "../../api/methods/addToFavorites/addToFavorites"

const Favorites = () => {

  const {userDetails, flats, setFlats } = useContext(UserDataContext)
  const [da, setDa] = useState({})

  useEffect(() => {
    const fetchFavorites = async() => {
      if(userDetails && userDetails.favorites.length > 0){
        const fav = await getFavoritesFlats(userDetails.favorites)
        setDa(fav)
      }
    }

    fetchFavorites()
  },[userDetails])

  return (
    <div className="pl-[5rem]">

      
    </div>
  )
}

export default Favorites