import React from 'react';
import { motion } from 'framer-motion';

const Higthretting = () => {
    return (
        <div className="py-24 bg-[#FFF6F0] px-6 md:px-12 lg:px-24">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative min-h-[500px] rounded-[3rem] overflow-hidden premium-shadow flex items-center"
            >
                {/* Background Image with Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1619527762865-7277bd36c3ef?w=1200&auto=format&fit=crop&q=80')",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#4E342E] via-[#4E342E]/80 to-transparent" />

                {/* Content */}
                <div className="relative z-10 p-12 md:p-24 max-w-4xl">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-[#FFA94D] font-bold tracking-[0.3em] uppercase text-sm mb-4 block"
                    >
                        Community Favorites
                    </motion.span>
                    <h2 className="text-5xl md:text-7xl font-poppins font-black text-white leading-tight mb-6">
                        Highly <span className="text-[#FFA94D]">Rated</span> <br />Recipes
                    </h2>
                    <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8">
                        Discover the most-loved dishes from our kitchen. These handpicked recipes reflect the highest standards of flavor and culinary excellence, as rated by our global community.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button className="px-10 py-5 premium-gradient text-white rounded-2xl font-bold text-lg shadow-xl hover:scale-105 transition-all duration-300">
                            View Rated Collection
                        </button>
                        <div className="flex items-center gap-2 px-6 py-4 glass-effect rounded-2xl border-white/10">
                            <div className="flex text-[#FFA94D]">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-white font-bold">4.9/5 Average</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Higthretting;
