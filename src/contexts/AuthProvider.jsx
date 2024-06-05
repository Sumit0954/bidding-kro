import React, { createContext, useState, useEffect } from "react";
import { getAccessToken } from "../utils/AxiosInterceptors";

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

  return (
    <AuthContext.Provider value={[isAuthenticated, setIsAuthenticated]}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
