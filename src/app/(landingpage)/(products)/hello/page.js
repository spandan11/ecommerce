"use client"

import React, { useEffect, useState } from 'react'
import ProductCard from '@/components/(product)/ProductCard';
// import { ProductData } from '@/productData/ProductData';

const Products = () => {
    const [ProductData, setProductData] = useState([]);
    const [product, setProduct] = useState({});


    const uniqueList = [
        'All', ...new Set(
            ProductData.map((uniqueItem) => {
                return uniqueItem.category;
            })
        ),
    ];
    // Create a menu api and make a new state.
    const [listData, setListData] = useState(ProductData);
    const [list, setList] = useState(uniqueList);

    const filterItem = (category) => {
        if (category === "All") {
            setListData(ProductData);
            return;
        }
        const updatedList = ProductData.filter((product) => {
            return product.category === category;
        });
        setListData(updatedList);
    }

    return (
        <>
            <h1 className='px-12 text-3xl font-semibold mt-8'>Products</h1>
            <div className="products px-12 py-12">
                {/* Buttons */}
                <div className="flex overflow-x-auto whitespace-nowrap gap-2" >
                    {list.map((listItem, index) => (
                        <button onClick={() => filterItem(listItem)} key={index} className="inline-flex items-center h-12 px-4 py-2 text-sm text-center text-gray-700 border border-b-0 border-gray-300 sm:text-base dark:border-gray-500 rounded-t-md dark:text-white whitespace-nowrap focus:outline-none">
                            {listItem}
                        </button>
                    ))}
                </div>

                {/* Products list */}
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {listData.map((product, index) => (
                        <ProductCard product={product} key={index} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Products