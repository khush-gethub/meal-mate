import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';

const Recipedata = () => {
    const { id, type } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/${type}`);
                const recipes = response.data;
                const selectedRecipe = recipes.find(r => r._id === id);
                setRecipe(selectedRecipe);
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };

        fetchRecipe();
    }, [id, type]);

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
