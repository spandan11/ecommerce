import { connectMongo } from "@/utils/dbconnect";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connectMongo();
        const products = await Product.find({}).sort({ createdAt: -1 });
        return NextResponse.json({
            status: 200,
            data: products,
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
        const newProduct = new Product(data);

        await newProduct.save();

        return NextResponse.json({
            status: 200,
            message: "Product added successfully",
        })
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: error.message
        })
    }
}

export async function DELETE(req) {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');
    // const searchParams = new URL(req.url).searchParams;
    // const id = searchParams.get('id');
    try {
        await connectMongo();
        await Product.findByIdAndDelete(id);
        return NextResponse.json({
            status: 200,
            message: "Product Deleted Successfuly",
        })
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: error.message,
        })
    }
}