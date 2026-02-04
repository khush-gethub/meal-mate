import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const DessertHero = () => {
    return (
        <div className="py-20 bg-[#FFF6F0] px-6 md:px-12 lg:px-24">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative overflow-hidden rounded-[3rem] min-h-[500px] flex items-center justify-center premium-shadow"
            >
                {/* Background Image with Parallax-like effect */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&auto=format&fit=crop&q=80')",
                    }}
                />

                {/* Elegant Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#4E342E]/80 via-[#4E342E]/40 to-transparent" />

                {/* Content */}
                <div className="relative z-10 w-full px-8 md:px-20 py-16 flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="max-w-xl text-center md:text-left">
                        <motion.span
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            className="text-[#FFA94D] font-bold tracking-[0.3em] uppercase text-sm mb-4 block"
                        >
                            Sweet Temptation
                        </motion.span>
                        <h2 className="text-5xl md:text-7xl font-poppins font-black text-white leading-tight mb-6">
                            Indulge in <br />
                            <span className="text-[#FFA94D]">Heavenly</span> Delights
                        </h2>
                        <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8">
                            Satisfy your sweet tooth with our curated collection of artisan dessert recipes, from rich chocolate fondants to delicate fruit parfaits.
                        </p>
                        <Link to="/menu/dessert">
                            <button className="px-10 py-5 premium-gradient text-white rounded-2xl font-bold text-lg shadow-xl hover:scale-105 transition-all duration-300">
                                Explore Sweets
                            </button>
                        </Link>
                    </div>

                    {/* Floating Info Card */}
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        className="glass-effect p-8 rounded-[2rem] w-full max-w-sm premium-shadow backdrop-blur-xl border-white/20"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-[#FFA94D] flex items-center justify-center text-white font-bold">
                                🍰
                            </div>
                            <h4 className="text-xl font-bold text-[#4E342E]">Baker's Pick</h4>
                        </div>
                        <p className="text-[#4E342E]/70 mb-6 italic font-medium">
                            "The secret to a perfect souffle is not just the ingredients, but the passion you fold into the batter."
                        </p>
                        <div className="flex items-center gap-2">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" />
                                    </div>
                                ))}
                            </div>
                            <span className="text-xs font-bold text-[#4E342E]/60 ml-2">500+ tried this week</span>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}

export default DessertHero;