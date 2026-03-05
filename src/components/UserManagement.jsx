import React, { useState, useEffect } from 'react';
import { db } from '../Firebase';
import { ref, get, remove } from 'firebase/database';
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
      const usersRef = ref(db, 'users');
      const snapshot = await get(usersRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const usersArray = Object.keys(data).map(key => ({
          _id: key,
          ...data[key]
        }));
        const nonAdminUsers = usersArray.filter(user => user.is_admin !== true);
        setUsers(nonAdminUsers);
      } else {
        setUsers([]);
      }
    } catch (err) {
      setError('Failed to fetch users.');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to permanently delete this user?')) {
      try {
        const userRef = ref(db, `users/${userId}`);
        await remove(userRef);
        setUsers(users.filter(user => user._id !== userId));
      } catch (err) {
        setError('Failed to delete user.');
        console.error('Error deleting user:', err);
      }
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
                      {(user.name || user.rname || 'U').charAt(0).toUpperCase()}
                    </div>
                    <span className="font-bold text-[#4E342E]">{user.name || user.rname || 'Unknown'}</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-[#4E342E]/60 font-medium">{user.email}</td>
                <td className="px-8 py-6">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${user.is_admin ? 'bg-[#4E342E] text-white' : 'bg-[#FFA94D]/10 text-[#FFA94D]'}`}>
                    {user.is_admin ? 'admin' : 'user'}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  {!user.is_admin && (
                    <button onClick={() => handleDeleteUser(user._id)} className="w-10 h-10 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all ml-auto">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  )}
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