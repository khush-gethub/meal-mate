import React from 'react'

const DessertHero = () => {
    return (
        <>
            <div className="px-5 md:px-10 lg:px-20 py-5 bg-[#FFF6F0] mb-10 w-full">
                <div
                    className="w-8xl bg-cover bg-center bg-no-repeat min-h-[300px] md:min-h-[400px] lg:min-h-[500px] flex items-center justify-center rounded-lg md:mx-20"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FrZXxlbnwwfHwwfHx8MA%3D%3D')",
                    }}
                >
                    <div className="bg-[#FFF6F0] p-6 md:p-8 rounded-lg text-center shadow-md max-w-sm w-full m-8">
                        <h2 className="text-2xl md:text-5xl font-bold text-black">Dessert</h2>
                        <p className="mt-2 text-black text-base md:text-3xl">
                            the dessert
                            <br />
                            you want is here
                        </p>
                        <button className="w-56 bg-[#FFF3C4] hover:bg-[#FFE082] transition rounded-lg py-3 text-[#4E342E]  text-2xl mt-4"><a href="/menu/dessert">Get Recipes</a></button>
                    </div>
                </div>
            </div>


        </>
    )
}

export default DessertHero