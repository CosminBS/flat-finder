import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "../pages/HomePage/HomePage"
// import Navbar from "../components/Navbar/Navbar"
import Register from "../pages/Register/Register"

const AppRouter = () => {

  const routes = [
    {name: <HomePage/>, path:'/'},
    {name: <Register/>, path:'register'},

  ]

  return (
    <BrowserRouter>
        {/* <Navbar/> */}
        <Routes>
            {routes.map(({name, path}) => (
              <Route key={path} path={path} element={name}/>
            ))}
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter