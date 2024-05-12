const SpinnerComponent = () => {

  return (
    <div className="fixed flex items-center justify-center top-0 left-0 w-full h-full bg-[#a5a5a5bd]">
        <div className="absolute">
            <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
            <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-[#116A7B] animate-spin">
            </div>
        </div>
    </div>
  )
}

export default  SpinnerComponent 