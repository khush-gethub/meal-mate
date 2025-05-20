import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    { number: '1', text: 'Choose a Category', icon: '🔍' },
    { number: '2', text: 'Browse Recipes', icon: '📖' },
    { number: '3', text: 'Save Favorites', icon: '❤️' },
    { number: '4', text: 'Start Cooking!', icon: '👨‍🍳' }
  ];

  return (
    <AnimatedSection>
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#4E342E] mb-12">
          How It Works
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 300,
                delay: parseInt(step.number) * 0.2 
              }}
              className="bg-white p-6 rounded-xl text-center shadow-md"
            >
              <div className="text-6xl mb-4">{step.icon}</div>
              <div className="text-4xl font-bold text-[#FF9800] mb-2">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-[#4E342E]">
                {step.text}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default HowItWorks;