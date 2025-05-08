import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Cards from '../components/Cards'
import DessertHero from '../components/DessertHero'
import Category from '../components/Category'
import Footer from '../components/Footer'

const Home = () => {
    return (
        <>
            <Navbar/>
            <Hero/>
            <Cards/>
            <Category/>
            <DessertHero/>
            <Footer/>
        </>
    )
}

export default Home