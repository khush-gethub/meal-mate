import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Category = () => {
    const categories = [
        {
            name: 'Vegetarian',
            path: '/menu/vegetarian',
            image: 'https://images.unsplash.com/photo-1701579231378-3726490a407b?w=800&auto=format&fit=crop&q=80',
            span: 'md:col-span-1 md:row-span-2',
            tag: 'Healthy & Fresh'
        },
        {
            name: 'Chicken',
            path: '/menu/chicken',
            image: 'https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=800&auto=format&fit=crop&q=80',
            span: 'md:col-span-2 md:row-span-1',
            tag: 'Protein Packed'
        },
        {
            name: 'Sea Food',
            path: '/menu/seafood',
            image: 'https://plus.unsplash.com/premium_photo-1664475931376-82ac86b4ae58?w=800&auto=format&fit=crop&q=80',
            span: 'md:col-span-1 md:row-span-1',
            tag: 'Ocean Delights'
        },
        {
            name: 'Dessert',
            path: '/menu/dessert',
            image: 'https://images.unsplash.com/photo-1505976378723-9726b54e9bb9?w=800&auto=format&fit=crop&q=80',
            span: 'md:col-span-1 md:row-span-1',
            tag: 'Sweet Treats'
        }
    ];

    return (
        <div className="py-24 bg-[#FFF6F0] px-4 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-[#FFA94D] font-bold tracking-widest uppercase text-sm"
                    >
                        Taste the Variety
                    </motion.span>
                    <h2 className="text-4xl md:text-6xl font-serif lobster text-[#4E342E] mt-3">
                        Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFA94D] to-[#FF8C42]">Categories</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px] md:auto-rows-[300px]">
                    {categories.map((cat, idx) => (
                        <Link
                            key={cat.name}
                            to={cat.path}
                            className={`relative group overflow-hidden rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-500 ease-out border border-white/20 ${cat.span}`}
                        >
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                            {/* Floating Tag */}
                            <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full opacity-0 group-hover:opacity-100 -translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                <span className="text-xs font-bold text-[#FFA94D] uppercase tracking-wider">{cat.tag}</span>
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-end p-8">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-3 font-serif lobster tracking-wide group-hover:text-[#FFA94D] transition-colors">
                                        {cat.name}
                                    </h3>
                                    <div className="flex items-center gap-3 text-white/90 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                                        <div className="w-10 h-10 rounded-full bg-[#FFA94D] flex items-center justify-center text-white">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                        <span className="text-sm font-bold uppercase tracking-wider">Explore</span>
                                    </div>
                                </motion.div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Category;
