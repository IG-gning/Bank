import { createContext } from "react";
import axios from "axios";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const BackendContext = createContext(null);

export const api = axios.create({
  baseURL: "http://192.168.68.111:5000",
  timeout: 15000,
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
