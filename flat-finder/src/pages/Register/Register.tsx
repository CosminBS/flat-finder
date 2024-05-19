import { useContext, useRef } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { Link, useNavigate} from "react-router-dom"
import { User } from '../../interfaces/interface'
import { registerUser } from "../../api/methods/auth/users"
import { useToast } from "../../contexts/ToastContext"
import { UserDataContext } from "../../providers/userData.context"

const Register = () => {

  const { toastError, toastSuccess } = useToast()
  const { setLoading } = useContext(UserDataContext)

  const navigate = useNavigate()
  const {register, handleSubmit, formState:{errors}, watch} = useForm();
  const password = useRef({});
  password.current = watch('password', '')

  const onSubmit: SubmitHandler<User> = async (data) => {
    try {
      setLoading(true)
      const registrationSuccess = await registerUser(data);
      if (registrationSuccess) {
        toastSuccess('Congratulations, you are know registered. Please log in')
        navigate('/login');
      }
    } catch (error: any) {
      toastError(error.message)
    } finally{
      setLoading(false)
    }
  }

  return (
    <div className="w-full h-screen flex flex-col py-11 px-4 items-center">
      <div className="w-full sm:w-[500px] flex flex-col gap-4 ">
        <div>
              <Link to="/">
                <span className="font-bold text-[2rem] text-[#CDC2AE]">FLAT</span>
                <span className="font-bold text-[20px] text-[#116A7B]">Finder.</span>
              </Link>
        </div>
        <div>
          <h1 className="font-semibold text-[18px] sm:text-[27px]">Register to save properties and much more</h1>
        </div>
        <div className="w-full py-6 flex flex-col gap-3 justify-start items-start sm:flex-row sm:justify-center sm:items-center">
          <p className="h-[25px] flex justify-center items-center gap-3">Already registered?</p>
          <button className="font-semibold hover:border-b-2 border-[#CDC2AE] text-[#116A7B]"><Link to='/login'>Login</Link></button>
        </div>
        {/* FORM */}
        <form className="py-3 w-full flex flex-col gap-3 text-[#116A7B]" onSubmit={handleSubmit(onSubmit)}>

          {/* Email */}
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="e.g. test@mail.com" {...register('email', {
            required: {value: true, message: 'This filed is mandatory'},
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Invalid email address'
            }
          })} className="border-[2px] px-2 rounded-md h-[55px] focus:outline-none focus:border-[#116A7B]"/>
            <p className="text-sm h-6 text-red-600">{errors.email && errors.email.message as string}</p>
          </div>
          
          {/* Password */}
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" {...register('password', {required:{ value: true, message: 'This filed is mandatory' },
              minLength: { value: 6, message: 'Password should be at least 6 characters'},
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/,
                message: 'Password should contain letters, numbers, and a special character'
              }} )} placeholder="********" className="border-[2px] px-2 rounded-md h-[55px] focus:outline-none focus:border-[#116A7B]"/>
            <p className="text-sm h-6 text-red-600">{errors.password && errors.password.message as string}</p>
          </div>

          {/* Confirm Password */}
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" {...register('confPassword', {required: {value: true, message: 'This filed is mandatory'}, validate: value => value === password.current || 'The passwords do not match'})} placeholder="********" className="border-[2px] px-2 rounded-md h-[55px] focus:outline-none focus:border-[#116A7B]"/>
            <p className="text-sm h-6 text-red-600">{errors.confPassword && errors.confPassword.message as string}</p>
          </div>

          {/* First Name */}
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" {...register('firstName', {required: {value: true, message: 'This field is mandatory'}, minLength: {value: 2, message:'First Name should contain at least 2 chracters'}})} placeholder="e.g. John" className="border-[2px] px-2 rounded-md h-[55px] focus:outline-none focus:border-[#116A7B]"/>
            <p className="text-sm h-6 text-red-600">{errors.firstName && errors.firstName.message as string}</p>
          </div>

          {/* Last Name */}
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" {...register('lastName', {required: {value: true, message: 'This field is mandatory'}, minLength: {value: 2, message:'Last Name should contain at least 2 chracters'}})} placeholder="e.g. John" className="border-[2px] px-2 rounded-md h-[55px] focus:outline-none focus:border-[#116A7B]"/>
            <p className="text-sm h-6 text-red-600">{errors.lastName && errors.lastName.message as string}</p>
          </div>

          {/* Birth Date */}
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="dateOfBirth">Birth Date</label>
            <input type="date" id="dateOfBirth" {...register('dateOfBirth', {required: {value: true, message:'This field is mandatory'},
            validate: value => {
              const selectedDate = new Date(value);
              const minAge = new Date();
              minAge.setFullYear(minAge.getFullYear() - 120);
              const maxAge = new Date();
              maxAge.setFullYear(maxAge.getFullYear() - 18);
              if(selectedDate < minAge || selectedDate > maxAge){
                return 'Age should be between 18 and 120 years';
              }
              return true;
            }
          })} className="border-[2px] px-2 rounded-md h-[55px] focus:outline-none focus:border-[#116A7B]"/>
            <p className="text-sm h-6 text-red-600">{errors.dateOfBirth && errors.dateOfBirth.message as string}</p>
          </div>

          {/* Register button */}
          <button type="submit" className="w-full bg-[#116A7B] h-[45px] rounded-md text-white shadow-md hover:bg-[#274f5c]">Register</button>
        </form>
        <div className="h-[150px] text-[15px] flex justify-center text-center"> By registering you accept our Terms of Use and Privacy Policy.</div>
      </div>
    </div>
  )
}

export default Register