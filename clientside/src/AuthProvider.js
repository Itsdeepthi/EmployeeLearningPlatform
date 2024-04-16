import React, { createContext, useContext, useState } from 'react';

// Create the AuthContext
export const AuthContext = createContext({});

// Create a custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userid, setUserId] = useState(localStorage.getItem('userId'));
    const [role, setRole] = useState(localStorage.getItem('role'));

  const login = (newToken, newUserId, newRole) => {
      setToken(newToken);
      setUserId(newUserId);
      setRole(newRole);
      localStorage.setItem('token', newToken);
      localStorage.setItem('userId', newUserId);
      localStorage.setItem('role', newRole);
  };

  const logout = () => {
      setToken(null);
      setUserId(null);
      setRole(null);
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ token, userid, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
