import React from 'react'

const Hero = () => {
    return (
        <>
            <div className="flex flex-col lg:flex-row justify-between items-center px-6 lg:px-45 py-10 bg-[#FFF6F0] gap-10">
                {/* Left Content */}
                <div className="max-w-md text-center lg:text-left">
                    <h1 className="text-5xl lg:text-6xl font-poppins font-semibold text-[#4E342E] mb-4">
                        The Title Recipe
                    </h1>
                    <p className="md:w-2xl text-[#4E342E] mb-4 md:text-3xl text-2xl">
                        Discover delicious recipes, plan your meals with ease, and bring joy to your kitchen every day! Whether you're craving quick dinners, healthy lunches, or sweet desserts, we have something for every taste. Start exploring today and make every meal memorable. Your perfect kitchen companion is just a click away!
                    </p>
                    <button className="bg-[#FFF3C4] hover:bg-[#FFE082] transition rounded-2xl text-[#4E342E] px-10 py-3 text-2xl"><a href="./Recipe">Get Recipes</a></button>
                </div>

                {/* Right Images */}
                <div className="sm:flex sm:flex-row items-center gap-4 hidden ">
                    {/* Main Image */}
                    <img
                        src="https://plus.unsplash.com/premium_photo-1661419883163-bb4df1c10109?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZvb2QlMjBjaGlja2VufGVufDB8fDB8fHww"
                        alt="Main Dish"
                        className="h-[500px] sm:h-[500px] w-full sm:w-[380px] object-cover rounded-xl"
                    />

                    {/* Side Images */}
                    <div className="flex flex-row sm:flex-col gap-4">
                        <img
                            src="https://images.unsplash.com/photo-1574484284002-952d92456975?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1lYWx8ZW58MHx8MHx8fDA%3D"
                            alt="Side Dish 1"
                            className="h-[240px] sm:h-[350px] w-[240px] sm:w-[300px] object-cover rounded-xl"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1608135227059-95aacee01035?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2VhZm9vZHxlbnwwfHwwfHx8MA%3D%3D"
                            alt="Side Dish 2"
                            className="h-[240px] sm:h-[350px] w-[240px] sm:w-[300px] object-cover rounded-xl"
                        />
                    </div>
                </div>
            </div>

        </>
    )
}

export default Hero