"use client"

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'

const User = () => {
    const session = useSession();
    const router = useRouter()

    if (session?.status === "unauthenticated") {
        router.push("/login")
    }
    if (session?.status === "authenticated" && session?.data.user.role === "user") {
        return (
            < >
                <h1 className='text-center pt-5 text-xl'>
                    Hi! &nbsp;{session?.data.user.email}
                </h1>
            </>
        )
    }
}

export default User