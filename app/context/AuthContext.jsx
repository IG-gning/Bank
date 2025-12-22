// app/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // Crée un instance Axios qui inclut le token automatiquement
  const api = axios.create({
    baseURL: "https://banking-backend-rtsx.onrender.com", // ← change par ton backend
    timeout: 10000,
  });

  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  // Stocker et récupérer token automatiquement
  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    setToken(res.data.token);
    await AsyncStorage.setItem("token", res.data.token);
    await fetchUser(res.data.token);
    return res.data;
  };

  const fetchUser = async (t) => {
    const tokenToUse = t || token;
    if (!tokenToUse) return;
    const res = await api.get("/me", {
      headers: { Authorization: `Bearer ${tokenToUse}` },
    });
    setUser(res.data);
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    await AsyncStorage.removeItem("token");
  };

  useEffect(() => {
    // récupérer le token au lancement
    AsyncStorage.getItem("token").then((t) => {
      if (t) {
        setToken(t);
        fetchUser(t);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, api, login, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};
