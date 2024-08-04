import { createContext, useState, useEffect } from 'react';
import { getUser, saveUser, removeUser } from '../utils/localStorage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser());

  const login = (userData) => {
    setUser(userData);
    saveUser(userData);
  };

  const logout = () => {
    setUser(null);
    removeUser();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
