import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "../pages/HomePage/HomePage"
import Navbar from "../components/Navbar/Navbar"
import Register from "../pages/Register/Register"
import Login from "../pages/Login/Login"
import Profile from "../pages/Profile/Profile"
import Favorites from "../pages/Favorites/Favorites"
import MyFlats from "../pages/MyFlats/MyFlats"
import Messages from "../pages/Messages/Messages"
import DeleteAccount from "../pages/DeleteAccount/DeleteAccount"
import NewFlat from "../pages/NewFlat/NewFlat"
import RessetPassword from "../pages/RessetPassword/RessetPassword"
import AllUsers from "../pages/AllUsers/AllUsers"
import { ToastProvider } from "../contexts/ToastContext"
import { SpinnerProvider } from "../contexts/SpinnerConext"

const AppRouter = () => {

  const routes = [
    {name: <HomePage/>, path:'/'},
    {name: <Register/>, path:'register'},
    {name: <Login/>, path: 'login'},
    {name: <Profile/>, path: 'profile'},
    {name: <Favorites/>, path: 'favorites'},
    {name: <MyFlats/>, path: 'my-flats'},
    {name: <NewFlat/>, path: 'new-flat'},
    {name: <Messages/>, path: 'messages'},
    {name: <DeleteAccount/>, path: 'delete-account'},
    {name: <RessetPassword/>, path: 'resset-password'},
    {name: <AllUsers/>, path: 'all-users'}
  ]

  return (
    <BrowserRouter>
    <SpinnerProvider>
    <ToastProvider>
        <Navbar/>
        <Routes>
            {routes.map(({name, path}) => (
              <Route key={path} path={path} element={name}/>
            ))}
        </Routes>
    </ToastProvider>
    </SpinnerProvider>
    </BrowserRouter>
  )
}

export default AppRouter