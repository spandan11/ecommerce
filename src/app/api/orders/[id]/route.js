import { connectMongo } from "@/utils/dbconnect";
import Order from "@/models/Order";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"

export async function GET(req, res) {
    const session = await getServerSession({ req });

    if (session) {
        const email = session.user.email;
        try {
            await connectMongo();
            const orders = await Order.find({ email }).sort({ createdAt: -1 });
            return NextResponse.json({
                status: 200,
                data: orders,
            })
        } catch (error) {
            return NextResponse.json({
                status: 500,
                message: error.message,
            })
        }
    } else {
        return NextResponse.json({
            status: 401,
            message: "Unauthorized",
        })
    }
}

