import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "../pages/HomePage/HomePage"
import Navbar from "../components/Navbar/Navbar"

const AppRouter = () => {

  const routes = [
    {name: <HomePage/>, path:'/'},
  ]

  return (
    <BrowserRouter>
        <Navbar/>
        <Routes>
            {routes.map(({name, path}) => (
              <Route key={path} path={path}>
                {name}
              </Route>
            ))}
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter