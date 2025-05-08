import React from 'react'
import { useParams } from 'react-router-dom'
import chicken from '../Data/chickenRecipes.json'
import seafood from'../Data/seafood-recipes.json'
import veg from '../Data/vegetarian-recipes.json'
import dessert from '../Data/dessert-recipes.json'
import Navbar from './Navbar'
import Footer from './Footer'

const allData ={
    chicken,
    seafood,
    veg,
    dessert
}
const DisplayData = () => {
    const {category} = useParams()
    let data = allData[category]
    return (
        <>
        <Navbar/>
             <div className="p-1 bg-[#FFF6F0] text-[#4E342E]">
                <h1 className="text-4xl font-semibold mb-8 font-poppins text-center md:text-left md:mx-36 mt-15">
                    The {category} Recipeis
                </h1>

                <div className="mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-10 md:mx-30">
                        {data.map((food, index) => (
                            <div
                                className="w-full p-6 rounded-md shadow-md dark:bg-gray-50 dark:text-gray-900 recipe-card"
                                key={index}
                            >
                                <img
                                    src={food.image}
                                    alt=""
                                    className="object-cover object-center w-full rounded-md h-72 dark:bg-gray-500"
                                />
                                <div className="mt-6 mb-2">
                                    <h2 className="text-xl font-semibold tracking-wide">
                                        {food.title}
                                    </h2>
                                </div>
                                <p className="dark:text-gray-800">
                                   {food.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default DisplayData