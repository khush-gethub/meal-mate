import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const ProfilePage = () => {
    const { user, isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'recipes'
    const [myRecipes, setMyRecipes] = useState([]);
    const [loadingRecipes, setLoadingRecipes] = useState(false);

    // State for Profile Form
    const [profileData, setProfileData] = useState({
        rname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }

        // Fetch fresh user data from DB to ensure we have rname, email etc.
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('http://localhost:8000/verify-token', { withCredentials: true });
                if (response.data.success && response.data.user) {
                    const userData = response.data.user;
                    setProfileData(prev => ({
                        ...prev,
                        rname: userData.rname || '',
                        email: userData.email || ''
                    }));
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
                // Fallback to context user if fetch fails
                if (user) {
                    setProfileData(prev => ({
                        ...prev,
                        rname: user.rname || '',
                        email: user.email || ''
                    }));
                }
            }
        };

        fetchUserProfile();

        if (activeTab === 'recipes') {
            fetchMyRecipes();
        }
    }, [isLoggedIn, navigate, activeTab, user]);

    const fetchMyRecipes = async () => {
        setLoadingRecipes(true);
        try {
            const response = await axios.get('http://localhost:8000/user/recipes', { withCredentials: true });
            setMyRecipes(response.data);
        } catch (error) {
            console.error('Error fetching my recipes:', error);
        } finally {
            setLoadingRecipes(false);
        }
    };

    const handleProfileChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();

        if (profileData.password && profileData.password !== profileData.confirmPassword) {
            toast.error("Passwords don't match!");
            return;
        }

        try {
            const updatePayload = { rname: profileData.rname };
            if (profileData.password) updatePayload.password = profileData.password;

            await axios.put('http://localhost:8000/profile', updatePayload, { withCredentials: true });
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile.');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Sidebar Menu Item Component
    const MenuItem = ({ id, label, icon, isLink = false, path = '' }) => {
        const isActive = activeTab === id;

        // App Theme Colors (MealMate Style)
        const activeClass = "bg-[#4E342E] text-white shadow-lg shadow-[#4E342E]/30";
        const inactiveClass = "text-[#4E342E]/70 hover:bg-[#FFF6F0] hover:text-[#4E342E] font-medium";

        if (isLink) {
            return (
                <Link to={path} className="block w-full">
                    <div className={`flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-300 cursor-pointer mb-2 ${isActive ? activeClass : inactiveClass}`}>
                        {icon}
                        <span className="font-bold">{label}</span>
                    </div>
                </Link>
            );
        }

        return (
            <button
                onClick={() => setActiveTab(id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-300 cursor-pointer mb-2 ${isActive ? activeClass : inactiveClass}`}
            >
                {icon}
                <span className="font-bold">{label}</span>
            </button>
        );
    };

    return (
        <div className="bg-[#FFF6F0] min-h-screen font-sans">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-28">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Left Sidebar */}
                    <div className="w-full lg:w-1/4 shrink-0">
                        <div className="bg-white rounded-[2rem] premium-shadow p-6 mb-8 border border-[#4E342E]/5">
                            {/* User Header in Sidebar */}
                            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-[#4E342E]/10">
                                <div className="w-16 h-16 rounded-full premium-gradient flex items-center justify-center text-white text-2xl font-black shadow-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-[#4E342E] text-lg leading-tight line-clamp-1 break-all">{profileData.rname || 'User'}</h3>
                                    <p className="text-[#4E342E]/50 text-xs font-bold uppercase tracking-wider line-clamp-1 break-all">{user?.email}</p>
                                </div>
                            </div>

                            {/* Menu Items */}
                            <div className="flex flex-col">
                                <MenuItem
                                    id="profile"
                                    label="My Profile"
                                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
                                />
                                <MenuItem
                                    id="recipes"
                                    label="My Recipes"
                                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>}
                                />
                                <MenuItem
                                    id="favorites"
                                    label="Wishlist"
                                    isLink={true}
                                    path="/favorite"
                                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>}
                                />

                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-300 cursor-pointer mt-4 text-[#FF5252] hover:bg-[#FFF6F0] font-bold"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="flex-1">
                        <div className="bg-white rounded-[2rem] premium-shadow p-8 min-h-[500px] border border-[#4E342E]/5">

                            {/* Profile Info Tab */}
                            {activeTab === 'profile' && (
                                <div className="animation-fade-in">
                                    <h2 className="text-2xl font-black text-[#4E342E] mb-8">Profile Settings</h2>

                                    <form onSubmit={handleProfileUpdate}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                            <div className="space-y-2">
                                                <label className="block text-xs font-bold uppercase tracking-widest text-[#4E342E]/40 ml-1">Full Name</label>
                                                <input
                                                    type="text"
                                                    name="rname"
                                                    value={profileData.rname}
                                                    onChange={handleProfileChange}
                                                    className="w-full bg-[#FFF6F0]/50 border border-[#4E342E]/10 rounded-xl px-4 py-3 text-[#4E342E] font-bold focus:outline-none focus:border-[#FFA94D] transition-colors"
                                                    placeholder="Enter your name"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-xs font-bold uppercase tracking-widest text-[#4E342E]/40 ml-1">Email Address</label>
                                                <input
                                                    type="email"
                                                    value={profileData.email}
                                                    disabled
                                                    className="w-full bg-[#FFF6F0] border border-[#4E342E]/5 rounded-xl px-4 py-3 text-[#4E342E]/60 font-bold cursor-not-allowed"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-xs font-bold uppercase tracking-widest text-[#4E342E]/40 ml-1">New Password (Optional)</label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    value={profileData.password}
                                                    onChange={handleProfileChange}
                                                    className="w-full bg-[#FFF6F0]/50 border border-[#4E342E]/10 rounded-xl px-4 py-3 text-[#4E342E] font-bold focus:outline-none focus:border-[#FFA94D] transition-colors"
                                                    placeholder="••••••••"
                                                />
                                            </div>
                                            {profileData.password && (
                                                <div className="space-y-2">
                                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#4E342E]/40 ml-1">Confirm Password</label>
                                                    <input
                                                        type="password"
                                                        name="confirmPassword"
                                                        value={profileData.confirmPassword}
                                                        onChange={handleProfileChange}
                                                        className="w-full bg-[#FFF6F0]/50 border border-[#4E342E]/10 rounded-xl px-4 py-3 text-[#4E342E] font-bold focus:outline-none focus:border-[#FFA94D] transition-colors"
                                                        placeholder="••••••••"
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        <button type="submit" className="px-8 py-3 premium-gradient text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                                            Save Changes
                                        </button>
                                    </form>
                                </div>
                            )}

                            {/* Recipes Tab */}
                            {activeTab === 'recipes' && (
                                <div className="animation-fade-in">
                                    <div className="flex items-center justify-between mb-8">
                                        <h2 className="text-2xl font-black text-[#4E342E]">My Shared Recipes</h2>
                                        <span className="px-4 py-1.5 bg-[#FFA94D]/10 text-[#FFA94D] font-bold rounded-full text-sm">
                                            {myRecipes.length} Items
                                        </span>
                                    </div>

                                    {loadingRecipes ? (
                                        <div className="flex justify-center py-20">
                                            <div className="w-10 h-10 border-4 border-[#FFA94D] border-t-transparent rounded-full animate-spin" />
                                        </div>
                                    ) : myRecipes.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {myRecipes.map((recipe) => (
                                                <div key={recipe.id} className="bg-white rounded-2xl shadow-sm border border-[#4E342E]/5 overflow-hidden group hover:border-[#FFA94D]/30 transition-all">
                                                    <div className="h-40 overflow-hidden relative">
                                                        <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                                        <div className="absolute top-3 left-3">
                                                            <span className="px-3 py-1 bg-white/90 backdrop-blur text-[#4E342E] text-[10px] font-black uppercase tracking-wider rounded-full">
                                                                {recipe.type}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="p-5">
                                                        <h3 className="text-lg font-bold text-[#4E342E] mb-1 line-clamp-1">{recipe.title}</h3>
                                                        <p className="text-[#4E342E]/60 text-xs line-clamp-2  mb-4 font-medium">{recipe.description}</p>
                                                        <Link to={`/recipe/${recipe.id}/${recipe.type}`} className="inline-flex items-center text-[#FFA94D] text-xs font-bold uppercase tracking-wider hover:gap-2 transition-all">
                                                            View Details <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-16">
                                            <div className="text-5xl mb-4 opacity-50">👩‍🍳</div>
                                            <h3 className="text-xl font-bold text-[#4E342E] mb-2">No Recipes Yet</h3>
                                            <p className="text-[#4E342E]/60 mb-6 font-medium">You haven't shared any recipes with the community.</p>
                                            <Link to="/add-recipe">
                                                <button className="px-6 py-2.5 bg-[#4E342E] text-white rounded-xl font-bold hover:shadow-lg transition-all">
                                                    Share Recipe
                                                </button>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
};
export default ProfilePage;
