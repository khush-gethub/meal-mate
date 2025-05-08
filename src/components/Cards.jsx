import React from 'react'
import { Link } from 'react-router-dom'
import rdata from '../Data/recipe-data.json'

const Cards = () => {
    return (
        <div className="p-4 md:p-10 bg-[#FFF6F0] text-[#4E342E] min-h-screen">
            <h1 className="text-4xl md:text-6xl font-semibold mb-8 font-poppins text-center md:text-left">
                The Recipes
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {rdata.map((food, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 recipe-card"
                    >
                        <div className="recipe-image">
                            <img
                                src={food.image}
                                alt={food.title}
                                className="w-full h-64 object-cover"
                            />
                        </div>
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-2">
                                <Link
                                    to={`/recipe/${food.id}`}
                                    className="hover:text-orange-600 transition-colors"
                                >
                                    {food.title}
                                </Link>
                            </h2>
                            <p className="text-gray-700">{food.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Cards