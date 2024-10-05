import connection from "@/database/connection";
import { NextResponse,NextRequest } from "next/server";

connection()
export async function GET(request:NextRequest) {
    try {
        const response=NextResponse.json({
            status:200,
            success:true,
            message:"Logout Successfully",
        })
        // clearing cookies
        response.cookies.set("token","",{
            httpOnly:true,
            expires:new Date(0)
        })
        return response
    } catch (error) {
        console.log("Error while Logout user",error);
        return NextResponse.json({
            success:false,
            status:500,
            message:"Error while logout"
        })
        
    }
}
