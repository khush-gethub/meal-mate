import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../Firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { ref, get } from 'firebase/database';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // Fetch additional user details from database
          const userRef = ref(db, `users/${currentUser.uid}`);
          const snapshot = await get(userRef);

          let userData = {
            uid: currentUser.uid,
            email: currentUser.email,
          };

          if (snapshot.exists()) {
            userData = { ...userData, ...snapshot.val() };
          }

          setUser(userData);
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(null);
          setIsLoggedIn(false);
        }
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (userData) => {
    // This is optional now, as onAuthStateChanged handles most of it
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
