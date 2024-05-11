import { Link } from "react-router-dom"
import { SubmitHandler, useForm } from 'react-hook-form'
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { User } from "firebase/auth";
import { useRef } from "react";
import { motion } from 'framer-motion'

const RessetPassword = () => {

    const {register, handleSubmit, formState:{errors}, watch} = useForm();
    const password = useRef({});
    password.current = watch('password', '')

    const onSubmit = async (data:any) => {
        console.log(data)
    }

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
          <h1 className="font-semibold text-[18px] sm:text-[27px]">Resset your password</h1>
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

           {/* Confirm Password */}
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" {...register('confPassword', {required: {value: true, message: 'This filed is mandatory'}, validate: value => value === password.current || 'The passwords do not match'})} placeholder="********" className="border-[2px] px-2 rounded-md h-[55px] focus:outline-none focus:border-[#116A7B]"/>
            <p className="text-sm h-6 text-red-600">{errors.confPassword && errors.confPassword.message as string}</p>
          </div>

          {/* Resset password button */}
          <button type="submit" className="w-full bg-[#116A7B] h-[45px] rounded-md text-white shadow-md hover:bg-[#274f5c]">Resset password</button>
        </form>

        {/* Back to login */}
        <div className="w-full h-[100px] py-5 flex flex-col justify-center items-center gap-3 sm:flex-row">
          <motion.button whileHover={{translateX: -10}} className="font-semibold text-[#116A7B] flex gap-3 justify-center items-center"> <ArrowLeftIcon className="stroke-[#116A7B] stroke-[0.75] min-w-8 w-8" /><Link to='/login'>Back to Login</Link></motion.button>
        </div>

      </div>
    </div>
  )
}

export default RessetPassword