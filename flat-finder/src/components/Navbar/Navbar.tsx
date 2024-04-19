import { motion, useAnimationControls} from "framer-motion"
import { useState, useEffect } from "react"
import NavigationLinks from "./NavigationLinks"
import {
    ChartBarIcon,
    Square2StackIcon,
    DocumentCheckIcon,
    ChartPieIcon,
    UsersIcon,
    UserCircleIcon
} from "@heroicons/react/24/outline"

const containerVariants = {
  close: {
    width: "5rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
  open: {
    width: "16rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
}

const svgVariants = {
  close: {
    rotate: 360,
  },
  open: {
    rotate: 180,
  },
}

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
  
    const containerControls = useAnimationControls()
    const svgControls = useAnimationControls()
  
    useEffect(() => {
      if (isOpen) {
        containerControls.start("open")
        svgControls.start("open")
      } else {
        containerControls.start("close")
        svgControls.start("close")
      }
    }, [isOpen])
  
    const handleOpenClose = () => {
      setIsOpen(!isOpen)
    }
  return (
    <motion.nav variants={containerVariants} initial="close" animate={containerControls} className="bg-neutral-700 flex flex-col z-10 gap-20 p-5 absolute top-0 left-0 h-full shadow-md shadow-neutral-600">
        <div className="flex flex-row w-full justify-between place-items-center">
            <div className="w-10 h-10">
              <UserCircleIcon clasName="stroke-inherit stroke-[0.75] min-w-8 w-8" />
            </div>
            <button onClick={() => handleOpenClose()} className='p-1 rouneded-full flex'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-8 h-8 stroke-neutral-200"
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                variants={svgVariants}
                animate={svgControls}
                transition={{
                    duration: 0.5,
                    ease: 'easeInOut'
                }}
              />
            </svg>
            </button>
        </div>
        <div className="flex flex-col gap-3">
        <NavigationLinks name="Dashboard">
            <ChartBarIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
          </NavigationLinks>
          <NavigationLinks name="Projects">
            <Square2StackIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
          </NavigationLinks>
          <NavigationLinks name="Tasks">
            <DocumentCheckIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
          </NavigationLinks>
          <NavigationLinks name="Reporting">
            <ChartPieIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
          </NavigationLinks>
          <NavigationLinks name="Users">
            <UsersIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
          </NavigationLinks>
        </div>
    </motion.nav>    
)
}

export default Navbar