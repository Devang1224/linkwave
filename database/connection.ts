import mongoose from "mongoose";

export default function connection(){
    try {
        mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URL!)
        const connection=mongoose.connection;
        connection.on("connected",()=>{
            console.log("Conected with database")
        })
        connection.on("error",(err)=>{
            console.log("Error while establishing connection with Data base",err);
            process.exit()
        })
        
    } catch (error) {
        console.log("error while connection with database");
        console.log(error)
    }
}