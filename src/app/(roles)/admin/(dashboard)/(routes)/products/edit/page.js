"use client"

import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast';
import { useSearchParams, useRouter } from 'next/navigation'


const colors = [
    {
        name: "Red",
        value: "red"
    },
    {
        name: "Green",
        value: "green"
    },
    {
        name: "Blue",
        value: "blue"
    },
    {
        name: "Black",
        value: "black"
    },
    {
        name: "Golden",
        value: "golden"
    },
    {
        name: "Orange",
        value: "orange"
    },
    {
        name: "Gray",
        value: "gray"
    },
    {
        name: "Purple",
        value: "purple"
    },
    {
        name: "White",
        value: "white"
    },
    {
        name: "Brown",
        value: "brown"
    },
];

const sizes = [
    {
        name: "Sm",
        value: "sm",
    },
    {
        name: "Md",
        value: "md",
    },
    {
        name: "Lg",
        value: "lg",
    },
    {
        name: "Xl",
        value: "xl",
    },
];

const ProductEdit = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    const [product, setProduct] = useState({
        productname: "",
        category: "",
        price: "",
        discount: "",
        colors: [],
        sizes: [],
        quantity: "",
        image: "",
        description: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/products/${id}`, {
                method: "GET",
            });
            const resProduct = await res.json();
            setProduct(resProduct.data);
        }
        fetchData();
    }, [id])

    const handlecolorsCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setProduct((prevProduct) => ({
                ...prevProduct,
                colors: [...prevProduct.colors, value],
            }));
        } else {
            setProduct((prevProduct) => ({
                ...prevProduct,
                colors: prevProduct.colors.filter((color) => color !== value),
            }));
        }
    };

    const handlesizesCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setProduct((prevProduct) => ({
                ...prevProduct,
                sizes: [...prevProduct.sizes, value],
            }));
        } else {
            setProduct((prevProduct) => ({
                ...prevProduct,
                sizes: prevProduct.sizes.filter((size) => size !== value),
            }));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`/api/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });

            const data = await res.json()
            if (data.status == 200) {
                toast.success(data.message)
            }
            router.push("/admin/products")
        } catch (error) {
            console.log("Error Occured: ", error)
        }
    }
    return (
        <div className='p-5 space-y-4'>
            <h1 className='text-2xl font-semibold'>Edit Product</h1>
            <div className='p-5 bg-[#F9F9FB] h-full space-y-4 rounded-md'>
                <div className='flex space-x-4'>

                </div>
                <div className='flex p-5 bg-white'>
                    <form onSubmit={handleSubmit} className="bg-white space-y-8 p-5 rounded shadow-md text-black w-full">

                        <div className='grid grid-rows-4 grid-flow-col gap-4'>
                            <input
                                type="text"
                                className="block border border-grey-light p-3 rounded mb-4"
                                value={product.productname}
                                onChange={(e) => {
                                    setProduct({ ...product, productname: e.target.value })
                                }}
                                name="product name"
                                placeholder="Product Name"
                                required
                            />

                            <select
                                required
                                value={product.category}
                                onChange={(e) => {
                                    setProduct({ ...product, category: e.target.value })
                                }}
                                className=" p-0 bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option defaultValue={null}>Choose a Category</option>
                                <option value="polo">Polo T-Shirt</option>
                                <option value="half-sleeves">Half Sleeves T-Shirt</option>
                                <option value="hooded">Hooded T-shirt</option>
                                <option value="striped">Striped T-Shirt</option>
                                <option value="solid">Solid T-shirt</option>
                            </select>

                            <input
                                type="text"
                                className="block border border-grey-light p-3 rounded mb-4"
                                value={product.price}
                                onChange={(e) => {
                                    setProduct({ ...product, price: e.target.value })
                                }}
                                required
                                name="product price"
                                placeholder="Product Price" />

                            <input
                                type="text"
                                className="block border border-grey-light p-3 rounded mb-4"
                                value={product.discount}
                                onChange={(e) => {
                                    setProduct({ ...product, discount: e.target.value })
                                }}
                                name="product Quantity"
                                placeholder="Product Discount" />

                            <div className="grid grid-cols-5 p-2 grid-flow-row gap-4 shadow-md">
                                {colors.map((color, index) => (
                                    <div key={index}>
                                        <input type="checkbox" onChange={handlecolorsCheckboxChange} checked={product.colors.includes(color.value)} value={color.value} className="w-4 h-4" />
                                        <label htmlFor="checked-checkbox" className="mx-2 text-sm font-medium text-gray-900 dark:text-gray-300">{color.name}</label>
                                    </div>
                                ))}
                            </div>

                            <div className="items-center justify-center grid grid-cols-5 p-2 grid-flow-row gap-4 shadow-md">
                                {sizes.map((size, index) => (
                                    <div key={index}>
                                        <input type="checkbox" onChange={handlesizesCheckboxChange} checked={product.sizes.includes(size.value)} value={size.value} className="w-4 h-4" />
                                        <label htmlFor="checked-checkbox" className="mx-2 text-sm font-medium text-gray-900 dark:text-gray-300">{size.name}</label>
                                    </div>
                                ))}
                            </div>

                            <input
                                type="number"
                                className="block border border-grey-light p-3 rounded mb-4"
                                value={product.quantity}
                                onChange={(e) => {
                                    setProduct({ ...product, quantity: e.target.value })
                                }}
                                required
                                name="product quantity"
                                placeholder="Product Quantity" />

                            <input
                                type="text"
                                className="block border border-grey-light p-3 rounded mb-4"
                                value={product.description}
                                onChange={(e) => {
                                    setProduct({ ...product, description: e.target.value })
                                }}
                                name="product description"
                                placeholder="Product Description" />
                        </div>
                        <input
                            type="text"
                            className="block border border-grey-light p-3 rounded mb-4 w-full"
                            value={product.image}
                            onChange={(e) => {
                                setProduct({ ...product, image: e.target.value })
                            }}
                            name="product image"
                            placeholder="Product image URL" />

                        <button
                            type="submit"
                            className="text-center p-3 w-32 rounded bg-green text-white bg-indigo-500 focus:outline-none my-1"
                        >Edit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProductEdit;