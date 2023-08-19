"use client"

import react, { useState, useEffect } from "react";
import ProductCard from "../(product)/ProductCard";

const Featured = () => {
    const [productData, setProductData] = useState([]);
    const fetchProducts = async () => {
        const res = await fetch("/api/products/", {
            method: "GET",
        });
        const resdata = await res.json();
        const reverseData = resdata.data.reverse();
        const slicedData = reverseData.slice(0, 4);
        setProductData(slicedData);
    }
    useEffect(() => {
        fetchProducts();
    }, [])
    return (
        <div className="feature" id="feature">
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center">Featured Products</h2>
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {productData.map((product, index) => (
                            <ProductCard product={product} key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Featured;