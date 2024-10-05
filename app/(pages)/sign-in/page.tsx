'use client'

import { useForm } from "react-hook-form"
import axios from "axios";
import { LuLoader2 } from "react-icons/lu";

interface Register {
  email:string,
  password:string
  username:string,
}

export default function page() {
  
  const {register,handleSubmit,formState:{errors,isSubmitting}} = useForm<Register>();


const onSubmit = async (data:Register)=>{
  try{ 
      const res = await axios.post('/api/signup',data);
      console.log(res);    
  } catch(err:any){
      console.log(err);
  } 
}

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="border border-[#27272A] p-5 rounded-lg w-[600px]">
        <p className="text-center font-semibold text-2xl">Sign Up</p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <label className="text-lg" htmlFor="field_username">
              Username
            </label>
            <input
              id="field_username"
              type="text"
              placeholder="Your username"
              className="bg-[#27272A] placeholder:text-[#A3A3A3] px-3 py-2 rounded-lg outline-none"
              {...register("username", { required: 'Username is required', maxLength: 100 })}
            />
                {errors.username?.type === "required" && (
                 <p role="alert" className="text-red-500 text-sm">First name is required</p>
                )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg" htmlFor="field_username">
              Email
            </label>
            <input
              id="field_username"
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
            <label className="text-lg" htmlFor="field_username">
              Password
            </label>
            <input
              id="field_username"
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

          <button
            type="submit"
            className="font-semibold text-lg bg-[#18181B] p-2 rounded-lg mt-10 flex justify-center items-center h-[44px]"
          >
            {
                isSubmitting ? <LuLoader2 className=" animate-spin"/> : 'Sign Up'
            }
          </button>
        </form>
      </div>
    </div>
  );
}