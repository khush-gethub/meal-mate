import React from 'react'
import Navbar from '../components/Navbar'
import History from '../components/History'
import Footer from '../components/Footer'
import AboutHero from '../components/AboutHero'
import RecipeCategories from '../components/RecipeCategories'
import HowItWorks from '../components/HowItWorks'
import CTASection from '../components/CTASection'

const About = () => {
    return (
        <>
            <div className="bg-[#FFF6F0] min-h-screen">
                <Navbar />
                <AboutHero />
                <History />
                <RecipeCategories />
                <HowItWorks />
                <CTASection />
                <Footer />
            </div>
        </>
    )
}

export default About