import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [editFormData, setEditFormData] = useState({
    rname: '',
    email: '',
    role: '',
    password: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/admin/users');
      setUsers(response.data);
    } catch (err) {
      setError('Failed to fetch users.');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action is permanent.')) {
      try {
        await axios.delete(`http://localhost:8000/admin/users/${userId}`);
        setUsers(users.filter(user => user._id !== userId));
      } catch (err) {
        setError('Failed to delete user.');
        console.error('Error deleting user:', err);
      }
    }
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setEditFormData({
      rname: user.rname,
      email: user.email,
      role: user.role,
      password: '',
    });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  const handleFormChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/admin/users/${currentUser._id}`, editFormData);
      fetchUsers();
      handleModalClose();
    } catch (err) {
      setError('Failed to update user.');
      console.error('Error updating user:', err);
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
              <th className="px-8 py-6 text-right text-xs font-bold text-[#4E342E]/40 uppercase tracking-[0.2em]">Actions</th>
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
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="w-10 h-10 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-sm"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {isModalOpen && currentUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleModalClose}
              className="absolute inset-0 bg-[#4E342E]/20 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl w-full max-w-xl border border-[#4E342E]/5"
            >
              <h2 className="text-3xl font-black text-[#4E342E] mb-8">Edit Chef Profile</h2>
              <form onSubmit={handleUpdateUser} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#4E342E]/40 mb-3 ml-1">Full Name</label>
                  <input
                    type="text"
                    name="rname"
                    value={editFormData.rname}
                    onChange={handleFormChange}
                    className="w-full bg-[#FFF6F0]/50 border border-[#4E342E]/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#FFA94D]/30 focus:border-[#FFA94D] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#4E342E]/40 mb-3 ml-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={editFormData.email}
                    onChange={handleFormChange}
                    className="w-full bg-[#FFF6F0]/50 border border-[#4E342E]/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#FFA94D]/30 focus:border-[#FFA94D] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#4E342E]/40 mb-3 ml-1">New Password</label>
                  <input
                    type="password"
                    name="password"
                    value={editFormData.password}
                    onChange={handleFormChange}
                    className="w-full bg-[#FFF6F0]/50 border border-[#4E342E]/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#FFA94D]/30 focus:border-[#FFA94D] transition-all"
                    placeholder="Leave blank to keep current"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#4E342E]/40 mb-3 ml-1">Access Role</label>
                  <select
                    name="role"
                    value={editFormData.role}
                    onChange={handleFormChange}
                    className="w-full bg-[#FFF6F0]/50 border border-[#4E342E]/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#FFA94D]/30 focus:border-[#FFA94D] transition-all font-bold"
                  >
                    <option value="user">USER</option>
                    <option value="admin">ADMIN</option>
                  </select>
                </div>
                <div className="flex gap-4 pt-6">
                  <button
                    type="submit"
                    className="flex-1 premium-gradient text-white font-black py-4 rounded-2xl shadow-lg shadow-[#FFA94D]/20 hover:scale-[1.02] transition-all"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleModalClose}
                    className="px-8 bg-[#4E342E]/5 text-[#4E342E] font-bold py-4 rounded-2xl hover:bg-[#4E342E]/10 transition-all font-bold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UserManagement;