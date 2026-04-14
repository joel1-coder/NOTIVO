import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("adminToken") || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("adminInfo");
    if (storedAdmin && token) {
      setAdmin(JSON.parse(storedAdmin));
    }
    setLoading(false);
  }, [token]);

  const login = (adminData, authToken) => {
    setAdmin(adminData);
    setToken(authToken);
    localStorage.setItem("adminToken", authToken);
    localStorage.setItem("adminInfo", JSON.stringify(adminData));
  };

  const logout = () => {
    setAdmin(null);
    setToken(null);
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminInfo");
  };

  return (
    <AuthContext.Provider value={{ admin, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);