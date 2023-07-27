"use client"

import React, { useEffect } from 'react'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'


const Login = () => {
    const session = useSession();
    const router = useRouter()
    if (session.status === 'authenticated') {
        router.push(`/${session.data.user.role}`)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const email = e.target[0].value
        const password = e.target[1].value

        signIn('credentials', { email, password })


        e.target.reset()
    }

    if (session.status === "unauthenticated") {
        return (
            <div className="bg-grey-lighter min-h-screen flex flex-col">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <form onSubmit={handleSubmit} className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center">Log In</h1>
                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="email"
                            placeholder="Email" />

                        <input
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="password"
                            placeholder="Password" />

                        <button
                            type="submit"
                            className="w-full text-center py-3 rounded bg-green text-white bg-indigo-500 focus:outline-none my-1"
                        >Login</button>

                        <div className="text-grey-dark mt-6 px-2">
                            Don&apos;t have an account?
                            <Link className="no-underline border-b border-blue text-blue" href="/register">
                                &nbsp;Sign up
                            </Link>
                        </div>
                        <div className="text-grey-dark mt-6 px-2 text-center">
                            <Link className="no-underline border-b border-blue text-blue" href="/">
                                Go back
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;