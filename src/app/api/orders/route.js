import { connectMongo } from "@/utils/dbconnect";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connectMongo();
        const orders = await Order.find({}).sort({ createdAt: -1 });;
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
}



export async function POST(req) {
    try {
        const data = await req.json();
        await connectMongo();
        const newOrder = new Order(data);
        await newOrder.save();
        return NextResponse.json({
            status: 200,
            message: "Order Placed Successfully"
        })
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: error.message
        })
    }
}