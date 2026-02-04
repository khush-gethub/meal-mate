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
            <div className="pt-40 min-h-screen bg-[#FFF6F0] text-[#4E342E] pb-10">
                <Cards type={category} />
            </div>
            <Footer />
        </>
    );
};

export default DisplayData;