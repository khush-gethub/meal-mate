import React, { useState, useEffect } from 'react';
import { DayColumn, RecipeSelectorModal } from '../components/PlannerComponents';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const INITIAL_PLAN = {
    Monday: {},
    Tuesday: {},
    Wednesday: {},
    Thursday: {},
    Friday: {},
    Saturday: {},
    Sunday: {}
};

const MealPlanner = () => {
    const [plan, setPlan] = useState(INITIAL_PLAN);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeSlot, setActiveSlot] = useState({ day: null, type: null });
    const [saving, setSaving] = useState(false);
    const [fetching, setFetching] = useState(false);
    const { isLoggedIn } = useAuth();

    const fetchPlan = async () => {
        setFetching(true);
        try {
            const response = await axios.get('http://localhost:8000/meal-planner', {
                withCredentials: true
            });

            if (response.data && response.data.weekDays) {
                setPlan(response.data.weekDays);
                toast.success("Meal plan loaded!");
            }
        } catch (error) {
            console.error("Error fetching plan", error);
            toast.error("Failed to load your meal plan.");
        } finally {
            setLoading(false);
            setFetching(false);
        }
    };

    // Fetch existing plan on mount
    useEffect(() => {
        if (!isLoggedIn) {
            setLoading(false);
            return;
        }
        fetchPlan();
    }, [isLoggedIn]);

    const handleAddMeal = (day, type) => {
        setActiveSlot({ day, type });
        setIsModalOpen(true);
    };

    const handleRemoveMeal = async (day, type) => {
        const newPlan = { ...plan };
        if (newPlan[day]) {
            newPlan[day] = { ...newPlan[day], [type]: null }; // Clear the slot
            setPlan(newPlan);
        }
    };

    const handleSelectRecipe = (recipe) => {
        const { day, type } = activeSlot;
        if (day && type) {
            const newPlan = { ...plan };
            if (!newPlan[day]) newPlan[day] = {};

            newPlan[day][type] = {
                recipeId: recipe._id || recipe.id,
                title: recipe.title,
                image: recipe.image,
                category: recipe.category
            };
            setPlan(newPlan);
            setIsModalOpen(false);
            toast.success(`Added ${recipe.title} to ${day} ${type}`);
        }
    };

    const handleSavePlan = async () => {
        setSaving(true);
        try {
            await axios.post('http://localhost:8000/meal-planner',
                { weekDays: plan },
                { withCredentials: true }
            );
            toast.success("Meal plan saved successfully!");
        } catch (error) {
            console.error("Error saving plan", error);
            toast.error("Failed to save meal plan.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FFF6F0] flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#FFA94D]"></div>
            </div>
        );
    }

    if (!isLoggedIn) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-[#FFF6F0] flex flex-col items-center justify-center p-4 text-center">
                    <h2 className="text-3xl font-bold text-[#4E342E] mb-4 lobster">Please Login</h2>
                    <p className="text-[#4E342E]/70 mb-6 font-medium text-lg">You need to be logged in to access the Meal Planner.</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#FFF6F0] pt-36 pb-10 px-4 md:px-6 flex flex-col">
                <div className="flex justify-between items-center mb-6 flex-shrink-0 flex-wrap gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4E342E] to-[#8D6E63] lobster">Weekly Meal Planner</h1>
                        <p className="text-[#4E342E]/60 mt-1 font-medium">Plan your nutritious meals for the week ahead.</p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={fetchPlan}
                            disabled={fetching || saving}
                            className={`px-6 py-3 bg-white text-[#4E342E] border border-[#4E342E]/20 rounded-xl font-bold shadow-sm hover:shadow-md hover:bg-orange-50 transition-all flex items-center gap-2 ${fetching ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={`w-5 h-5 ${fetching ? 'animate-spin' : ''}`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>
                            {fetching ? 'Loading...' : 'Load Saved'}
                        </button>

                        <button
                            onClick={handleSavePlan}
                            disabled={saving}
                            className={`px-8 py-3 bg-gradient-to-r from-[#FFA94D] to-[#FF8C42] text-white rounded-xl font-bold shadow-lg hover:shadow-orange-300/50 hover:scale-105 transition-all flex items-center gap-2 ${saving ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {saving ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                    </svg>
                                    Save Plan
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-7 gap-4 pb-10">
                    {Object.keys(plan).map(day => (
                        <DayColumn
                            key={day}
                            day={day}
                            plan={plan[day] || {}}
                            onAddMeal={handleAddMeal}
                            onRemoveMeal={handleRemoveMeal}
                        />
                    ))}
                </div>

                <RecipeSelectorModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSelect={handleSelectRecipe}
                />
            </div>
            <Footer />
        </>
    );
};

export default MealPlanner;
