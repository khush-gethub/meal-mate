// src/pages/About.jsx
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Reusable Animation Wrapper
const AnimatedSection = ({ children, direction = 'up' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === 'up' ? 50 : -50 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;