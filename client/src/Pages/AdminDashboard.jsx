import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get('http://localhost:8000/admin/users');
        setTotalUsers(usersResponse.data.length);
        const recipesResponse = await axios.get('http://localhost:8000/admin/recipes');
        setTotalRecipes(recipesResponse.data.length);
      } catch (err) {
        setError('Failed to fetch dashboard data.');
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF6F0] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#FFA94D] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const isBaseDashboard = location.pathname === '/admin';

  return (
    <div className="min-h-screen bg-[#FFF6F0] flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-80 bg-[#4E342E] p-8 flex flex-col min-h-screen">
        <div className="mb-12">
          <Link to="/" className="text-4xl lobster text-white">MealMate <span className="text-[#FFA94D] text-sm lobster block tracking-widest uppercase">Admin Panel</span></Link>
        </div>

        <nav className="flex-1 space-y-4">
          <Link to="/admin">
            <div className={`p-4 rounded-2xl flex items-center gap-4 font-bold transition-all ${isBaseDashboard ? 'bg-[#FFA94D] text-white shadow-lg shadow-[#FFA94D]/20' : 'text-white/60 hover:bg-white/5'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 012 2v2a2 2 0 012 2v2a2 2 0 012 2v2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" /></svg>
              Overview
            </div>
          </Link>
          <Link to="/admin/users">
            <div className={`p-4 rounded-2xl flex items-center gap-4 font-bold transition-all ${location.pathname.includes('/users') ? 'bg-[#FFA94D] text-white shadow-lg shadow-[#FFA94D]/20' : 'text-white/60 hover:bg-white/5'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              Users
            </div>
          </Link>
          <Link to="/admin/recipes">
            <div className={`p-4 rounded-2xl flex items-center gap-4 font-bold transition-all ${location.pathname.includes('/recipes') ? 'bg-[#FFA94D] text-white shadow-lg shadow-[#FFA94D]/20' : 'text-white/60 hover:bg-white/5'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              Recipes
            </div>
          </Link>
        </nav>

        <Link to="/" className="mt-auto p-4 rounded-2xl bg-white/5 text-white/50 font-bold hover:bg-white/10 hover:text-white transition-all text-center">
          Back to Website
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 md:p-14 overflow-y-auto">
        {isBaseDashboard ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-12">
              <h1 className="text-4xl font-poppins font-black text-[#4E342E] mb-2">Dashboard Overview</h1>
              <p className="text-[#4E342E]/60 font-medium italic">Welcome back to the command center.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-10 rounded-[2.5rem] premium-shadow border border-[#4E342E]/5 group transition-all hover:translate-y-[-5px]">
                <div className="w-16 h-16 rounded-2xl bg-[#FFA94D]/10 flex items-center justify-center text-[#FFA94D] mb-6 group-hover:bg-[#FFA94D] group-hover:text-white transition-all">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                </div>
                <h2 className="text-xl font-bold text-[#4E342E]/60 mb-2 uppercase tracking-widest text-sm">Total Users</h2>
                <p className="text-6xl font-poppins font-black text-[#4E342E]">{totalUsers}</p>
              </div>

              <div className="bg-white p-10 rounded-[2.5rem] premium-shadow border border-[#4E342E]/5 group transition-all hover:translate-y-[-5px]">
                <div className="w-16 h-16 rounded-2xl bg-[#FFA94D]/10 flex items-center justify-center text-[#FFA94D] mb-6 group-hover:bg-[#FFA94D] group-hover:text-white transition-all">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                </div>
                <h2 className="text-xl font-bold text-[#4E342E]/60 mb-2 uppercase tracking-widest text-sm">Total Recipes</h2>
                <p className="text-6xl font-poppins font-black text-[#4E342E]">{totalRecipes}</p>
              </div>
            </div>

            <div className="bg-white p-12 rounded-[3rem] premium-shadow border border-[#4E342E]/5">
              <h2 className="text-2xl font-black text-[#4E342E] mb-8">System Status</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-6 bg-[#FFF6F0] rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="font-bold text-[#4E342E]">API Server (Node.js)</span>
                  </div>
                  <span className="text-sm font-bold text-green-600 uppercase">Operational</span>
                </div>
                <div className="flex items-center justify-between p-6 bg-[#FFF6F0] rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="font-bold text-[#4E342E]">Database (MongoDB)</span>
                  </div>
                  <span className="text-sm font-bold text-green-600 uppercase">Operational</span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="bg-white rounded-[3rem] premium-shadow p-8 lg:p-12">
            <Outlet />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;