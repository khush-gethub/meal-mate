import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { auth, googleProvider, db } from '../Firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { ref, get, set } from 'firebase/database';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      const userRef = ref(db, 'users/' + userCredential.user.uid);
      const snapshot = await get(userRef);

      if (snapshot.exists() && snapshot.val().is_admin === true) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage(error.message || 'Login failed. Please check your credentials.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if user exists, if not create profile
      const userRef = ref(db, 'users/' + user.uid);
      const snapshot = await get(userRef);

      let isAdmin = false;
      if (!snapshot.exists()) {
        await set(userRef, {
          rname: user.displayName || 'Google User',
          email: user.email,
          is_admin: false
        });
      } else {
        isAdmin = snapshot.val().is_admin === true;
      }

      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error("Google login failed:", error);
      setErrorMessage(error.message || 'Google Sign-In failed.');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FFF6F0]">
      {/* Decorative Circles */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FFA94D] opacity-10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#FFF3C4] opacity-40 rounded-full blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-5xl mx-6 flex flex-col md:flex-row rounded-[2.5rem] overflow-hidden premium-shadow bg-white"
      >
        {/* Artistic Section */}
        <div className="hidden md:block w-1/2 relative bg-[#4E342E]">
          <img
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80"
            alt="Chef Preparing Food"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-12 bg-gradient-to-t from-[#4E342E] via-transparent to-transparent">
            <h3 className="text-4xl font-poppins font-black text-white mb-4">Master Every Dish.</h3>
            <p className="text-white/70 text-lg leading-relaxed">
              Join thousands of food lovers sharing and discovering professional recipes every day.
            </p>
          </div>
          <div className="absolute top-8 left-8">
            <Link to="/" className="text-3xl lobster text-white">MealMate</Link>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-4xl font-poppins font-black text-[#4E342E] mb-2">Welcome Back</h2>
            <p className="text-[#4E342E]/60 font-medium">Please enter your details to sign in.</p>
          </div>

          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-red-50 text-red-500 p-4 rounded-xl text-sm font-bold mb-6 border border-red-100"
            >
              {errorMessage}
            </motion.div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#4E342E]/50 mb-2 ml-1">Email Address</label>
              <input
                required
                type="email"
                placeholder="chef@mealmate.com"
                className="w-full bg-[#FFF6F0]/50 border border-[#4E342E]/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#FFA94D]/30 focus:border-[#FFA94D] transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <div className="flex justify-between mb-2 ml-1">
                <label className="text-xs font-bold uppercase tracking-widest text-[#4E342E]/50">Password</label>
                <a href="#" className="text-xs font-bold text-[#FFA94D] hover:underline">Forgot?</a>
              </div>
              <input
                required
                type="password"
                placeholder="••••••••"
                className="w-full bg-[#FFF6F0]/50 border border-[#4E342E]/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#FFA94D]/30 focus:border-[#FFA94D] transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 select-none ml-1">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-gray-300 accent-[#FFA94D]" />
              <label htmlFor="remember" className="text-sm font-bold text-[#4E342E]/70">Keep me signed in</label>
            </div>

            <div className="space-y-4 mt-4">
              <button
                type="submit"
                className="w-full premium-gradient hover:shadow-xl hover:scale-[1.02] transition-all rounded-2xl py-4 font-black text-white text-lg shadow-lg shadow-[#FFA94D]/30"
              >
                Sign In
              </button>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full bg-white border-2 border-gray-200 hover:bg-gray-50 hover:scale-[1.02] transition-all rounded-2xl py-4 font-bold text-gray-700 text-lg flex items-center justify-center gap-2"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" />
                Sign In with Google
              </button>
            </div>
          </form>

          <div className="text-center mt-10">
            <span className="text-[#4E342E]/60 font-medium">New to MealMate?</span>
            <Link to="/signup" className="text-[#FFA94D] font-black ml-2 hover:underline tracking-tight">Create Account</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
