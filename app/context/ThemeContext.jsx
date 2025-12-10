import React, { createContext, useState, useContext } from "react";

// Création du contexte
const ThemeContext = createContext();

// Provider pour envelopper l'application
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook pratique pour utiliser le contexte
export const useTheme = () => useContext(ThemeContext);
