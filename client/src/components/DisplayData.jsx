import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Cards from './Cards';

const DisplayData = () => {
    const { category } = useParams();

    return (
        <>
            <Navbar />
            <div className="p-1 bg-[#FFF6F0] text-[#4E342E] mb-16">
                <Cards type={category} />
            </div>
            <Footer />
        </>
    );
};

export default DisplayData;