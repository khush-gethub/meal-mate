import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';


const CTASection = () => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-[#FFF3C4] py-16 text-center"
    >
        <h2 className="text-3xl md:text-4xl font-bold text-[#4E342E] mb-6">
            Ready to Cook Something Delicious?
        </h2>
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#FF9800] text-white px-8 py-3 rounded-full text-xl 
                 hover:bg-[#F57C00] transition-colors"
        >
            <Link to="/recipe">
                Explore Recipes
            </Link>
        </motion.button>
    </motion.div>
);

export default CTASection;