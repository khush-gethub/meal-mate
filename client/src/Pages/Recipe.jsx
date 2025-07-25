import React from 'react'
import Navbar from '../components/Navbar'
import BackgroundCarousel from '../components/BackgroundCarousel'
import Cards from '../components/Cards'
import Footer from '../components/Footer'
import Higthretting from '../components/Higthretting'


const Recipe = () => {
    return (
        <>
            <Navbar/>
            <BackgroundCarousel/>
            <Cards/>
            <Higthretting/>
            <Footer/>
        </>
    )
}

export default Recipe