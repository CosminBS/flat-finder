import { useContext, createContext, useState } from "react"

const SpinnerContext = createContext()

export const SpinnerProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)

  return(
    <SpinnerContext.Provider value={{loading, setLoading}}>
      {children}
    </SpinnerContext.Provider>
  )
}

export const useSpinner = () => {
  const context = useContext(SpinnerContext)
  if(!context){
    console.log('bla')
  }
  return context
}

export const Spinner = () => {
  const loading = useSpinner()

  return loading ? (<div className="fixed flex items-center justify-center top-0 left-0 w-full h-full bg-red-500">
  <div className="absolute">
      <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
      <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-[#116A7B] animate-spin">
      </div>
  </div>
</div>) : null
}
