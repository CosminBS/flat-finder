import { User } from "firebase/auth"
import { useForm, SubmitHandler } from "react-hook-form"
import { Link, useNavigate} from "react-router-dom"
import { loginUser } from "../../api/methods/auth/users"
import { useContext, useEffect} from "react"
import { UserDataContext } from "../../providers/userData.context"
import { useToast } from "../../contexts/ToastContext"

const Login = () => {


  const { setUserDetails, setLoading} = useContext(UserDataContext)
  const { toastError, toastSuccess } = useToast()


  const navigate = useNavigate()

  const {register, handleSubmit, formState:{errors}} = useForm();

  const onSubmit: SubmitHandler<User> = async (data: any) => {
    try{
      setLoading(true)
      const loggedInSucces = await loginUser(data)
      if(loggedInSucces){
        toastSuccess('You are now logged in')
        setUserDetails(loggedInSucces)
        navigate('/')
      } 
    } catch (error: any){
      toastError(error.message)
    } finally{
      setLoading(false)
    }
  }



  useEffect(() => {
    if(JSON.parse(localStorage.getItem('loggedUser') as string)){
      navigate('/')
    }
  }, [])



  return (
    <div className="w-full h-screen flex flex-col py-11 px-4 items-center">
      <div className="w-full h-full sm:w-[500px] flex flex-col gap-4 ">
        <div>
              <Link to="/">
                <span className="font-bold text-[2rem] text-[#CDC2AE]">FLAT</span>
                <span className="font-bold text-[20px] text-[#116A7B]">Finder.</span>
              </Link>
        </div>
        <div>
          <h1 className="font-semibold text-[18px] sm:text-[27px]">Login to save properties and much more</h1>
        </div>
        <form className="py-3 w-full flex flex-col gap-3 text-[#116A7B]" onSubmit={handleSubmit(onSubmit)}>

          {/* Email */}
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="e.g. test@mail.com" className="border-[2px] px-2 rounded-md h-[55px] focus:outline-none focus:border-[#116A7B]" {...register('email', {
            required: {value: true, message: 'This filed is mandatory'},
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Invalid email address'
            }
          })}/>
            <p className="text-sm h-6 text-red-600">{errors.email && errors.email.message as string}</p>
          </div>
          
          {/* Password */}
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="********" className="border-[2px] px-2 rounded-md h-[55px] focus:outline-none focus:border-[#116A7B]" {...register('password', {required: {value: true, message: 'This filed is mandatory'}})} />
            <p className="text-sm h-6 text-red-600">{errors.password && errors.password.message as string}</p>
          </div>

          {/* Login button */}
          <button type="submit" className="w-full bg-[#116A7B] h-[45px] rounded-md text-white shadow-md hover:bg-[#274f5c]">Login</button>
        </form>

        {/* Redirect to register */}
        <div className="w-full h-[100px] py-5 flex flex-col justify-center items-center gap-3 sm:flex-row">
          <p className="h-full flex justify-center items-center"> Don't have an account? </p>
          <button className="font-semibold hover:border-b-2 border-[#CDC2AE] text-[#116A7B]"><Link to='/register'>Create an account</Link></button>
        </div>

        {/* Redirect to resset password */}
        <div className="w-full h-[50px] py-5 flex flex-col justify-center items-center ">
          <button className="font-semibold hover:border-b-2 border-[#CDC2AE] text-[#116A7B]"><Link to='/resset-password'>Resset Password</Link></button>
        </div>

      </div>
    </div>
  )
}

export default Login