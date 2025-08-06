import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        rname: '',
        email: '',
        password: '',
        conformPassword: ''
    });

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://127.0.0.1:8000/Signup', formData);
            console.log('Form Submitted:', res.data);
            if (res.status === 201) {
                navigate('/login');
            }
        } catch (error) {
            console.error("Signup failed:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] p-4 xl:h-[36rem]">
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
                <h2 className="text-3xl font-bold text-center mb-6 text-[#4E342E]">
                    Create Your Account or Join Cookings Today!
                </h2>

                {/* Google Signup Button */}

                {/* Divider */}
                <div className="flex items-center justify-center my-4">
                    <hr className="border-t w-full mr-3" />
                    <span className="text-gray-500">or</span>
                    <hr className="border-t w-full ml-3" />
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Full Name Input */}
                    <input
                        required
                        type="text"
                        placeholder="Full Name"
                        name='rname'
                        value={formData.rname}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFF3C4]"
                    />

                    {/* Email Input */}
                    <input
                        required
                        type="email"
                        name='email'
                        value={formData.email}
                        placeholder="Email Address"
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFF3C4]"
                    />

                    {/* Password Input */}
                    <input
                        required
                        type="password"
                        name='password'
                        value={formData.password}
                        placeholder="Password"
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFF3C4]"
                    />

                    {/* Confirm Password Input */}
                    <input
                        required
                        type="password"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        name='conformPassword'
                        value={formData.conformPassword}
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFF3C4]"
                    />

                    {/* Profile Picture Upload */}
                    <div>
                        <label className="block text-gray-700 mb-2">Profile Picture (Optional)</label>
                        <input
                            required
                            type="file"
                            accept="image/*"
                            className="w-full border rounded-lg px-4 py-2"
                        />
                    </div>

                    {/* Terms and Conditions Checkbox */}
                    <div className="flex items-center">
                        <label className="text-sm select-none flex items-center">
                            <input
                                required
                                type="checkbox"
                                className="mr-2"
                            />
                            I agree to the Terms & Conditions
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#FFF3C4] hover:bg-[#FFE082] transition rounded-lg py-3 font-semibold"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Login Link */}
                <div className="text-center mt-4">
                    Already have an account?{' '}
                    <Link to="/login" className="text-[#4E342E] hover:underline">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;