import { createContext } from "react";
import axios from "axios";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const BackendContext = createContext(null);

export const api = axios.create({
  baseURL:
    Platform.OS === "web"
      ? "http://localhost:5000"
      : "http://192.168.68.197:5000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour ajouter le token à chaque requête
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token"); // récupère le token stocké
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
