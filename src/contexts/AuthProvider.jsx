import React, { createContext, useState, useEffect } from "react";
import { getAccessToken, clearAuthTokens } from "axios-jwt";

export const AuthContext = createContext();
const AuthProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getAccessToken());

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

  const logout = () => {
    clearAuthTokens();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={[isAuthenticated, setIsAuthenticated, logout]}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
