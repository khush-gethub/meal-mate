import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Constants
const MEAL_TYPES = ['breakfast', 'lunch', 'dinner'];

export const DayColumn = ({ day, plan, onAddMeal, onRemoveMeal }) => {
    return (
        <div className="flex-1 min-w-[300px] md:min-w-0 bg-white/40 backdrop-blur-md rounded-2xl p-4 border border-white/50 shadow-md flex flex-col gap-4">
            <h3 className="text-xl font-bold text-[#4E342E] text-center font-serif lobster tracking-wide truncate">{day}</h3>

            <div className="flex flex-col gap-3">
                {MEAL_TYPES.map((type) => (
                    <MealSlot
                        key={type}
                        day={day}
                        type={type}
                        meal={plan[type]}
                        onAdd={() => onAddMeal(day, type)}
                        onRemove={() => onRemoveMeal(day, type)}
                    />
                ))}
            </div>
        </div>
    );
};

const MealSlot = ({ day, type, meal, onAdd, onRemove }) => {
    return (
        <div className="bg-white/60 rounded-xl p-3 shadow-sm border border-white/40 hover:shadow-md transition-all duration-300 relative group min-h-[100px] flex flex-col">
            <div className="flex justify-between items-start mb-2">
                <span className="uppercase text-[10px] font-bold text-[#FFA94D] tracking-wider">{type}</span>
                {meal && (
                    <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onRemove(); }}
                        className="text-red-300 hover:text-red-500 transition-colors bg-white/50 rounded-full p-1 opacity-0 group-hover:opacity-100 absolute top-2 right-2 z-10"
                        title="Remove meal"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-3.536 6.19a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0v-6a.75.75 0 0 1 .75-.75Zm4.5 0a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0v-6a.75.75 0 0 1 .75-.75Zm4.5 0a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0v-6a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                        </svg>
                    </button>
                )}
            </div>

            {meal ? (
                <div className="flex-1 flex flex-col gap-2 cursor-pointer group-hover:scale-[1.02] transition-transform">
                    <div className="w-full h-16 rounded-lg overflow-hidden relative">
                        <img src={meal.image} alt={meal.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                    <p className="text-xs font-bold text-[#4E342E] line-clamp-2 leading-tight">{meal.title}</p>
                </div>
            ) : (
                <button
                    onClick={onAdd}
                    className="flex-1 flex flex-col items-center justify-center gap-1 border-2 border-dashed border-[#FFA94D]/30 rounded-lg hover:border-[#FFA94D] hover:bg-[#FFA94D]/5 transition-all group"
                >
                    <div className="w-6 h-6 rounded-full bg-[#FFA94D]/20 flex items-center justify-center text-[#FFA94D] group-hover:bg-[#FFA94D] group-hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </div>
                    <span className="text-[10px] font-bold text-[#4E342E]/40 group-hover:text-[#FFA94D] uppercase tracking-wide">Add</span>
                </button>
            )}
        </div>
    );
};

export const RecipeSelectorModal = ({ isOpen, onClose, onSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            fetchRecipes(searchTerm);
        }
    }, [isOpen, searchTerm]);

    const fetchRecipes = async (query) => {
        setLoading(true);
        try {
            const url = query ? `http://localhost:8000/search?q=${query}` : 'http://localhost:8000/general'; // Default to general if empty
            const response = await axios.get(url);
            setResults(response.data.slice(0, 12)); // Limit results
        } catch (error) {
            console.error("Error fetching recipes", error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-[#FFF6F0] w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
            >
                <div className="p-6 border-b border-[#4E342E]/10 flex justify-between items-center bg-white/50 backdrop-blur-sm">
                    <h2 className="text-2xl font-bold text-[#4E342E] lobster">Select a Meal</h2>
                    <button onClick={onClose} className="p-2 hover:bg-[#4E342E]/10 rounded-full transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-[#4E342E]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6 bg-white/30 space-y-4">
                    <div className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search for a recipe (e.g. Pasta, Chicken)..."
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#4E342E]/10 bg-white focus:outline-none focus:ring-2 focus:ring-[#FFA94D]/30 text-[#4E342E]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 bg-[#FFF6F0] custom-scrollbar">
                    {loading ? (
                        <div className="flex justify-center py-10">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#FFA94D]"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {results.map((recipe) => (
                                <div
                                    key={recipe.id || recipe._id}
                                    onClick={() => onSelect(recipe)}
                                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer transition-all hover:scale-[1.02] border border-[#4E342E]/5 group"
                                >
                                    <div className="h-32 overflow-hidden relative">
                                        <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                                    </div>
                                    <div className="p-3">
                                        <p className="font-bold text-[#4E342E] text-sm line-clamp-1 mb-1">{recipe.title}</p>
                                        <span className="text-[10px] uppercase font-bold text-[#FFA94D] bg-[#FFA94D]/10 px-2 py-0.5 rounded-full">{recipe.type || 'Recipe'}</span>
                                    </div>
                                </div>
                            ))}
                            {results.length === 0 && !loading && (
                                <div className="col-span-full text-center py-10 opacity-50">
                                    No recipes found. Try searching for something else.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};
