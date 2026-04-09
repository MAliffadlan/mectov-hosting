import { createContext, useContext, useState, useEffect } from 'react';

/**
 * Auth Context
 * Manages JWT token and user state across the app
 */

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('mectov_token'));
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('mectov_user');
    return stored ? JSON.parse(stored) : null;
  });

  const isAuthenticated = !!token;

  const loginUser = (newToken, userData) => {
    localStorage.setItem('mectov_token', newToken);
    localStorage.setItem('mectov_user', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('mectov_token');
    localStorage.removeItem('mectov_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
