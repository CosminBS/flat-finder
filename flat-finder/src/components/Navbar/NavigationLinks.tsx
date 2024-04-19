import { Link } from "react-router-dom"

interface Props {
    children: React.ReactNode
    name: string
}

const NavigationLinks = ({children, name} : Props) => {
  return (
    <Link to='/' className="flex p-1 rounded cursor-pointer stroke-[0.75] hover:stroke-neutral-100 stroke-neutral-400 text-neutral-400 hover:text-neutral-100 place-item-center gap-3 hover:bg-neutral-700/3 transition-colors duration-100">
        {children}
        <p className="text-inherit font-poppins overflow-clip whitespace-nowrap tracking-wide">
            {name}
        </p>
    </Link>
  )
}

export default NavigationLinks