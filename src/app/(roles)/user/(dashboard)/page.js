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
            <div className='text-center'>You are an user</div>
        )
    }
}

export default User