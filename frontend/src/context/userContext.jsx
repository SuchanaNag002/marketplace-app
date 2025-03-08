import React, { createContext, useState } from "react";
import { login as loginApi, signup as signupApi } from "../api/AuthApi/index";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Attempt to retrieve stored auth data from localStorage
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  // Check if the stored values are valid (not the string "undefined")
  const parsedUser =
    storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
  const parsedToken =
    storedToken && storedToken !== "undefined" ? storedToken : null;

  const [user, setUser] = useState(parsedUser);
  const [token, setToken] = useState(parsedToken);

  // Login using API and persist data
  const login = async (credentials) => {
    try {
      const data = await loginApi(credentials);
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      throw error;
    }
  };

  // Signup using API and persist data
  const signup = async (userData) => {
    try {
      const data = await signupApi(userData);
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      throw error;
    }
  };

  // Logout clears state and removes persisted auth data
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // A simple flag to check if the user is logged in
  const isAuthenticated = !!user;

  return (
    <UserContext.Provider
      value={{ user, token, isAuthenticated, login, signup, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};
