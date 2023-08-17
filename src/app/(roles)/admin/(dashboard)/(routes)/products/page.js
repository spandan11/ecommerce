"use client"

import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast';

const Products = () => {
    const [showForm, setshowForm] = useState(false);
    const [productsData, setproductsData] = useState([]);
    const fetchProducts = async () => {
        const res = await fetch("/api/products/", {
            method: "GET",
        });
        const resdata = await res.json();
        setproductsData(resdata.data);
    }
    useEffect(() => {
        fetchProducts();
    }, [productsData])
    return (
        <div className='p-5 space-y-4'>
            <div className='flex justify-between'>
                <h1 className='text-2xl font-semibold'>Products</h1>
                <button onClick={() => setshowForm(!showForm)} className='text-center p-3 rounded bg-green text-white bg-indigo-500 focus:outline-none my-1'>Add Product</button>
            </div>
            <div className='space-y-4'>
                {showForm ? (
                    <div className='p-5 bg-[#F9F9FB] h-full space-y-4 rounded-md'>
                        <AddProduct setshowForm={setshowForm} />
                    </div>
                ) : null}
                <div className="p-5 rounded-md bg-[#F9F9FB] h-full relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Product name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Colors
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Sizes
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Quantity
                                </th>
                                <th scope="col" className="px-6 py-3">
                                </th>
                            </tr>
                        </thead>
                        {productsData.map((product, index) => (
                            <tbody key={index}>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {product.productname}
                                    </th>
                                    <td className="px-6 py-4">
                                        {product.category}
                                    </td>
                                    <td className="px-6 py-4">
                                        {product.colors.join(", ")}
                                    </td>
                                    <td className="px-6 py-4">
                                        {product.sizes.join(", ")}
                                    </td>
                                    <td className="px-6 py-4">
                                        ${product.price}
                                    </td>
                                    <td className="px-6 py-4">
                                        {product.quantity}
                                    </td>
                                    <th scope="col" className="px-6 py-3">
                                        <Link href={`/admin/products/edit?id=${product._id}`}>Edit</Link>
                                    </th>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Products;




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

const AddProduct = ({ setshowForm }) => {
    const [product, setProduct] = useState({
        productname: "",
        category: "",
        price: "",
        discount: "",
        colors: [],
        sizes: [],
        quantity: "",
        description: "",
    });

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
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });

            const data = await res.json()
            if (data.status == 200) {
                toast.success(data.message)
            }
        } catch (error) {
            console.log("Error Occured: ", error)
        } finally {
            e.target.reset()
            setshowForm(false)
        }
    }
    return (
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
                    <option selected>Choose a Category</option>
                    <option value="smartphone">Smartphone</option>
                    <option value="laptop">Laptop</option>
                    <option value="desktop">Desktop</option>
                    <option value="accessory">Accesories</option>
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
                            <label for="checked-checkbox" className="mx-2 text-sm font-medium text-gray-900 dark:text-gray-300">{color.name}</label>
                        </div>
                    ))}
                </div>

                <div className="items-center justify-center grid grid-cols-5 p-2 grid-flow-row gap-4 shadow-md">
                    {sizes.map((size, index) => (
                        <div key={index}>
                            <input type="checkbox" onChange={handlesizesCheckboxChange} checked={product.sizes.includes(size.value)} value={size.value} className="w-4 h-4" />
                            <label for="checked-checkbox" className="mx-2 text-sm font-medium text-gray-900 dark:text-gray-300">{size.name}</label>
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

            <button
                type="submit"
                className="text-center p-3 w-32 rounded bg-green text-white bg-indigo-500 focus:outline-none my-1"
            >Add</button>
        </form>
    )
}


