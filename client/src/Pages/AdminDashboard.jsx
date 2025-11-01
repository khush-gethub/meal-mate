import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total users
        const usersResponse = await axios.get('http://localhost:8000/admin/users');
        setTotalUsers(usersResponse.data.length);

        // Fetch total recipes
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
    return <div className="min-h-screen bg-[#F5F5F5] p-8 text-center text-[#4E342E]">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-[#F5F5F5] p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-[#4E342E]">Admin Dashboard</h1>
        <Link to="/" className="bg-[#FFF3C4] px-6 py-2 rounded-lg shadow-md hover:bg-[#FFE082] transition-colors duration-300 text-[#4E342E] font-semibold">
          Back to Site
        </Link>
      </div>

      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
          <h2 className="text-xl font-semibold text-[#4E342E] mb-2">Total Users</h2>
          <p className="text-5xl font-bold text-[#FFA94D]">{totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
          <h2 className="text-xl font-semibold text-[#4E342E] mb-2">Total Recipes</h2>
          <p className="text-5xl font-bold text-[#FFA94D]">{totalRecipes}</p>
        </div>
      </div>

      {/* Quick Actions / Navigation */}
      <h2 className="text-3xl font-bold text-[#4E342E] mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <Link to="/admin/users" className="bg-[#FFF3C4] p-6 rounded-lg shadow-md hover:bg-[#FFE082] transition-colors duration-300 flex flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-semibold text-[#4E342E] mb-2">User Management</h2>
          <p className="text-[#4E342E]">Manage users, view details, and delete accounts.</p>
        </Link>
        <Link to="/admin/recipes" className="bg-[#FFF3C4] p-6 rounded-lg shadow-md hover:bg-[#FFE082] transition-colors duration-300 flex flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-semibold text-[#4E342E] mb-2">Recipe Management</h2>
          <p className="text-[#4E342E]">Add, edit, and delete recipes across all categories.</p>
        </Link>
        <div className="bg-[#FFF3C4] p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center opacity-50 cursor-not-allowed">
          <h2 className="text-2xl font-semibold text-[#4E342E] mb-2">Settings</h2>
          <p className="text-[#4E342E]">Configure application settings (Coming Soon).</p>
        </div>
        </div>

      <div className="mt-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;