"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';

const Orders = () => {
    const [orderData, setOrderData] = useState([]);
    const session = useSession();
    const fetchOrders = async () => {
        const res = await fetch(`/api/orders/${session?.user?.data.email}`, {
            method: "GET",
        });
        const data = await res.json();
        setOrderData(data.data);
    }
    useEffect(() => {
        fetchOrders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderData])
    return (
        <>
            {orderData?.map((order, index) => (
                <div key={index} className="p-5 rounded-md bg-[#F9F9FB] h-full relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Product name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    quantity
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Address
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        {order.products.map((product, index) => (
                            <tbody key={index}>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {product.productname}
                                    </th>
                                    <td className="px-6 py-4">
                                        {product.price}
                                    </td>
                                    <td className="px-6 py-4">
                                        {product.quantity}
                                    </td>
                                    <td className="px-6 py-4">
                                        {order.address}
                                    </td>
                                    <td className="px-6 py-4">
                                        {order.status}
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            ))}
        </>
    )
}

export default Orders