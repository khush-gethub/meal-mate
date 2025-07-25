import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FFF3C4] text-[#4E342E] px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <motion.h1
          className="text-9xl font-extrabold"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
          style={{ color: '#FFA94D' }}
        >
          404
        </motion.h1>
        <p className="text-2xl mt-4 font-semibold">Oops! Page Not Found</p>
        <p className="text-md mt-2 text-[#4E342E]/80">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <Link to="/" className="bg-[#FFA94D] px-5 py-2 rounded hover:bg-[#ffb95f] transition">
            Home
          </Link>
          <Link to="/menu/chicken" className="bg-[#FFA94D] px-5 py-2 rounded hover:bg-[#ffb95f] transition">
            Menu
          </Link>
          <Link to="/recipe" className="bg-[#FFA94D] px-5 py-2 rounded hover:bg-[#ffb95f] transition">
            Recipes
          </Link>
          <Link to="/about" className="bg-[#FFA94D] px-5 py-2 rounded hover:bg-[#ffb95f] transition">
            About
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
