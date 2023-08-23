"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import UserSidebar from '@/components/(user)/UserSidebar'

const UserNavbar = () => {
    const [showSidebar, setshowSidebar] = useState(false);
    const [mounted, setMounted] = useState(false)

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <>
            <div className='flex items-center p-4 bg-[#F9F9FB]'>
                <button onClick={() => setshowSidebar(!showSidebar)} className="md:hidden"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                </button>
                <button className=' flex w-full justify-end'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </button>
            </div>
            {showSidebar && (
                <div className='relative h-full z-[80] w-72'>
                    <UserSidebar />
                </div>
            )}
        </>
    )
}

export default UserNavbar;