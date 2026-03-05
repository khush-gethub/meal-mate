import React from 'react';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const RecipeCategories = () => {
  const categories = [
    { name: 'Chicken', icon: '🍗', color: 'from-[#FFA94D]/20 to-[#FFA94D]/5', path: '/menu/chicken' },
    { name: 'Seafood', icon: '🐟', color: 'from-blue-500/20 to-blue-500/5', path: '/menu/seafood' },
    { name: 'Vegetarian', icon: '🥗', color: 'from-green-500/20 to-green-500/5', path: '/menu/vegetarian' },
    { name: 'Dessert', icon: '🍰', color: 'from-pink-500/20 to-pink-500/5', path: '/menu/dessert' }
  ];

  return (
    <div className="container mx-auto px-6 lg:px-24 py-24">
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-[#FFA94D] font-bold tracking-[0.3em] uppercase text-xs mb-4 block"
        >
          Culinary Portfolio
        </motion.span>
        <h2 className="text-4xl md:text-5xl font-poppins font-black text-[#4E342E]">
          What We <span className="text-gradient">Specialize In</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category, index) => (
          <Link to={category.path} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`group relative flex flex-col items-center justify-center p-12 rounded-[2.5rem] bg-gradient-to-br ${category.color} border border-white/20 premium-shadow hover:shadow-2xl transition-all duration-500 overflow-hidden`}
            >
              {/* Decorative background element */}
              <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

              <motion.span
                className="text-6xl mb-6 relative z-10 filter drop-shadow-xl"
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                {category.icon}
              </motion.span>
              <h3 className="text-xl font-bold text-[#4E342E] relative z-10 group-hover:text-[#FFA94D] transition-colors">
                {category.name}
              </h3>

              <div className="mt-4 flex items-center gap-1 text-[#4E342E]/40 font-bold uppercase tracking-widest text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Explore <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecipeCategories;