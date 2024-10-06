import connection from "@/database/connection";
import { NextResponse,NextRequest } from "next/server";

connection()
export async function GET(request:NextRequest) {
    try {
        const response=NextResponse.json({
            status:200,
            success:true,
            message:"Logout Successfully",
        },{status:200})
        // clearing cookies
        response.cookies.delete("token");
        return response
    } catch (error) {
        console.log("Error while Logout user",error);
        return NextResponse.json({
            success:false,
            status:500,
            message:"Error while logout"
        },{status:500})
        
    }
}
