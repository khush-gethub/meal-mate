import React, { useState, useEffect } from 'react';

const images = [
    "https://media.istockphoto.com/id/1208340233/photo/crispy-skin.jpg?s=612x612&w=0&k=20&c=l-Lc3vjiAati_MJmRyvZuqjBWj_A358APsksVGMvhp0=",
    "https://media.istockphoto.com/id/973780048/photo/corn-flakes-breaded-deep-fried-crispy-shrimps.jpg?s=612x612&w=0&k=20&c=LW08-b0N8TdAMIAz2D1583g2smULKG11vDR_zWeeQCY=",
    "https://media.istockphoto.com/id/2183032089/photo/chicharron-de-pollo-is-dominican-fried-chicken.jpg?s=612x612&w=0&k=20&c=UPss7oklc6R1ObeTwC7AIzbD2oGTCrV8YSsEyaYZPkg=",
    "https://media.istockphoto.com/id/2208487240/photo/fried-chicken-skin-with-herb-and-various-sauce.jpg?s=612x612&w=0&k=20&c=bSQe2fC2PqphB82vxdJHx9-FPtn_e9psUj7Y1wj0r5Q="
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
        <div className="w-full max-w-6xl mx-auto relative overflow-hidden rounded-lg shadow-lg mt-10 mb-10">
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
