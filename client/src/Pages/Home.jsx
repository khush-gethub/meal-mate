import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import DessertHero from '../components/DessertHero'
import Category from '../components/Category'
import Footer from '../components/Footer'
import GeneralData from '../components/GeneralData'


const Home = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <GeneralData />
            <Category />
            <DessertHero />
            <Footer />
        </>
    )
}

export default Home