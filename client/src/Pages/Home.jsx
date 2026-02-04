import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import DessertHero from '../components/DessertHero'
import Category from '../components/Category'
import Footer from '../components/Footer'
import GeneralData from '../components/GeneralData'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Home = () => {
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        const checkMealPlan = async () => {
            const hasSeenReminder = sessionStorage.getItem('mealPlanReminderShown');

            if (isLoggedIn && !hasSeenReminder) {
                try {
                    const response = await axios.get('http://localhost:8000/meal-planner', {
                        withCredentials: true
                    });

                    if (response.data && response.data.weekDays) {
                        // Check if plan has ANY meals
                        const hasMeals = Object.values(response.data.weekDays).some(day =>
                            day && Object.values(day).some(meal => meal !== null)
                        );

                        if (hasMeals) {
                            toast.info(
                                <div className="flex flex-col gap-1">
                                    <span className="font-bold">Welcome back! 🥗</span>
                                    <span className="text-sm">Don't forget to check your meal plan for this week!</span>
                                </div>,
                                {
                                    icon: "📅",
                                    autoClose: 5000
                                }
                            );
                            sessionStorage.setItem('mealPlanReminderShown', 'true');
                        }
                    }
                } catch (error) {
                    console.error("Error checking meal plan", error);
                }
            }
        };

        checkMealPlan();
    }, [isLoggedIn]);

    return (
        <>
            <Navbar />
            <Hero />
            <GeneralData />
            <Category />
            <DessertHero />
            <Footer />
        </>
    )
}

export default Home