import React from 'react';
import { motion } from 'framer-motion';

const History = () => (
  <div className="container mx-auto px-6 lg:px-24 py-24">
    <div className="grid md:grid-cols-2 gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-[#FFA94D] font-bold tracking-[0.3em] uppercase text-xs mb-4 block"
        >
          Our Roots
        </motion.span>
        <h2 className="text-4xl md:text-5xl font-poppins font-black text-[#4E342E] mb-8 leading-tight">
          A Passion for <br />
          <span className="text-gradient">Culinary Excellence</span>
        </h2>
        <div className="space-y-6">
          <p className="text-lg text-[#4E342E]/70 leading-relaxed">
            MealMate began with a simple passion: making cooking accessible, enjoyable, and inspiring for everyone. What started as a small collection of family favorites has evolved into a global platform for culinary discovery.
          </p>
          <p className="text-lg text-[#4E342E]/70 leading-relaxed font-medium italic border-l-4 border-[#FFA94D] pl-6">
            "We believe that every meal is an opportunity to create a memory. Our mission is to provide the tools and inspiration to make those memories extraordinary."
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <div className="absolute -inset-4 bg-[#FFA94D]/10 rounded-[3rem] blur-2xl" />
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative rounded-[2.5rem] overflow-hidden premium-shadow"
        >
          <img
            src="https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?q=80&w=2070&auto=format&fit=crop"
            alt="Our Kitchen Story"
            className="w-full h-full object-cover aspect-[4/5] md:aspect-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#4E342E]/40 to-transparent" />
        </motion.div>

        {/* Floating Badge */}
        <div className="absolute -bottom-10 -right-10 glass-effect p-8 rounded-[2rem] premium-shadow hidden lg:block border-white/20">
          <div className="text-4xl font-black text-[#4E342E] mb-1">10+</div>
          <p className="text-[#4E342E]/60 font-bold uppercase tracking-widest text-xs">Years of Flavor</p>
        </div>
      </motion.div>
    </div>
  </div>
);

export default History;