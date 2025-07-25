import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";

const History = () => (
  <AnimatedSection>
    <div className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-[#4E342E] mb-6">
          Our Culinary Journey
        </h2>
        <p className="text-xl text-[#6D4C41] leading-relaxed">
          MealMate began with a simple passion: making cooking accessible, enjoyable, 
          and inspiring for everyone. Born from countless kitchen adventures and a love 
          for sharing delicious meals, we're more than just a recipe site — we're a 
          community of food lovers bringing joy through cooking.
        </p>
      </div>
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="rounded-xl overflow-hidden shadow-lg"
      >
        <img 
          src="https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Our Kitchen Story" 
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  </AnimatedSection>
);
export default History;