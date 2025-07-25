import React, { useState, useEffect } from 'react';

const images = [
    "https://media.istockphoto.com/id/1443602402/photo/chicken-karahi-korma-msala-served-in-dish-isolated-on-table-top-view-of-asian-and-indian-food.jpg?s=612x612&w=0&k=20&c=Ir7YJfthuCg-nVxVStgSvV217pYSbvHVFTwFXTFtfmU=",
    "https://media.istockphoto.com/id/1007313694/photo/rice-stewed-vegetables-egg-teriyaki-chicken-healthy-balanced-lunch-box-on-a-dark-background.jpg?s=612x612&w=0&k=20&c=Lq94ffBWsHw8ZEEaqoyGV4201FtbmyEhIt0XkzlaccI=",
    "https://media.istockphoto.com/id/1638296596/photo/jali-kabab-or-shami-kebab-tikki-served-in-dish-isolated-on-background-top-view-of-bangladesh.jpg?s=612x612&w=0&k=20&c=3hBxUgBqQvWuHDCX9MQaL42xgsGPWvY9zcL06LnusCc=",
    "https://media.istockphoto.com/id/1181240435/photo/grilled-chicken-salad.jpg?s=612x612&w=0&k=20&c=qdbyUnoUbxGJXAk3eGAxt5OQdKOhiLepab5XgW6wN1k="
];

const BackgroundCarousel = () => {
    const [current, setCurrent] = useState(0);

    // Auto-slide every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(prev => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const prevSlide = () => {
        setCurrent((current - 1 + images.length) % images.length);
    };

    const nextSlide = () => {
        setCurrent((current + 1) % images.length);
    };

    return (
        <div className="w-full max-w-6xl mx-auto relative overflow-hidden sm:rounded-lg shadow-lg mt-10 mb-10">
            <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        className="min-w-full h-60 sm:h-80 md:h-96 lg:h-[28rem] object-cover"
                        alt={`Slide ${index}`}
                    />
                ))}
            </div>

            {/* Slide Buttons */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-black px-3 py-1 rounded-full shadow"
            >
                &#8592;
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-black px-3 py-1 rounded-full shadow"
            >
                &#8594;
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 w-full flex justify-center gap-2">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`w-3 h-3 rounded-full ${current === idx ? 'bg-white' : 'bg-white/50'}`}
                    />
                ))}
            </div>
        </div>

    );
};

export default BackgroundCarousel;
