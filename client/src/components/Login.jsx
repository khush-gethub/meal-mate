import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // New state for error message
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the useAuth hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous errors
    try {
      const response = await axios.post('http://localhost:8000/login', { email, password });
      if (response.data.success) {
        login({ role: response.data.role }); // Call login from AuthContext
        alert('Login successful!');
        navigate('/');
      } else {
        setErrorMessage(response.data.message || 'Login failed. Please check your credentials.'); // Set error message
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('An error occurred during login. Please try again.'); // Generic error for network issues
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F5F5F5] mx-6">
      <div className="flex md:w-[1100px] shadow-2xl rounded-2xl overflow-hidden w-full">
        {/* Image Section */}
        <div className="w-1/2 hidden md:flex">
          <img
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=60"
            alt="Food Background"
            className="w-full h-full object-cover xl:h-[40rem]"
            id='login'
          />
        </div>

        {/* Login Details Section */}
        <div className="md:w-1/2 w-full bg-white p-8 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-[#4E342E] mb-8 text-center">Welcome Back</h2>

          {/* Divider */}
          <div className="flex items-center justify-center my-4">
            <hr className="border-t w-full mr-3" />
            <span className="text-gray-500"></span>
            <hr className="border-t w-full ml-3" />
          </div>

          {/* Login Form */}
          {errorMessage && (
            <div className="text-red-500 text-center mb-4">
              {errorMessage}
            </div>
          )}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              required
              type="email"
              placeholder="Email"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFF3C4]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <input
              required
              type="password"
              placeholder="Password"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFF3C4]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex justify-between items-center">
              <label className="flex items-center select-none">
                <input
                  type="checkbox"
                  className="mr-2"
                />
                Remember me
              </label>
              <a href="#" className="text-[#4E342E] hover:underline">Forgot Password?</a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#FFF3C4] hover:bg-[#FFE082] transition rounded-lg py-3 font-semibold"
            >
              Login
            </button>
          </form>

          {/* Signup Link */}
          <div className="text-center mt-4">
            Don't have an account?
            <Link to="/Signup" className="text-[#4E342E] ml-1 hover:underline">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
