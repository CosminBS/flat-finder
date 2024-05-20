import './App.css'
import AppRouter from './routes/route'
import { UserDataContext } from './providers/userData.context'
import { Dispatch, SetStateAction, createContext, useState } from 'react'
import { User } from 'firebase/auth'
import { useEffect } from 'react'
import { fetchUser } from './api/methods/auth/users'
import SpinnerComponent from './components/SpinnerComponent/SpinnerComponent'
import { newFlatForm } from './interfaces/interface'

interface UserDataContextInt {
  userDetails: User,
  setUserDetails: Dispatch<SetStateAction<User>>
  flats: newFlatForm[]
  setFlats: Dispatch<SetStateAction<newFlatForm[]>>
}

export const userDataContext = createContext<UserDataContextInt | undefined>(undefined)


function App() {

  const [userDetails, setUserDetails] = useState({} as User)
  const [flats, setFlats] = useState([])
  const [loading, setLoading] = useState(false)

  const getUser = async () => {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser') as string) || "";
  
    if (loggedUser.length) {
      const userData = await fetchUser(loggedUser);
      if (userData) {
        setUserDetails(userData);
      } else {
        console.log('User not found');
      }
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <>
    {loading && <SpinnerComponent/>}
    <UserDataContext.Provider value={{userDetails, setUserDetails, flats, setFlats, loading, setLoading}}>
      <AppRouter/>
    </UserDataContext.Provider>
    </>
  )
}

export default App
