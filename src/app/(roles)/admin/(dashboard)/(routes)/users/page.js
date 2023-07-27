"use client"

import React, { useEffect, useState } from 'react'

const Users = () => {
    const [userData, setuserData] = useState([]);
    const fetchUsers = async () => {
        const res = await fetch("/api/users/", {
            method: "GET",
        });
        const resdata = await res.json();
        setuserData(resdata.data);
    }
    useEffect(() => {
        fetchUsers();
    }, [userData])
    return (
        <div className='p-5 space-y-4'>
            <h1 className='text-2xl font-semibold'>Users</h1>
            <div className='p-5 bg-[#F9F9FB] h-full space-y-4 rounded-md'>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Username
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    role
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    created At
                                </th>
                            </tr>
                        </thead>
                        {userData.map((user, index) => (
                            <tbody key={index}>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {user.username}
                                    </th>
                                    <td className="px-6 py-4">
                                        {user.role}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.createdAt}
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Users;