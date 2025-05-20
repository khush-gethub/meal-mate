import React from 'react'
import { useParams } from 'react-router-dom'
import chicken from '../Data/chickenRecipes.json'
import seafood from '../Data/seafood-recipes.json'
import veg from '../Data/vegetarian-recipes.json'
import dessert from '../Data/dessert-recipes.json'
import Navbar from './Navbar'
import Footer from './Footer'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import LikeContext from '../context/LikeContext'

const allData = {
    chicken,
    seafood,
    veg,
    dessert,
}

const DisplayData = () => {
    const { likedCards, addLike, removeLike } = useContext(LikeContext)

    const handleLikeToggle = (id) => {
        if (likedCards.includes(id)) {
            removeLike(id)
        } else {
            addLike(id)
        }
    }
    const { category } = useParams()
    let data = allData[category]
    return (
        <>
            <Navbar />
            <div className="p-1 bg-[#FFF6F0] text-[#4E342E] mb-16">
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
                                <div className="recipe-image">
                                    <img
                                        src={food.image}
                                        alt=""
                                        className="object-cover object-center w-full rounded-md h-72 dark:bg-gray-500"
                                    />
                                </div>
                                <div className="mt-6 mb-2">
                                    <h2 className="text-xl font-semibold tracking-wide">
                                        <Link
                                            to={`/recipe/:category/:id${food.id}`}
                                            state={{ recipe: food }}
                                            className="hover:text-orange-600 transition-colors"
                                        >
                                            {food.title}
                                        </Link>
                                    </h2>
                                </div>
                                <p className="dark:text-gray-800">
                                    {food.description}
                                </p>
                                <div className="flex justify-end">
                                    <label
                                        className="cursor-pointer relative"
                                        onClick={() => handleLikeToggle(food.id)}
                                    >
                                        <svg
                                            className={`w-6 h-6 fill-transparent stroke-[#FFA94D] ${likedCards.includes(food.id) ? 'fill-[#FFA94D]' : ''
                                                } transition duration-200`}
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M12 21C12 21 4 13.5455 4 8.72727C4 6.10048 6.01472 4 8.5 4C10.0706 4 11.5 5.09091 12 6.18182C12.5 5.09091 13.9294 4 15.5 4C17.9853 4 20 6.10048 20 8.72727C20 13.5455 12 21 12 21Z"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default DisplayData