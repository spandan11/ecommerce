"use client"

import React, { useState, useEffect } from 'react'
import ProductCard from '@/components/(product)/ProductCard';

const Products = () => {
    const [productData, setProductData] = useState([]);
    const fetchProducts = async () => {
        const res = await fetch("/api/products/", {
            method: "GET",
        });

        const resdata = await res.json();
        const slicedData = resdata.data.reverse().slice(4);
        const usefulData = slicedData.reverse()
        setProductData(usefulData);
    }
    useEffect(() => {
        fetchProducts();
    }, [])
    return (
        <>
            <h1 className='px-12 text-3xl font-semibold pt-16 text-center'>Products</h1>
            <div className="products px-12">
                {/* Products list */}
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {productData.map((product, index) => (
                        <ProductCard product={product} key={index} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Products