import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#FFA94D] text-[#4E342E] py-10">
            <div className="container mx-auto px-6 lg:px-32">
                {/* Top Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                    {/* Logo and Description */}
                    <div className="w-full lg:w-1/3">
                        <Link to="/" className="text-4xl lobster mb-4">MealMate</Link>
                        <p className="text-sm text-[#4E342E]">
                            Discover delicious recipes and cooking tips to make your meals extraordinary. Join our community of food lovers today!
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="w-full lg:w-2/3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                        <div className="flex flex-col gap-2">
                            <h3 className="font-extrabold text-lg mb-2">Quick Links</h3>
                            <a href="/" className="hover:underline text-[#4E342E]">Home</a>
                            <a href="/Recipe" className="hover:underline text-[#4E342E]">Recipes</a>
                            <a href="/About" className="hover:underline text-[#4E342E]">About Us</a>
                            <a href="/Contact" className="hover:underline text-[#4E342E]">Contact</a>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="font-extrabold text-lg mb-2">Account</h3>
                            <a href="/Login" className="hover:underline text-[#4E342E]">Login</a>
                            <a href="/Signup" className="hover:underline text-[#4E342E]">Signup</a>
                            <a href="/Profile" className="hover:underline text-[#4E342E]">Profile</a>
                            <a href="/Settings" className="hover:underline text-[#4E342E]">Settings</a>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="font-extrabold text-lg mb-2">Resources</h3>
                            <a href="/Blog" className="hover:underline text-[#4E342E]">Blog</a>
                            <a href="/FAQ" className="hover:underline text-[#4E342E]">FAQ</a>
                            <a href="/Support" className="hover:underline text-[#4E342E]">Support</a>
                            <a href="/Privacy" className="hover:underline text-[#4E342E]">Privacy Policy</a>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="font-extrabold text-lg mb-2">Follow Us</h3>
                            <a href="https://facebook.com" className="hover:underline text-[#4E342E]">Facebook</a>
                            <a href="https://twitter.com" className="hover:underline text-[#4E342E]">Twitter</a>
                            <a href="http://instagram.com/khushal_sonarghare._" className="hover:underline text-[#4E342E]">Instagram</a>
                            <a href="https://linkedin.com" className="hover:underline text-[#4E342E]">LinkedIn</a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="my-8 border-t border-gray-700"></div>

                {/* Bottom Section */}
                <div className="text-center text-sm text-[#4E342E]">
                    <p>© {new Date().getFullYear()} Recipe Hub. All Rights Reserved.</p>
                    <p>Designed by Khush@Dev</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
