import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import LikeContext from '../context/LikeContext'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'

const SearchResultsPage = () => {
    const { likedCards, addLike, removeLike } = useContext(LikeContext)
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');

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
                const response = await axios.get(`http://localhost:8000/search?q=${query || ''}`);
                setRecipes(response.data);
            } catch (error) {
                console.error(`Error searching recipes:`, error);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipes();
    }, [query]);

    const handleCardClick = (id, type) => {
        if (user) {
            navigate(`/recipe/${id}/${type}`);
        } else {
            toast.error('Please login to view recipe details.');
            navigate('/login');
        }
    };

    return (
        <>
            <Navbar />
            <div className="pt-40 min-h-screen bg-[#FFF6F0] pb-10">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl md:text-5xl font-black text-[#4E342E] mb-2 font-poppins">
                                Search Results for <span className="text-gradient">"{query}"</span>
                            </h1>
                        </div>
                        <div className="px-6 py-2 bg-[#FFA94D]/10 rounded-full text-[#FFA94D] font-bold text-sm border border-[#FFA94D]/20">
                            {recipes.length} Recipes Found
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="w-10 h-10 border-4 border-[#FFA94D] border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                            {recipes.map((food, index) => (
                                <motion.div
                                    key={food.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    onClick={() => handleCardClick(food.id, food.type)}
                                    className="group bg-white rounded-[2.5rem] premium-shadow overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500 border border-[#4E342E]/5"
                                >
                                    <div className="relative overflow-hidden aspect-[4/5]">
                                        <img
                                            src={food.image}
                                            alt={food.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        <button
                                            onClick={(e) => handleLikeToggle(e, food.id)}
                                            className="absolute top-6 right-6 w-12 h-12 glass-effect rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-all z-10"
                                        >
                                            <svg
                                                className={`w-6 h-6 transition-colors duration-300 ${likedCards.includes(food.id) ? 'fill-[#FFA94D] stroke-[#FFA94D]' : 'fill-transparent stroke-white'}`}
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    d="M12 21C12 21 4 13.5455 4 8.72727C4 6.10048 6.01472 4 8.5 4C10.0706 4 11.5 5.09091 12 6.18182C12.5 5.09091 13.9294 4 15.5 4C17.9853 4 20 6.10048 20 8.72727C20 13.5455 12 21 12 21Z"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </button>

                                        <div className="absolute bottom-8 left-8 right-8">
                                            <span className="inline-block px-4 py-1.5 bg-[#FFA94D] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-3 shadow-lg">
                                                {food.type}
                                            </span>
                                            <h2 className="text-2xl font-black text-white leading-tight drop-shadow-md group-hover:text-[#FFA94D] transition-colors">
                                                {food.title}
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <p className="text-[#4E342E]/60 font-medium line-clamp-2 text-sm leading-relaxed">
                                            {food.description}
                                        </p>

                                        <div className="flex items-center gap-2 mt-4">
                                            <div className="w-6 h-6 rounded-full bg-[#FFA94D]/80 flex items-center justify-center text-white text-[8px] font-bold">
                                                {food.authorName ? food.authorName.substring(0, 2).toUpperCase() : 'CH'}
                                            </div>
                                            <span className="text-xs font-bold text-[#4E342E]/50 uppercase tracking-wider">By {food.authorName || 'Chef'}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            {recipes.length === 0 && (
                                <div className="col-span-full text-center py-20">
                                    <p className="text-[#4E342E]/50 text-xl italic">No recipes found matching your search.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default SearchResultsPage
