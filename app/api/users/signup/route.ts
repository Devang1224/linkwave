import connection from "@/databse/connection";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connection();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json(); 
        console.log(body, "body from request");
        const { userName, email, password } = body;
        if(!userName ||!email||!password){
            return NextResponse.json({
                success:false,
                status:400,
                message:"aLl fields are required"
            })
        }
        // Check if the user already exists
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json(
                {
                    error: "User already exists",
                },
                {
                    status: 400,
                }
            );
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create a new user
        const newUser = new User({
            userName,
            email,
            password: hashedPassword,
        });
        const savedUser = await newUser.save();
        console.log(savedUser, "saved user");

        // Respond with user data
        const userData = {
            userName,
            email,
        };
        return NextResponse.json({
            status: 200,
            message: 'User saved successfully',
            data: userData,
        });

    } catch (error: any) {
        console.error("Error:", error); // Log the error for debugging
        return NextResponse.json(
            {
                error: error.message,
            },
            {
                status: 500,
            }
        );
    }
}
