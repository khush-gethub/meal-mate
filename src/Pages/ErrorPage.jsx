import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ErrorPage = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#FFF6F0] overflow-hidden px-6">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FFA94D] opacity-10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#FFF3C4] opacity-40 rounded-full blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 glass-effect p-12 md:p-20 rounded-[3rem] premium-shadow border-white/20 max-w-2xl w-full text-center"
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
          className="text-9xl md:text-[12rem] font-poppins font-black leading-none mb-8 tracking-tighter text-gradient"
        >
          404
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-poppins font-black text-[#4E342E] mb-6">
          Recipe <span className="text-[#FFA94D]">Not Found</span>
        </h1>

        <p className="text-xl text-[#4E342E]/60 font-medium mb-12 leading-relaxed">
          It looks like this specific culinary creation has disappeared from our kitchen. Don't worry, there's plenty more to discover.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/">
            <motion.div whileHover={{ scale: 1.05 }} className="bg-[#4E342E] text-white py-4 rounded-2xl font-bold transition-all shadow-lg hover:bg-black">
              Home
            </motion.div>
          </Link>
          <Link to="/recipe">
            <motion.div whileHover={{ scale: 1.05 }} className="bg-white text-[#4E342E] py-4 rounded-2xl font-bold transition-all shadow-lg border border-[#4E342E]/10 hover:bg-[#FFF3C4]">
              Recipes
            </motion.div>
          </Link>
          <Link to="/about">
            <motion.div whileHover={{ scale: 1.05 }} className="bg-white text-[#4E342E] py-4 rounded-2xl font-bold transition-all shadow-lg border border-[#4E342E]/10 hover:bg-[#FFF3C4]">
              About
            </motion.div>
          </Link>
          <Link to="/login">
            <motion.div whileHover={{ scale: 1.05 }} className="premium-gradient text-white py-4 rounded-2xl font-bold transition-all shadow-lg">
              Sign In
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
