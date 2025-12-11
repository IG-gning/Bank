import React, { createContext, useState, useContext } from "react";

// Créer le contexte
const ThemeContext = createContext();

// Provider
export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const colors = {
    bg: isDarkMode ? "#141829" : "#eadfcf",
    text: isDarkMode ? "#f3e8d7" : "#3b322a",
    card: isDarkMode ? "#1e2130" : "#fff",
    border: isDarkMode ? "#ffffff20" : "#00000015",
    soft: isDarkMode ? "#f3e8d780" : "#3b322a80",
    primary: isDarkMode ? "#bfa98a" : "#5b4636",
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook pour accéder au thème
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme doit être utilisé dans un ThemeProvider");
  }
  return context;
}

export default ThemeProvider;
