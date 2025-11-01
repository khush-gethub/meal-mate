import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import rdata from '../Data/recipe-data.json'
import LikeContext from '../context/LikeContext'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

const Cards = ({type}) => {
    const { likedCards, addLike, removeLike } = useContext(LikeContext)
    const [recipes, setRecipes] = useState([]);

    const handleLikeToggle = (id) => {
        if (!user) {
            toast.error('Please login to add to favorites.');
            navigate('/login');
            return;
        }
        if (likedCards.includes(id)) {
            removeLike(id)
        } else {
            addLike(id)
        }
    }

     const { user } = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/${type}`);
                setRecipes(response.data);
            } catch (error) {
                console.error(`Error fetching ${type} recipes:`, error);
            }
        };

        fetchRecipes();
    }, [type]);

    const handleCardClick = (id, type) => {
        if (user) {
            navigate(`/recipe/${id}/${type}`);
        } else {
            toast.error('Please login to view recipe details.');
            navigate('/login');
        }
    };

    return (
        <div className="p-4 md:px-42 bg-[#FFF6F0] text-[#4E342E] min-h-screen">
            <h1 className="text-4xl md:text-6xl font-semibold mb-8 font-poppins text-center md:text-left">
                The Recipes
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {recipes.map((food, index) => {
                    return (
                        <div
                            key={food.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 recipe-card"
                        >
                            <div className="grid-span-8 select-none">
                                <div onClick={() => handleCardClick(food.id, type)} style={{ cursor: 'pointer' }}>
                                    <div className="recipe-image">
                                        <img
                                            src={food.image}
                                            alt={food.title}
                                            className="w-full h-64 object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h2 className="text-2xl font-bold mb-2">

                                        {food.title}

                                    </h2>
                                    <p className="text-gray-700">{food.description}</p>
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
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Cards