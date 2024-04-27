import './App.css'
import AppRouter from './routes/route'
import { UserDataContext } from './providers/userData.context'
import { Dispatch, SetStateAction, createContext, useState } from 'react'
import { User } from 'firebase/auth'
import { useEffect } from 'react'
import { fetchUser } from './api/methods/auth/users'

interface UserDataContextInt {
  userDetails: User,
  setUserDetails: Dispatch<SetStateAction<User>>
}

export const userDataContext = createContext({} as UserDataContextInt)


function App() {

  const [userDetails, setUserDetails] = useState({} as User)

  const getUser = async () => {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser') as string) || ""

    if (loggedUser.length) setUserDetails(await fetchUser(loggedUser))
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <>
    <UserDataContext.Provider value={{userDetails, setUserDetails}}>
      <AppRouter/>
    </UserDataContext.Provider>
    </>
  )
}

export default App
