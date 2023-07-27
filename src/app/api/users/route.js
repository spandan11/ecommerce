import { connectMongo } from "@/utils/dbconnect";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";


export async function GET(req) {
    try {
        await connectMongo();
        const users = await User.find({ role: "user" });
        return NextResponse.json({
            status: 200,
            data: users,
        })
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: error.message,
        })
    }
}

export async function PUT(req) {
    const { email, oldPassword, newPassword } = await req.json();
    try {
        await connectMongo();
        const user = await User.findOne({ email: email });

        if (user) {
            const isPasswordCorrect = await bcrypt.compare(
                oldPassword,
                user.password
            );
            if (isPasswordCorrect) {
                const salt = await bcrypt.genSalt(10);
                const newencryptedPassword = await bcrypt.hash(newPassword, salt);
                await User.findByIdAndUpdate(user._id, { password: newencryptedPassword });
                return NextResponse.json({
                    status: 200,
                    message: "Password Updated",
                })
            } else {
                return NextResponse.json({
                    status: 400,
                    message: "Password is incorrect",
                })
            }
        } else {
            return NextResponse.json({
                status: 500,
                message: "User not Found",
            })
        }

    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: error.message,
        })
    }
}