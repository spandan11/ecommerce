"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

const Register = () => {
    const session = useSession()
    const router = useRouter()
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
    })

    const [buttonDisabled, setButtonDisabled] = useState(false);

    useEffect(() => {
        if (user.username.length > 2 && user.email.length > 0 && user.password.length > 7) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const data = await res.json()
            if (data.status == 200) {
                toast.success(data.message)
                router.push('/login')
            }
        } catch (error) {
            console.log("Error Occured: ", error)
        }
        e.target.reset()
    }

    if (session.status === "authenticated") {
        router.push(`/${session.data.user.role}`)
    }

    if (session.status === "unauthenticated") {
        return (
            <div className="bg-grey-lighter min-h-screen flex flex-col">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <form onSubmit={handleSubmit} className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center">Register</h1>
                        <input
                            value={user.username}
                            onChange={(e) => {
                                setUser({ ...user, username: e.target.value })
                            }}
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="username"
                            placeholder="Spandan" />

                        <input
                            value={user.email}
                            onChange={(e) => {
                                setUser({ ...user, email: e.target.value })
                            }}
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="email"
                            placeholder="Email" />

                        <input
                            value={user.password}
                            onChange={(e) => {
                                setUser({ ...user, password: e.target.value })
                            }}
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="password"
                            placeholder="Password" />

                        <button
                            type="submit"
                            disabled={buttonDisabled}
                            className={`w-full text-center py-3 cursor-pointer rounded bg-green text-white ${buttonDisabled ? 'bg-indigo-300' : 'bg-indigo-500'} focus:outline-none my-1`}
                        >Create Account</button>

                        <div className="text-grey-dark mt-6 px-2">
                            Already have an account?
                            <Link className="no-underline border-b border-blue text-blue" href="/login">
                                &nbsp;Log in
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

export default Register;