import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTASection = () => (
    <div className="py-24 bg-[#FFF6F0] px-6">
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto premium-gradient rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-[#FFA94D]/20"
        >
            {/* Decorative Elements */}
            <div className="absolute top-[-20%] left-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-[#4E342E]/5 rounded-full blur-3xl" />

            <div className="relative z-10">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-white/80 font-bold tracking-[0.3em] uppercase text-xs mb-6 block"
                >
                    Get Started Today
                </motion.span>
                <h2 className="text-4xl md:text-6xl font-poppins font-black text-white mb-8 leading-tight">
                    Ready to Cook Something <br />
                    <span className="text-[#4E342E]">Truly Delicious?</span>
                </h2>
                <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
                    Join our vibrant community of food lovers and start sharing your culinary creations with the world.
                </p>

                <div className="flex flex-wrap justify-center gap-6">
                    <Link to="/recipe">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-[#4E342E] px-10 py-5 rounded-2xl text-xl font-bold shadow-xl hover:bg-[#FFF3C4] transition-all"
                        >
                            Explore All Recipes
                        </motion.button>
                    </Link>
                    <Link to="/signup">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#4E342E] text-white px-10 py-5 rounded-2xl text-xl font-bold shadow-xl hover:bg-black transition-all"
                        >
                            Join Community
                        </motion.button>
                    </Link>
                </div>
            </div>
        </motion.div>
    </div>
);

export default CTASection;