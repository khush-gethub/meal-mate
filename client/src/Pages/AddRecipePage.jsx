import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddRecipePage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        description: '',
        ingredients: '',
        steps: '',
        type: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const newRecipe = {
                ...formData,
                ingredients: formData.ingredients.split(',').map(item => item.trim()),
                steps: formData.steps.split(',').map(item => item.trim()),
            };

            // Use the new user endpoint
            await axios.post('http://localhost:8000/recipes', newRecipe, {
                withCredentials: true
            });

            toast.success('Recipe submitted successfully!');
            navigate('/recipe'); // Redirect to recipes page or dashboard
        } catch (err) {
            console.error('Error adding recipe:', err);
            toast.error(err.response?.data?.message || 'Failed to submit recipe.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="pt-36 pb-24 px-6 md:px-12 lg:px-24 bg-[#FFF6F0] min-h-screen">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="text-[#FFA94D] font-bold tracking-widest uppercase text-sm">Contribute to the Community</span>
                        <h1 className="text-4xl md:text-5xl font-poppins font-black text-[#4E342E] mt-2">
                            Share Your <span className="text-gradient">Creation</span>
                        </h1>
                    </div>

                    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] premium-shadow border border-[#4E342E]/5">
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#4E342E]/60 mb-3 ml-1">Recipe Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="w-full bg-[#FFF6F0]/50 border border-[#4E342E]/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#FFA94D]/30 focus:border-[#FFA94D] transition-all font-bold text-[#4E342E]"
                                        placeholder="e.g. Grandma's Apple Pie"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#4E342E]/60 mb-3 ml-1">Image URL</label>
                                    <input
                                        type="text"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleChange}
                                        className="w-full bg-[#FFF6F0]/50 border border-[#4E342E]/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#FFA94D]/30 focus:border-[#FFA94D] transition-all font-bold text-[#4E342E]"
                                        placeholder="https://..."
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#4E342E]/60 mb-3 ml-1">Category</label>
                                    <div className="relative">
                                        <select
                                            name="type"
                                            value={formData.type}
                                            onChange={handleChange}
                                            className="w-full bg-[#FFF6F0]/50 border border-[#4E342E]/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#FFA94D]/30 focus:border-[#FFA94D] transition-all font-bold text-[#4E342E] appearance-none cursor-pointer"
                                            required
                                        >
                                            <option value="">Select Category</option>
                                            <option value="vegetarian">Vegetarian</option>
                                            <option value="seafood">Seafood</option>
                                            <option value="dessert">Dessert</option>
                                            <option value="chicken">Chicken</option>
                                            <option value="general">General</option>
                                        </select>
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-[#4E342E]/40">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#4E342E]/60 mb-3 ml-1">Short Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="w-full bg-[#FFF6F0]/50 border border-[#4E342E]/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#FFA94D]/30 focus:border-[#FFA94D] transition-all font-bold text-[#4E342E] resize-none"
                                        rows="2"
                                        placeholder="A brief summary of your dish..."
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#4E342E]/60 mb-3 ml-1">Ingredients (Comma separated)</label>
                                    <textarea
                                        name="ingredients"
                                        value={formData.ingredients}
                                        onChange={handleChange}
                                        className="w-full bg-[#FFF6F0]/50 border border-[#4E342E]/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#FFA94D]/30 focus:border-[#FFA94D] transition-all font-medium text-[#4E342E] resize-none"
                                        rows="3"
                                        placeholder="2 cups Flour, 1 tsp Salt, ..."
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#4E342E]/60 mb-3 ml-1">Steps (Comma separated)</label>
                                    <textarea
                                        name="steps"
                                        value={formData.steps}
                                        onChange={handleChange}
                                        className="w-full bg-[#FFF6F0]/50 border border-[#4E342E]/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#FFA94D]/30 focus:border-[#FFA94D] transition-all font-medium text-[#4E342E] resize-none"
                                        rows="3"
                                        placeholder="1. Mix ingredients. 2. Bake at 350F..."
                                        required
                                    />
                                </div>
                            </div>

                            <div className="md:col-span-2 pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#4E342E] text-white font-black py-4 rounded-2xl shadow-xl hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Submitting...' : 'Share Recipe'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AddRecipePage;
