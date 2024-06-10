import React, { createContext, useState, useEffect } from "react";
import { getAccessToken } from "../utils/AxiosInterceptors";

export const AuthContext = createContext();
const AuthProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getAccessToken());
  const role = localStorage.getItem("role");

  useEffect(() => {
    const checkAuth = () => {
      const token = getAccessToken();
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ role, isAuthenticated, setIsAuthenticated }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
