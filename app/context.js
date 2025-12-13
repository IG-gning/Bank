import { createContext } from "react";
import axios from "axios";
import { Platform } from "react-native";

export const BackendContext = createContext(null);

export const api = axios.create({
  baseURL:
    Platform.OS === "web"
      ? "http://localhost:5000"
      : "http://192.168.1.31:5000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
