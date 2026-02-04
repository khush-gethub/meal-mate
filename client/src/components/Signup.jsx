import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Popup from './Popup';
import { motion } from 'framer-motion';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        rname: '',
        email: '',
        password: '',
        conformPassword: ''
    });
    const [popupMessage, setPopupMessage] = useState(null);
    const [popupType, setPopupType] = useState(null);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://127.0.0.1:8000/register', formData, { withCredentials: true });
            if (res.status === 201) {
                setPopupMessage('Registration successful!');
                setPopupType('success');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        } catch (error) {
            console.error("Signup failed:", error);
            setPopupMessage('Registration failed. Please try again.');
            setPopupType('error');
        }
    };

    const handleClosePopup = () => {
        setPopupMessage(null);
        setPopupType(null);
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FFF6F0] py-12">
            {/* Decorative Circles */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FFA94D] opacity-10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#FFF3C4] opacity-40 rounded-full blur-[100px]" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-5xl mx-6 flex flex-col md:flex-row rounded-[2.5rem] overflow-hidden premium-shadow bg-white"
            >
                {/* Image Section */}
                <div className="hidden md:block w-5/12 relative bg-[#4E342E]">
                    <img
                        src="https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80"
                        alt="Cookware and ingredients"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end p-12 bg-gradient-to-t from-[#4E342E] via-transparent to-transparent">
                        <h3 className="text-4xl font-poppins font-black text-white mb-4">Start Your Culinary <br /><span className="text-[#FFA94D]">Adventure.</span></h3>
                        <p className="text-white/70 text-lg leading-relaxed">
                            Access premium recipes, save your favorites, and become part of our elite chef community.
                        </p>
                    </div>
                    <div className="absolute top-8 left-8">
                        <Link to="/" className="text-3xl lobster text-white">MealMate</Link>
                    </div>
                </div>

                {/* Form Section */}
                <div className="w-full md:w-7/12 p-10 md:p-14">
                    <div className="mb-10 text-center md:text-left">
                        <h2 className="text-4xl font-poppins font-black text-[#4E342E] mb-2">Create Account</h2>
                        <p className="text-[#4E342E]/60 font-medium">Join our global community of culinary experts.</p>
                    </div>

                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold uppercase tracking-widest text-[#4E342E]/50 mb-2 ml-1">Full Name</label>
                            <input
                                required
                                type="text"
                                name="rname"
                                placeholder="Chef Gordon Ramsay"
                                value={formData.rname}
                                onChange={handleChange}
                                className="w-full bg-[#FFF6F0]/50 border border-[#4E342E]/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#FFA94D]/30 focus:border-[#FFA94D] transition-all"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold uppercase tracking-widest text-[#4E342E]/50 mb-2 ml-1">Email Address</label>
                            <input
                                required
                                type="email"
                                name="email"
                                placeholder="chef@mealmate.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-[#FFF6F0]/50 border border-[#4E342E]/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#FFA94D]/30 focus:border-[#FFA94D] transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-[#4E342E]/50 mb-2 ml-1">Password</label>
                            <input
                                required
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full bg-[#FFF6F0]/50 border border-[#4E342E]/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#FFA94D]/30 focus:border-[#FFA94D] transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-[#4E342E]/50 mb-2 ml-1">Confirm Password</label>
                            <input
                                required
                                type="password"
                                name="conformPassword"
                                placeholder="••••••••"
                                value={formData.conformPassword}
                                onChange={handleChange}
                                className="w-full bg-[#FFF6F0]/50 border border-[#4E342E]/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#FFA94D]/30 focus:border-[#FFA94D] transition-all"
                            />
                        </div>

                        <div className="md:col-span-2 flex items-center gap-3 select-none ml-1 mt-2">
                            <input
                                required
                                type="checkbox"
                                id="terms"
                                className="w-5 h-5 rounded border-gray-300 accent-[#FFA94D]"
                            />
                            <label htmlFor="terms" className="text-sm font-medium text-[#4E342E]/70">
                                I agree to the <a href="#" className="text-[#FFA94D] font-bold hover:underline">Terms & Conditions</a>
                            </label>
                        </div>

                        <div className="md:col-span-2 mt-4">
                            <button
                                type="submit"
                                className="w-full premium-gradient hover:shadow-xl hover:scale-[1.02] transition-all rounded-2xl py-4 font-black text-white text-lg shadow-lg shadow-[#FFA94D]/30"
                            >
                                Create Account
                            </button>
                        </div>
                    </form>

                    <div className="text-center mt-10">
                        <span className="text-[#4E342E]/60 font-medium">Already have an account?</span>
                        <Link to="/login" className="text-[#FFA94D] font-black ml-2 hover:underline tracking-tight">Sign In Instead</Link>
                    </div>
                </div>
            </motion.div>
            <Popup message={popupMessage} type={popupType} onClose={handleClosePopup} />
        </div>
    );
};

export default Signup;
