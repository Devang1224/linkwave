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
                status: 400,
                success: false,
                message: "All fields are required"
            });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({
                status: 404,
                success: false,
                message: "User does not exist"
            });
        }

        // Validate password
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({
                status: 401,
                success: false,
                message: "Password is incorrect"
            });
        }

        //  JWT payload
        const userData = {
            id: user._id,
            userName: user.userName,
            email: user.email
        };

        //  token
        const token = jwt.sign(userData, process.env.TOKEN_SECRET!, { expiresIn: '1d' });

        // Create response
        const response = NextResponse.json({
            status: 200,
            success: true,
            message: "Logged in successfully",
            token:token,
            data: userData
        });

        
        response.cookies.set("token", token, {
            httpOnly: true, 
        });

        return response;

    } catch (error) {
        console.error("Error while logging in user:", error);
        return NextResponse.json({
            status: 500,
            success: false,
            message: "Error logging in user"
        });
    }
}
