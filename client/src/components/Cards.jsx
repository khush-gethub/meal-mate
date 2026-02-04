import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LikeContext from '../context/LikeContext'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { motion } from 'framer-motion'

const Cards = ({ type }) => {
    const { likedCards, addLike, removeLike } = useContext(LikeContext)
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleLikeToggle = (e, id) => {
        e.stopPropagation();
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

    useEffect(() => {
        const fetchRecipes = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8000/${type}`);
                setRecipes(response.data);
            } catch (error) {
                console.error(`Error fetching ${type} recipes:`, error);
            } finally {
                setLoading(false);
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

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <div className="w-10 h-10 border-4 border-[#FFA94D] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-4">
                <div className="text-center md:text-left">
                    <h1 className="text-4xl md:text-6xl font-black text-[#4E342E] mb-4 font-poppins capitalize">
                        {type} <span className="text-gradient">Collection</span>
                    </h1>
                    <p className="text-[#4E342E]/60 text-lg font-medium italic">Discover our curated selection of {type} delicacies.</p>
                </div>
                <div className="px-6 py-2 bg-[#FFA94D]/10 rounded-full text-[#FFA94D] font-bold text-sm border border-[#FFA94D]/20">
                    {recipes.length} Recipes Found
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {recipes.map((food, index) => (
                    <motion.div
                        key={food.id || index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                        viewport={{ once: true }}
                        onClick={() => handleCardClick(food.id, type)}
                        className="group bg-white rounded-3xl overflow-hidden premium-shadow recipe-card cursor-pointer border border-[#4E342E]/5"
                    >
                        {/* Image Container */}
                        <div className="relative h-72 overflow-hidden">
                            <img
                                src={food.image}
                                alt={food.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Category Badge */}
                            <div className="absolute top-4 left-4">
                                <span className="px-4 py-1.5 rounded-full glass-effect text-[#4E342E] text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                                    {type}
                                </span>
                            </div>

                            {/* Like Button */}
                            <button
                                onClick={(e) => handleLikeToggle(e, food.id)}
                                className="absolute top-4 right-4 w-10 h-10 rounded-full glass-effect flex items-center justify-center hover:bg-white transition-colors duration-300 shadow-lg"
                            >
                                <svg
                                    className={`w-5 h-5 ${likedCards.includes(food.id) ? 'fill-[#FFA94D] stroke-[#FFA94D]' : 'fill-transparent stroke-[#4E342E]'} transition-all duration-300`}
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M12 21C12 21 4 13.5455 4 8.72727C4 6.10048 6.01472 4 8.5 4C10.0706 4 11.5 5.09091 12 6.18182C12.5 5.09091 13.9294 4 15.5 4C17.9853 4 20 6.10048 20 8.72727C20 13.5455 12 21 12 21Z"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-8">
                            <h3 className="text-2xl font-poppins font-bold text-[#4E342E] mb-3 group-hover:text-[#FFA94D] transition-colors line-clamp-1">
                                {food.title}
                            </h3>
                            <p className="text-[#4E342E]/70 line-clamp-2 text-sm leading-relaxed mb-6">
                                {food.description}
                            </p>

                            <div className="flex items-center justify-between pt-6 border-t border-[#4E342E]/5">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full premium-gradient flex items-center justify-center text-white text-[10px] font-bold">
                                        {food.authorName ? food.authorName.substring(0, 2).toUpperCase() : 'CH'}
                                    </div>
                                    <span className="text-xs font-bold text-[#4E342E]/60 uppercase tracking-wider">By {food.authorName || 'Chef'}</span>
                                </div>
                                <div className="flex items-center gap-1 text-[#FFA94D]">
                                    <span className="text-sm font-bold">View</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default Cards