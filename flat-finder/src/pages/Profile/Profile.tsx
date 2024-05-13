import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { User } from "../../interfaces/interface";
import { PencilIcon, CheckIcon, UserCircleIcon   } from "@heroicons/react/24/outline";
import { fetchUser } from "../../api/methods/auth/users";
import { UserDataContext } from "../../providers/userData.context";
import { useToast } from "../../contexts/ToastContext";
import Footer from "../../components/Footer/Footer";

const ViewProfileData = () => {

  const { userDetails } = useContext(UserDataContext)
  
  return(
    <div className="flex flex-col gap-5 w-full sm:w-[550px] lg:w-[700px]">

        <div className="grid grid-cols-1  w-full px-5 gap-3 py-5 rounded-md bg-white">

          <span className="flex flex-col sm:flex-row sm:items-center gap-3">
            <h5 className="font-semibold text-lg">First name:</h5>
            <p >{userDetails.firstName}</p>
          </span>

          <span className="flex flex-col sm:items-center sm:flex-row gap-3 ">
            <h5 className="font-semibold text-lg">Last name:</h5>
            <p >{userDetails.lastName}</p>
          </span>

          <span className="flex flex-col sm:flex-row sm:items-center gap-3">
            <h5 className="font-semibold text-lg">Email:</h5>
            <p >{userDetails.email}</p>
          </span>

          <span className="flex flex-col sm:items-center sm:flex-row gap-3 ">
            <h5 className="font-semibold text-lg">Birth date:</h5>
            <p >{userDetails.dateOfBirth}</p>
          </span>

        </div>

    </div>
  )
}

const Profile = () => {

  const [isActive, setIsActive] = useState(false)

  const {register, handleSubmit, formState:{errors}, watch} = useForm();
  const { userDetails, setUserDetails, setLoading } = useContext(UserDataContext)
  const { toastSuccess, toastError } = useToast()

  const password = useRef({});
  password.current = watch('password', '')

  const onSubmit = async(data: User) => {
    setIsActive(!isActive)
    toastSuccess('Your profile was updated.')
    // de facut functia, setare loading, try, catch
  }

  const handleClick = () => {
    setIsActive(!isActive)
  }


  return (
    <div className={isActive ? (`pl-[5rem] h-full bg-[#ECECEB] flex flex-col justify-between`) : (`pl-[5rem] h-screen bg-[#ECECEB] flex flex-col justify-between`)}>
      <div className="w-full px-5 flex justify-center items-center py-7">
      <div className="w-full sm:w-[500px] flex flex-col gap-4 items-center">
        <div className="w-full flex justify-center items-center">
            <h1 className="font-medium text-[#116A7B] text-2xl uppercase">Profile</h1>
        </div>

        <div className="w-full px-5 py-3 rounded-md bg-white flex flex-col sm:flex-row gap-2 sm:justify-between items-center sm:w-[550px] lg:w-[700px]">
            <UserCircleIcon className="stroke-[#116A7B] stroke-[0.75] min-w-16 w-16" />
            <span className="px-2 py-2 bg-[#116A7B] text-white text-xs">
              {userDetails.role === 'admin' ? (<p>Public account</p>) : (<p>Private account</p>) }
            </span>
        </div>
        
        {!isActive 
        ? (<ViewProfileData/>)
        : (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full sm:w-[550px] lg:w-[700px]">

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

            <button
            type="submit"
            className="px-3 py-2 bg-[#116A7B] rounded-md text-white shadow-md hover:bg-[#274f5c]"
            >
            Update user data
            </button>
          </form>
        )
        }

        {!isActive && <button onClick={() => handleClick()} className="px-3 py-2 bg-[#116A7B] rounded-md text-white shadow-md hover:bg-[#274f5c]">Edit user data</button>}

      </div>
      </div>

      <Footer/>
    </div>
  )
}

export default Profile