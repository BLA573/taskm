"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post(`/api/auth/login`, username, password);
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      throw error;
    }
  };

  const signup = async (username, password, name) => {
    try {
      const response = await axios.post(
        `/api/auth/signup`,
        username,
        password,
        name
      );
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      throw error.response.data.message;
    }
  };

  const clearUser = () => {
    setUser(undefined);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, clearUser, login, signup }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
