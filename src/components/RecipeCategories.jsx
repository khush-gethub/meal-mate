import { Link } from "react-router-dom";
import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";

const RecipeCategories = () => {
  const categories = [
    { name: 'Chicken', icon: '🍗', color: 'bg-orange-100', path: '/menu/chicken' },
    { name: 'Seafood', icon: '🐟', color: 'bg-blue-100', path: '/menu/seafood' },
    { name: 'Vegetarian', icon: '🥗', color: 'bg-green-100', path: '/menu/veg' },
    { name: 'Dessert', icon: '🍰', color: 'bg-pink-100', path: '/menu/dessert' }
  ];

  return (
    <AnimatedSection direction="down">
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#4E342E] mb-12">
          What We Offer
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link to={category.path} key={index}>
              <motion.div
                className={`flex flex-col items-center justify-center p-6 rounded-lg shadow-lg ${category.color} hover:scale-105 transition-transform duration-300`}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-5xl mb-4">{category.icon}</span>
                <h3 className="text-xl font-semibold text-[#4E342E]">
                  {category.name}
                </h3>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default RecipeCategories;