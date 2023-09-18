"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import PerformanceChart from '@/components/(admin)/PerformanceChart'

const boxes = [
    {
        name: "Clients",
        href: "/admin/users",
        count: "32",
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#12f21e" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
        ,
    },
    {
        name: "sales",
        href: "#",
        count: "172",
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#1344ea" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
        ,
    },
    {
        name: "Revenue",
        href: "#",
        count: "$ 36000",
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ffe203" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        ,
    }
];

const Admin = () => {
    const session = useSession();
    const router = useRouter()

    if (session?.status === "unauthenticated") {
        router.push("/login")
    }
    if (session?.status === "authenticated" && session?.data.user.role === "admin") {
        return (
            <div className='p-5 space-y-4'>
                <h1 className='text-2xl font-semibold'>Dashboard</h1>
                <div className='p-5 bg-[#F9F9FB] h-full space-y-4 rounded-md'>
                    <div className='flex space-x-4'>
                        {boxes.map((box, index) => (
                            <Link href={box.href} key={index} className="bg-white flex text-xl h-full w-full gap-5 overflow-hidden p-5 shadow-md shadow-zinc-500/50">
                                <div className='flex flex-col h-full w-full'>{box.name} <span className='font-semibold'>{box.count}</span></div>
                                <div className='flex justify-end w-full h-full'>{box.icon}</div>
                            </Link>
                        ))}
                    </div>
                    <div className='flex bg-white'>
                        <PerformanceChart />
                    </div>
                </div>
            </div>
        )
    }
}

export default Admin