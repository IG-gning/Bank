// src/context.js
import { createContext } from "react";
import axios from "axios";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const BackendContext = createContext(null);

export const api = axios.create({
  baseURL:
    Platform.OS === "web"
     ? "http://localhost:8081/"
      : "http://192.168.1.13:5000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Token utils
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    return token;
  } catch (error) {
    console.error("Erreur récupération token:", error);
    return null;
  }
};

export const setToken = async (token) => {
  try {
    await AsyncStorage.setItem("token", token);
  } catch (error) {
    console.error("Erreur sauvegarde token:", error);
  }
};

// Fonctions API
export const fetchTransactions = async () => {
  try {
    const token = await getToken();
    const res = await api.get("/transactions", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.transactions;
  } catch (err) {
    console.error("Erreur fetchTransactions:", err);
    return [];
  }
};

export const makeInternalTransfer = async (data) => {
  try {
    const token = await getToken();
    const res = await api.post("/transfers/internal", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Erreur makeInternalTransfer:", err.response?.data || err);
    throw err;
  }
};

export const makeExternalTransfer = async (data) => {
  try {
    const token = await getToken();
    const res = await api.post("/transfers/external", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Erreur makeExternalTransfer:", err.response?.data || err);
    throw err;
  }
};
