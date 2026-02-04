import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion } from 'framer-motion';

const Recipedata = () => {
    const { id, type } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipe = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://127.0.0.1:8000/${type}`);
                const selectedRecipe = response.data.find(r => r.id === id);
                setRecipe(selectedRecipe);
            } catch (error) {
                console.error('Error fetching recipe:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipe();
    }, [id, type]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FFF6F0] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[#FFA94D] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!recipe) {
        return (
            <div className="min-h-screen bg-[#FFF6F0] flex flex-col items-center justify-center p-6 text-center">
                <h1 className="text-4xl font-black text-[#4E342E] mb-4">Recipe Secretly Hidden</h1>
                <p className="text-[#4E342E]/60 mb-8">We couldn't find this specific dish. It might have been retired by our chefs.</p>
                <button onClick={() => navigate('/recipe')} className="premium-gradient text-white px-8 py-3 rounded-xl font-bold">Back to Recipes</button>
            </div>
        );
    }

    return (
        <div className="bg-[#FFF6F0] min-h-screen">
            <Navbar />

            {/* Cinematic Hero */}
            <div className="relative h-[70vh] w-full overflow-hidden">
                <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, ease: "linear" }}
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center text-center p-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <span className="inline-block px-6 py-2 glass-effect text-white rounded-full text-xs font-bold uppercase tracking-[0.3em] mb-6">
                            {type} Recipe
                        </span>
                        <h1 className="text-5xl md:text-8xl font-poppins font-black text-white mb-8 leading-tight drop-shadow-2xl">
                            {recipe.title}
                        </h1>
                        <div className="flex flex-wrap justify-center gap-6">
                            <div className="flex items-center gap-2 text-white/90 font-bold bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20">
                                <svg className="w-5 h-5 text-[#FFA94D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                45 Mins
                            </div>
                            <div className="flex items-center gap-2 text-white/90 font-bold bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20">
                                <svg className="w-5 h-5 text-[#FFA94D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                Easy Level
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Left Column: Description & Steps */}
                    <div className="lg:col-span-2 space-y-16">
                        <section>
                            <h2 className="text-3xl font-poppins font-black text-[#4E342E] mb-6 flex items-center gap-4">
                                <span className="w-8 h-1 bg-[#FFA94D] rounded-full" />
                                The Story
                            </h2>
                            <p className="text-xl text-[#4E342E]/70 leading-relaxed font-medium italic border-l-4 border-[#FFA94D] pl-8">
                                {recipe.description}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-poppins font-black text-[#4E342E] mb-10 flex items-center gap-4">
                                <span className="w-8 h-1 bg-[#FFA94D] rounded-full" />
                                Preparation Steps
                            </h2>
                            <div className="space-y-8">
                                {recipe.steps.map((step, index) => (
                                    <motion.div
                                        key={index}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        initial={{ opacity: 0, x: -20 }}
                                        className="flex gap-8 group"
                                    >
                                        <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[#4E342E] text-white flex items-center justify-center font-black text-xl shadow-lg border-4 border-[#FFF3C4] group-hover:scale-110 transition-transform">
                                            {index + 1}
                                        </div>
                                        <div className="pt-3">
                                            <p className="text-lg text-[#4E342E]/80 font-bold leading-relaxed">
                                                {step}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Ingredients Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-white p-10 rounded-[3.5rem] premium-shadow border border-[#4E342E]/5">
                            <h2 className="text-2xl font-black text-[#4E342E] mb-8 text-center uppercase tracking-widest text-sm">Ingredients Checklist</h2>
                            <ul className="space-y-6">
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li key={index} className="flex items-center gap-4 group">
                                        <div className="w-6 h-6 rounded-lg border-2 border-[#FFA94D] group-hover:bg-[#FFA94D] transition-all cursor-pointer" />
                                        <span className="text-[#4E342E] font-bold text-lg">{ingredient}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full mt-10 premium-gradient text-white py-5 rounded-3xl font-black text-lg shadow-xl shadow-[#FFA94D]/20 hover:scale-[1.02] transition-all">
                                Add to Shopping List
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Recipedata;
