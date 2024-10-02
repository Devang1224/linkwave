import mongoose  from "mongoose";
const userSchema=new mongoose.Schema(
    {
        userName:{
            type:String,
            requied:[true,"Please Provide a userName"],
            unique:true

        },
        email:{
            type:"String",
            requied:[true,"Please Provide a email"],
            unique:true 
            
        },
        password:{
            type:"String",
            requied:[true,"Please Provide a email"],
            unique:true 
            
        }
    }
)

const User=mongoose.models.users||mongoose.model("users",userSchema)
export default User