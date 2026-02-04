import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="relative min-h-[90vh] flex items-center bg-[#FFF6F0] overflow-hidden pt-20">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] bg-[#FFA94D] opacity-10 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[50%] bg-[#FFF3C4] opacity-30 rounded-full blur-[80px]" />

            <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full lg:w-1/2 text-center lg:text-left"
                    >
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="inline-block px-4 py-1.5 mb-6 rounded-full bg-[#FFA94D]/10 text-[#FFA94D] font-bold text-sm tracking-wider uppercase"
                        >
                            Explore & Taste
                        </motion.span>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-poppins font-black text-[#4E342E] leading-[1.1] mb-8">
                            Master the Art of <br />
                            <span className="text-gradient">Delicious Cooking</span>
                        </h1>
                        <p className="text-lg md:text-xl text-[#4E342E]/80 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                            Discover a world of flavors with our curated collection of professional recipes. From quick weekday meals to gourmet weekend feasts, bring joy back to your kitchen.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                            <Link to="/recipe">
                                <button className="px-10 py-4 premium-gradient text-white rounded-2xl font-bold text-lg shadow-xl hover:scale-105 transition-all duration-300">
                                    Browse Recipes
                                </button>
                            </Link>
                            <Link to="/about">
                                <button className="px-10 py-4 bg-white text-[#4E342E] rounded-2xl font-bold text-lg shadow-lg hover:bg-[#FFF3C4] transition-all duration-300 border border-[#4E342E]/5">
                                    Our Story
                                </button>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 md:gap-12">
                            <div>
                                <p className="text-3xl font-black text-[#4E342E]">1.2k+</p>
                                <p className="text-sm text-[#4E342E]/60 uppercase tracking-widest font-bold">Recipes</p>
                            </div>
                            <div className="w-[1px] h-10 bg-[#4E342E]/10" />
                            <div>
                                <p className="text-3xl font-black text-[#4E342E]">50k+</p>
                                <p className="text-sm text-[#4E342E]/60 uppercase tracking-widest font-bold">Users</p>
                            </div>
                            <div className="w-[1px] h-10 bg-[#4E342E]/10" />
                            <div>
                                <p className="text-3xl font-black text-[#4E342E]">4.9</p>
                                <p className="text-sm text-[#4E342E]/60 uppercase tracking-widest font-bold">Rating</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Images Container */}
                    <div className="w-full lg:w-1/2 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="relative flex gap-4 md:gap-6 justify-center items-center"
                        >
                            {/* Main large image */}
                            <div className="relative z-10 w-[60%] lg:w-[380px] xl:w-[420px]">
                                <img
                                    src="https://plus.unsplash.com/premium_photo-1661419883163-bb4df1c10109?w=800&auto=format&fit=crop&q=80"
                                    alt="Professional Dish"
                                    className="w-full h-[350px] md:h-[450px] lg:h-[550px] object-cover rounded-[2rem] shadow-2xl border-[12px] border-white"
                                />
                                {/* Floating Badge */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -bottom-6 -right-6 glass-effect p-4 rounded-2xl premium-shadow flex items-center gap-3"
                                >
                                    <div className="w-12 h-12 rounded-full premium-gradient flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-bold text-[#4E342E]">Verified Fresh</p>
                                        <p className="text-xs text-[#4E342E]/60">100% Chef Approved</p>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Side smaller images */}
                            <div className="flex flex-col gap-4 md:gap-6">
                                <motion.img
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    src="https://images.unsplash.com/photo-1574484284002-952d92456975?w=500&auto=format&fit=crop&q=80"
                                    alt="Cooking Process"
                                    className="w-[140px] md:w-[180px] lg:w-[220px] h-[180px] md:h-[220px] lg:h-[260px] object-cover rounded-[1.5rem] shadow-xl border-8 border-white"
                                />
                                <motion.img
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 }}
                                    src="https://images.unsplash.com/photo-1608135227059-95aacee01035?w=500&auto=format&fit=crop&q=80"
                                    alt="Final Meal"
                                    className="w-[140px] md:w-[180px] lg:w-[220px] h-[180px] md:h-[220px] lg:h-[260px] object-cover rounded-[1.5rem] shadow-xl border-8 border-white"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;
