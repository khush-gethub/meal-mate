import React from 'react'
import { Link } from 'react-router-dom'

const DessertHero = () => {
    return (
        <>
            <div className="px-4 sm:px-10 lg:px-24 py-10 bg-[#FFF6F0] w-full mb-12">
                <div
                    className="relative bg-cover bg-center rounded-xl overflow-hidden min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] flex items-center justify-center"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=60')",
                    }}
                >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-[#222121]/20 backdrop-blur-sm"></div>

                    {/* Content Card */}
                    <div className="relative z-10 text-center px-6 py-8 bg-white/80 rounded-xl shadow-lg max-w-md w-full max-sm:h-[18.8rem] flex flex-col items-center justify-center">
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#4E342E] tracking-tight">Dessert</h2>
                        <p className="mt-4 text-[#4E342E]/90 text-lg sm:text-2xl leading-relaxed">
                            The dessert you’ve been craving is right here for you!
                        </p>
                        <Link 
                            to="/menu/dessert"
                            className="inline-block mt-6 px-6 py-3 bg-[#FFF3C4] hover:bg-[#FFE082] text-[#4E342E] font-semibold text-lg rounded-2xl transition-all duration-300"
                        >
                            Get Recipes
                        </Link>
                    </div>
                </div>
            </div>

        </>
    )
}

export default DessertHero