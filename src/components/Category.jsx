import React from 'react'

const Category = () => {
    return (
        <>
            <div className="bg-[#FFF6F0] px-4 py-10">
                <h1 className="text-6xl font-semibold text-[#4E342E]  font-Poppins mb-5 text-center md:text-left md:mx-40">
                    Our Category
                </h1>

                <div className="flex justify-center">
                    {/* Image Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full md:mx-[10rem]">
                        {/* Large Left Image */}
                        <div className="md:row-span-3 relative">
                            <img
                                src="https://images.unsplash.com/photo-1701579231378-3726490a407b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGFuZWVyfGVufDB8fDB8fHww"
                                alt="Paneer"
                                className="rounded object-cover w-full h-72 md:h-[46rem] overflow-hidden"
                            />
                            <div className="absolute top-0 left-0 w-full h-72 md:h-[46rem] bg-black/40 z-10"></div>
                            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-20">
                                <h2 className="text-5xl md:text-8xl font-bold text-white hover:scale-110 duration-300 tracking-tight cursor-pointer">Vegetarian</h2>
                            </div>
                        </div>

                        {/* Right Column (Chicken + Seafood) */}
                        <div className="flex flex-col gap-4">
                            <div className="relative">
                                <img
                                    src="https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNoaWNrZW58ZW58MHx8MHx8fDA%3D"
                                    alt="Chicken"
                                    className="rounded object-cover w-full h-36 md:h-full"
                                />
                                <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>
                                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-20">
                                    <h2 className="text-5xl md:text-8xl font-bold text-white hover:scale-110 duration-300 tracking-tight cursor-pointer">Chicken</h2>
                                </div>
                            </div>

                            <div className="relative">
                                <img
                                    src="https://plus.unsplash.com/premium_photo-1664475931376-82ac86b4ae58?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2VhJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D"
                                    alt="Seafood"
                                    className="rounded object-cover w-full h-36 md:h-full"
                                />
                                <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>
                                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-20">
                                    <h2 className="text-5xl md:text-8xl font-bold text-white hover:scale-110 duration-300 tracking-tight cursor-pointer">Sea Food</h2>
                                </div>
                            </div>
                        </div>

                        {/* Large Right Image */}
                        <div className="md:row-span-3 relative">
                            <img
                                src="https://images.unsplash.com/photo-1505976378723-9726b54e9bb9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNha2V8ZW58MHx8MHx8fDA%3D"
                                alt="Cake"
                                className="rounded object-cover w-full h-72 md:h-[46rem]"
                            />
                            <div className="absolute top-0 left-0 w-full h-72 md:h-[46rem] bg-black/40 z-10"></div>
                            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-20">
                                <h2 className="text-5xl md:text-8xl font-bold text-white hover:scale-110 duration-300 tracking-tight cursor-pointer">Dessert</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Category

