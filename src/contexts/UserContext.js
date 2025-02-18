"use client";

import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YWUyMWY4ODdkMTYwMjAwZmZiMTRjOCIsInVzZXJuYW1lIjoiZmlraXIiLCJpYXQiOjE3Mzk0NzY0NDIsImV4cCI6MTc0MDA4MTI0Mn0.xs14-zsNLWXtTKtIbXTRLsnszAgN9TevSe7OBDG-n3c",
    name: "fikir",
    username: "fikir",
    id: "67ae21f887d160200ffb14c8",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
    }
    setIsLoading(false);
  }, []);

  const clearUser = () => {
    setUser({ token: null, name: null, username: null, id: null });
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, isLoading, clearUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
