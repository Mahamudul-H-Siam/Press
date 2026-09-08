import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Default user state: buyer, supplier, admin, or null (guest)
  const [user, setUser] = useState({
    id: 'U101',
    name: 'ABC Bank Limited',
    email: 'procurement@abcbank.com',
    role: 'buyer', // 'buyer' | 'supplier' | 'admin'
    verified: true,
    companyName: 'ABC Bank Limited',
    logo: 'AB',
  });

  const login = (role = 'buyer') => {
    if (role === 'buyer') {
      setUser({
        id: 'U101',
        name: 'ABC Bank Limited',
        email: 'procurement@abcbank.com',
        role: 'buyer',
        verified: true,
        companyName: 'ABC Bank Limited',
        logo: 'AB',
      });
    } else if (role === 'supplier') {
      setUser({
        id: 'U102',
        name: 'TechVision Solutions',
        email: 'bids@techvision.com',
        role: 'supplier',
        verified: true,
        companyName: 'TechVision Solutions',
        logo: 'TV',
        category: 'technology',
      });
    } else if (role === 'admin') {
      setUser({
        id: 'U100',
        name: 'Marketplace Admin',
        email: 'admin@tenderplace.com',
        role: 'admin',
        verified: true,
      });
    }
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (newRole) => {
    login(newRole);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
