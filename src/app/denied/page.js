import React from 'react'

const Denied = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div >
                <h1 className='text-red-500 text-4xl text-center'>Access Denied</h1>
                <h3 className='m-3'>You are not allowed to access this page</h3>
            </div>
        </div>
    )
}

export default Denied