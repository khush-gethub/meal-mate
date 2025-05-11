import React from 'react'

const Higthretting = () => {
    return (
        <>
            <div className="px-5 md:px-10 lg:px-20 py-5 bg-[#FFF6F0] text-white md:py-16">
                <div
                    className="w-8xl bg-cover bg-center bg-no-repeat min-h-[300px] md:min-h-[400px] lg:min-h-[500px] rounded-lg md:mx-20 flex items-center flex-col text-center md:text-left justify-center"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1619527762865-7277bd36c3ef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D')",
                    }}
                >
                    <h1 className="text-3xl sm:text-4xl md:text-5xl m-4 py-10 md:py-8 pb-0">
                        The Higth Retting Recipeis
                    </h1>
                    <p className="text-md sm:text-lg md:text-2xl max-w-4xl px-4 md:px-0 ms-0 md:ms-10 tracking-tighter">
                        Looking for the most-loved dishes from our kitchen? These high-rating recipes are a hit among foodies and home cooks alike! Handpicked based on user reviews and flavor-packed goodness, each recipe guarantees a delicious experience
                    </p>
                    <button className="bg-[#FFF3C4] px-4 sm:px-6 py-2 rounded text-lg sm:text-xl md:text-2xl m-4 ms-0 md:ms-10 text-[#4E342E]">
                        Check Now
                    </button>
                </div>
            </div>

        </>
    )
}

export default Higthretting