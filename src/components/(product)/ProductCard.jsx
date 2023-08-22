"use client"

import React, { useContext } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

import CartContext from '@/providers/CartProvider';

const ProductCard = ({ product }) => {
    const { addItemToCart } = useContext(CartContext);
    const { _id, productname, category, price, discount, colors, sizes, quantity, description, image } = product;
    const addToCartHandler = () => {
        addItemToCart({
            id: _id,
            productname: productname,
            price: discount ? price - discount : price,
            stock: quantity,
            image: image,
        })
        toast.success("Item added")
    }
    return (
        <div key={_id} className="group relative border p-2 rounded-lg">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <Link href={`/product/${_id}`}>
                    <Image
                        width={256}
                        height={500}
                        src={image}
                        alt={productname}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                </Link>
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                        {/* <Link href={`/product/${_id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {productname}
                        </Link> */}
                        {productname}
                    </h3>
                    <p className="text-sm font-medium text-gray-900">$ {discount ? (<>{price - discount} <del className='opacity-75'> {price} </del></>) : `${price}`}</p>
                </div>
                <button onClick={addToCartHandler} className="text-sm bg-indigo-500 hover:bg-indigo-600 text-white m-2 p-2 rounded-md focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-700 dark:border-gray-700">Add to Cart</button>
            </div>
        </div >
    )
}

export default ProductCard