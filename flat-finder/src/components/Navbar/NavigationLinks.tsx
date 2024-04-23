import { Link } from "react-router-dom"

interface Props {
    to: string
    children: React.ReactNode
    name: string
}

const NavigationLinks = ({children, name, to} : Props) => {
  return (
    <Link to={to} className="flex h-[35px] p-1 rounded cursor-pointer items-center stroke-[0.75] hover:stroke-[#16a5c6] stroke-[#116A7B] text-[#116A7B] hover:text-[#16a5c6] place-item-center gap-3  transition-colors duration-100">
        {children}
        <p className="text-inherit font-poppins overflow-clip whitespace-nowrap tracking-wide">
            {name}
        </p>
    </Link>
  )
}

export default NavigationLinks