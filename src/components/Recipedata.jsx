import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const Recipedata = () => {
    const { id } = useParams()
    const { state } = useLocation()
    const recipe = state?.recipe

    if (!recipe) {
        return (
            <div className="text-center text-red-600 mt-16">
                Recipe not found or data not passed.
            </div>
        )
    }

    return (
        <>
        <Navbar/>
            <div className='px-4 sm:px-10 md:px-32 lg:px-64 xl:px-[25rem] mt-16'>
                <h1 className='text-3xl sm:text-4xl md:text-5xl mb-6'>{recipe.title}</h1>
                <div className="w-full max-w-[70rem] h-auto">
                    <img
                        src={recipe.image}
                        alt={recipe.title}
                        className='w-full object-cover rounded h-auto max-h-[35rem]'
                    />
                </div>

                <div>
                    <h2 className='text-3xl sm:text-4xl md:text-5xl mt-10 mb-2'>Description</h2>
                    <p className='text-lg sm:text-xl md:text-2xl mx-2 sm:mx-4 md:mx-8'>
                        {recipe.description}
                    </p>
                </div>

                <div>
                    <h2 className='text-3xl sm:text-4xl md:text-5xl mt-10 mb-2'>Ingredients</h2>
                    <ul className='text-lg sm:text-xl md:text-2xl list-disc mx-4 sm:mx-6 md:mx-10'>
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2 className='text-3xl sm:text-4xl md:text-5xl mt-10 mb-2'>Steps</h2>
                    <ol className='text-lg sm:text-xl md:text-2xl mx-4 sm:mx-6 md:mx-10 list-decimal mb-10'>
                        {recipe.steps.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ol>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Recipedata
