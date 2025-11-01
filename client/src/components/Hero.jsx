import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <div className="bg-[#FFF6F0]">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 
                            py-8 md:py-12 lg:py-16 
                            flex flex-col lg:flex-row 
                            justify-between items-center 
                            gap-8 md:gap-10 lg:gap-12 xl:gap-16">
                
                {/* Left Content */}
                <div className="w-full lg:w-1/2 
                                text-center lg:text-left 
                                max-w-xl mx-auto lg:mx-0">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
                                   font-poppins font-semibold 
                                   text-[#4E342E] 
                                   mb-4 md:mb-6 lg:mb-2">
                        The Top Recipe
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl lg:text-xl 
                                  text-[#4E342E] 
                                  mb-4 md:mb-6 
                                  leading-relaxed">
                        Discover delicious recipes, plan your meals with ease, and bring joy to your kitchen every day! Whether you're craving quick dinners, healthy lunches, or sweet desserts, we have something for every taste. Start exploring today and make every meal memorable. Your perfect kitchen companion is just a click away!
                    </p>
                    <div className="flex justify-center lg:justify-start">
                        <button className="bg-[#FFF3C4] hover:bg-[#FFE082] 
                                           transition rounded-2xl 
                                           text-[#4E342E] 
                                           px-6 sm:px-8 md:px-10 
                                           py-2 sm:py-3 
                                           text-base sm:text-xl md:text-xl">
                            <Link to="./Recipe">Get Recipes</Link>
                        </button>
                    </div>
                </div>

                {/* Right Images */}
                <div className="hidden lg:flex 
                                w-1/2 
                                flex-col md:flex-row 
                                items-center 
                                gap-4 xl:gap-6">
                    {/* Main Image */}
                    <div className="w-full md:w-1/2 lg:w-[380px] xl:w-[420px]">
                        <img
                            src="https://plus.unsplash.com/premium_photo-1661419883163-bb4df1c10109?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZvb2QlMjBjaGlja2VufGVufDB8fDB8fHww"
                            alt="Main Dish"
                            className="w-full h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] 
                                       object-cover rounded-xl"
                        />
                    </div>

                    {/* Side Images */}
                    <div className="hidden md:flex flex-col gap-4 xl:gap-6 w-1/2 lg:w-[300px] xl:w-[350px]">
                        <img
                            src="https://images.unsplash.com/photo-1574484284002-952d92456975?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1lYWx8ZW58MHx8MHx8fDA%3D"
                            alt="Side Dish 1"
                            className="w-full h-[240px] md:h-[250px] lg:h-[300px] xl:h-[350px] 
                                       object-cover rounded-xl"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1608135227059-95aacee01035?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2VhZm9vZHxlbnwwfHwwfHx8MA%3D%3D"
                            alt="Side Dish 2"
                            className="w-full h-[240px] md:h-[250px] lg:h-[300px] xl:h-[350px] 
                                       object-cover rounded-xl"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
