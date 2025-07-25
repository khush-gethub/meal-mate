import AnimatedSection from "./AnimatedSection";
import { motion} from 'framer-motion';

// Hero Section Component
const AboutHero = () => (
    <AnimatedSection>
        <div className="relative min-h-[70vh] flex items-center justify-center 
                  bg-gradient-to-br from-[#FFF3C4] to-[#FFE082] 
                  text-center overflow-hidden">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="z-10 px-4 py-16"
            >
                <h1 className="text-4xl md:text-6xl font-bold text-[#4E342E] mb-6">
                    Bringing Flavor to Your Table
                </h1>
                <p className="text-xl md:text-2xl text-[#6D4C41] max-w-2xl mx-auto">
                    One Recipe at a Time — Simplifying Delicious Cooking for Everyone
                </p>
            </motion.div>

            {/* Decorative Food Illustrations */}
            <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut"
                }}
                className="absolute top-10 right-10 opacity-20 text-6xl"
            >
                🍳
            </motion.div>
            <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: [-5, 5, -5] }}
                transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut"
                }}
                className="absolute bottom-10 left-10 opacity-20 text-6xl"
            >
                🥘
            </motion.div>
        </div>
    </AnimatedSection>
);

export default AboutHero;