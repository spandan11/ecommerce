"use client"

import React, { useState, useEffect } from 'react'
import AdminSidebar from '@/components/(admin)/AdminSidebar'
import { signOut } from 'next-auth/react'

const AdminNavbar = () => {
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
            <div className='flex items-center justify-between p-4 bg-[#F9F9FB]'>
                <button onClick={() => setshowSidebar(!showSidebar)} className="md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
                <button className='ml-auto' onClick={signOut}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                </button>
            </div>
            {showSidebar && (
                <div className='relative h-full z-[80] w-72'>
                    <AdminSidebar />
                </div>
            )}
        </>
    )
}

export default AdminNavbar;