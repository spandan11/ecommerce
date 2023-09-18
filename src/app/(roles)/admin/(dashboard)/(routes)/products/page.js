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

    const deleteProduct = async (productId) => {

        const res = await fetch(`/api/products?id=${productId}`, {
            method: "DELETE",
        });
        const resMessage = await res.json();
        if (resMessage.status == 200) {
            toast.success("Product Deleted");
        }
    }
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
                                        <Link href={`/admin/products/edit?id=${product._id}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                        </Link>
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-red-500">
                                        <button onClick={() => deleteProduct(product._id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
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
        image: "",
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
            >Add</button>
        </form>
    )
}


