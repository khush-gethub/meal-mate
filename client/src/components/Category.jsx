import React from 'react'

const Category = () => {
    return (
        <div className="bg-[#FFF6F0] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 md:py-12 lg:py-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl 
                           font-semibold text-[#4E342E] font-Poppins 
                           mb-6 md:mb-8 lg:mb-10 
                           text-center 
                           md:mx-4 lg:mx-8 xl:mx-12">
                Our Category
            </h1>

            <div className="flex justify-center">
                {/* Image Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full 
                                md:mx-4 lg:mx-8 xl:mx-12 
                                max-w-screen-xl mx-auto ">
                    {/* Large Left Image (Vegetarian) */}
                    <div className="md:row-span-3 relative overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1701579231378-3726490a407b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGFuZWVyfGVufDB8fDB8fHww"
                            alt="Paneer"
                            className="rounded object-cover w-full h-72 md:h-[40rem] lg:h-[46rem] xl:h-[49rem] 
                                       transition-transform duration-300 "
                        />
                        <div className="absolute inset-0 bg-black/40 rounded md:h-[96%]"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-7xl
                                           font-bold text-white 
                                           hover:scale-110 duration-300 
                                           tracking-tight cursor-pointer 
                                           text-shadow-lg">
                                Vegetarian
                            </h2>
                        </div>
                    </div>

                    {/* Right Column (Chicken + Seafood) */}
                    <div className="flex flex-col gap-4">
                        {/* Chicken */}
                        <div className="relative group">
                            <img
                                src="https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNoaWNrZW58ZW58MHx8MHx8fDA%3D"
                                alt="Chicken"
                                className="rounded object-cover w-full h-36 md:h-[19rem] lg:h-[22rem] xl:h-[24rem] 
                                           transition-transform duration-300 "
                            />
                            <div className="absolute inset-0 bg-black/40 rounded"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-7xl 
                                               font-bold text-white 
                                               hover:scale-110 duration-300 
                                               tracking-tight cursor-pointer 
                                               text-shadow-lg">
                                    Chicken
                                </h2>
                            </div>
                        </div>

                        {/* Seafood */}
                        <div className="relative group">
                            <img
                                src="https://plus.unsplash.com/premium_photo-1664475931376-82ac86b4ae58?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2VhJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D"
                                alt="Seafood"
                                className="rounded object-cover w-full h-36 md:h-[19rem] lg:h-[22rem] xl:h-[24rem] 
                                           transition-transform duration-300 "
                            />
                            <div className="absolute inset-0 bg-black/40 rounded"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-7xl 
                                               font-bold text-white 
                                               hover:scale-110 duration-300 
                                               tracking-tight cursor-pointer 
                                               text-shadow-lg">
                                    Sea Food
                                </h2>
                            </div>
                        </div>
                    </div>

                    {/* Large Right Image (Dessert) */}
                    <div className="md:row-span-3 relative group overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1505976378723-9726b54e9bb9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNha2V8ZW58MHx8MHx8fDA%3D"
                            alt="Cake"
                            className="rounded object-cover w-full h-72 md:h-[40rem] lg:h-[46rem] xl:h-[49rem] 
                                       transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 rounded md:h-[96%]"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-7xl 
                                           font-bold text-white 
                                           hover:scale-110 duration-300 
                                           tracking-tight cursor-pointer 
                                           text-shadow-lg">
                                Dessert
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category
