import { Link } from "react-router-dom"
const Greetings = () => {

    const loggedUser = 'John Doe'

  return (
    <div className="w-full flex flex-col bg-white px-5 py-6 rounded-md items-center justify-between sm:flex-row">
        <div >
          <Link to="/">
            <span className="font-bold text-[1.8rem] text-[#CDC2AE]">FLAT</span>
            <span className="font-bold text-[18px] text-[#116A7B]">Finder.</span>
          </Link>
        </div>
        <div className="">
            <h1 className="text-[#322744] font-bold text-[1.5rem]">Hello {loggedUser}</h1>
        </div>
    </div>
  )
}

export default Greetings