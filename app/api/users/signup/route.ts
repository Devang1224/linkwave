import connection from "@/database/connection";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { z } from "zod";


connection();

const userSchema = z.object({
    userName:z.string().min(5,{message:"Username should be atleast 5 characters long"}).trim(),
    email:z.string().email({message:"Must be a valid email"}),
    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
      })
      .min(5, "Password must be more than 5 characters")
      .refine(
        (value) => /[A-Z]/.test(value), 
        { message: "Password must contain at least one uppercase letter" }
      )
      .refine(
        (value) => /[0-9]/.test(value),
        { message: "Password must contain at least one number" }
      )
      .refine(
        (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value),
        { message: "Password must contain at least one special character" }
      )

})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json(); 
        console.log(body, "body from request");
        const { userName, email, password } = body;
        const {error} = userSchema.safeParse({userName, email, password});

        if(error){
            return NextResponse.json({
                success:false,
                status:400,
                message:error
            },{status: 400})
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
