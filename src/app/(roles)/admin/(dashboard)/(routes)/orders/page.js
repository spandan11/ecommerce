"use client"
import React, { useEffect, useState } from 'react'

const Orders = () => {
    const [orderData, setOrderData] = useState([]);
    const fetchOrders = async () => {
        const res = await fetch('/api/orders', {
            method: "GET",
        });
        const data = await res.json();
        setOrderData(data.data);
    }
    useEffect(() => {
        fetchOrders();
    }, [])

    let totalSales = 0;

    // Iterate through each sale record
    for (const order of orderData) {
        // Iterate through the products in the sale
        for (const product of order.products) {
            // Add the quantity of each product to the total sales quantity
            totalSales += product.quantity;
        }
    }

    return (
        <>
            <div className="p-5 rounded-md bg-[#F9F9FB] h-full relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Product name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Address
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                        </tr>
                    </thead>
                    {orderData?.map((order, index) => (
                        <>
                            <tbody key={index} className='border-gray-400 border-b-2 py-2'>
                                {order.products.map((product, index) => (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {product.productname} &nbsp; - &nbsp; {product.price} &nbsp; ( {product.quantity} )
                                        </th>
                                        <td className="px-6 py-4">
                                            {order.address}
                                        </td>
                                        <td className="px-6 py-4">
                                            {order.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {order.status}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </>
                    ))}
                </table>
            </div>
        </>
    )
}

export default Orders