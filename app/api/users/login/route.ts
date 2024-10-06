import connection from "@/database/connection";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connection();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Validate input fields
        if (!email || !password) {
            return NextResponse.json({
                code: 400,
                success: false,
                message: "All fields are required"
            },{status:400});
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({
                code: 404,
                success: false,
                message: "User does not exist"
            },{status:404});
        }

        // Validate password
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({
                code: 401,
                success: false,
                message: "Password is incorrect"
            },{status:401});
        }

        //  JWT payload
        const userData = {
            id: user._id,
            userName: user.userName,
            email: user.email
        };

        //  token
        const token = jwt.sign(userData, process.env.TOKEN_SECRET!, { expiresIn: '7d' });

        // Create response
        const response = NextResponse.json({
            status: 200,
            success: true,
            message: "Logged in successfully",
            token:token,
            data: {
                username: userData.userName,
                email:user.email
            }
        });

        
        response.cookies.set("token", token, {
            httpOnly: true, 
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
        });

        return response;

    } catch (error) {
        console.error("Error while logging in user:", error);
        return NextResponse.json({
            code: 500,
            success: false,
            message: "Error logging in user"
        },{status:500});
    }
}
