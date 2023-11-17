import React, { createContext, useState, useEffect } from "react";
import AuthContext from "./authContext";
import { jwtDecode } from "jwt-decode";
const AuthState = (props) => {
  const [user, setUser] = useState(null); // User state, initially null
  const login = (userData) => {
    setUser(userData);
    console.log(userData);
  };

  useEffect(() => {
    // You can add authentication logic here, e.g., checking for an existing token in local storage
    // Example:
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token); 
  
      const userData = {
        role: decodedToken.user["role"],
        id: decodedToken.user["id"],
       
      };
     
      setUser(userData)
      console.log(user)
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login, // Function to set user data
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
