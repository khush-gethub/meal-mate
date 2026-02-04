import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#4E342E] text-white/90 py-20">
            <div className="container mx-auto px-6 lg:px-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Brand Section */}
                    <div className="lg:col-span-4">
                        <Link to="/" className="text-4xl lobster text-[#FFA94D] block mb-6">MealMate</Link>
                        <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-sm">
                            Bringing the world's finest recipes to your kitchen. Elevate your culinary experience with our expert-curated collections.
                        </p>
                        <div className="flex items-center gap-4">
                            {['facebook', 'twitter', 'instagram', 'linkedin'].map(social => (
                                <a key={social} href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#FFA94D] hover:text-[#4E342E] transition-all duration-300">
                                    <span className="sr-only">{social}</span>
                                    <i className={`fab fa-${social}`}></i>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-12">
                        <div>
                            <h4 className="text-[#FFA94D] font-bold uppercase tracking-[0.2em] text-xs mb-6">Explore</h4>
                            <ul className="space-y-4">
                                {['Home', 'Recipes', 'About', 'Menu'].map(item => (
                                    <li key={item}><Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="hover:text-[#FFA94D] transition-colors">{item}</Link></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-[#FFA94D] font-bold uppercase tracking-[0.2em] text-xs mb-6">Meal Categories</h4>
                            <ul className="space-y-4">
                                {['Chicken', 'Vegetarian', 'Seafood', 'Dessert'].map(item => (
                                    <li key={item}><Link to={`/menu/${item.toLowerCase()}`} className="hover:text-[#FFA94D] transition-colors">{item}</Link></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-[#FFA94D] font-bold uppercase tracking-[0.2em] text-xs mb-6">Support</h4>
                            <ul className="space-y-4">
                                {['FAQ', 'Help Center', 'Safety', 'Terms'].map(item => (
                                    <li key={item}><a href="#" className="hover:text-[#FFA94D] transition-colors">{item}</a></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-[#FFA94D] font-bold uppercase tracking-[0.2em] text-xs mb-6">Newsletter</h4>
                            <p className="text-white/40 text-sm mb-4">Get the latest recipes straight to your inbox.</p>
                            <div className="flex flex-col gap-2">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#FFA94D] transition-colors"
                                />
                                <button className="premium-gradient py-3 rounded-xl font-bold text-white shadow-lg shadow-[#FFA94D]/10">Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-white/40 text-sm">
                        © {new Date().getFullYear()} MealMate Global. All Rights Reserved.
                    </p>
                    <div className="flex gap-8 text-white/40 text-sm font-bold uppercase tracking-widest">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Legal</a>
                        <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                    </div>
                    <p className="text-white/40 text-sm">
                        Crafted with ❤️ by <span className="text-white font-bold">Khush@Dev</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
