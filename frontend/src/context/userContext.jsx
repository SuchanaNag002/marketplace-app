import React, { createContext, useState, useEffect } from "react";
import * as jwtDecode from "jwt-decode";
import { login as loginApi, signup as signupApi } from "../api/AuthApi/index";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  const parsedUser =
    storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
  const parsedToken =
    storedToken && storedToken !== "undefined" ? storedToken : null;

  const [user, setUser] = useState(parsedUser);
  const [token, setToken] = useState(parsedToken);

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode.default(token);
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        }
      } catch (error) {
        logout();
      }
    }
  }, [token]);

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

  const isAuthenticated = !!user;

  return (
    <UserContext.Provider
      value={{ user, token, isAuthenticated, login, signup, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};
