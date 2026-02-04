import React from 'react';
import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    { number: '01', text: 'Choose a Category', icon: '🔍', desc: 'Select from our wide range of cuisines and dietary styles.' },
    { number: '02', text: 'Browse Recipes', icon: '📖', desc: 'Explore thousands of hand-crafted recipes with step-by-step guides.' },
    { number: '03', text: 'Save Favorites', icon: '❤️', desc: 'Build your personal library of the dishes you love most.' },
    { number: '04', text: 'Start Cooking!', icon: '👨‍🍳', desc: 'Grab your apron and create something extraordinary today.' }
  ];

  return (
    <div className="bg-[#FFF3C4]/30 py-24">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#FFA94D] font-bold tracking-[0.3em] uppercase text-xs mb-4 block"
          >
            Process
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-poppins font-black text-[#4E342E]">
            Simple Steps to <span className="text-gradient">Culinary Mastery</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[40%] left-0 w-full h-0.5 border-t-2 border-dashed border-[#FFA94D]/30 z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative z-10 flex flex-col items-center group"
            >
              <div className="w-24 h-24 rounded-[2rem] bg-white flex items-center justify-center text-5xl mb-8 premium-shadow group-hover:bg-[#FFA94D] group-hover:text-white transition-all duration-500 group-hover:scale-110">
                {step.icon}
              </div>

              <div className="text-xl font-black text-[#FFA94D] mb-2 tracking-tighter">
                Step {step.number}
              </div>
              <h3 className="text-2xl font-bold text-[#4E342E] mb-4 text-center group-hover:text-[#FFA94D] transition-colors">
                {step.text}
              </h3>
              <p className="text-[#4E342E]/60 text-center leading-relaxed font-medium px-4">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;