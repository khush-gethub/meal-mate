import React from 'react'

const Footer = () => {
    return (
        <>
            <div className="footer flex flex-col lg:flex-row justify-between px-6 lg:px-32 h-full lg:items-center gap-8 p-10 bg-[#FFA94D] mt-10">
                <div className="flex flex-col w-full lg:w-auto">
                    <div className='flex flex-col sm:flex-row gap-4 sm:gap-5 mb-4'>
                        <input type="search" className='border rounded bg-white px-6 py-2 w-full sm:w-auto' placeholder='Search' />
                        <button className='px-5 py-2 rounded bg-[#FFF3C4] hover:bg-[#ffeaa0] transition'>Search</button>
                    </div>
                    <p className="text-sm">Created By Khush@Dev</p>
                </div>

                <span className='hidden lg:flex border h-24 opacity-35'></span>

                <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 w-full lg:w-auto'>
                    <div className="flex flex-col gap-2">
                        <a href="/">Home</a>
                        <a href="/Recipe">Recipe</a>
                        <a href="/About">About</a>
                        <a href="/Login">Login</a>
                    </div>
                    <div className="flex flex-col gap-2">
                        <a href="/Signup">Signup</a>
                        <a href="/">Links</a>
                        <a href="/">Links</a>
                        <a href="/">Links</a>
                    </div>
                    <div className="flex flex-col gap-2">
                        <a href="/">Links</a>
                        <a href="/">Links</a>
                        <a href="/">Links</a>
                        <a href="/">Links</a>
                    </div>
                    <div className="flex flex-col gap-2">
                        <a href="/">Links</a>
                        <a href="/">Links</a>
                        <a href="/">Links</a>
                        <a href="/">Links</a>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Footer