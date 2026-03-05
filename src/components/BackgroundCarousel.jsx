import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
    {
        url: "https://hips.hearstapps.com/hmg-prod/images/roast-chicken-recipe-2-66b231ac9a8fb.jpg?crop=0.6666666666666667xw:1xh;center,top&resize=1200:*",
        title: "Authentic Asian Flavors",
        desc: "Handcrafted recipes from the heart of the East."
    },
    {
        url: "https://myeagereats.com/wp-content/uploads/2021/03/wp-1615073589196.jpg",
        title: "Healthy & Balanced",
        desc: "Nutritious meals designed for your lifestyle."
    },
    {
        url: "https://www.indiafoodnetwork.in/h-upload/2021/09/15/553627-untitled-design-6.webp",
        title: "Traditional Classics",
        desc: "Timeless recipes passed down through generations."
    }
];

const BackgroundCarousel = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(prev => (prev + 1) % images.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => setCurrent((current + 1) % images.length);
    const prevSlide = () => setCurrent((current - 1 + images.length) % images.length);

    return (
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 mt-32 mb-16">
            <div className="relative h-[400px] md:h-[600px] rounded-[3rem] overflow-hidden premium-shadow group">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="absolute inset-0"
                    >
                        <img
                            src={images[current].url}
                            className="w-full h-full object-cover"
                            alt={images[current].title}
                        />
                        {/* Gradient Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#4E342E]/90 via-[#4E342E]/20 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#4E342E]/60 via-transparent to-transparent " />

                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col justify-end p-12 md:p-20">
                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="max-w-2xl"
                            >
                                <span className="text-[#FFA94D] font-bold tracking-widest uppercase text-sm mb-4 block">New Collection</span>
                                <h2 className="text-4xl md:text-6xl font-poppins font-black text-white mb-4 leading-tight">
                                    {images[current].title}
                                </h2>
                                <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-8">
                                    {images[current].desc}
                                </p>
                                <button className="px-8 py-4 bg-white text-[#4E342E] rounded-2xl font-bold hover:bg-[#FFA94D] hover:text-white transition-all duration-300">
                                    Discover More
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full glass-effect flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[#FFA94D] hover:border-transparent"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full glass-effect flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[#FFA94D] hover:border-transparent"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Indicators */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrent(idx)}
                            className={`h-1.5 rounded-full transition-all duration-500 ${current === idx ? 'w-12 bg-[#FFA94D]' : 'w-4 bg-white/30'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BackgroundCarousel;
