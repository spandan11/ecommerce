import { connectMongo } from "@/utils/dbconnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { username, email, password } = await req.json();
        await connectMongo();
        const userExist = await User.findOne({ email });
        if (userExist) {
            return NextResponse.json({
                status: 400,
                message: "User already exist",
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        })
        await newUser.save();

        return NextResponse.json({
            status: 200,
            message: "Account Registered",
        })
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: error.message
        })
    }
}