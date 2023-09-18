import { connectMongo } from "@/utils/dbconnect";
import Product from "@/models/Product";
import { NextResponse } from "next/server";


export async function GET(req, { params }) {
    const { id } = params;
    try {
        await connectMongo();
        const product = await Product.findById(id);
        return NextResponse.json({
            status: 200,
            data: product,
        })
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: error.message,
        })
    }
}

export async function PUT(req, { params }) {
    const { id } = params;
    const data = await req.json();
    try {
        await connectMongo();
        await Product.findByIdAndUpdate(id, data);
        return NextResponse.json({
            status: 200,
            message: "Product Updated Successfuly",
        })
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: error.message,
        })
    }
}

// export async function DELETE(req, { params }) {
//     const { id } = params;
//     console.log(id)
//     // const data = await req.json();
//     // try {
//     //     await connectMongo();
//     //     await Product.findByIdAndUpdate(id, data);
//     //     return NextResponse.json({
//     //         status: 200,
//     //         message: "Product Updated Successfuly",
//     //     })
//     // } catch (error) {
//     //     return NextResponse.json({
//     //         status: 500,
//     //         message: error.message,
//     //     })
//     // }
// }