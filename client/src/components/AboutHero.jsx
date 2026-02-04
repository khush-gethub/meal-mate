import React from 'react';
import { motion } from 'framer-motion';

const AboutHero = () => (
    <div className="relative min-h-[60vh] flex items-center justify-center bg-[#FFF6F0] overflow-hidden pt-20">
        {/* Decorative Elements */}
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[70%] bg-[#FFA94D] opacity-10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[50%] bg-[#FFF3C4] opacity-30 rounded-full blur-[80px]" />

        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10 px-6 py-20 text-center max-w-4xl"
        >
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-[#FFA94D] font-bold tracking-[0.3em] uppercase text-sm mb-6 block"
            >
                Our Journey
            </motion.span>
            <h1 className="text-5xl md:text-7xl font-poppins font-black text-[#4E342E] leading-tight mb-8">
                Bringing <span className="text-gradient">Flavor</span> to <br />
                Every Single Table
            </h1>
            <p className="text-xl md:text-2xl text-[#4E342E]/70 max-w-2xl mx-auto leading-relaxed">
                One Recipe at a Time — We're here to simplify the art of delicious cooking for everyone, from beginners to seasoned chefs.
            </p>
        </motion.div>

        {/* Floating Icons */}
        <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] right-[10%] opacity-20 text-7xl hidden lg:block"
        >
            🔪
        </motion.div>
        <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[20%] left-[10%] opacity-20 text-7xl hidden lg:block"
        >
            🥘
        </motion.div>
    </div>
);

export default AboutHero;