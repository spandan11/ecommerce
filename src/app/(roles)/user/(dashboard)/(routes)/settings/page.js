"use client"

import React, { useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast';


const Settings = () => {
    const session = useSession();
    const [checkPassword, setChecKPassword] = useState({
        passwordFirst: "",
        passwordSecond: '',
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    useEffect(() => {
        if (checkPassword.passwordFirst === checkPassword.passwordSecond) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [checkPassword])

    useEffect(() => {
        setPassword((prevPassword) => ({
            ...prevPassword,
            newPassword: checkPassword.passwordFirst,
        }));
    }, [checkPassword.passwordFirst]);

    const [password, setPassword] = useState({
        email: session.data?.user.email,
        oldPassword: "",
        newPassword: checkPassword.passwordFirst,
    });

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch("/api/users/", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(password)
            });
            const resdata = await res.json();
            if (resdata.status === 200) {
                toast.success(resdata.message)
            }
            if (resdata.status === 500 || resdata.status === 400) {
                toast.error(resdata.message)
            }
        } catch (error) {
            console.log("Error Occured: ", error)
        }

        e.target.reset();
    }
    return (
        <div className='p-5 space-y-4'>
            <h1 className='text-2xl font-semibold'>Settings</h1>
            <div className='p-5 bg-[#F9F9FB] h-full space-y-4 rounded-md'>
                <div className='flex space-x-4'>
                    <button onClick={signOut} className='bg-black hover:bg-black/90 text-white p-3 rounded-md'>Logout</button>
                </div>
                <div className='p-5 bg-white flex flex-col'>
                    <h2 className='text-2xl'>Change Password</h2>
                    <form onSubmit={handleSubmit} className="bg-white px-6 py-8 text-black w-full">
                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            value={checkPassword.oldPassword}
                            onChange={(e) => setPassword({ ...password, oldPassword: e.target.value })}
                            name="password"
                            placeholder="Previous Password" />

                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            value={checkPassword.passwordFirst}
                            onChange={(e) => setChecKPassword({ ...checkPassword, passwordFirst: e.target.value })}
                            name="password"
                            placeholder="New Password" />

                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            value={checkPassword.passwordSecond}
                            onChange={(e) => setChecKPassword({ ...checkPassword, passwordSecond: e.target.value })}
                            name="confirm password"
                            placeholder="Confirm Password" />

                        <button
                            disabled={buttonDisabled}
                            type="submit"
                            className={`bg-black ${buttonDisabled ? 'bg-black/80 cursor-default' : 'bg-black cursor-pointer'} hover:bg-black/90 text-white p-3 rounded-md w-full`}
                        >Change</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Settings