import React from 'react'
import Navbar from '../components/Navbar'
import BackgroundCarousel from '../components/BackgroundCarousel'
import Footer from '../components/Footer'
import Higthretting from '../components/Higthretting'
import GeneralData from '../components/GeneralData'



const Recipe = () => {
    return (
        <>
            <Navbar/>
            <BackgroundCarousel/>
            <GeneralData/>
            <Higthretting/>
            <Footer/>
        </>
    )
}

export default Recipe