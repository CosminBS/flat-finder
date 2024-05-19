import { useContext, useEffect } from "react"
import { UserDataContext } from "../../providers/userData.context"
import { deleteAccount } from "../../api/methods/auth/users"
import { useNavigate } from "react-router"
import { useToast } from "../../contexts/ToastContext"

const DeleteAccount = () => {


  const { userDetails, setLoading } = useContext(UserDataContext)
  const { toastError, toastSuccess } = useToast() 

  const navigate = useNavigate()

  const removeAccount = async() => {

    try {
      setLoading(true)
      await deleteAccount();
      localStorage.removeItem('loggedUser')
      navigate('/login')
      toastSuccess('Successfully deleting account.')
    } catch (error) {
      console.error('Error deleting account:', error);
      toastError('Error deleting account')
    }finally{
      setLoading(false)
    }
  }

  const navigateHome = () => {
    navigate('/')
  }

  useEffect(() => {
    if(!JSON.parse(localStorage.getItem('loggedUser') as string)){
      navigate('/login')
    }
  }, [])



  return (
    <div className="pl-[5rem] w-full flex justify-center items-center flex-col h-screen gap-3 bg-[#ECECEB]">
        <div className="w-full px-5 flex items-center justify-center">
          <div className="flex py-10 px-7 flex-col gap-3 items-start justify-center bg-white rounded-md shadow-md sm:text-justify md:w-[550px]">
              <h1 className="w-full flex items-center justify-center font-semibold text-red-400">Delete account</h1>
              <p>We will remove all authentication and personal information we store about your users. This operation cannont be undone.</p>
            <div className="w-full flex flex-col gap-3  justify-between sm:flex-row">
              <button onClick={() => removeAccount()} className="hover:underline text-red-600">Delete</button>
              <button onClick={() => navigateHome()} className="hover:underline text-[#116A7B]">Back to home</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default DeleteAccount