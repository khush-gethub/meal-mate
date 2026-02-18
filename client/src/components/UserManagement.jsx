import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/admin/users');
      // Filter out admin users
      const nonAdminUsers = response.data.filter(user => user.role !== 'admin');
      setUsers(nonAdminUsers);
    } catch (err) {
      setError('Failed to fetch users.');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-4 border-[#FFA94D] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-[#4E342E] mb-2">User Management</h1>
          <p className="text-[#4E342E]/60 font-medium italic">Manage credentials and permissions for your community.</p>
        </div>
        <div className="px-6 py-3 bg-[#FFA94D]/10 rounded-2xl text-[#FFA94D] font-bold text-sm">
          {users.length} Total Users
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] premium-shadow border border-[#4E342E]/5 overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#FFF6F0]">
              <th className="px-8 py-6 text-left text-xs font-bold text-[#4E342E]/40 uppercase tracking-[0.2em]">Chef Name</th>
              <th className="px-8 py-6 text-left text-xs font-bold text-[#4E342E]/40 uppercase tracking-[0.2em]">Contact Email</th>
              <th className="px-8 py-6 text-left text-xs font-bold text-[#4E342E]/40 uppercase tracking-[0.2em]">Access Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#4E342E]/5">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-[#FFF6F0]/30 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#FFA94D] flex items-center justify-center text-white font-black">
                      {user.rname.charAt(0)}
                    </div>
                    <span className="font-bold text-[#4E342E]">{user.rname}</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-[#4E342E]/60 font-medium">{user.email}</td>
                <td className="px-8 py-6">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${user.role === 'admin' ? 'bg-[#4E342E] text-white' : 'bg-[#FFA94D]/10 text-[#FFA94D]'}`}>
                    {user.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
export default UserManagement;