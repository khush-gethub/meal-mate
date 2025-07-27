import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

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

    return (
        <div className="bg-[#FFA94D] text-[#4E342E] px-5 py-5 relative z-20">
            <div className="flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-4xl lobster">MealMate</Link>

                {/* Hamburger Icon */}
                <div className="md:hidden">
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="focus:outline-none ms-44"
                    >
                        {mobileOpen ? (
                            <svg className="w-6 h-6 " fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6 " fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    <Link to="/">Home</Link>

                    <Menu>
                        <MenuHandler>
                            <Button variant="text" className="text-md text-[#4E342E] flex items-center gap-1 p-0">
                                Meal
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="size-5">
                                    <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
                                </svg>
                            </Button>
                        </MenuHandler>
                        <MenuList className="mt-6 bg-[#FFA94D] border-none p-4 z-10 w-max flex flex-col rounded shadow-md outline-none">
                            <MenuItem>
                                <Link to="/menu/chicken">Chicken</Link>
                                <span className="flex w-full h-[1px] bg-black opacity-25 my-1"></span>
                            </MenuItem>
                            <MenuItem>
                                <Link to="/menu/vegetarian">Veg</Link>
                                <span className="flex w-full h-[1px] bg-black opacity-25 my-1"></span>
                            </MenuItem>
                            <MenuItem>
                                <Link to="/menu/seafood">Sea-Food</Link>
                                <span className="flex w-full h-[1px] bg-black opacity-25 my-1"></span>
                            </MenuItem>
                            <MenuItem>
                                <Link to="/menu/dessert">Dessert</Link>
                                <span className="flex w-full h-[1px] bg-black opacity-25 my-1"></span>
                            </MenuItem>
                        </MenuList>
                    </Menu>

                    <Link to="/recipe">Recipe</Link>
                    <Link to="/favorite">Favorite</Link>
                    <Link to="/about">About</Link>
                </div>

                {/* Desktop Login Button */}
                <Link to="/login">
                    <button className="hidden md:block px-6 py-2 text-[1.2rem] bg-[#FFF3C4] rounded-lg hover:bg-[#ffeaa0] transition">
                        Login
                    </button>
                </Link>
            </div>

            {/* Mobile Menu with Framer Motion */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col gap-4 mt-4 md:hidden overflow-hidden origin-top"
                    >
                        <Link to="/">Home</Link>

                        {/* Framer Mobile Dropdown */}
                        <div>
                            <button
                                onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                                className="flex items-center gap-1"
                            >
                                Meal
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="size-5 mt-[2px]">
                                    <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <AnimatePresence>
                                {mobileDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="ml-4 mt-2 flex flex-col gap-2"
                                    >
                                        <Link to="/menu/chicken">Chicken</Link>
                                        <Link to="/menu/veg">Veg</Link>
                                        <Link to="/menu/seafood">Sea-Food</Link>
                                        <Link to="/menu/dessert">Dessert</Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link to="/recipe">Recipe</Link>
                        <Link to="/favorite">Favorite</Link>
                        <Link to="/about">About</Link>
                        <Link to="/login">
                            <button className="w-full px-5 py-1 bg-[#FFF3C4] rounded hover:bg-[#ffeaa0] transition">
                                Login
                            </button>
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Navbar