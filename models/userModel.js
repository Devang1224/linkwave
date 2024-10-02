import mongoose  from "mongoose";
const userSchema=new mongoose.Schema(
    {
        userName:{
            type:String,
            required:[true,"Please Provide a userName"],
            unique:true

        },
        email:{
            type:"String",
            required:[true,"Please Provide an email"],
            unique:true 
            
        },
        password:{
            type:"String",
            required:[true,"Please Provide a"],
        }
    }
)

const User=mongoose.models.users||mongoose.model("users",userSchema)
export default User