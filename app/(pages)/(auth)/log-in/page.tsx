'use client'

import { useForm } from "react-hook-form"
import axios from "axios";
import { LuLoader2 } from "react-icons/lu";
import { useState } from "react";
import Link from "next/link";

interface Login {
  email:string,
  password:string
}

export default function Login() {
  
  const {register,handleSubmit,reset,formState:{errors,isSubmitting}} = useForm<Login>();
  const [error,setError] = useState('');

const onSubmit = async (data:Login)=>{
  console.log("data",data)
  try{ 
      const res:any = await axios.post('/api/users/login',data);
      reset()
      setError("")
  } catch(err:any){
      console.log(err.response.data.message);
      setError(err.response.data.message)
  } 
}

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="border border-[#27272A] p-5 rounded-lg w-[600px]">
        <p className="text-center font-semibold text-2xl">Log In</p>
        <form className="flex flex-col gap-4 mt-10" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <label className="text-lg" htmlFor="field_userName">
              Email
            </label>
            <input
              id="field_userName"
              type="text"
              placeholder="test@gmail.com"
              className="bg-[#27272A] placeholder:text-[#A3A3A3] px-3 py-2 rounded-lg outline-none"
              {...register('email',{ 
                required:"Email address is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address"
                }
              })}
            />
            {
               errors.email  && (
                <p role="alert" className="text-red-500 text-sm">{errors.email?.message}</p>
              )
            }
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg" htmlFor="field_userName">
              Password
            </label>
            <input
              id="field_userName"
              type="password"
              placeholder="............"
              className="bg-[#27272A] placeholder:text-[#A3A3A3] px-3 py-2 rounded-lg outline-none"
              {...register('password',{ required:"Password is required",
                min:8,
                max:150,
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
                  message: "Password must include at least one uppercase letter, one number, and one special character",
                },
              }
              )}
            />
             {
              (errors.password?.type === 'pattern' || errors.password?.type === 'required') && (
                <p role="alert" className="text-red-500 text-sm">{errors.password?.message}</p>
              )
            }
          </div>
          <div>
          {
            error && (
              <p className="text-red-500 text-sm text-center pt-5">{error}</p>
            )
          }  
          </div>
          <button
            type="submit"
            className="font-semibold text-lg bg-[#18181B] p-2 rounded-lg mt-10 flex justify-center items-center h-[44px]"
          >
            {
                isSubmitting ? <LuLoader2 className=" animate-spin"/> : 'Log In'
            }
          </button>
        </form>
        <div className="mt-10">
            <p className="text-white/60">Dont have an account?<Link href="/sign-up" className="text-blue-300">&nbsp; Sign Up</Link></p>
        </div>
  
      </div>
    </div>
  );
}