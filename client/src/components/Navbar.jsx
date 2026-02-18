import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import {
    Button,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList
} from '@material-tailwind/react';

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { isLoggedIn, user, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Recipe', path: '/recipe' },
        { name: 'Favorite', path: '/favorite' },
        { name: 'About', path: '/about' },
    ];

    if (isLoggedIn) {
        navLinks.push({ name: 'Add Recipe', path: '/add-recipe' });
        navLinks.push({ name: 'Meal Planner', path: '/meal-planner' });
    }

    const categories = [
        { name: 'Chicken', path: 'chicken' },
        { name: 'Veg', path: 'vegetarian' },
        { name: 'Sea-Food', path: 'seafood' },
        { name: 'Dessert', path: 'dessert' }
    ];

    return (
        <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 py-4 ${scrolled ? 'mt-2' : ''}`}>
            <div className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${scrolled ? 'glass-effect premium-shadow px-6 py-3' : 'bg-transparent px-2 py-4'}`}>
                <div className="flex flex-col gap-4">
                    {/* Top Row: Logo, Search, Auth */}
                    <div className="flex justify-between items-center gap-4">
                        {/* Logo */}
                        <Link to="/" className="text-3xl md:text-3xl lobster text-gradient flex items-center gap-2 flex-shrink-0">
                            <span className="premium-gradient w-10 h-10 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">M</span>
                            <span className="hidden sm:inline">MealMate</span>
                        </Link>

                        {/* Search Bar - Centered and Flexible */}
                        <div className="flex-grow max-w-2xl mx-4 hidden md:flex items-center bg-white/50 rounded-full px-4 py-2.5 border border-[#4E342E]/10 focus-within:border-[#FFA94D]/50 focus-within:ring-2 focus-within:ring-[#FFA94D]/20 transition-all shadow-sm focus-within:shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-gray-400 flex-shrink-0">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search recipes..."
                                className="bg-transparent border-none outline-none text-sm ml-3 w-full text-[#4E342E] font-medium placeholder:text-gray-400"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        window.location.href = `#/search?q=${e.target.value}`;
                                    }
                                }}
                            />
                        </div>

                        {/* Auth Button & Mobile Toggle */}
                        <div className="flex items-center gap-4 flex-shrink-0">
                            <div className="hidden md:flex items-center gap-4">
                                {isLoggedIn ? (
                                    <>
                                        <Link to="/profile">
                                            <div className="w-10 h-10 rounded-full premium-gradient flex items-center justify-center text-white font-bold shadow-lg hover:scale-110 transition-transform">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="px-6 py-2 premium-gradient text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-bold text-sm"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <Link to="/login">
                                        <button className="px-8 py-2 premium-gradient text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-bold text-sm">
                                            Login
                                        </button>
                                    </Link>
                                )}
                            </div>

                            {/* Hamburger Icon */}
                            <div className="md:hidden">
                                <button
                                    onClick={() => setMobileOpen(!mobileOpen)}
                                    className="bg-[#FFF3C4] p-2 rounded-xl text-[#4E342E]"
                                >
                                    {mobileOpen ? (
                                        <svg className="w-6 h-6 " fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    ) : (
                                        <svg className="w-6 h-6 " fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row: Navigation Links (Desktop Only) */}
                    <div className="hidden md:flex items-center justify-center gap-8 border-t border-[#4E342E]/5 pt-2">
                        <Link to="/" className="hover:text-[#FFA94D] transition-colors font-semibold text-[#4E342E] text-sm tracking-wide uppercase">Home</Link>

                        <Menu>
                            <MenuHandler>
                                <Button variant="text" className="text-sm text-[#4E342E] flex items-center gap-1 p-0 hover:text-[#FFA94D] transition-colors font-semibold capitalize font-sans tracking-wide uppercase">
                                    Meal
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 opacity-70">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </Button>
                            </MenuHandler>
                            <MenuList className="mt-2 glass-effect border-none p-2 z-50 w-48 flex flex-col rounded-xl shadow-2xl outline-none overflow-hidden">
                                {categories.map((category) => (
                                    <MenuItem key={category.name} className="hover:bg-[#FFF3C4] rounded-lg transition-colors p-0">
                                        <Link to={`/menu/${category.path}`} className="block w-full px-4 py-2.5 text-[#4E342E] font-medium">
                                            {category.name}
                                        </Link>
                                    </MenuItem>
                                ))}
                            </MenuList>
                        </Menu>

                        {navLinks.slice(1).map((link) => (
                            <Link key={link.path} to={link.path} className="hover:text-[#FFA94D] transition-colors font-semibold text-[#4E342E] text-sm tracking-wide uppercase">
                                {link.name}
                            </Link>
                        ))}

                        {isLoggedIn && user && user.role === 'admin' && (
                            <Link to="/admin" className="px-4 py-1 rounded-full bg-[#4E342E]/10 text-[#4E342E] text-xs font-bold hover:bg-[#4E342E] hover:text-white transition-all uppercase tracking-wider">
                                Admin Panel
                            </Link>
                        )}
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            key="mobile-menu"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="flex flex-col gap-3 mt-4 md:hidden overflow-hidden glass-effect p-4 rounded-xl"
                        >
                            {navLinks.map((link) => (
                                <Link key={link.path} to={link.path} onClick={() => setMobileOpen(false)} className="text-lg font-bold px-2 py-1">
                                    {link.name}
                                </Link>
                            ))}

                            <div className="border-t border-[#4E342E]/10 pt-2">
                                <button
                                    onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                                    className="flex items-center justify-between w-full text-lg font-bold px-2 py-1"
                                >
                                    Meals
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={`w-5 h-5 transition-transform ${mobileDropdownOpen ? 'rotate-180' : ''}`}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </button>
                                <AnimatePresence>
                                    {mobileDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="ml-4 mt-1 flex flex-col gap-3"
                                        >
                                            {categories.map((item) => (
                                                <Link key={item.name} to={`/menu/${item.path}`} onClick={() => setMobileOpen(false)} className="text-md font-semibold text-[#4E342E]/70">
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {isLoggedIn && user && user.role === 'admin' && (
                                <Link to="/admin" onClick={() => setMobileOpen(false)} className="text-lg font-bold px-2 py-1 text-[#FFA94D]">
                                    Admin Dashboard
                                </Link>
                            )}

                            <div className="mt-2">
                                {isLoggedIn ? (
                                    <button
                                        onClick={handleLogout}
                                        className="w-full py-3 premium-gradient text-white rounded-xl font-bold shadow-lg"
                                    >
                                        Logout
                                    </button>
                                ) : (
                                    <Link to="/login" onClick={() => setMobileOpen(false)}>
                                        <button className="w-full py-3 premium-gradient text-white rounded-xl font-bold shadow-lg">
                                            Login
                                        </button>
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Navbar;
